# Router

一个路径path对应一个组件component
当我们在浏览器访问一个path时，path对应的组件会在页面上渲染

## 环境搭建

```shell
npm i react-router-dom
```

## 1. 抽象路由模块

先在page/下创建两个页面组件Article和Login

在page/Article下创建index.js

```js
const Article = () => {

    return (
        <div>
            我是文章页
        </div>
    )
}

export default Article
```

在page/Login下创建index.js

```js
const Login = () => {

    const navigate = useNavigate()

    return (
        <div>
            我是登录页
        </div>
    )
}

export default Login
```

在router/下创建index.js

```js
import Login from '../page/Login'
import Article from '../page/Article'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/article/:id/:name',
            element: <Article/>
        }
    ]
)

export default router
```

/index.js添加RouterProvider

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
```

## 路由导航跳转+传参

应用：导航栏

path传参

```js
const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/article/:id/:name',
            element: <Article/>
        }
    ]
)

export default router
```

```js
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    return (
        <div>
            我是登录页
            <Link to="/article">跳转到文章页</Link>
            <button onClick={() => navigate("/article")}>跳转到文章页</button>
            <button onClick={() => navigate("/article?name=hanssb&id=123")}>query跳转到文章页</button>
            <button onClick={() => navigate("/article/123/hfd")}>path跳转到文章页</button>
        </div>
    )
}

export default Login
```

```js
const Article = () => {

    // const [searchParams] = useSearchParams()
    // const id = searchParams.get('id')
    // const name = searchParams.get('name')

    const params = useParams()
    const id = params.id
    const name = params.name

    return (
        <div>
            我是文章页,参数有name={name}, id={id}
        </div>
    )
}

export default Article
```


## 嵌套路由

- 在router中使用children属性配置路由嵌套关系
- 使用<Outlet>组件在嵌套页面中配置二级路由渲染位置


