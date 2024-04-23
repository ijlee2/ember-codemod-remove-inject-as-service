import { action } from '@ember/object';
import { inject, type Registry as Services } from '@ember/service';

export default class Example6Utility {
  /*
    Inject services here
  */
  @inject('foo/bar')
  // @ts-expect-error: Property 'foo/bar' does not exist on type 'Registry'.
  private declare readonly fooBar: Services['foo/bar'];

  get baz() {
    return this.fooBar.baz;
  }
}
