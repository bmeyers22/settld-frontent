import Ember from 'ember';


export default Ember.Component.extend({
    classNames: ['ui', 'one', 'column', 'invoices', 'grid'],
    gestureAllowed: ['pan'],
    didInsertElement() {
        let self = this;
        this.$('.ui.checkbox')
        .checkbox({
            onChange() {
                return self.send('togglePaymentMethod');
            }
        })
        .addClass(this.get('user.hasVenmo') ? '' : 'disabled');
    },
    actions: {
        togglePaymentMethod() {
            let boolVal = !!this.get('invoice.paymentMethod');
            this.set('invoice.paymentMethod', boolVal ? 0 : 1);
        },
        showOptions() {
            this.$('.content.visible').addClass('hidden');
        },
        hideOptions() {
            this.$('.content.visible').removeClass('hidden');
        },
        remove(invoice) {
            this.sendAcion('remove', invoice)
        }
    }
});
