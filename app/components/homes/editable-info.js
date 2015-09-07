import HomesEditableSectionView from '../editable-section';

var HomesEditableInfoView = HomesEditableSectionView.extend({
  didInsertElement: function() {
    this._super();
    var self = this;
    this.$('.ui.form').form({
      name:
        {identifier: 'name',
        rules: [ {
          type: 'empty',
          prompt: 'Please give your home a name'
        } ]},
      roommateCount:
        {identifier: 'roommateCount',
        rules: [ {
          type: 'empty',
          prompt: 'How many roommates are you?'
        } ]},
      rentPerMonth:
        {identifier: 'rentPerMonth',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your rent'
          },
          {
            type: 'number',
            prompt: 'Numbers only please'
          },
          {
            type: 'gt[0]',
            prompt: 'Rent should be greater than 0'
          }
        ]}
    }, {
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
  }
});

export default HomesEditableInfoView
