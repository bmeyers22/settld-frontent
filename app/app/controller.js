import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  groupPath: Ember.computed('application.currentPath', function() {
    let currentPath = this.get('application.currentPath'),
      toPath = 'dashboard';
    if (/group/.test(currentPath)) {
      toPath = this.get('application.currentRouteName');
    }
    return toPath;
  })
});
