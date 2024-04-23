import { action } from '@ember/object';
import { service, type Registry as Services } from '@ember/service';
import Component from '@glimmer/component';

export default class Example3Component extends Component {
  @service('domain-1/business-logic')
  declare domain1BusinessLogic: Services['domain-1/business-logic'];

  @service
  declare currentUser: Services['current-user'];
  @service
  declare api: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
