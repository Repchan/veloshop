import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as cartReducer} from "./slicers/cartSlice";

const reducers = combineReducers({
    cart:cartReducer
})
export const store = configureStore({
    reducer:reducers,
})