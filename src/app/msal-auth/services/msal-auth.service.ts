import { Injectable, Inject } from '@angular/core';
import * as Msal from 'msal';
import { MSAL_TOKEN } from '../config/auth-msal.config';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsalAuthService {
  private userAgentApplication: Msal.UserAgentApplication;

  constructor(@Inject(MSAL_TOKEN) private msalConfig) {
    this.userAgentApplication = new Msal.UserAgentApplication(
      this.msalConfig.client_id,
      null,
      () => {},
      {
        cacheLocation: this.msalConfig.cacheLocation,
        redirectUri: this.msalConfig.redirect_url
      }
    );
  }

  logout() {
    this.userAgentApplication.logout();
  }

  loginPopup() {
    return from(
      this.userAgentApplication.loginPopup(this.msalConfig.consentScopes)
    );
  }

  acquireTokenSilent() {
    return from(
      this.userAgentApplication.acquireTokenSilent(
        this.msalConfig.consentScopes
      )
    );
  }

  acquireTokenPopup() {
    return from(
      this.userAgentApplication.acquireTokenPopup(this.msalConfig.consentScopes)
    );
  }

  get user() {
    return this.userAgentApplication.getUser();
  }
}
