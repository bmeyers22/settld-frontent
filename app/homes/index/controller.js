import Ember from 'ember';

var HomesIndexController = Ember.Controller.extend({
    sortedDefault: Ember.computed('model.[]', function() {
        var self = this;
        var content = this.get('model') || [];
        var newOrder = Ember.ArrayProxy.create({content: content.toArray()});
        // newOrder.find(function(home) {
        //        return home.get('id') == Room.globeController.get('authUser.settings.defaultHome');
        //    });
        var index = newOrder.indexOf(newOrder.find(function(home) {
            return home.get('id') === self.get('currentSession.authUser.settings.defaultHome');
        }));
        if (index !== 0) {
            var tempDefault = newOrder.objectAt(index);
            var tempMoved = newOrder.objectAt(0);
            newOrder.content[0] = tempDefault;
            newOrder.content[index] = tempMoved;
        }
        return newOrder;
    }),
    actions: {
    }
});

export default HomesIndexController
