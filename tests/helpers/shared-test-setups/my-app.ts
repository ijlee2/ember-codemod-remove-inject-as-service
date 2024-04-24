import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-app',
  projectType: 'app',
};

const options: Options = {
  projectRoot: 'tmp/my-app',
  src: ['app/**/*.{js,ts}', 'tests/**/*.{js,ts}'],
};

export { codemodOptions, options };
