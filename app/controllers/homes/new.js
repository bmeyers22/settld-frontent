import Ember from 'ember'

var HomesNewController = Ember.Controller.extend(
  {needs: 'application',
  saveHome: function(home) {
    var self = this;
    var authUser = this.session.get('authUser');
    var prom = new (Ember.RSVP.Promise(function(resolve, reject) {
      home.get('users').then(function(users) {
        users.pushObject(authUser);
        home.save().then( (function(home) {
          authUser.get('homes').then(function(homes) {
            if (this.session.get('currentHome')) {
              self.makeHomeDefault(home);
            }
            homes.pushObject(home);
            authUser.save();
            return;
          });
          resolve(home);
          return;
        }
        ), function(error) {
          reject(error);
          return;
        }
        );
        return;
      });
      return;
    })
    );
    prom.then(function(home) {
      self.get('target').send('saveHome');
      return;
    });
    return prom;
  },
  makeHomeDefault: function(home) {
    this.session.set('currentHome', home);
    this.session.set('CURRENT_HOME_ID', this.session.get('currentHome').get('id'));
    return;
  },
  actions: {saveHome: function(home) {
    this.saveHome(home);
    return;
  }}
});

export default HomesNewController
