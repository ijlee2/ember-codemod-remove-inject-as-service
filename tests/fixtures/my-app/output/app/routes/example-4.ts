import Route from '@ember/routing/route';
import { inject as s } from '@ember/service';

export default Route.extend({
  xyz: s('api'),
  user: s('current-user'),

  async model() {
    await this.user.fetchUser();
    const version = (await this.xyz.get('version')) as string;

    return {
      user: this.user.user,
      version,
    };
  },
});
