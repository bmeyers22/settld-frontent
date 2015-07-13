import Ember from 'ember';

var DatePicker = Ember.Component.extend({
  classNames: ['date-group', 'date', 'field', 'ui', 'icon', 'input'],
  tabindex: 100,
  didInsertElement: function() {
    var self = this;
    return this.$().datepicker(
      {autoclose: true,
      todayHighlight: true,
      todayBtn: true}).on( 'changeDate', function(e) {
        return self.set('date', $(this).datepicker('getDate'));
      }
      );
  }
});

export default DatePicker
