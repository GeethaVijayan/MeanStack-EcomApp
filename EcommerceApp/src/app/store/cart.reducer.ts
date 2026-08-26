import { addToCart, removeFromCart } from './cart.action';
import { createReducer, on } from '@ngrx/store';

export interface CartState {
  items: any[];
  cartsCount: number;
}
export const initialState: CartState = {
  items: [],
  cartsCount: 0,
};

export const cartReducer = createReducer(
  initialState,
  //cartReducer is something we are creating using createReducer function from @ngrx/store. It takes the initial state and a series of on functions that define how the state should change in response to different actions.
  /**
   * Reducer function for handling cart-related actions
   * here taking initial state and defining how the state should change in response to the addToCart action.
   * When the addToCart action is dispatched, the reducer will update the state by adding the new product to the items array and incrementing the cartsCount by 1.
   *here iinside on we have added action and 2 params state and product , state is something previous stae and product is the payload we got from action in props
   */
 
  on(addToCart, (state, { product }) => {
    console.log("inside reducer")
    const existing = state.items.find((item) => item._id === product._id);
    if (existing) {
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }
    return {
      ...state,
      items: [
        ...state.items,
        {
          ...product,
          quantity: 1,
        },
      ],
    };
  }),
);

// on(removeFromCart, (state, { productId }) => ({
//   ...state,
//   items: state.items.filter((item) => item._id !== productId),
//   cartsCount: state.cartsCount - 1,
// }));

// on(addToCart, (state, { product }) => {
//     // Implementation for adding item to cart
//     return{
//         ...state,
//         items: [...state.items, product],
//         cartsCount: state.cartsCount + 1
//     }
// });
