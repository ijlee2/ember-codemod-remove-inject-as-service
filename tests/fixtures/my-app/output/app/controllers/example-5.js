import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Example5Controller extends Controller {
  @service('domain-1/business-logic') domain1BusinessLogic;
  @service currentUser;
  @service api;

  @action async consent() {
    const id = this.currentUser.user.id;

    await this.api.post('consent', { id });
  }
}
