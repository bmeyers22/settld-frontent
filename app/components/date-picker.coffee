`import Ember from 'ember'`

DatePicker = Ember.Component.extend
  classNames: ['date-group', 'date', 'field', 'ui', 'icon', 'input']
  tabindex: 100
  didInsertElement: ->
    self = this
    @$().datepicker(
      autoclose: true
      todayHighlight: true
      todayBtn: true).on 'changeDate', (e) ->
        self.set 'date', $(this).datepicker('getDate')

`export default DatePicker`
