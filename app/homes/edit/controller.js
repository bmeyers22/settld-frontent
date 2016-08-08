import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        updateHome: function (home) {
            let self = this;
            home.save().then( function (home) {
                self.get('target').send('homeUpdated', home);
            });
        },
        cancel: function () {
            this.get('target').send('homeUpdateCancelled');
        }
    }
});
