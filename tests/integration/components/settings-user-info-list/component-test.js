import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('settings-user-info-list', 'Integration | Component | settings user info list', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{settings-user-info-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#settings-user-info-list}}
      template block text
    {{/settings-user-info-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
