import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMsalAuth from '../index';

export const getMsalState = createFeatureSelector<fromMsalAuth.State>('msalAuth');

export const getUser = createSelector(
  getMsalState,
  (state: fromMsalAuth.State) => state.user
);

export const getError = createSelector(
  getMsalState,
  (state: fromMsalAuth.State) => state.error
);
