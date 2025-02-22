'use client'

import { Cart, CartItem } from "@/types/logistics";
import { combineReducers } from "redux";

const initialCart: Cart = {
  CartItems: [],
};

export enum CartActions {
  ADD_TO_CART = "ADD_TO_CART",
  UPDATE_CART_ITEM = "UPDATE_CART_ITEM",
  DELETE_CART_ITEM = "DELETE_CART_ITEM"
}

interface AddToCartAction {
  type: CartActions.ADD_TO_CART;
  payload: CartItem;
}

interface UpdateCartItemAction {
  type: CartActions.UPDATE_CART_ITEM;
  payload: CartItem;
}

interface DeleteCartItemAction {
  type: CartActions.DELETE_CART_ITEM;
  payload: CartItem;
}

type CartActionTypes = AddToCartAction | UpdateCartItemAction | DeleteCartItemAction;

const cartReducer = (state = initialCart, action: CartActionTypes): Cart => {
  console.log(action.payload)
  switch (action.type) {     
    case CartActions.ADD_TO_CART:
      if (state.CartItems.some((item) => item.productId === action.payload.productId)) {
        return state;
      }
      return {
        ...state,
        CartItems: [...state.CartItems, action.payload],
      };
      case CartActions.UPDATE_CART_ITEM:
        return {
          ...state,
          CartItems: (state.CartItems || []).map((item) =>
            item.productId === action.payload.productId
              ? { ...item, ...action.payload } // ✅ Merge to preserve existing properties
              : item
          ),
        };
      case CartActions.DELETE_CART_ITEM:
        return {
          ...state,
          CartItems: (state.CartItems || []).filter((item) => item.productId !== action.payload.productId),
        };


    default:
      return state;
  }
};

const initialLoadState = {
  loading: false,
}

const LoaderReducer = (state = initialLoadState, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      } 
    case 'LOADED':
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
    }
}

// Root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  loader : LoaderReducer
});

export default rootReducer;
