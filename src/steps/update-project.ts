import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import { Options } from '../types/index.js';
import { updateClass } from './update-project/update-class.js';

export function updateProject(options: Options): void {
  const { projectRoot, src } = options;

  const filePaths = findFiles(src, {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const isTypeScript = filePath.endsWith('.ts');

    const newFile = updateClass(oldFile, isTypeScript);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
