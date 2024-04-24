import type { Registry as Services } from '@ember/service';
import Service from '@ember/service';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  service: Services['domain-1/business-logic'];
}

module('Unit | Service | domain-1/business-logic', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register(
      'service:current-user',
      class CurrentUserService extends Service {
        user = {
          name: 'Tomster',
        };
      },
    );

    this.service = this.owner.lookup(
      'service:domain-1/business-logic',
    ) as Services['domain-1/business-logic'];
  });

  test('message', function (this: TestContext, assert) {
    assert.strictEqual(this.service.message, 'Hello, Tomster!');
  });
});
