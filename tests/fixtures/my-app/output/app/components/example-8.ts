import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import type ApiService from '../services/api';
import type CurrentUserService from '../services/current-user';
import type Domain1BusinessLogicService from '../services/domain-1/business-logic';

export default class Example8Component extends Component {
  @service('domain-1/business-logic')
  public domain1BusinessLogic!: Domain1BusinessLogicService;

  @service public currentUser!: CurrentUserService;
  @service public api!: ApiService;

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
