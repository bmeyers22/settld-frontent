import HomesNewView from '../homes/new';

export default HomesNewView.extend({
  templateName: 'homes/new',
  actions: {
    createHome: (home) => { this.get('controller').saveHome(home); }
  }
});
