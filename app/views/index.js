import Ember from 'ember';


export default Ember.View.extend({
  didInsertElement: function() {
    $('.main-home-select').dropdown('set value', this.get('controller.model.CURRENT_HOME_ID'));
    $('.groups-bar').sidebar({
      context: $('.global-wrapper')
    });
    $('.user-bar').sidebar({
      context: $('.global-content'),
      dimPage: false,
      defaultTransition: {
        computer: {
          top: 'push'
        },
        mobile: {
          top: 'push'
        }
      }
    });
    $('.global-action-bar').sidebar({
      context: $('.global-content'),
      dimPage: false,
      defaultTransition: {
        computer: {
          top: 'overlay'
        },
        mobile: {
          top: 'overlay'
        }
      }
    });
    // window.WebPullToRefresh.init( {
    //   resistance: 4,
    //   loadingFunction: function() {
    //     return new Promise( function( resolve, reject ) {
    //       if (true) {
    //         resolve();
    //       } else {
    //         reject();
    //       }
    //     });
    //   }
    // });
  }
});
