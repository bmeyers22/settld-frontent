import Ember from 'ember';
var TransactionForm;

TransactionForm = Ember.Component.extend({
  actions: {
    complete: function() {
      return this.sendAction("complete");
    }
  },
  didInsertElement: function() {
    var self = this;
    this.$('.ui.category.dropdown').dropdown({
      onChange: (function(_this) {
        return function(value) {
          return _this.set('model.category', value);
        };
      })(this)
    });
    this.$('.ui.checkbox.split').checkbox({
      onEnable: (function(_this) {
        return function() {
          return _this.set('model.split', true);
        };
      })(this),
      onDisable: (function(_this) {
        return function() {
          return _this.set('model.split', false);
        };
      })(this)
    });

    this.$('.ui.form').form({
      fields: {
        category: {
          identifier: 'category',
          rules: [
            {
              type: 'empty',
              prompt: 'Please select a category'
            }
          ]
        },
        description: {
          identifier: 'description',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a description'
            }
          ]
        },
        cost: {
          identifier: 'cost',
          rules: [
            {
              type: 'number',
              prompt: 'Please enter a cost'
            }, {
              type: 'gt[0]',
              prompt: 'Please enter a cost'
            }, {
              type: 'lt[1000000]',
              prompt: 'Please enter a cost'
            }
          ]
        }
      },
      onSuccess: function () {
        self.sendAction('complete', self.get('model'));
      },
      onFailure: function () {
        console.log("Fail");
      }
    });
  }
});

export default TransactionForm;
