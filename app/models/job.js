import Ember from 'ember';
import DS from 'ember-data';

var Job = DS.Model.extend(
  {user: DS.belongsTo('user', {
    async: false
  }),
  home: DS.belongsTo('home', {
    async: false
  }),
  title: DS.attr('string'),
  description: DS.attr('string'),
  points: DS.attr('number'),
  date: DS.attr('date'),
  split: DS.attr('boolean'),
  contributors: DS.attr('array')});

export default Job