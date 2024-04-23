import { action } from '@ember/object';
import type { Registry as Services } from '@ember/service';
import { service as s } from '@ember/service';

export default class Example4Utility {
  @s('domain-1/business-logic')
  declare domain1BusinessLogic: Services['domain-1/business-logic'];

  @s('current-user') declare currentUser: Services['current-user'];
  @s('api') declare api: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
