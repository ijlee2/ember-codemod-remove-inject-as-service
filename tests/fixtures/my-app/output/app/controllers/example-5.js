import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class Example5Controller extends Controller {
  @inject('domain-1/business-logic') domain1BusinessLogic;
  @inject currentUser;
  @inject api;

  @action async consent() {
    const id = this.currentUser.user.id;

    await this.api.post('consent', { id });
  }
}
