import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { findFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import { updateClass } from './update-project/update-class.js';

function isTypeScript(filePath: string): boolean {
  return filePath.endsWith('.gts') || filePath.endsWith('.ts');
}

export function updateProject(options: Options): void {
  const { projectRoot, src } = options;

  const filePaths = findFiles(src, {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    let newFile = readFileSync(oldPath, 'utf8');

    const data = {
      isTypeScript: isTypeScript(filePath),
    };

    if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
      newFile = updateClass(newFile, data);
    } else {
      newFile = updateJavaScript(newFile, (code) => {
        return updateClass(code, data);
      });
    }

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
