import Ember from 'ember';
import Serializable from 'web/mixins/serializable';
import config from 'web/config/environment';

export default Ember.Component.extend({
  queryText: '',
  searchResults: Ember.A(),
  selectedHome: false,
  noSelectedHome: Ember.computed.not('selectedHome'),
  onPasswordSubmit() {
    this.$('.ui.form.join-password .field').removeClass('loading');
    this.$('.ui.form.join-password').form('validate form');
  },
  didInsertElement() {
    var self = this;
    this.$('.ui.search').search({
      apiSettings: {
        url: `${config.firebase}homes.json?orderBy="name"&startAt="${this.get('queryText')}"`
      },
      cache: false,
      onSelect() {
          return false;
      },
      onSearchQuery() {
        self.$('home-results').addClass('loader');
        self.set('selectedHome', null);
      },
      onResults(data) {
        let arr = [];
        Object.keys(data).forEach( (key) => {
          let obj = data[key];
          obj.id = key;
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
      onSuccess() {
        self.$('.submit.join').addClass('loading');
        self.send('joinHome');
      }
    });
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
      this.sendAction('joinHome', this.get('selectedHome'));
      this.$('.submit.join').removeClass('loading');
    },
    cancelJoin() {

    }
  }
});
