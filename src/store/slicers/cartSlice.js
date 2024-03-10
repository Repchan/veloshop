// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async function (data) {
        try {
            const response = await fetch("http://localhost:3000/cart/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert(`Додано до корзини`)
                return responseData;
            } else {
                throw new Error("Ошибка");
            }
        } catch (error) {
            // Обрабатываем ошибку и возвращаем её в thunkAPI.rejectWithValue
            throw new Error("Ошибка при отправке запроса: " + error.message);
        }
    }
);

const initialState = {
    cartData: [],
    status: "idle",
    error: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const data = action.payload;
            state.cartData.push(data); //Допилить//Допилить
        },
        deleteFromCart:(state,action)=>{
            state.cartData = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { reducer, actions } = cartSlice;



