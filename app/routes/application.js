import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showModal(name, model) {
      return this.render( name, {
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal() {
      return this.disconnectOutlet({
        outlet: "modal",
        parentView: 'application'
      });
    }
  }
});
