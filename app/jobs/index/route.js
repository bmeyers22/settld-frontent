import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return new Promise( (resolve, reject) => {
      let users = this.get('currentSession.currentHome.users')
      return resolve({
        home: this.get('currentSession.currentHome'),
        members: users.map((user) => {
          return {
            user: user,
            info: this.store.find('userInfo', {
              orderBy: 'home',
              equalTo: this.get('currentSession.currentHome.id')
            })
          };
        })
      });
    });
  }
});
