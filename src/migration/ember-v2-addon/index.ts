import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';
import { updateProject } from '../../utils/steps/update-project.js';

export function migrateEmberV2Addon(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  updateProject(options);
}
