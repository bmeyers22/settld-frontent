import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'application',
    saveHome(obj) {
        let self = this,
        home = this.store.createRecord('home', obj),
        authUser = this.get('currentSession.authUser'),
        prom = new Promise(function(resolve, reject) {
            home.get('users').pushObject(authUser);
            home.save().then(function(home) {
                authUser.get('homes').pushObject(home);
                authUser.save();
                return resolve(home);
            }, function(error) {
                reject(error);
            });
        });
        prom.then((home) => {
            let options = {
                home: home,
                users: {}
            }
            options.users[this.get('currentSession.authUser.id')] = {
                score: 0,
                balance: 0,
                choresToDo: 0
            }
            return this.store.createRecord('groupInfo', options).save();
        }).then((groupInfo) => {
            home.set('groupInfo', groupInfo);
            home.save();
        });
        prom.then(function(home) {
            self.get('target').send('saveHome', home);
        });
        return prom;
    },
    actions: {
        createHome(home) {
            this.saveHome(home);
        }
    }
});
