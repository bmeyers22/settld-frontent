import Ember from 'ember'

var HomesIndexController = Ember.ArrayController.extend(
  {sortedDefault: (function() {
    var self = this;
    var content = this.get('model') || [];
    var newOrder = Ember.ArrayProxy.create({content: content.toArray()});
    // newOrder.find(function(home) {
    //        return home.get('id') == Room.globeController.get('authUser.settings.defaultHome');
    //    });
    var index = newOrder.indexOf(newOrder.find(function(home) {
      return home.get('id') === self.session.get('authUser.settings.defaultHome');
    }
    ));
    if (index !== 0) {
      var tempDefault = newOrder.objectAt(index);
      var tempMoved = newOrder.objectAt(0);
      newOrder.content[0] = tempDefault;
      newOrder.content[index] = tempMoved;
    }
    return newOrder;
  }
  ).property('model.@each'),
  actions: {setDefaultHome: function(id) {
    var settings = this.session.get('authUser.settings');
    settings.set('defaultHome', id);
    settings.save();
    return;
  }}
});

export default HomesIndexController