import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-image'],
  image: Ember.computed(function () {
    return `${this.get('user.image')}`
  })
});
