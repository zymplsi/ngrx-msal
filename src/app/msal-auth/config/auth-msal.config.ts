import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const MSAL_TOKEN = new InjectionToken<Object>('msal-auth-config');


export const MSAL_CONFIG = {
  redirect_url: environment.redirect_url,
  client_id: environment.client_id,
  consentScopes: environment.consentScopes,
  protectedResourceMap: environment.protectedResourceMap,
  cacheLocation: environment.cacheLocation
};

export const MsalConfigProvider = [
  {
    provide: MSAL_TOKEN,
    useValue: MSAL_CONFIG
  }
];
