import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

import * as Keycloak from 'keycloak-js';    // imp!

@Injectable()
export class KeycloakService {

  static auth: any = {};
  static redirectUrl: string;

  static init(): Promise<any> {
    let keycloakAuth: any = Keycloak('./assets/keycloak.json');
    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth.init({onLoad: 'check-sso'})
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.registerUrl = KeycloakService.auth.authz.createRegisterUrl();
          KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/" + environment.keycloakRealm + "/protocol/openid-connect/logout?redirect_uri=" + environment.baseUrl + "/index.html";

          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  static logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.authz.logout({redirectUri: KeycloakService.auth.logoutUrl});
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
  }

  static login() {
    KeycloakService.auth.authz.login();
  }

  static getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }

  static isLogged(): boolean {
    return KeycloakService.auth.authz != null && KeycloakService.auth.authz.authenticated;
  }

  static createRegisterUrl() {
    return KeycloakService.auth.registerUrl;
  }
}
