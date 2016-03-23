import Ember from 'ember';

export default Ember.Component.extend({
    firebase: Ember.inject.service(),
    errorHandler: Ember.inject.service(),
    hasPublicProfile: Ember.computed('user.settings.hasPublicProfile', function () {
        return this.get('user.settings.hasPublicProfile') ? 'checked' : '';
    }),
    privacyLabel: Ember.computed('user.settings.hasPublicProfile', function () {
        return this.get('user.settings.hasPublicProfile') ? 'Public' : 'Private';
    }),
    passwordForm: {
        oldPassword: '',
        newPassword: '',
        passwordConfirm: ''
    },
    userObserver: Ember.observer(
        'user.firstName',
        'user.lastName',
        'user.age'
        , function () {
            this.sendAction('updateUserInfo', this.get('user'));
        }),
        initForm() {
            Ember.run.next( () => {
                this.$('.ui.form').form({
                    on: 'submit',
                    fields: {
                        oldPassword: {
                            identifier: 'oldPassword',
                            rules: [{
                                type: 'empty'
                            }]
                        },
                        newPassword: {
                            identifier: 'newPassword',
                            rules: [{
                                type: 'empty'
                            }]
                        },
                        passwordConfirm: {
                            identifier: 'passwordConfirm',
                            rules: [{
                                type: 'match[newPassword]'
                            }]
                        }
                    }
                });
            });
        },
        changePassword() {
            this.get('firebase').changePassword({
                email       : this.get('user.email'),
                oldPassword : this.get('passwordForm.oldPassword'),
                newPassword : this.get('passwordForm.newPassword')
            }, (error) => {
                if (error === null) {
                    this.get('errorHandler').showFlashMessage({
                        flashMessages: ['Password changed successfully'],
                        flashMessageType: 'success'
                    });
                    this.send('closeChangePassword');
                } else {
                    this.get('errorHandler').showFlashMessage({
                        flashMessages: [error.message],
                        flashMessageType: 'error'
                    });
                }
            });
        },
        actions: {
            connect() {
                this.sendAction('connect');
            },
            closeChangePassword() {
                this.set('editingPassword', false);
                this.get('passwordForm').setProperties({
                    oldPassword: '',
                    newPassword: '',
                    passwordConfirm: ''
                })
            },
            changePassword() {
                if (this.$('.ui.form').form('is valid')) {
                    this.changePassword();
                }
            },
            editPassword() {
                this.set('editingPassword', true);
                this.initForm();
            }
        },
        didInsertElement() {
            let self = this;
            this.$('.ui.toggle.checkbox').checkbox({
                onChange() {
                    Ember.run(() => {
                        self.sendAction('togglePrivacy');
                    })
                }
            });
        }
    });
