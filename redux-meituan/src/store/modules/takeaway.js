import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const foodStore = createSlice(
    {
        name: 'food',
        initialState: {
            foodList: [],
            // 激活菜单项下标值
            activeIndex: 0,
            cartList: []
        },
        reducers: {
            setFoodList: (state, action) => {
                state.foodList = action.payload
            },
            changeActiveIndex: (state, action) => {
                state.activeIndex = action.payload
            },
            addCart: (state, action) => {
                const cart = state.cartList.find(item => item.id === action.payload.id)
                if (cart) {
                    cart.count++
                } else{
                    state.cartList.push({...action.payload, count: 1})
                }
            },
            // count增加
            increCount: (state, action) => {
                const foodId = action.payload.id
                const selectFood = state.cartList.find(item => item.id === foodId)
                selectFood.count++
            },
            // count减少
            decreCount: (state, action) => {
                const selectFood = state.cartList.find(item => item.id === action.payload.id)
                if ( selectFood.count > 1) {
                    selectFood.count--
                } 
                else if ( selectFood.count === 1 ) {
                    const newCartList = state.cartList.filter(item => item.id !== action.payload.id)
                    state.cartList = newCartList
                } 
            },
            // 清除购物车
            clearCart: (state, action) => {
                console.log("clear")
                state.cartList = []
            }
        }
    }
)

const { setFoodList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodStore.actions

const fetchFoodList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

const reducer = foodStore.reducer

export { fetchFoodList, changeActiveIndex, addCart, increCount, decreCount, clearCart } 
export default reducer