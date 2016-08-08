import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['new-home-wrapper'],
    enums: Ember.inject.service('enums'),
    actions: {
        cancel() {
            this.sendAction('cancel');
        }
    },
    didInsertElement() {
        var self = this;
        this.$('.state-dropdown').dropdown({});
        this.$('.why-rent').popup({});
        this.$('.ui.form.new-home').form({
            on: 'blur',
            onSuccess() {
                Ember.run( function () {
                    let action = self.get('home.id') ? 'update' : 'create';
                    self.sendAction(action, self.get('home'));
                })
            },
            onFailure() {},
            fields: {
                name:
                {identifier: 'name',
                rules: [ {
                    type: 'empty',
                    prompt: 'Please give your home a name'
                } ]},
                zip:
                {identifier: 'zip',
                rules: [ {
                    type: 'empty',
                    prompt: 'Please enter your zip code'
                } ]},
                roommateCount:
                {identifier: 'roommateCount',
                rules: [ {
                    type: 'empty',
                    prompt: 'How many roommates are you?'
                } ]},
                rentPerMonth:
                {identifier: 'rentPerMonth',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter your rent'
                    }
                ]},
                password:
                {identifier: 'password',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Please enter a password'
                    },
                    {
                        type: 'length[8]',
                        prompt: 'Your password must be at least 8 characters'
                    }
                ]},
                confirm:
                {identifier: 'confirm',
                rules: [ {
                    type: 'match[password]',
                    prompt: 'Passwords must match'
                } ]
            }
        }
    });
}
});
