import HomesEditableSectionView from '../editable-section';

var HomesEditableInfoView = HomesEditableSectionView.extend({
  didInsertElement() {
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
      onValid() {
        this.parent().parent().addClass('valid');
        return;
      },
      onInvalid() {
        this.parent().parent().removeClass('valid');
        return;
      },
      onSuccess() {
        self.send('saveEdit', self.get('content'));
        return;
      },
      onFailure() {
        console.log('Invalid form');
        return;
      }
    });
  }
});

export default HomesEditableInfoView
