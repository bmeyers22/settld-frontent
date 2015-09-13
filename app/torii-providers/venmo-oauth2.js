import {configurable} from 'torii/configuration';
import Oauth2 from 'torii/providers/oauth2-code';

export default Oauth2.extend({
  name:    'venmo-oauth2',
  baseUrl: 'https://api.venmo.com/v1/oauth/authorize',

  responseParams: ['code'],

  scope:        configurable('scope', 'email'),

  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open: function() {
    return this._super().then(function(authData){
      if (authData.authorizationCode && authData.authorizationCode === '200') {
        // indication that the user hit 'cancel', not 'ok'
        throw new Error('User canceled authorization');
      }

      return authData;
    });
  }
});
