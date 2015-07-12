import Ember from 'ember';
import moment from 'moment';

export default Ember.Helper.helper( (params) => { return moment(params[0]).fromNow(); } );
