import { action } from '@ember/object';
import Service, {
  service,
  type Registry as Services,
} from '@ember/service';
import { tracked } from '@glimmer/tracking';

type User = {
  id: string;
  name: string;
};

export default class CurrentUserService extends Service {
  @service
  declare api: Services['api'];

  @tracked user?: User;

  @action async fetchUser(): Promise<void> {
    this.user = await this.api.get('user') as User;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'current-user': CurrentUserService;
  }
}
