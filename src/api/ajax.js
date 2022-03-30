/*
    用于发送ajax异步请求的函数封装文件
*/

import axios from 'axios'
import {message} from 'antd'

export default  function ajax(url,data={},type='GET'){
    //优化：统一处理请求异常，不在Login组件内每次调用请求错误的trycatch
    return new Promise((resolve, reject)=>{
        let promise;
        if(type === 'GET'){
            promise = axios.get(url, {
                params: data
              })
        }
        else if(type === 'POST'){
            promise = axios.post(url, data)
        }
        promise.then(
            response => resolve(response.data)   
        ).catch(
            error => message.error(error.message,5)
        )
    })
}

