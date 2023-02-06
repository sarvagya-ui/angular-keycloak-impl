import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService):()=> Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak-dpso-dev.apps.cicd.arcus.soprasteria.com',
        realm: 'dpso-keycloak-angular-dev',
        clientId: 'dpso-keycloak-angular-client'
      },
      initOptions:  {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}