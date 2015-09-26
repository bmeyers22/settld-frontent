import Ember from 'ember';
import Enums from 'web/enums';

var DashboardController = Ember.Controller.extend({
  sortProp: ['date:desc'],
  stream: Ember.computed.sort('model.transactions', 'sortProp')
});

export default DashboardController
