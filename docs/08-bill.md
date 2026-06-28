# Bill

## 别名路径配置

使用@代替src路径，避免文件路径移动导致找不到

1. webpack配置：craco插件，将@/解析为src/

安装craco插件

```shell
npm i -D @craco/craco
```

修改启动命令

```json
{
    "scripts": {
        "start": "craco start",
        "build": "craco build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
}
```

```js
const path = require('path')

module.exports = {
    // webpack配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 所在路径
            '@': path.resolve(__dirname, 'src')
        }
    }
}
```

2. vscode配置：jsconfig.json 让Vscode识别@，并联想src目录

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    }
}
```


## 数据Mock实现

在开发环境添加json-server

```shell
npm i -D json-server
```

在src并行目录中新建server，并在server中添加data.json

```json
{
  "ka": [
    {
      "type": "pay",
      "money": -99,
      "date": "2022-10-24 10:36:42",
      "useFor": "drinks",
      "id": 1
    }
  ]
}
```

在package.json的script段中添加server命令

```json
{
    "scripts": {
        "start": "craco start",
        "build": "craco build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "server": "json-server ./server/data.json --port 8088"
    },
}
```

运行命令，并在浏览器使用http://localhost:8088/ka请求

```shell
npm run server
```