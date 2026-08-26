import { Products } from "../models/products";
import {createAction,props} from '@ngrx/store';

export const addToCart = createAction(
    '[Cart] Add',
    props<{product:Products}>()
);

export const removeFromCart = createAction(
    '[Cart] Remove',
    props<{productId:string}>()
);

// export const loadCartSuccess = createAction(
//     '[Cart] Load Success',
//     props<{items:Products[]}>()
// );

// function props<T>(): any {
//     throw new Error("Function not implemented.");
// }
// function createAction(arg0: string, arg1: any) {
//     throw new Error("Function not implemented.");
// }

