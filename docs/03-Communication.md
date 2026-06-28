# Communication

## 1. 父传子

- props可以传递任意类型的数据
- 子组件只能读取不能修改props数据

```js
function Son(props) {
	return (
		<div>接收到数据：{props.name}</div>
	)
}

function App() {

	return (
		<div className="App">
			<Son name="Alice"></Son>
    	</div>
	);
}
```

## 2. 子传父

```js
function Son( { onSendMsg } ) {
	const msg = "msg in son component"
	return (
		<button onClick={() => onSendMsg(msg)}>发送消息</button>
	)
}

function App() {

	const [msg, setMsg] = useState("")

	function handleMsg(msg) {
		console.log("get msg in app component : ", msg);
		setMsg(msg);
	}

	return (
		<div className="App">
			<Son onSendMsg={handleMsg}></Son>
			<p>{msg}</p>
    	</div>
	);
}
```

## 兄弟传兄弟

```js
function ComponentA({ onSendMsg }) {
	const value = 'A';
	return <button onClick={() => onSendMsg(value)}>A发送消息</button>;
}

function CompoenntB({ msg }) {
	return <h2>组件B接收到的消息 {msg}</h2>;
}

function App() {

	const [msg, getMsg] = useState('');

	return (
		<div className="App">
			<ComponentA onSendMsg={getMsg} />

			<CompoenntB msg={msg} />
    	</div>
	);
}
```


## 跨层传输（上级传下级）

```js
import { useState } from 'react';
import { createContext } from 'react';
import { useContext} from 'react';

// 1.
const MsgContext = createContext();

function ComponentA() {
	return (
		<div>
			<ComponentB/>
		</div>
	)
}

function ComponentB() {
    // 3.
	const msg = useContext(MsgContext);
	return (
		<div>
			组件B接收到的消息: {msg}
		</div>
	);
}

function App() {

	const msg = 'Hello React';

	return (
		<div className="App">
            // 2.
			<MsgContext.Provider value={msg}>
				<ComponentA/>
			</MsgContext.Provider>
    	</div>
	);
}
```