import Component from '@ember/component';
import { service } from '@ember/service';

export default Component.extend({
  domain1BusinessLogic: service('domain-1/business-logic'),
  currentUser: service('current-user'),
  api: service(),

  actions: {
    async consent() {
      const id = this.currentUser.user.id;

      await this.api.post('consent', { id });
    },
  },
});
