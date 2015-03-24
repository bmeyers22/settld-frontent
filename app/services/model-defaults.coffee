`import Ember from 'ember'`

defaults = ->
  transaction:
    user: null
    home: null
    cost: null
    title: ""
    description: null
    category: null
    date: new Date()
    split: false
    contributors: []
    points: null
  job:
    user: null
    home: null
    title: null
    description: null
    date: new Date()
    contributors: []
    points: null

getDefaults = ->
  defaults()

copyFn = (defaults) ->
  -> @getProperties Object.keys defaults

createDefaultsObject = (defaults, properties) ->
  attrs = _.extend defaults, properties
  attrs.copy = copyFn defaults
  obj = Ember.Object.extend Ember.Copyable,
    attrs
  obj.create()

ModelDefaults = Ember.Service.extend
  name: "_$modelDefaults"
  availableIn: ['controllers', 'routes']
  getDefaults: getDefaults
  getModelType: (type, properties={}) -> createDefaultsObject getDefaults()[type], properties

`export default ModelDefaults`
