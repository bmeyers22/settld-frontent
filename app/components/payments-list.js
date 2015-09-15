import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payments-bar', 'ui', 'vertical', 'sidebar', 'left', 'dimmable', 'blurring'],
  invoicesSum: Ember.computed('invoices.[]', function () {
    let sum = 0;
    this.get('invoices').forEach( (inv) => {
      sum += inv.get('amount');
    })
    return sum;
  }),
  didInsertElement() {
    this.$().sidebar({
      context: $('.global-wrapper'),
      dimPage: false,
      defaultTransition: {
        computer: {
          left: 'overlay'
        },
        mobile: {
          left: 'overlay'
        }
      }
    });
  },
  didRender() {
    this.$('.popup').popup({
      position: 'bottom right'
    });
  },
  actions: {
    toggleBar() {
      this.$().sidebar('toggle');
    },
    removeInvoice(inv) {
      this.sendAction('removeInvoice', inv);
    },
    sendPayment() {
      let self = this;
      this.set('loading', true);
      let invoices = this.get('invoices')
        .filter( i => !i.get('paymentMethod') )
        .map((inv) => {
          return inv.get('id');
        }),
        venmoInvoices = this.get('invoices')
        .filter( i => i.get('paymentMethod') )
        .map((inv) => {
          return inv.get('id');
        }),
        promises = [];

      if (invoices.length > 0) {
        promises.push($.post( '/api/v1/pay', {
          type: "POST",
          payment: {
            invoices: invoices,
            note: "HEY"
          }
        }));
      }
      if (venmoInvoices.length > 0) {
        promises.push($.post( '/api/v1/venmo/pay', {
          type: "POST",
          payment: {
            invoices: venmoInvoices,
            note: "HEY"
          }
        }));
      }

      Promise.all(promises).then(function (values) {
        self.set('loading', false);
        let invoices = values.map(function (obj) {
          return obj.invoices;
        }).reduce(function (a, b) {
          return a.concat(b);
        });
        self.$('.dimmer').dimmer('show');
        setTimeout(function () {
          self.$('.dimmer').dimmer('hide');
          self.send('paymentComplete', invoices);
          self.send('toggleBar');
        }, 700);
      }).catch(function (error) {
        console.log(error);
      });
    },
    paymentComplete(invoices) {
      this.sendAction('paymentComplete', invoices);
    }
  }
});
