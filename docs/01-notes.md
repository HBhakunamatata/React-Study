# React

React是Meta公司研发，是一个用于 构建Web和原生交互界面的库

## 1. 为什么不继续使用jquery

1. 原生js操作DOM代码编写繁琐
2. 原生js或jquery直接操作DOM会发生大量重绘重排
3. 代码复用率低（无法模块化、组件化）

## 2. Features

1. 声明式编码
2. 使用虚拟DOM + 优秀的Diffing算法，尽量减少与真实DOM的交互
3. 组件化的开发方式
4. React Native 可以移动端开发

### 2.1 虚拟DOM

VDOM本质上就是一个object，只是属性信息上比真实DOM少很多，但最终会被React转化成真实DOM渲染  
为了降低编码复杂度，React提供jsx（Bibel转义）方式编写虚拟DOM的内容

### 2.2 JSX（JavaScript XML）

1. 不要写引号，引号代表string
2. 可以写JS表达式
3. className
4. 内联样式使用js对象{{}}
5. 虚拟DOM只能有一个Root


## 1. Get Started

```shell
npx create-react-app react-basic
npm start
```

App.js -> index.js -> public/index.html (root div)


## 2. JSX

JSX = JS + HTML 表示在js代码中编写html模板结构，它是react编写UI模板的方式

优势：既可以使用html的声明式模板写法，还可以使用js的可编程能力

```js
function App() {
  return (
    <div className="App">
      this is my first react app
    </div>
  );
}
```

本质：JS的语法拓展，通过解析工具Babel将html语言解析为调用jsx函数的js语言，然后放入浏览器中运行


### 2.1 JSX语法：大括号转义识别

```js
const count = 100;

function getName() {
  return "Jack";
}


function App() {
  return (
    <div className="App">
      this is my first react app
      {/* 1.这是一个string */}
      {' this is a string '}
      {/* 2.这是一个变量 */}
      {count}
      {/* 3.这是一个function调用 */}
      {getName()}
      {/* 4.这是一个方法调用 */}
      {new Date().toLocaleTimeString()}
      {/* 5.这是一个js对象 */}
      <div style={{ color: 'blue' }}>this is object div</div>
    </div>
  );
}
```

注意：大括号里只支持表达式，不能放进入if等语句

### JSX实现列表

```js
let list = [
  { 
    id: 1, name: 'Jack', age: 18
  },
  {
    id: 2, name: 'Rose', age: 19
  },
  {
    id: 3, name: 'Tom', age: 20
  }
]

function App() {
  return (
    <div className="App">
      <ul>
        {list.map(item => (<li key={item.id}>{item.name}-{item.age}</li>))}
      </ul>
    </div>
  );
}
```


### 实现条件渲染

```js
const type = 2
function getImageType() {
  if(type === 1) {
    return <div>我是jpg</div>
  }
  else if(type === 2) {
    return <div>我是png</div>
  }
  else {
    return <div>未知图片类型</div>
  }
}

const isLogin = true;
function App() {
  return (
    <div className="App">
      {isLogin && <h1>欢迎回来！</h1>}
      {isLogin ? <h1>登录成功</h1> : <h1>请登录！</h1>}

      <div>{getImageType()}</div>
    </div>
  );
}
```


### 事件绑定

```js
// function clickHandler() {
//   console.log("你点击了");
// }

// function clickHandler(e) {
//   console.log("你点击了", e);
// }

function clickHandler(name, e) {
  console.log("你点击了", name, e);
}

function App() {
  return (
    <div className="App">
      <button onClick={(e) => clickHandler("Jack", e)}>点击我</button>
    </div>
  );
}
```