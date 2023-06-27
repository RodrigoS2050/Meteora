import { createSelector } from '@ngrx/store';
import { AppState } from '../app-state';
import { CartState } from '../reducers/cart.reducer';

const selectCartState = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  selectCartState,
  (cartState: CartState) => cartState.items
);

export const selectCartTotalPrice = createSelector(
  selectCartState,
  (cartState: CartState) => cartState.totalPrice
);

export const selectCartQuantity = createSelector(
  selectCartState,
  (cartState: CartState) => cartState.quantity
);
