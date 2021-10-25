import React, { Component } from 'react'
import { Menu } from 'antd';

import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.css'

const { SubMenu } = Menu;

class Leftnav extends Component {
    constructor(props) {
        super(props);
        this.menuNode = this.getMenuNode(menuList)
    }

    getMenuNode = (menuNode) => {
        const defaultPath = this.props.location.pathname;
        return menuNode.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.name}</Link>
                    </Menu.Item>
                )
            }
            else {
                const cItem = item.children.find(cItem => cItem.key === defaultPath)
                if (cItem) this.openKey = item.key;

                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.name}>
                        {this.getMenuNode(item.children)}
                    </SubMenu>
                )
            }
        })
    }



    render() {
        const defaultPath = this.props.location.pathname;
        const defaultKey = this.openKey;
        return (
            <div className="Left-nav">
                <Link className="Left-nav-header" to='/admin/home'>
                    <img src={logo} alt="logo2" />
                    <h2>管理平台</h2>
                </Link>
                <Menu
                    defaultSelectedKeys={[defaultPath]}
                    defaultOpenKeys={[defaultKey]}
                    mode="inline"
                    theme="dark"
                >
                    {/* <Menu.Item key="/admin/category" icon={<HomeOutlined />}>
                        <Link to="/admin/category">首页</Link>
                    </Menu.Item>

                    <SubMenu key="product" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="/admin/product/product1" icon={<MailOutlined />}>
                            <Link to="/admin/product/product1">品类管理</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/product/product2" icon={<MailOutlined />}>
                            <Link to="/admin/product/product2">商品管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/admin/user" icon={<UserOutlined />}>
                        <Link to="/admin/user">用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/role" icon={<SafetyCertificateOutlined />}>
                        <Link to="/admin/role">角色管理</Link>
                    </Menu.Item>
                    <SubMenu key="chart" icon={<AreaChartOutlined />} title="图形图表">
                        <Menu.Item key="/admin/chart/line" icon={<LineChartOutlined />}>
                            <Link to="/admin/chart/line">线形图</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/chart/bar" icon={<BarChartOutlined />}>
                            <Link to="/admin/chart/bar">柱形图</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/chart/pie" icon={<PieChartOutlined />}>
                            <Link to="/admin/chart/pie">百分比图</Link>
                        </Menu.Item>
                    </SubMenu> */}

                    {
                        this.menuNode
                    }

                </Menu>
            </div>
        )
    }
}

export default withRouter(Leftnav);