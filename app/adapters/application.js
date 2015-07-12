import ActiveModelAdapter from 'active-model-adapter'

var ApplicationAdapter = ActiveModelAdapter.extend({
  namespace: 'api/v1'
});

export default ApplicationAdapter
