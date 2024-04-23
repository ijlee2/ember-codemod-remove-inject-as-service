import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default Route.extend({
  xyz: service('api'),
  user: service('current-user'),

  async model() {
    await this.user.fetchUser();
    const version = (await this.xyz.get('version')) as string;

    return {
      user: this.user.user,
      version,
    };
  },
});
