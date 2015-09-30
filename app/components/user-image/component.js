import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super();
    if (this.attrs.bare) {
      let user = this.attrs.user.value;
      if (user.get('image')) {
        this.set('tagName', 'img');
        this.set('attributeBindings', ['src']);
        this.set('src', user.get('image'));
      } else {
        this.set('tagName', 'i');
        this.set('classNames', ['user-image', 'circular', 'user', 'icon']);
      }
    }
  },
  classNames: ['user-image'],
  image: Ember.computed(function () {
    return `${this.get('user.image')}`
  })
});
