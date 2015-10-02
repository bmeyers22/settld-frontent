import DS from 'ember-data';
import config from '../config/environment';
import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  host: config.PROXY_URL,
  namespace: 'api/v1'
});
