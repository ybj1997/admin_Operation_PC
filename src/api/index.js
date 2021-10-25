/*
    包含本项目中所有接口的请求参数函数模块
    其中axios每个函数模块返回的都是promise
*/

import ajax from './ajax'
import cityCode from '../config/adcode'

//key = d6828bd17f775480e5ef6bc8d7e8c3e5;



// export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
export function reqLogin(username, password) {
    return ajax('/login', { username, password }, 'POST')
}

export const reqAddPerson = (user) => ajax('/manage/user/add', user, 'POST')

export const reqWeather = (city) => {
    const findCity = cityCode.find(item => item.city === city)
    const adcode = findCity.adcode;
    return ajax(
        ' https://restapi.amap.com/v3/weather/weatherInfo?key=d6828bd17f775480e5ef6bc8d7e8c3e5',
        { city: adcode },
        'GET')
}

export const reqGetGaretory = (parentId) => 
    ajax(
        '/manage/category/list',
        { parentId },
        'GET')


export const reqAddGetGaretory = ( parentId, categoryName ) => {
    return ajax(
        '/manage/category/add',
        { parentId, categoryName },
        'POST')
}

export const reqUpdateGetGaretory = function( categoryId, categoryName) {
    return ajax(
        '/manage/category/update',
        { categoryId, categoryName },
        'POST')
}
