import { AST } from '@codemod-utils/ast-javascript';

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
    // ...
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

  newFile = updateServiceDecorators(newFile, {
    isTypeScript,
    localName,
  });

  return newFile;
}
