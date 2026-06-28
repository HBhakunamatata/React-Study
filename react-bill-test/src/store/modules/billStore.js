
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const billStore = createSlice(
    {
        name: "billStore",
        initialState: {
            billList: []
        },

        reducers: {
            // 同步修改billList方法
            setBillList: (state, action) => {
                state.billList = action.payload
            }

        }

    }
)

// 解构actionCreator函数
const { setBillList } = billStore.actions

// 编写异步函数
const getBillList = () => {
    return async (dispatch) => {
        // 编写异步请求
        const res = await axios.get('http://localhost:8088/ka')
        // console.log(res)
        dispatch(setBillList(res.data))
    }
}

export { getBillList }

// 导出reducer
const reducer = billStore.reducer

export default reducer