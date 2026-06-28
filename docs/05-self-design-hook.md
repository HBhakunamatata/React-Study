# Self-design Hook

自定义Hook是以use开头的函数，通过自定义Hook函数可以实现 逻辑的封装和复用

原因：state和function的逻辑操作是耦合于页面元素的

解决：自定义Hook

```js
function useToggle() {
	const [status, setStatus] = useState(true);

	function toggle() {
		setStatus(!status);
	}

	return {status, toggle};
}


function App() {

	const {status, toggle} = useToggle()

	return (
		<div className="App">
			{status && <div>this is div</div>}
			<button onClick={toggle}>toggle</button>
    	</div>
	);
}
```

## ReactHook使用规则

1. 只能在组件内或者其他自定义Hook中使用
2. 只能在组件的顶层调用，不能嵌套在if for 或 其他函数中


## 项目实践

### json-server

npm i json-server
npm i axios