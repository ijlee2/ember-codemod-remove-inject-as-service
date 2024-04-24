import Service, {
  inject as service,
  type Registry as Services,
} from '@ember/service';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | example-1', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.owner.register(
      'service:domain-1/business-logic',
      class Domain1BusinessLogicService extends Service {
        @service private declare readonly intl: Services['intl'];

        get message(): string {
          return this.intl.t('hello.message', { name: 'Tomster' });
        }
      },
    );
  });

  test('it renders', async function (assert) {
    await render(hbs`<Example1 />`);

    assert.ok(true);
  });
});
