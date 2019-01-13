import { Action } from '@ngrx/store';

export enum MsalAuthActionTypes {
  Login = '[MsalAuth] Login',
  LoginSuccessful = '[MsalAuth] Login Succesful',
  LoginFail = '[MsalAuth] Login Fail',
  AcquireTokenSilent = '[MsalAuth] AcquireTokenSilent',
  AcquireTokenPopup = '[MsalAuth] AcquireTokenPopup',
  Logout = '[MsalAuth] Logout'
}

export class Login implements Action {
  readonly type = MsalAuthActionTypes.Login;
}

export class LoginSuccessful implements Action {
  readonly type = MsalAuthActionTypes.LoginSuccessful;
  constructor(public payload: { user: any }) {}
}

export class LoginFail implements Action {
  readonly type = MsalAuthActionTypes.LoginFail;
  constructor(public payload: { error: any }) {}
}

export class AcquireTokenSilent implements Action {
  readonly type = MsalAuthActionTypes.AcquireTokenSilent;
}

export class AcquireTokenPopup implements Action {
  readonly type = MsalAuthActionTypes.AcquireTokenPopup;
}

export class Logout implements Action {
  readonly type = MsalAuthActionTypes.Logout;
}

export type MsalAuthActions =
  | Login
  | LoginSuccessful
  | LoginFail
  | AcquireTokenPopup
  | AcquireTokenSilent
  | Logout;
