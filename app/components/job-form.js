import Ember from 'ember'

var JobForm = Ember.View.extend(
  {attributeBindings: [ 'disabled' ],
  didInsertElement: function() {},

  actions:
    {createJob: function(job) {
      var controller = this.get('controller');
      this.$('.dimmer').dimmer('show');
      return controller.saveJob(job).then((job) => {
        this.$('.dimmer').dimmer('hide');
        return controller.transitionToRoute('dashboard');
      });
    }}
});

export default JobForm
