import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    classNames: ['payments-bar', 'ui', 'vertical', 'sidebar', 'left', 'dimmable', 'blurring'],
    invoicesSum: Ember.computed('invoices.[]', function () {
        let sum = 0;
        this.get('invoices').forEach( (inv) => {
            sum += inv.get('amount');
        })
        return sum;
    }),
    markInvoicesPaid(invoices) {
        return invoices.map((key) => {
            let inv = this.get('store').peekRecord('invoice', key);
            inv.setProperties({
                paymentPending: true,
                paymentDate: new Date().getTime()
            })
            inv.save();
            return inv;
        });
    },
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
                promises.push(new Promise( (resolve, reject) => {
                    resolve({
                        invoices: this.markInvoicesPaid(invoices)
                    });
                }));
            }
            if (venmoInvoices.length > 0) {
                promises.push(Ember.$.post(`${config.SAUCE_URL}venmo/pay`, {
                    type: "POST",
                    payment: {
                        invoices: venmoInvoices,
                        note: "HEY"
                    },
                    user: this.get('currentSession.authUser.id')
                }));
            }

            Promise.all(promises).then( (values) => {
                this.set('loading', false);
                let invoices = values.map(function (obj) {
                    return obj.invoices;
                }).reduce(function (a, b) {
                    return a.concat(b);
                });
                this.$('.dimmer').dimmer('show');
                this.send('paymentComplete', invoices);
            }).catch(function (error) {
                console.log(error);
            });
        },
        paymentComplete(invoices) {
            setTimeout( () => {
                this.$('.dimmer').dimmer('hide');
                this.sendAction('paymentComplete', invoices);
                this.send('toggleBar');
            }, 700);

        }
    }
});
