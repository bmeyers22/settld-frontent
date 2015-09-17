import Ember from 'ember';

// This is for the feed controller only at the moment
export default Ember.Component.extend({
  attributeBindings: [ 'data-audience' ],
  classNames: [
    'ui',
    'icon',
    'button'
  ],
  classNameBindings: [ 'active', 'disabled' ],
  active: Ember.computed('audienceScope', function() {
    return this.get('audienceScope') === this.get('index');
  }),
  click(e) {
    this.sendAction('changeAudience', this.get('index'));
  }}
);
