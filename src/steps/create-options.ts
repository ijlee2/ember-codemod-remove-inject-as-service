import type { CodemodOptions, Options } from '../types/index.js';

function getSrc(projectType: CodemodOptions['projectType']): string[] {
  switch (projectType) {
    case 'app': {
      return ['{app,tests}/**/*.{js,ts}'];
    }

    case 'v1-addon': {
      return ['{addon,tests}/**/*.{js,ts}'];
    }

    case 'v2-addon': {
      return ['src/**/*.{js,ts}'];
    }
  }
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot, projectType } = codemodOptions;

  return {
    projectRoot,
    src: getSrc(projectType),
  };
}
