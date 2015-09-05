import Ember from 'ember';

// This is for the feed controller only at the moment
export default Ember.Component.extend({
  init() {
    this._super();
    this.get('classNames').push(this.get('iconClass'));
  },
  attributeBindings: [ 'data-audience' ],
  classNames: [
    'ui',
    'button'
  ],
  classNameBindings: [ 'active' ],
  active: Ember.computed('audienceScope', function() {
    return this.get('audienceScope') === this.get('index');
  }),
  click(e) {
    this.get('parentView').send('changeAudience', this.get('index'));
    return;
  }}
);
