import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  quantity: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => {
    const existingItemIndex = state.items.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...state.items];
      const existingItem = updatedItems[existingItemIndex];
      const updatedQuantity = existingItem.quantity + item.quantity;

      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: updatedQuantity,
        price: existingItem.price + item.price,
      };

      return {
        ...state,
        items: updatedItems,
        totalPrice: state.totalPrice + item.price * item.quantity,
        quantity: state.quantity + item.quantity,
      };
    } else {
      return {
        ...state,
        items: [...state.items, item],
        totalPrice: state.totalPrice + item.price * item.quantity,
        quantity: state.quantity + item.quantity,
      };
    }
  }),

  on(CartActions.removeFromCart, (state, { itemId }) => {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === itemId
    );

    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];
      if (existingItem.quantity === 1) {
        const updatedItems = state.items.filter((item) => item.id !== itemId);
        return {
          ...state,
          items: updatedItems,
          totalPrice: state.totalPrice - existingItem.price,
          quantity: state.quantity - 1,
        };
      } else {
        const updatedItems = [...state.items];
        const updatedQuantity = existingItem.quantity - 1;
        const updatedPrice =
          existingItem.price - existingItem.price / existingItem.quantity;

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: updatedQuantity,
          price: updatedPrice,
        };

        return {
          ...state,
          items: updatedItems,
          totalPrice:
            state.totalPrice - existingItem.price / existingItem.quantity,
          quantity: state.quantity - 1,
        };
      }
    }
    return state;
  }),
  on(CartActions.resetCart, (state) => {
    return {
      ...state,
      items: [],
      totalPrice: 0,
      quantity: 0,
    };
  })
);
