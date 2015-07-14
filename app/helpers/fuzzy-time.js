import Ember from 'ember';
let moment = window.moment;

export default Ember.Helper.helper( (params) => { return moment(params[0]).fromNow(); } );
