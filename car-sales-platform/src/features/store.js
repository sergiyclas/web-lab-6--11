import {configureStore} from '@reduxjs/toolkit'
import cartReducer from "./cart/cartReducer.js";

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { cart: [] };
        }
        return { cart: JSON.parse(serializedState) };
    } catch (error) {
        console.error("Not able to load state from localStorage", error);
        return { cart: [] };
    }
};

const preloadedState = loadStateFromLocalStorage()

export default configureStore({
    reducer: {
        cart: cartReducer
    },
    preloadedState
})