// 项目的入口 从这里开始执行
// App.js --> index.js --> public/index.html(root div)

// 导入react核心包
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
