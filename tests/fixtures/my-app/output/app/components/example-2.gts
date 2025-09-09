import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import type ApiService from '../services/api';
import type CurrentUserService from '../services/current-user';
import type Domain1BusinessLogicService from '../services/domain-1/business-logic';

export default class Example2Component extends Component {
  <template>
    Template goes here
  </template>

  @service('domain-1/business-logic')
  declare dbl: Domain1BusinessLogicService;
  @service('current-user')
  declare user: CurrentUserService;
  @service('api')
  declare xyz: ApiService;

  @action async consent(): Promise<void> {
    const id = this.user.user!.id;

    await this.xyz.post('consent', { id });
  }
}
