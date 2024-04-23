import { action } from '@ember/object';
import type { Registry as Services } from '@ember/service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class Example6Component extends Component {
  @service('domain-1/business-logic')
  domain1BusinessLogic!: Services['domain-1/business-logic'];

  @service('current-user') currentUser!: Services['current-user'];
  @service api!: Services['api'];

  @action async consent(): Promise<void> {
    const id = this.currentUser.user!.id;

    await this.api.post('consent', { id });
  }
}
