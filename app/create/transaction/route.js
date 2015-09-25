import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this._$modelDefaults.getModelType( "transaction", {
      user: this.session.get('authUser'),
      home: this.session.get('currentHome')
    });
  }
});
