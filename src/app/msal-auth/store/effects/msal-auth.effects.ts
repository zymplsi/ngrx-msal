import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  MsalAuthActionTypes,
  LoginSuccessful,
  LoginFail,
  AcquireTokenSilent,
  AcquireTokenPopup
} from '../actions/msal-auth.actions';
import {
  tap,
  map,
  switchMap,
  catchError
} from 'rxjs/operators';
import { MsalAuthService } from '../../services/msal-auth.service';
import { of } from 'rxjs';

@Injectable()
export class MsalAuthEffects {
  @Effect()
  msalAuthLogin$ = this.actions$.pipe(
    ofType(MsalAuthActionTypes.Login),
    switchMap(() =>
      this.msalAuthService.loginPopup().pipe(
        map(id_token => new AcquireTokenSilent()),
        catchError(error => of(new LoginFail({ error })))
      )
    )
  );

  @Effect()
  msalAuthAcquireTokenSilent$ = this.actions$.pipe(
    ofType(MsalAuthActionTypes.AcquireTokenSilent),
    switchMap(() =>
      this.msalAuthService.acquireTokenSilent().pipe(
        map(
          access_token =>
            new LoginSuccessful({ user: this.msalAuthService.user })
        ),
        catchError(error => of(new AcquireTokenPopup()))
      )
    )
  );

  @Effect()
  msalAuthAcquireTokenPopup$ = this.actions$.pipe(
    ofType(MsalAuthActionTypes.AcquireTokenPopup),
    switchMap(() =>
      this.msalAuthService.acquireTokenPopup().pipe(
        map(
          access_token =>
            new LoginSuccessful({ user: this.msalAuthService.user })
        ),
        catchError(error => of(new LoginFail({ error })))
      )
    )
  );

  @Effect({
    dispatch: false
  })
  msalAuthLogout$ = this.actions$.pipe(
    ofType(MsalAuthActionTypes.Logout),
    tap(() => this.msalAuthService.logout())
  );

  constructor(
    private actions$: Actions,
    private msalAuthService: MsalAuthService
  ) {}
}
