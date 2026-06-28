import { createSlice } from '@reduxjs/toolkit'

const counterStore = createSlice(
    {
        // 名称
        name: 'counter',
        // 初始状态
        initialState: {
            count: 0
        },
        // reducer操作函数：可以直接修改
        reducers : {
            increment: function (state) {
                state.count++
            },
            decrement: (state) => {
                state.count--
            },
            addToNum: (state, action) => {
                state.count = action.payload  
            },
        }
    }
)

// action对象的操作函数
const {increment, decrement, addToNum} = counterStore.actions

// 获取reducer函数
const counterReducer = counterStore.reducer

// 导出到文件外，提供给其他文件使用
export { increment, decrement, addToNum }
export default counterReducer
