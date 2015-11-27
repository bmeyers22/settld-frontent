import Ember from 'ember';
import Enums from 'web/enums';


export default Ember.Component.extend({
  audienceScope: Enums.FeedAudienceScope.Me,
  ENUMS: Enums,
  sortProp: ['date:desc'],
  feed: Ember.computed('feedList.[]', function () {
    let arr = Ember.A();
    this.get('feedList').forEach((list) => {
      arr.pushObjects(list.toArray());
    })
    return arr;
  }),
  stream: Ember.computed.sort('feed', 'sortProp'),
  hasStream: Ember.computed('stream', function() {
    return this.get('stream.length') > 0;
  }),
  actions:{
    changeAudience(num) {
      this.set('audienceScope', num);
    },
    openActionBar(model) {
      this.sendAction('openActionBar', model);
    }
  }
});
