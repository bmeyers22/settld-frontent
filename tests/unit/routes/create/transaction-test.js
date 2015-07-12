import { test, moduleFor } from 'ember-qunit'

moduleFor('route:create/transaction', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  return assert.ok(route);
});
