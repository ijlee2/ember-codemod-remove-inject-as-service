import Service, { service } from '@ember/service';

import type CurrentUserService from '../current-user.ts';

export default class Domain1BusinessLogicService extends Service {
  @service
  declare currentUser: CurrentUserService;

  get message(): string | undefined {
    const { user } = this.currentUser;

    if (!user) {
      return;
    }

    return `Hello, ${user.name}!`;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'domain-1/business-logic': Domain1BusinessLogicService;
  }
}
