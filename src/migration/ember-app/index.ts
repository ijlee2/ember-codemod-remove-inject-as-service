import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';

export function migrateEmberApp(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  console.log(options);
}
