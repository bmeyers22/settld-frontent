`import HomesNewView from '../homes/new'`

GetstartedNewView = HomesNewView.extend
  templateName: 'homes/new'
  actions:
    createHome: (home) =>
      controller = @get('controller')
      controller.saveHome home
      return


`export default GetstartedNewView`
