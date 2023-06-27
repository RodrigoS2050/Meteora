import { createAction, props } from '@ngrx/store';
import { CartItem } from '../reducers/cart.reducer';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ itemId: string }>()
);

export const resetCart = createAction('[Cart] Finish Purchase');
