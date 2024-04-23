import Controller from '@ember/controller';
import { action } from '@ember/object';
import type { Registry as Services } from '@ember/service';
import { inject } from '@ember/service';

export default class Example4Controller extends Controller {
  @inject('domain-1/business-logic')
  private declare readonly domain1BusinessLogic: Services['domain-1/business-logic'];

  @inject private declare readonly currentUser: Services['current-user'];
  @inject private declare readonly api: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
