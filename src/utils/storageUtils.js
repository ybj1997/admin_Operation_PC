/*
    将登陆信息存储到本地浏览器内存中，用于维持登陆
*/
import store from 'store'

const USERKEY = 'userkey';

const storageUtils = {
    /*保存user*/
    saveUser : function(user){
        // return localStorage.setItem(USERKEY,JSON.stringify(user));
        return store.set(USERKEY,user)
    },
    /*获取user*/
    getUser : function(){
        // return JSON.parse(localStorage.getItem(USERKEY)||'{}');
        return store.get(USERKEY)||{}
    },
    /*移除user*/
    removeUser : function(){
        // localStorage.removeItem(USERKEY);
        store.remove(USERKEY);
    }
}
export default storageUtils