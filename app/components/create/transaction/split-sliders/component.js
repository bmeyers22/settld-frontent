import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['split-sliders'],
  actions: {
    updateSliders(contributor, e) {
      let overflow = 1,
        contributors = this.get('contributors');

      contributor.set('percent', +e.target.value);

      contributors.forEach( (c) => {
        overflow -= +c.get('percent').toFixed(2);
      });
      if (overflow !== 0) {
        contributors.filter( (c) => {
          return c !== contributor;
        }).forEach( (item, i, arr) => {
          let change = +(overflow/arr.length).toFixed(2);
          item.set('percent', item.get('percent') + change);
        });
      }
    }
  }
});
