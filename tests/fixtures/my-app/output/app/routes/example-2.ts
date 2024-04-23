import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default Route.extend({
  api: inject(),
  currentUser: inject('current-user'),

  async model() {
    await this.currentUser.fetchUser();
    const version = (await this.api.get('version')) as string;

    return {
      user: this.currentUser.user,
      version,
    };
  },
});
