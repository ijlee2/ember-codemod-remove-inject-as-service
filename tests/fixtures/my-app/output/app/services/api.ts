import { action } from '@ember/object';
import Service from '@ember/service';

export default class ApiService extends Service {
  @action async get(endpoint: string): Promise<unknown> {
    switch (endpoint) {
      case 'user': {
        return {
          name: 'Tomster',
        };
      }

      case 'version': {
        return '4.1.0';
      }
    }
  }

  @action async post(endpoint: string, data: unknown): Promise<unknown> {
    switch (endpoint) {
      case 'consent': {
        return;
      }
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    api: ApiService;
  }
}
