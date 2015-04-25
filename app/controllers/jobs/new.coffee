`
import Ember from 'ember'
`

JobsNewController = Ember.Controller.extend(
  needs: 'application'
  save: (job) ->
    copy = @store.createRecord('job', job)
    copy.set 'user', job.get('user')
    copy.set 'home', job.get('home')
    copy.save()
)

`export default JobsNewController`
