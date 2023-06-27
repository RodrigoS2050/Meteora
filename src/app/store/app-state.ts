import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { CartState, cartReducer } from './reducers/cart.reducer';

export interface AppState {
  cart: CartState;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  cart: cartReducer,
  auth: authReducer,
};
