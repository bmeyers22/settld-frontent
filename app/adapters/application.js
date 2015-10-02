import DS from 'ember-data';
import config from '../config/environment';

export default ActiveModelAdapter.extend({
  host: config.PROXY_URL,
  namespace: 'api/v1'
});
