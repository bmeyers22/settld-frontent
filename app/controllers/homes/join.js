import Ember from 'ember';
var HomesJoinController;

HomesJoinController = Ember.Controller.extend({
  selectedHome: null,
  passwordValid: true,
  finishRouteName: 'homes',
  isHomeSelected: (function() {
    if (!this.get('selectedHome')) {
      return 'disabled';
    } else {
      return false;
    }
  }).property('selectedHome'),
  onJoinSuccess: function(data) {
    var self;
    self = this;
    if (data.success === true) {
      self.store.find('home', self.get('selectedHome._id')).then(function(home) {
        var settings;
        self.session.set('currentHome', home);
        self.session.set('CURRENT_HOME_ID', self.session.get('currentHome').get('id'));
        home.get('users');
        settings = self.session.get('userSettings');
        settings.set('isUserConfigured', true);
        settings.set('defaultHome', home.get('id'));
        settings.save();
        self.transitionToRoute(self.get('finishRouteName'));
      });
    } else {
      self.set('passwordValid', false);
    }
  },
  actions: {
    joinHome: function() {
      return new Ember.RSVP.Promise((function(_this) {
        return function(resolve, reject) {
          return ($.post('/api/v1/homes/join', {
            home: _this.get('selectedHome').serialize()
          }, resolve)).fail(reject);
        };
      })(this)).then((function(_this) {
        return function(data) {
          return _this.onJoinSuccess(data);
        };
      })(this));
    }
  }
});

export default HomesJoinController;
