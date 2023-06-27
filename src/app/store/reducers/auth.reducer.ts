import { createReducer, on } from '@ngrx/store';
import * as AuthActions from 'src/app/store/actions/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: {
    username: string;
    email: string;
  } | null;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { username, email }) => ({
    loggedIn: true,
    user: { username, email },
  })),
  on(AuthActions.logout, (state) => ({ loggedIn: false, user: null }))
);
