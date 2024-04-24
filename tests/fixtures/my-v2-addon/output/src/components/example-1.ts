import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import type ApiService from '../services/api.ts';
import type CurrentUserService from '../services/current-user.ts';
import type Domain1BusinessLogicService from '../services/domain-1/business-logic.ts';

export default class Example1Component extends Component {
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
