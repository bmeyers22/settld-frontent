import HomesNewView from '../homes/new'

var GetstartedNewView = HomesNewView.extend({
  templateName: 'homes/new',
  actions:
    {createHome: (home) => {
      var controller = this.get('controller');
      controller.saveHome(home);
      return;
    }
});


}export default GetstartedNewView
