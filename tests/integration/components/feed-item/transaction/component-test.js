import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feed-item/transaction', 'Integration | Component | feed item/transaction', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{feed-item/transaction}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#feed-item/transaction}}
      template block text
    {{/feed-item/transaction}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
