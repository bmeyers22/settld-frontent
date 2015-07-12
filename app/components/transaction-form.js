import Ember from 'ember';
var TransactionForm;

TransactionForm = Ember.Component.extend({
  actions: {
    complete: function() {
      return this.sendAction("complete");
    }
  },
  didInsertElement: function() {
    this.$('.ui.category.dropdown').dropdown({
      onChange: (function(_this) {
        return function(value, text) {
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
    return this.form = this.$('.ui.form').form({
      title: {
        identifier: 'title',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a title'
          }
        ]
      },
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
    }, {
      onSuccess: (function(_this) {
        return function() {
          return _this.sendAction('complete', _this.get('model'));
        };
      })(this),
      onFailure: (function(_this) {
        return function() {
          return console.log("Fail");
        };
      })(this)
    });
  }
});

export default TransactionForm;
