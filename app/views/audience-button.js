import Ember from 'ember'

// This is for the feed controller only at the moment
var AudienceButtonView = Ember.View.extend(
  {attributeBindings: [ 'data-audience' ],
  classNames: [
    'ui',
    'button'
  ],
  classNameBindings: [ 'active' ],
  active: (function() {
    return this.get('parentView.controller.audienceScope') === this.get('index');
  }
  ).property('parentView.controller.audienceScope'),
  index: null,
  click: function(e) {
    this.get('parentView').send('changeAudience', this.get('index'));
    return;
  }}
);

export default AudienceButtonView