import Ember from 'ember'

var HomesIndexView = Ember.View.extend({
  didInsertElement: function() {
    return this.$('.add-join.ui.dropdown').dropdown();
  }
});

export default HomesIndexView