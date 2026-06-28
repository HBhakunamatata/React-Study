import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const channelStore = createSlice(
    {
        name: "channel",
        initialState: {
            channelList: []
        },
        reducers: {
            setChannel: (state, action) => {
                state.channelList = action.payload
            }
        }
    }
)

// 异步请求部分
const { setChannel } = channelStore.actions

/**
 * 
 * @returns 单独封装一个函数，函数返回值返回异步操作函数，操作函数内部
 * 1. 异步请求数据
 * 2. 调用dispatch让它调用同步action方法将请求的数据传入redux
 */
const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://geek.itheima.net/v1_0/channels")
        dispatch(setChannel(res.data.data.channels))
    }
}

export {fetchChannelList} 

const reducer = channelStore.reducer

export default reducer