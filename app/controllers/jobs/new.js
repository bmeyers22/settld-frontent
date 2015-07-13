
import Ember from 'ember';


var JobsNewController = Ember.Controller.extend(
  {needs: 'application',
  save: function(job) {
    var copy = this.store.createRecord('job', job);
    copy.set('user', job.get('user'));
    copy.set('home', job.get('home'));
    return copy.save();
  }}
);

export default JobsNewController
