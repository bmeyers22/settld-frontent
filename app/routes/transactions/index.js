import Ember from 'ember';

var TransactionsIndexRoute = Ember.Route.extend({
  model(params) {
    return new Promise( (resolve, reject) => {
      this.session.get('currentHome.users').then((users) => {
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
    });
  }
});

export default TransactionsIndexRoute
