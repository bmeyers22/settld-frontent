`import Ember from 'ember'`

HomesIndexController = Ember.ArrayController.extend(
  sortedDefault: (->
    self = this
    content = @get('model') or []
    newOrder = Ember.ArrayProxy.create(content: content.toArray())
    # newOrder.find(function(home) {
    #        return home.get('id') == Room.globeController.get('authUser.settings.defaultHome');
    #    });
    index = newOrder.indexOf(newOrder.find((home) ->
      home.get('id') == self.session.get('authUser.settings.defaultHome')
    ))
    if index != 0
      tempDefault = newOrder.objectAt(index)
      tempMoved = newOrder.objectAt(0)
      newOrder.content[0] = tempDefault
      newOrder.content[index] = tempMoved
    newOrder
  ).property('model.@each')
  actions: setDefaultHome: (id) ->
    settings = @session.get('authUser.settings')
    settings.set 'defaultHome', id
    settings.save()
    return
)

`export default HomesIndexController`