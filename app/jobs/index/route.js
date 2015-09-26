import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return new Promise( (resolve, reject) => {
      let users = this.session.get('currentHome.users')
      return resolve({
        home: this.session.get('currentHome'),
        members: users.map((user) => {
          return {
            user: user,
            info: this.store.queryRecord('userInfo', {
              filter: {
                home: this.session.get('currentHome.id'),
                user: user.id
              }
            })
          };
        })
      });
    });
  }
});
