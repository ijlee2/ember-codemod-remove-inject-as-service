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

        return specifier;
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
    // ...
  });

  return AST.print(ast);
}

export function updateClass(file: string, isTypeScript: boolean): string {
  // eslint-disable-next-line prefer-const
  let { localName, newFile } = updateImportStatement(file, {
    isTypeScript,
  });

  if (!localName) {
    return file;
  }

  console.log(localName);

  newFile = updateServiceDecorators(newFile, {
    isTypeScript,
    localName,
  });

  return newFile;
}
