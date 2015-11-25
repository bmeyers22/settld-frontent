import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user', {
        async: true
    }),
    home: DS.belongsTo('home', {
        async: true
    }),
    title: DS.attr('string'),
    description: DS.attr('string'),
    points: DS.attr('number'),
    date: DS.attr('date'),
    split: DS.attr('boolean')
});
