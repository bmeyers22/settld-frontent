import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Service.extend({
    pubSub: Ember.inject.service(),
    defaultParams() {
        return {
            flashMessages: [],
            flashMessageType: 'error',
            flashMessageDuration: 3000
        }
    },
    flashParams: null,
    showFlashMessage(params) {
        let properties = _.extend(this.defaultParams(), params);
        Ember.run( () => {
            this.get('pubSub').publish('flashMessage', properties);
        })
    }
});
