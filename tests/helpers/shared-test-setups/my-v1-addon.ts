import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  projectRoot: 'tmp/my-v1-addon',
  projectType: 'v1-addon',
};

const options: Options = {
  projectRoot: 'tmp/my-v1-addon',
  src: ['{addon,tests}/**/*.{js,ts}'],
};

export { codemodOptions, options };
