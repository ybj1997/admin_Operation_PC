import React, { Component } from 'react'
import './login.less'
import logo from './images/草帽海贼团.webp'
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'
import memory from '../../utils/memoryUtils'
import storage from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';



export default class Login extends Component {
    onFinish = async (values) => {
        const { username, password } = values;

        const result = await reqLogin(username, password)
        /* 登陆成功 */
        if(result.status === 0){
            message.success('登陆成功',1)
            memory.user = result.data;
            storage.saveUser(memory.user);
            this.props.history.replace('/admin') 
        }
        /* 登陆失败 */
        else if(result.status === 1){
            message.error('用户名或密码不正确',1)
        }
        //利用asnyc和await简化返回Promis的处理
        // reqLogin(username, password)
        //     .then(
        //         response => console.log(response.data)
        //     )
        //     .catch(
        //         error => console.log(error)
        //     );
    };

    validator = (_, value) => {
        if (!value) return Promise.reject(new Error('输入不能为空！'));
        else if (value.length < 4) return Promise.reject(new Error('长度小于4位'));
        else if (value.length > 14) return Promise.reject(new Error('长度大于14位'));
        else { return Promise.resolve(); }
    }

    render() {
        //检查用户是否登陆，如果有用户信息则自动跳转到登陆完成界面
        const user = storage.getUser();
        if(user._id){
            return <Redirect to='/admin'/>
        }

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
