import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';
import { updateProject } from '../../utils/steps/update-project.js';

export function migrateEmberApp(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  updateProject(['app/**/*.{js,ts}'], options);
}
