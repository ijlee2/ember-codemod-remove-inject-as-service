import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class Example5Component extends Component {
  @service('domain-1/business-logic') domain1BusinessLogic;
  @service currentUser;
  @service api;

  @action async consent() {
    const id = this.currentUser.user.id;

    await this.api.post('consent', { id });
  }
}
