import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject, type Registry as Services } from '@ember/service';

export default class Example3Controller extends Controller {
  @inject('domain-1/business-logic')
  declare domain1BusinessLogic: Services['domain-1/business-logic'];

  @inject declare currentUser: Services['current-user'];
  @inject declare api: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
