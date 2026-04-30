import { AST } from '@codemod-utils/ast-javascript';

type Decorator = ReturnType<typeof AST.builders.decorator>;

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
        // @ts-expect-error: Incorrect type
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
    visitCallExpression(path) {
      this.traverse(path);

      switch (path.node.callee.type) {
        case 'Identifier': {
          if (path.node.callee.name === data.localName) {
            path.node.callee.name = 'service';
          }

          break;
        }
      }

      return false;
    },

    visitClassProperty(path) {
      // @ts-expect-error: Incorrect type
      const decorators = path.node.decorators as Decorator[];

      if (!Array.isArray(decorators) || decorators.length !== 1) {
        return false;
      }

      const decorator = decorators[0]!;
      let isMatch = false;

      switch (decorator.expression.type) {
        case 'CallExpression': {
          if (
            decorator.expression.callee.type === 'Identifier' &&
            decorator.expression.callee.name === data.localName
          ) {
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

      if (!isMatch) {
        return false;
      }

      // Stylistic choices
      // @ts-expect-error: Incorrect type
      if (data.isTypeScript && !decorator.trailingComments) {
        // @ts-expect-error: Incorrect type
        path.node.accessibility = null;
        // @ts-expect-error: Incorrect type
        path.node.declare = true;
        // @ts-expect-error: Incorrect type
        path.node.definite = null;
        // @ts-expect-error: Incorrect type
        path.node.readonly = null;
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
