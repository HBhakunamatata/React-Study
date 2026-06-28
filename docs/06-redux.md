# Redux

是React最常用的集中状态管理工具，可以独立于框架运行，通过集中管理的方式管理应用的状态

React之前的组件通信机制，尤其是跨层通信太复杂，所以将数据统一托管到redux上

## 快速体验

为了职责清晰，数据流向明确，redux把数据修改流程分成三个核心概念

- state：一个对象，存放我们管理的数据状态
- action：一个对象 用来描述如何修改数据
- reducer：一个函数 根据action描述实现修改state的操作


1. 定义一个reducer(state, action)函数（根据想要的修改返回一个新的数据）
2. 使用createStore函数传入reducer函数，生成一个store实例对象
3. 使用store实例的subscribe方法订阅数据的变化
4. 使用store实例的dispatch方法提交action对象 触发数据变化（告诉reducer你想如何修改数据）
5. 使用store实例的getState函数获取最新数据

## React + Redux 环境搭建

Redux Toolkit 官方封装的用于简化redux编写的工具集  
react-redux 用来链接redux和react的中间件

npm i @reduxjs/toolkit react-redux

### store目录结构

- src
    - store
        - index.js
        - modules
            - businessStore.js


### counterStore.js

```js
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
```

### store/index.js

```js
import counterReducer from "./modules/counterStore";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(
    {
        reducer: {
            counter: counterReducer
        }
    }
)

export default store
```

### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

### App.js

```js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addToNum } from './store/modules/counterStore';


function App() {

	const { count } = useSelector( state => state.counter )
	const dispatch = useDispatch()

	return (
		<div className="App">
			<button onClick={() => dispatch(decrement())}>-</button>
			{count}
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(addToNum(10))}>addTo10</button>
			<button onClick={() => dispatch(addToNum(20))}>addTo20</button>
    	</div>
	);
}

export default App;
```

## 异步方式

### channelStore.js

```js
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
```

### store/index.js

```js
import counterReducer from "./modules/counterStore";
import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./modules/channelStore";

const store = configureStore(
    {
        reducer: {
            counter: counterReducer,
            channel: channelReducer,
        }
    }
)

export default store
```

### index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
// 导入项目根组件
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

// 把App根组件渲染到页面上 id为root的div上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

### App.js

```js
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addToNum } from './store/modules/counterStore';
import { fetchChannelList } from './store/modules/channelStore';


function App() {

	const { count } = useSelector( state => state.counter )
	const { channelList } = useSelector( state => state.channel )

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchChannelList())
	}, [dispatch])

	return (
		<div className="App">
			<button onClick={() => dispatch(decrement())}>-</button>
			{count}
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(addToNum(10))}>addTo10</button>
			<button onClick={() => dispatch(addToNum(20))}>addTo20</button>

			<br/>

			<ul>
				{channelList.map(item => <li key={item.id}>{item.name}</li>)}
			</ul>
    	</div>
	);
}

export default App;
```