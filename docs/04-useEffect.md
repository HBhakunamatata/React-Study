# useEffect

useEffect是一个React Hook函数，用于在React组件中创建不是由事件（用户操作）引起而是 由渲染本身引起的操作 ，比如发送Ajax请求，修改DOM等

```js
function App() {

	const URL = "http://geek.itheima.net/v1_0/channels";

	const msg = 'Hello React';

	const [list, setList] = useState([]);

	useEffect(() => {
		async function getList() {
			const res = await fetch(URL);
			const jsonRes = await res.json();
			console.log(jsonRes);
			setList(jsonRes.data.channels);
		}
		getList();
	}, []);

	return (
		<div className="App">
			<ul>
				{list.map(item => <li key={item.id}>{item.name}</li>)}
			</ul>
    	</div>
	);
}
```

执行时机

- null: 初始化页面、每次有state变化
- [] : 只是初始化
- [state]: 初始化、依赖项变化时


清除副作用： useEffect函数执行时对外部的操作，需要在组件卸载时清除，防止内存泄漏等问题

