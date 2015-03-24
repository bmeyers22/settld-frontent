`import Ember from 'ember'`

JobsNewController = Ember.ObjectController.extend(
  needs: 'application'
  appController: Ember.computed.alias('controllers.application')
  save: (job) ->
    copy = @store.createRecord('job', job)
    copy.set 'user', job.get('user')
    copy.set 'home', job.get('home')
    if !copy.get('split')
      copy.set 'contributors', Ember.A()
      copy.save()
    else
      copy.save()
)

`export default JobsNewController`
