import Ember from 'ember';
import Enums from 'web/enums';
import formatMoney from 'accounting/format-money';
import unformat from 'accounting/unformat';

export default Ember.Route.extend({
  categories: Enums.TransactionCategories,
  model() {
    let self = this;
    return Ember.Object.extend({
      transaction: this._$modelDefaults.getModelType( "transaction", {
        user: this.get('currentSession.authUser'),
        home: this.get('currentSession.currentHome')
      }),
      categories: this.get('categories'),
      currencyValue: Ember.computed('currentModel.transaction.cost', {
        get(key) {
          let val = self.get('currentModel.transaction.cost');
          if (!val) {
            return val;
          } else {
            return formatMoney(val);
          }
        },
        set(key, value) {
          let val = value ? unformat(value) : value
          self.set('currentModel.transaction.cost', val);
          return formatMoney(value);
        }
      })
    }).create();
  },
  save(obj) {
    var copy = this.store.createRecord('transaction', obj);
    return copy.save().then( transaction => {
      if (transaction.get('contributors.length') > 0) {
        return this.createInvoices(transaction);
      }
    });
  },
  createInvoices(transaction) {
    let proms = [];
    this.get('currentSession.currentHome.users').forEach( (user) => {
      let contributor = transaction.get('contributors').find( (c) => {
        return c.user === user.id;
      })
      let amount = +(transition.get('cost') * contributor.percent).toFixed(2);
      proms.push(this.createInvoice(transaction, amount, user));
    })
    return Promise.all(proms);
  },
  createInvoice(transaction, amount, user) {
    return this.get('store').createRecord('invoice', {
      transaction: transaction,
      amount: amount,
      home: this.get('currentSession.currentHome'),
      payer_id: user.get('id'),
      payee_id: this.get('currentSession.authUser.id')
    }).save()
  },
  actions: {
    setTitle(title) {
      this.set('currentModel.transaction.title', title);
      this.transitionTo('create.transaction.submit');
    },
    setCost(cost) {
      this.set('currentModel.transaction.cost', cost);
      this.transitionTo('create.transaction.title');
    },
    split(val) {
      this.set('currentModel.transaction.split', true);
      this.set('currentModel.contributors', this.get('currentModel.transaction.home.users').map( (user, index, arr) => {
        return Ember.Object.extend({
          total: this.get('currentModel.transaction.cost'),
          user: user,
          percent: +(1 / arr.get('length')).toFixed(2),
          amount: Ember.computed('percent', function () {
            return this.get('percent') * this.get('total');
          })
        }).create();
      }));
      this.transitionTo('create.transaction.split');
    },
    goBack(model) {
      model.set('contributors', null);
      this.transitionTo('create.transaction.submit');
    },
    complete() {
      let self = this;
      return this.save(this.get('currentModel.transaction')).then(function () {
        self.transitionTo('dashboard');
      });
    },
    completeWithSplit() {
      let self = this;
      this.set('currentModel.transaction.contributors', this.get('currentModel.contributors').map( (obj, index, arr) => {
        return {
          user: obj.get('user.id'),
          percent: obj.get('percent')
        }
      }));
      this.send('complete')
    },

    itemSelected(item) {
      this.set('currentModel.transaction.category', item.value);
      this.transitionTo('create.transaction.title');
    }
  }
});
