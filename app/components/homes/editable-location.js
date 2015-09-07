import HomesEditableSectionView from '../editable-section';

var HomesEditableLocationView = HomesEditableSectionView.extend({
  didInsertElement() {
    this._super();
    this.$('.state-dropdown').dropdown({});
    var self = this;
    this.$('.ui.form').form({
      zip: {
        identifier: 'zip',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your zip code'
        }]
      }
    }, {
      on: 'blur',
      onValid() {
        this.parent().parent().addClass('valid');
          },
      onInvalid() {
        this.parent().parent().removeClass('valid');
          },
      onSuccess() {
        self.send('saveEdit', self.get('content'));
          },
      onFailure() {
        console.log('Invalid form');
          }
    });
  }
});

export default HomesEditableLocationView
