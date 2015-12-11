import Ember from 'ember';

// This is for the feed controller only at the moment
export default Ember.Component.extend({
  attributeBindings: [ 'data-audience' ],
  classNames: [
    'ui',
    'icon',
    'basic',
    'button'
  ],
  classNameBindings: [ 'green', 'disabled' ],
  green: Ember.computed('audienceScope', function() {
    return this.get('audienceScope') === this.get('index');
  }),
  click(e) {
    this.sendAction('changeAudience', this.get('index'));
  }}
);
