import React, { Component, useState,Fragment} from 'react'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'//导航栏配置
// eslint-disable-next-line
import format from '../../utils/dateUtils'//格式化时间工具
import weatherImg from '../../config/weather_ImgConfig'//天气图片配置
import memoryUtil from '../../utils/memoryUtils'//用户内存工具
import userStorage from '../../utils/storageUtils'//用户本地内存操作工具
import { reqWeather } from '../../api'//请求天气函数
import './index.css'

import { Modal, Button  } from 'antd';

function LogOut(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        userStorage.removeUser();
        memoryUtil.user = {};
        console.log(props.a.history.replace);
        props.a.history.replace('/login')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Fragment>
            <Button type="link" onClick={showModal} /*{className="btn-logout"}*/>
                退出
            </Button>
            <Modal title="消息提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>是否退出登录</p>
            </Modal>
        </Fragment>
    );
}

class Header extends Component {
    state = {
        nowTime: '',
        city: '重庆',
        lives: {}
    }

    getLives = async (city) => {
        const value = await reqWeather(city)
        this.setState({ lives: value.lives[0] })
    }

    getTime = () => {
        setInterval(() => {
            var now = new Date();
            var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); // 2021-01-11
            this.setState({ nowTime: nowStr })
        }, 1000)
    }

    getTitle = () => {
        const pathname = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === pathname) {
                title = item.name;
            } else if (item.children) {
                const flag = item.children.find(cItem => cItem.key === pathname)
                if (flag) title = flag.name;
            }
        })
        return title
    }

    componentDidMount() {
        this.getTime()
        this.getLives(this.state.city)
    }

    render() {
        const { weather } = this.state.lives;
        const { user } = memoryUtil;
        const title = this.getTitle()
        return (
            <div className='Header'>
                <div className="header-top">
                    <span>hello,{user.username}</span>
                    <LogOut a={this.props}/>
                </div>
                <div className="header-bottom">
                    <h2 className="header-bottom-left">{title}</h2>
                    <div className="header-bottom-right">
                        <span>{this.state.nowTime}</span>
                        {weatherImg(weather)}
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)