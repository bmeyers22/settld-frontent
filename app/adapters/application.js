import ActiveModelAdapter from 'active-model-adapter';

var ApplicationAdapter = ActiveModelAdapter.extend({
  host: 'http://app.settld.com',
  namespace: 'api/v1'
});

export default ApplicationAdapter;
