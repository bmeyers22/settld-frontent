import Ember from 'ember';

var JobForm = Ember.View.extend(
  {attributeBindings: [ 'disabled' ],
  didInsertElement() {},

  actions:
    {createJob(job) {
      var controller = this.get('controller');
      this.$('.dimmer').dimmer('show');
      return controller.saveJob(job).then((job) => {
        this.$('.dimmer').dimmer('hide');
        return controller.transitionToRoute('dashboard');
      });
    }}
});

export default JobForm
