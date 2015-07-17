import Ember from 'ember';
import Serializable from 'web/mixins/serializable';

export default Ember.Component.extend({
  query: '',
  searchResults: Ember.A(),
  selectedHome: (function() {
    return this.get('controller.selectedHome');
  }
  ).property('controller.selectedHome'),
  canSubmitForm: (function() {
    if (this.get('controller.selectedHome')) { ''; } else { 'disabled'; }
  }
  ).property('controller.selectedHome'),
  onPasswordSubmit: (function() {
    self.$('.ui.form.join-password .field').removeClass('loading');
    self.$('.ui.form.join-password').form('validate form');
    return;
  }
  ).observes('controller.passwordValid'),
  didInsertElement: function() {
    var self = this;
    var controller = this.get('controller');
    this.$('.ui.form.join-password').form({
      password: {
        identifier: 'password',
        rules: [
        {
          type: 'empty',
          prompt: 'Please enter a password.'
        },
        {
          type: 'validPassword[passwordValid]',
          prompt: 'Incorrect password.'
        }]
      }
    }, {
      on: 'blur',
      onInvalid: function() {
        controller.set('passwordValid', true);
      },
      onSuccess: function() {
        self.$('.ui.form.join-password .field').addClass('loading');
        self.sendAction('join');
      }
    });
    this.$('.ui.form.join-password').form('get change event', function(e) {
      console.log(e);
      return;
    });
    return;
  },
  actions: {
    findHomes: function() {
      var self = this;
      this.$('home-results').addClass('loader');
      var controller = this.get("controller");
      console.log(controller);
      controller.set('selectedHome', null);
      $.get('/api/v1/homes/search', { filter: this.get('query') }, function(data) {
        if (data.results.length === 0) {
          self.set('searchResults', Ember.A(null));
        } else {
          var arr = Ember.A();
          _.each(data.results, function(obj) {
            obj.password = '';
            obj.selected = false;
            return arr.pushObject(Ember.Object.extend(Serializable).create(obj));
          });
          self.set('searchResults', arr);
        }
        self.$('home-results').removeClass('loader');
        return;
      });
      return;
    },
    homeSelected: function(home) {
      var controller = this.get("controller");
      console.log(controller);
      var selectedHome = controller.get('selectedHome');
      if (selectedHome) {
        selectedHome.set('selected', false);
        if (selectedHome === home) {
          controller.set('selectedHome', null);
        } else {
          controller.set('selectedHome', home);
          controller.set('selectedHome.selected', true);
        }
      } else {
        controller.set('selectedHome', home);
        controller.set('selectedHome.selected', true);
      }
      return;
    }
  }
});
