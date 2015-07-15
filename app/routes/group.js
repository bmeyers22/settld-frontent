import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let model = this.session.get('authUser.homes').objectAt(params.group_index);
    this.session.setProperties({
      CURRENT_HOME_ID: model.get('id'),
      currentHome: model
    });
    return model;
  }
});
