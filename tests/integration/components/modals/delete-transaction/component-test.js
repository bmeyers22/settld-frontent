import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/delete-transaction', 'Integration | Component | modals/delete transaction', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modals/delete-transaction}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modals/delete-transaction}}
      template block text
    {{/modals/delete-transaction}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
