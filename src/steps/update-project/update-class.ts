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

      switch (node.value.callee.type) {
        case 'Identifier': {
          if (node.value.callee.name === data.localName) {
            node.value.callee.name = 'service';
          }

          break;
        }
      }

      return false;
    },

    visitClassProperty(node) {
      if (
        !Array.isArray(node.value.decorators) ||
        node.value.decorators.length !== 1
      ) {
        return false;
      }

      const decorator = node.value.decorators[0];
      let isMatch = false;

      switch (decorator.expression.type) {
        case 'CallExpression': {
          if (decorator.expression.callee.name === data.localName) {
            decorator.expression.callee.name = 'service';
            isMatch = true;
          }

          break;
        }

        case 'Identifier': {
          if (decorator.expression.name === data.localName) {
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
      if (!decorator.trailingComments) {
        node.value.accessibility = null;
        node.value.declare = true;
        node.value.definite = null;
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
