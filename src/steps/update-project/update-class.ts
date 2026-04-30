import { AST } from '@codemod-utils/ast-javascript';

function isValueImport(
  importKind: 'type' | 'typeof' | 'value' | undefined,
): boolean {
  return importKind === undefined || importKind === 'value';
}

function updateImportStatement(
  file: string,
  data: {
    isTypeScript: boolean;
  },
): {
  localName: string | undefined;
  newFile: string;
} {
  let localName: string | undefined;

  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitImportDeclaration(path) {
      const { importKind, source, specifiers } = path.node;

      if (!isValueImport(importKind)) {
        return false;
      }

      if (source.type !== 'Literal' && source.type !== 'StringLiteral') {
        return false;
      }

      if (source.value !== '@ember/service' || !Array.isArray(specifiers)) {
        return false;
      }

      path.node.specifiers = specifiers.map((specifier) => {
        // @ts-expect-error: 'specifier.importKind' exists
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!isValueImport(specifier.importKind)) {
          return specifier;
        }

        if (specifier.type !== 'ImportSpecifier') {
          return specifier;
        }

        if (
          specifier.imported.name !== 'inject' &&
          specifier.imported.name !== 'service'
        ) {
          return specifier;
        }

        localName = specifier.local!.name as string;

        return AST.builders.importSpecifier(AST.builders.identifier('service'));
      });

      return false;
    },
  });

  return {
    localName,
    newFile: AST.print(ast),
  };
}

function updateServiceDecorators(
  file: string,
  data: {
    isTypeScript: boolean;
    localName: string;
  },
): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitCallExpression(node) {
      this.traverse(node);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (node.value.callee.type) {
        case 'Identifier': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (node.value.callee.name === data.localName) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            node.value.callee.name = 'service';
          }

          break;
        }
      }

      return false;
    },

    visitClassProperty(node) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        !Array.isArray(node.value.decorators) ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.decorators.length !== 1
      ) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const decorator = node.value.decorators[0];
      let isMatch = false;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (decorator.expression.type) {
        case 'CallExpression': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (decorator.expression.callee.name === data.localName) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            decorator.expression.callee.name = 'service';
            isMatch = true;
          }

          break;
        }

        case 'Identifier': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (decorator.expression.name === data.localName) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            decorator.expression.name = 'service';
            isMatch = true;
          }

          break;
        }
      }

      if (!isMatch || !data.isTypeScript) {
        return false;
      }

      // Stylistic choices
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!decorator.trailingComments) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.accessibility = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.declare = true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.definite = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.readonly = null;
      }

      return false;
    },
  });

  return AST.print(ast);
}

type Data = {
  isTypeScript: boolean;
};

export function updateClass(file: string, data: Data): string {
  const { isTypeScript } = data;

  // eslint-disable-next-line prefer-const
  let { localName, newFile } = updateImportStatement(file, {
    isTypeScript,
  });

  if (!localName) {
    return file;
  }

  newFile = updateServiceDecorators(newFile, {
    isTypeScript,
    localName,
  });

  return newFile;
}
