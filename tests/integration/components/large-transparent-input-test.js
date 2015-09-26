import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('large-transparent-input', 'Integration | Component | large transparent input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{large-transparent-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#large-transparent-input}}
      template block text
    {{/large-transparent-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
