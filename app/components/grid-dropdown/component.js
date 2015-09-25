import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['grid-dropdown', 'padded', 'ui' ,'equal' ,'width' ,'three' ,'column' ,'grid'],
  actions: {
    select(option) {
      this.sendAction('select', option)

    }
  }
});
