import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service(),
  currentUser: service('current-user'),

  async model() {
    await this.currentUser.fetchUser();
    const version = (await this.api.get('version')) as string;

    return {
      user: this.currentUser.user,
      version,
    };
  },
});
