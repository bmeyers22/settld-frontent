import Ember from 'ember';

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
    showFlashErrors(params) {
        let properties = _.extend(this.defaultParams(), params);
        Ember.run( () => {
            this.get('pubSub').publish('flashMessage', properties);
        })
    }
});
