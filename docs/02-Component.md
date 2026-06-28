# 面向组件编程

## 1. Component 

一个组件就是用户界面的一部分，它可以拥有自己的逻辑和外观，组件之间可以相互嵌套，也可以复用多次

例如：Header Main Article Aside Item

React组件：一个首字母大写的函数，内部封装了组件的逻辑和外观，渲染组件就是把组件当成标签书写

```js
function Button() {
  return <button>按钮</button>
}

function App() {
  return (
    <div className="App">
      <Button></Button>
    </div>
  );
}
```

## 2. 组件实例的三大核心属性

### 2.1 State

1. 组件中render方法中的this是组件实例对象（因为是实例直接调用的）
2. 组件自定义的方法中this为undefined（因为不是直接调用，而是事件触发，方法内部默认是strict mode，this为undefined）
3. 如何解决：bind强制绑定；使用赋值+箭头函数
4. state不能直接修改，需要重新传值修改，默认根据传入的新值合并未更新的值


### 2.2 Props

1. props可以借助jsx语法，使用<Person {...object}/>的方式将对象中的数据解析为map传递到组件中，组件自动解析为组件的属性
2. props本身可以通过PropTypes包对传递的props数据的类型、默认值加以限制
3. 


#### 构造器（尽量省略）

- 构造器内部仅作两件事：state初始化（可以写外面） 和 事件处理函数的this绑定（可以使用赋值+箭头函数）
- 如果使用构造器且需要在内部使用this.props，则必须使用super(props)传递数据（小概率事件，直接使用props本身就可以）


## useState

useState 是一个React Hook函数，它允许我们向组件添加一个状态变量，从而控制组件的行为（数据驱动视图）

```js
function Button() {

	function handleClick() {
        # 这个函数触发后，除了修改值，还会触发组件重新渲染
		setCount(count + 1)
	}

	const [count, setCount] = useState(0)
	return <button onClick={handleClick}>{count}</button>
}

function App() {
	return (
		<div className="App">
    		<Button></Button>
    	</div>
	);
}
```

状态函数使用问题

1. 状态值是只读的，只是修改它无法触发组件重新渲染，所以需要使用setState函数替换原值

```js
function Form() {
	const [form, setForm] = useState({
		'name': 'Jack'
	})

	function modifyForm() {
		setForm({
			...form,
			'name': 'Rose'
		})
	}

	return <button onClick={modifyForm}>点击后修改：{form.name}</button>
}


function App() {
	return (
		<div className="App">
			<Form></Form>
    	</div>
	);
}
```

对于列表状态的操作 https://react.dev/learn/updating-arrays-in-state


## 样式控制

class类名控制方式

```js
import './index.css'

function App() {
	return (
		<div className="App">
			<h1 className='red'>Hello React</h1>
    	</div>
	);
}
```

## Other packages

- lodash: 排序
- classNames: 激活class配置


## 受控表单绑定

```js
const [value, setValue] = useState('');

return (
	<div className="App">
		<input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
		<p>{value}</p>
	</div>
);
```


## 获取DOM元素

虽然不推荐直接操作DOM，但有的场景必须获取

const inputRef = useRef(null)

```js
function App() {

	const inputRef = useRef(null);

	const showDom = () => {
		console.dir(inputRef.current);
	}

	return (
		<div className="App">
			<input ref={inputRef} type='text' />
			<button onClick={showDom}>获取DOM</button>
    	</div>
	);
}
```

## Other packages

npm install uuid
npm install dayjs