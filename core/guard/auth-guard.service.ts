import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import {KeycloakService} from "../auth/keycloak.service";


@Injectable()
export class AuthGuardService implements CanActivate{

    constructor( public router: Router, private keycloakService: KeycloakService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        let url: string = state.url;
        return this.checkLogin( url );
    }


    checkLogin( url: string ): boolean {
        if ( KeycloakService.auth.loggedIn && KeycloakService.auth.authz.authenticated ) {
            return true;
            
        } else {
            KeycloakService.login();
            return false;
        }
    }



}
