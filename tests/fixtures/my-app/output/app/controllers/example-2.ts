import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type ApiService from '../services/api';
import type CurrentUserService from '../services/current-user';
import type Domain1BusinessLogicService from '../services/domain-1/business-logic';

export default class Example2Controller extends Controller {
  @inject('domain-1/business-logic') declare dbl: Domain1BusinessLogicService;
  @inject('current-user') declare user: CurrentUserService;
  @inject('api') declare xyz: ApiService;

  @action async consent(): Promise<void> {
    const id = this.user.user!.id;

    await this.xyz.post('consent', { id });
  }
}
