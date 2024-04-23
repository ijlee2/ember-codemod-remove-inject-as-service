import { action } from '@ember/object';
import { service, type Registry as Services } from '@ember/service';

export default class Example6Utility {
  /*
    Inject services here
  */
  @inject('foo/bar')
  // @ts-expect-error: Property 'foo/bar' does not exist on type 'Registry'.
  private declare readonly fooBar: Services['foo/bar'];

  // @ts-expect-error: Property 'quux' does not exist on type 'Registry'.
  @inject('quux') private declare readonly quux: Services['quux'];

  get baz(): string {
    return `${this.fooBar.baz} ${this.quux.baz}`;
  }
}
