import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';
import { updateProject } from '../../utils/steps/update-project.js';

export function migrateEmberV1Addon(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  updateProject(
    ['addon/**/*.{js,ts}', 'tests/dummy/app/**/*.{js,ts}'],
    options,
  );
}
