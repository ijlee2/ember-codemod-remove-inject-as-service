import Service, { service } from '@ember/service';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | example-5', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    this.owner.register(
      'service:domain-1/business-logic',
      class Domain1BusinessLogicService extends Service {
        @service intl;

        get message() {
          return this.intl.t('hello.message', { name: 'Tomster' });
        }
      },
    );
  });

  test('it renders', async function (assert) {
    await render(hbs`<Example5 />`);

    assert.ok(true);
  });
});
