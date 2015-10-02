import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create/transaction/split-sliders', 'Integration | Component | create/transaction/split sliders', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create/transaction/split-sliders}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#create/transaction/split-sliders}}
      template block text
    {{/create/transaction/split-sliders}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
