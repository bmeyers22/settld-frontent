import Ember from 'ember';
import Serializable from 'web/mixins/serializable';

export default Ember.Component.extend({
  query: '',
  searchResults: Ember.A(),
  selectedHome: false,
  passwordValid: true,
  noSelectedHome: Ember.computed.not('selectedHome'),
  onPasswordSubmit() {
    this.$('.ui.form.join-password .field').removeClass('loading');
    this.$('.ui.form.join-password').form('validate form');
  },
  didInsertElement() {
    var self = this;
    this.$('.ui.search').search({
      apiSettings: {
        url: '/api/v1/homes/search?filter={query}'
      },
      cache: false,
      onSearchQuery() {
        self.$('home-results').addClass('loader');
        self.set('selectedHome', null);
      },
      onResults(data) {
        let arr = [];
        data.results.forEach( (obj) => {
          obj.password = '';
          obj.selected = false;
          arr.push(Ember.Object.extend(Serializable).create(obj));
        })
        self.set('searchResults', arr);
        self.$('home-results').removeClass('loader');
      }
    });
    this.$('.ui.form.join-password').form({
      fields: {
        password: {
          identifier: 'password',
          rules: [
          {
            type: 'empty',
            prompt: 'Please enter a password.'
          }]
        }
      },
      on: 'blur',
      onInvalid(e) {
        console.log(e);
      },
      onSuccess() {
        self.$('.submit.join').addClass('loading');
        self.send('joinHome');
      }
    });
  },
  joinCallback(data) {
    var self;
    self = this;
    if (data.success === true) {
      self.sendAction('joinHome', self.get('selectedHome'));
      self.$('.submit.join').removeClass('loading');
    } else {
      self.set('passwordValid', false);
      self.$('.submit.join').removeClass('loading');
    }
  },
  actions: {
    findHomes() {
      this.$('.ui.search').search('query');
    },
    homeSelected(home) {
      var selectedHome = this.get('selectedHome');
      if (selectedHome) {
        selectedHome.set('selected', false);
        if (selectedHome === home) {
          this.set('selectedHome', null);
        } else {
          this.set('selectedHome', home);
          this.set('selectedHome.selected', true);
        }
      } else {
        this.set('selectedHome', home);
        this.set('selectedHome.selected', true);
      }
      return;
    },
    joinHome() {
      let self = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
        return ($.post('/api/v1/homes/join', {
          home: self.get('selectedHome').serialize()
        }, resolve)).fail(reject);
      }).then(function(data) {
        return self.joinCallback(data);
      });
    },
    cancelJoin() {

    }
  }
});
