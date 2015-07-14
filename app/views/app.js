
import Ember from 'ember';


var AppView = Ember.View.extend({
  didInsertElement: function() {
    $('.main-home-select').dropdown('set value', this.get('controller.model.CURRENT_HOME_ID'));
    $('.groups-bar').sidebar({
      context: $('.global-wrapper')
    });
    $('.user-bar').sidebar({
      context: $('.global-content'),
      dimPage: false,
      defaultTransition: {
        computer: {
          top: 'push'
        },
        mobile: {
          top: 'push'
        }
      }
    });
  }
});

export default AppView
