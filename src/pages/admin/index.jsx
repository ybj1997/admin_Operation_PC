import React, { Component } from 'react'
import { Redirect, Route ,Switch} from 'react-router-dom'
import storage from '../../utils/storageUtils'
// import memory from '../../utils/memoryUtils'
import { Layout } from 'antd';
import Header from '../../components/Header'
import Leftnav from '../../components/Left-nav'
import SecondeRouters from '../secondRouter'

import './index.less'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = storage.getUser();
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <Leftnav />
                </Sider>
                <Layout>
                    <Header >{Header}</Header>
                    <Content className="content">
                        <Switch>
                            <Route path='/admin/home' component={SecondeRouters.Home}></Route>
                            <Route path='/admin/category' component={SecondeRouters.Category}></Route>
                            <Route path='/admin/product1' component={SecondeRouters.Product}></Route>
                            <Route path='/admin/user' component={SecondeRouters.User}></Route>
                            <Route path='/admin/role' component={SecondeRouters.Role}></Route>
                            <Route path='/admin/chart/line' component={SecondeRouters.ChartLine}></Route>
                            <Route path='/admin/chart/bar' component={SecondeRouters.ChartBar}></Route>
                            <Route path='/admin/chart/pie' component={SecondeRouters.ChartPie}></Route>
                            <Redirect to='/admin/home'/>
                        </Switch>
                    </Content>
                    <Footer>
                        <span className='footer'>推荐使用谷歌浏览器，可以获得更加页面操作体验</span>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
