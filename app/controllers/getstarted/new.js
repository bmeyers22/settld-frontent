import HomesNewController from '../homes/new'

var GetstartedNewController = HomesNewController.extend({saveHome: function(home) {
  var self = this;
  var authUser = this.session.get('authUser');
  return this._super(home).then(function(home) {
    var settings = this.session.get('userSettings');
    settings.set('isUserConfigured', true);
    settings.set('defaultHome', home.get('id'));
    settings.save();
    return;
  });
}}
);

export default GetstartedNewController