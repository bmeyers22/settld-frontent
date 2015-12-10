import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Component.extend({
    errorHandler: Ember.inject.service(),
    firebase: Ember.inject.service(),
    classNames: [
        'signin-container',
        'login'
    ],
    addErrors(errors) {
        this.get('errorHandler').showFlashErrors({
            flashMessages: errors
        });
    },
    loginUser(provider, loginInfo) {
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
        }).catch( (error) => {
            this.addErrors([error.message]);
        });
    },
    actions: {
        signIn(provider) {
            let data;
            if (provider === 'password') {
                data = {
                    email: this.get('identification'),
                    password: this.get('password')
                };
            }
            this.loginUser(provider, data);
        },
        register() {
            let self = this;
            let ref = new Firebase(config.firebase);
            ref.createUser({
                email    : self.get('identification'),
                password : self.get('password')
            }, function(error, userData) {
                if (error) {
                    self.addErrors([error.message]);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    self.sendAction('registered', userData, 'password', {
                        email    : self.get('identification'),
                        password : self.get('password')
                    });
                }
            });
        }
    },
    didInsertElement() {
        var self = this;
        this.$('.ui.form').form({
            on: 'submit',
            inline: true,
            fields: {
                email: {
                    identifier: 'identification',
                    rules: [{
                        type: 'email',
                        prompt: 'Please enter your email'
                    }]
                },
                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: 'Please enter your password'
                    }]
                }
            },
            onSuccess() {
                self.sendAction('login');
            }
        });
    }
});
