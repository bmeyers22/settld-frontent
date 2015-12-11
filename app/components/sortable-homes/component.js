import Ember from 'ember';

export default Ember.Component.extend({
    classNames: [
        'ui',
        'grid',
        'sortable',
        'homes'
    ],
    didInsertElement() {
        Sortable.create(this.$()[0], {
            handle: ".column",
            draggable: '.item'
        });
    }
});
