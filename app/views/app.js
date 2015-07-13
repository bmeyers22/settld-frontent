
import Ember from 'ember';


var AppView = Ember.View.extend({
  didInsertElement: function() {
    $('.main-home-select').dropdown('set value', this.get('controller.model.CURRENT_HOME_ID'));
    return $('.groups-bar').sidebar({
      context: $('.global-wrapper')
    });
  }
});

export default AppView
