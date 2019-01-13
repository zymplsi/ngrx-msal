import { Action } from '@ngrx/store';
import {
  MsalAuthActions,
  MsalAuthActionTypes
} from '../actions/msal-auth.actions';
import { User } from 'msal';

export interface State {
  user: User | null;
  error: string | null;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: MsalAuthActions): State {
  switch (action.type) {
    case MsalAuthActionTypes.Login:
      return { ...state, loading: true, loaded: false };

    case MsalAuthActionTypes.LoginSuccessful:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        ...action.payload
      };

    case MsalAuthActionTypes.Logout:
      return { ...state, ...initialState };

    case MsalAuthActionTypes.LoginFail:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: null,
        ...action.payload
      };
    default:
      return state;
  }
}
