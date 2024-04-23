import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type ApiService from '../services/api';
import type CurrentUserService from '../services/current-user';
import type Domain1BusinessLogicService from '../services/domain-1/business-logic';

export default class Example1Controller extends Controller {
  @service('domain-1/business-logic')
  declare domain1BusinessLogic: Domain1BusinessLogicService;

  @service
  declare currentUser: CurrentUserService;
  @service
  declare api: ApiService;

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
