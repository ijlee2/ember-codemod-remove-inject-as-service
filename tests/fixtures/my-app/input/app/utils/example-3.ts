import { action } from '@ember/object';
import { inject as s } from '@ember/service';

import type ApiService from '../services/api';
import type CurrentUserService from '../services/current-user';
import type Domain1BusinessLogicService from '../services/domain-1/business-logic';

export default class Example3Utility {
  @s('domain-1/business-logic')
  declare domain1BusinessLogic: Domain1BusinessLogicService;

  @s declare currentUser: CurrentUserService;
  @s declare api: ApiService;

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
