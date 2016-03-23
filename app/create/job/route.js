import Ember from 'ember';
import Enums from 'web/enums';

export default Ember.Route.extend({
  categories: Enums.ChoreCategories,
  actions: {
    setTitle(title) {
      this.set('currentModel.job.title', title);
      this.transitionTo('create.job.submit');
    },
    complete(obj) {
      let self = this;
      return this.save(this.get('currentModel.job')).then(function () {
        self.transitionTo('dashboard');
      });
    },
    itemSelected(item) {
      this.set('currentModel.job.category', item.value);
      this.transitionTo('create.job.title');
    }
  },
  model() {
    return {
      job: this._$modelDefaults.getModelType( "job", {
        user: this.get('currentSession.authUser'),
        home: this.get('currentSession.currentHome')
      }),
      categories: this.get('categories')
    }
  },
  save(obj) {
    var copy = this.store.createRecord('job', obj);
    return copy.save();
  }
});
