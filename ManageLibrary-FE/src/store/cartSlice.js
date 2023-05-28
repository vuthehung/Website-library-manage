import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalQuantity: 0,
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            const existItem = state.itemsList.find((item) => item.id === newItem.id)
            if(existItem) {
                existItem.quantity++
                existItem.totalPrice += newItem.price
            }else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title,
                    author: newItem.author,
                    image_path: newItem.image_path
                })
                state.totalQuantity++
            }
        },
        removeFormCart(state, action) {
            const id = action.payload
            const existingItem = state.itemsList.find((item) => item.id === id)
            if(existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter((item) => item.id !== id)
                state.totalQuantity--
            }else {
                existingItem.quantity--
                existingItem.totalPrice -= existingItem.price
            }
        },
    },
})

export const cartAction = cartSlice.actions
export default cartSlice