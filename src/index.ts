import {
  migrateEmberApp,
  migrateEmberV1Addon,
  migrateEmberV2Addon,
} from './migration/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  switch (codemodOptions.projectType) {
    case 'app': {
      migrateEmberApp(codemodOptions);
      break;
    }

    case 'v1-addon': {
      migrateEmberV1Addon(codemodOptions);
      break;
    }

    case 'v2-addon': {
      migrateEmberV2Addon(codemodOptions);
      break;
    }
  }
}
