import Ember from 'ember';

var HomesIndexController = Ember.ArrayController.extend(
  {sortedDefault: Ember.computed('model.[]', function() {
    var self = this;
    var content = this.get('model') || [];
    var newOrder = Ember.ArrayProxy.create({content: content.toArray()});
    // newOrder.find(function(home) {
    //        return home.get('id') == Room.globeController.get('authUser.settings.defaultHome');
    //    });
    var index = newOrder.indexOf(newOrder.find(function(home) {
      return home.get('id') === self.get('currentSession.authUser.settings.defaultHome');
    }
    ));
    if (index !== 0) {
      var tempDefault = newOrder.objectAt(index);
      var tempMoved = newOrder.objectAt(0);
      newOrder.content[0] = tempDefault;
      newOrder.content[index] = tempMoved;
    }
    return newOrder;
  }),
  actions: {setDefaultHome(id) {
    var settings = this.get('currentSession.authUser.settings');
    settings.set('defaultHome', id);
    settings.save();
    return;
  }}
});

export default HomesIndexController
