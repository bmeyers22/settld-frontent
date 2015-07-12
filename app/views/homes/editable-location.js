import HomesEditableSectionView from './editable-section'

var HomesEditableLocationView = HomesEditableSectionView.extend({didInsertElement: function() {
  this._super();
  this.$('.state-dropdown').dropdown({});
  var self = this;
  this.$('.ui.form').form( { zip:
    {identifier: 'zip',
    rules: [ {
      type: 'empty',
      prompt: 'Please enter your zip code'
    } ]} },
    on: 'blur',
    onValid: function() {
      this.parent().parent().addClass('valid');
      return;
    },
    onInvalid: function() {
      this.parent().parent().removeClass('valid');
      return;
    },
    onSuccess: function() {
      self.send('saveEdit', self.get('content'));
      return;
    },
    onFailure: function() {
      console.log('Invalid form');
      return;
    }
  });
  return;
}}
);

export default HomesEditableLocationView

