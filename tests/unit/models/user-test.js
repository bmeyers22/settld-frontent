import { test, moduleForModel } from 'ember-qunit';
import startApp from '../../helpers/start-app';


moduleForModel('user', {
  // Specify the other units that are required for this test.
  needs: ["model:home"]
});

test('it exists', function(assert) {
  var model = this.subject();
  var store = this.store();
  return assert.ok(model);
});
