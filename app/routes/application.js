import Ember from 'ember'

var Application = Ember.Route.extend({

  actions:
    {showModal: function(name, model) {
      return this.render( name,
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal: function() {
      return this.disconnectOutlet({
        outlet: "modal",
        parentView: 'application'
      });
    }
});

}export default Application
