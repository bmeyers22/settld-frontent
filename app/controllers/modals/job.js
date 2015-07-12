import Ember from 'ember'
import ModelDefaults from 'web/services/model-defaults'
import JobNew from '../jobs/new'

var NewJob = JobNew.extend({
  init: function() {

    var model = this._$modelDefaults.getModelType( "job",
      user: this.session.get('authUser'),
      home: this.session.get('currentHome'),
      contributors: Ember.A()
    });

    this.set('model', model);
    return this._super();
  },

  actions:
    {submitModal: function(txn) {
      return this.save(this.get('model'));
    }
});

}export default NewJob
