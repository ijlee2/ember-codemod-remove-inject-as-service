import { action } from '@ember/object';
import type { Registry as Services } from '@ember/service';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class Example4Component extends Component {
  @service('domain-1/business-logic')
  private declare readonly domain1BusinessLogic: Services['domain-1/business-logic'];

  @service private declare readonly currentUser: Services['current-user'];
  @service private declare readonly api: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
