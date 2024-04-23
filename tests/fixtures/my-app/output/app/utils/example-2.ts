import { action } from '@ember/object';
import { type Registry as Services, service } from '@ember/service';

export default class Example2Utility {
  @service('domain-1/business-logic')
  declare dbl: Services['domain-1/business-logic'];

  @service('current-user')
  declare user: Services['current-user'];
  @service('api')
  declare xyz: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.user.user!.id;

    await this.xyz.post('consent', { id });
  }
}
