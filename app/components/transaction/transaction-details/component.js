import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['transaction-details'],
    invoices: [],
    invoicesObserver: Ember.on('init', function () {
        return this.get('transaction.invoices').then((invoices) => {
            this.set('invoices', invoices.map( (inv) => {
                return {
                    user: this.get('store').find('user', inv.get('payer')),
                    data: inv
                }
            }));
        })
    })
});
