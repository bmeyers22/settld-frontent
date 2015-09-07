import Ember from 'ember';

var CreateTransactionRoute = Ember.Route.extend({
  model() {
    return this._$modelDefaults.getModelType( "transaction", {
      user: this.session.get('authUser'),
      home: this.session.get('currentHome')
    });
  }
});

export default CreateTransactionRoute
