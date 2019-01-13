import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsalAuthRoutingModule } from './msal-auth-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromMsalAuth from '../msal-auth/store';
import { EffectsModule } from '@ngrx/effects';
import { MsalAuthEffects } from './store/effects/msal-auth.effects';
import { MsalConfigProvider } from './config/auth-msal.config';
import { LoginPageComponent } from './containers/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    MsalAuthRoutingModule,
    StoreModule.forFeature('msalAuth', fromMsalAuth.reducer),
    EffectsModule.forFeature([MsalAuthEffects])
  ],
  providers : [MsalConfigProvider]
})
export class MsalAuthModule { }
