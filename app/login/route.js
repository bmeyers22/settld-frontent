import Ember from 'ember';

var Login = Ember.Route.extend({
    currentSession: Ember.inject.service(),
    beforeModel(transition) {
        if (this.get('session.isAuthenticated')) {
            this.transitionTo('index');
        }
    },
    actions: {
        registered(uidObj, provider, loginInfo) {
            let user = this.store.createRecord('user', uidObj);
            return user.save().then( (user) => {
                return this.store.createRecord('userSetting', {
                    user: user
                }).save()
            }).then( () => {
                if (provider === 'facebook') {
                    user.set('hasFacebook', true)
                }
                return user.save();
            }).then( () => {
                if (provider === 'password') {
                    this.send('signIn', provider, loginInfo);
                } else {
                    this.transitionTo('register.name');
                }
            })
        },
        signIn(provider, loginInfo) {
            let data = { provider: provider };
            if (loginInfo) {
                $.extend(data, loginInfo);
            }
            this.get('session').open("firebase", data).then( (data) => {
                if (provider !== 'password') {
                    this.get('store').query('user', { orderBy: 'uid', equalTo: data.uid }).then( (users) => {
                        if (users.get('length') > 0) {
                            this.transitionTo('index');
                        } else {
                            this.send('registered', {
                                uid: data.uid
                            }, provider);
                        }
                    })
                } else {
                    this.transitionTo('index');
                }
            });
        },
        signOut: function() {
            this.get('session').close();
        }

    }
});

export default Login
