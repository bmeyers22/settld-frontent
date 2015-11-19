import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let model = this.store.find('home', params.home_id)
    this.get('currentSession').setProperties({
      CURRENT_HOME_ID: model.get('id'),
      currentHome: model
    });
    return model;
  }
});
