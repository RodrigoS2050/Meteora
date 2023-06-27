import { createSelector } from '@ngrx/store';
import { AppState } from '../app-state';

const selectAuthState = (state: AppState) => state.auth;

export const selectUsername = createSelector(
  selectAuthState,
  (state) => state.user!.username
);

export const selectEmail = createSelector(
  selectAuthState,
  (state) => state.user!.email
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (state) => state.loggedIn
);
