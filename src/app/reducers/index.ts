import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMsalAuth from '../msal-auth/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  msalAuth: fromMsalAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  msalAuth: fromMsalAuth.reducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['msalAuth'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
