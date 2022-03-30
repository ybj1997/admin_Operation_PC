import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import storage from './utils/storageUtils'
import memory from './utils/memoryUtils'

//初始渲染页面时，就将本地内存中的用户信息放到memory中
const user = storage.getUser();
memory.user = user;

ReactDOM.render(<App/>,document.getElementById('root'))