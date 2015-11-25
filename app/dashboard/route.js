import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        window.STORE = this.store;
        window.CURRENT_HOME = this.get('currentSession.currentHome');
        return new Promise( (resolve, reject) => {
            this.store.query('transaction', {
                orderBy: 'home',
                equalTo: this.get('currentSession.currentHome.id')
            }).then( (response) => {
                return resolve({
                    feedList: [
                        this.get('store').peekAll('transaction'),
                        this.get('store').peekAll('job')
                    ]
                })
            });
        });
    }
});
