import React, { Component } from 'react'
import './login.less'
import logo from './images/草帽海贼团.webp'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default class Login extends Component {
    onFinish = (values) => {
        console.log('登陆的用户和密码是：', values);
    };

    validator = (_, value) => {
        if (!value) return Promise.reject(new Error('输入不能为空！'));
        else if (value.length < 4) return Promise.reject(new Error('长度小于4位'));
        else if (value.length > 14) return Promise.reject(new Error('长度大于14位'));
        else { return Promise.resolve(); }
    }

    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"></img>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入你的用户名!' },
                                { max: 12, message: '最大长度不能超过12个字符' },
                                { min: 4, message: '最小长度不能少于4个字符' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '非法输入！' },
                                { whitespace: true, message: '密码中不能带有空格' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="用户名"
                                autoComplete="current-username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ validator: this.validator }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                autoComplete="current-password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div >
        )
    }
}
