import React, { Component } from 'react'
import { Card, Table, Space, message, Modal, Button } from 'antd'
import ButtonSlf from '../../../components/ButtonSlf'
import { reqGetGaretory, reqUpdateGetGaretory, reqAddGetGaretory } from '../../../api/index'
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
import './index.less'
import { Fragment } from 'react';
// import { NavLink } from 'react-router-dom'



export default class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.initColumns();
    }
    state = {
        category: [],//一级分类列表
        subCategory: [],//二级分类列表
        loading: false,//加载中标识
        parentId: '0',//一级分类列表标识
        categoryName: '',//二级分类列表名称
        isModalVisible: 0 //对话框显示标识，0--不显示，1--显示添加对话框，2--显示更新对话框
    }

    componentDidMount() {
        // this.getCategory(this.state.parentId);测试
        this.getCategory()
    }
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
                width: '70%'
            },
            {
                title: '操作',
                dataIndex: 'age',
                key: 'age',
                width: '30%',
                render: (text, record, index) => (
                    <Space size="middle">
                        {this.state.parentId === '0' ?
                            <ButtonSlf type="link" onClick={() => (this.showUpdate(record))}>修改分类</ButtonSlf> :
                            <div>
                                <ButtonSlf type="link" onClick={() => (this.deleteProduct(record))}>删除</ButtonSlf>
                                <ButtonSlf type="link" onClick={() => (this.showUpdate(record))}>修改分类</ButtonSlf>
                            </div>
                        }
                        {this.state.parentId === '0' ? <ButtonSlf type="link" onClick={() => { this.getSubCategory(record) }}>查看子分类</ButtonSlf> : null}
                    </Space>
                ),
            },
        ];
    }
    /*显示修改分类对话框*/
    showUpdate = (recordObj) => {
        this.recordObj = recordObj;
        this.setState({ isModalVisible: 2 });
    }
    /*显示添加分类对话框*/
    showAdd = () => {
        this.setState({ isModalVisible: 1 });
    }
    /*取消显示对话框*/
    handleCancel = () => {
        this.setState({ isModalVisible: 0 });
    }
    /* 修改分类 */
    updateCategory = async () => {
        //获取数据
        console.log(this.inputValue);
        const { _id } = this.recordObj;
        const name = this.inputValue
        const { parentId, category, subCategory } = this.state

        if (parentId === '0')//在一级列表中修改品类名称
        {
            if (category.some(item => item.name === name)) {
                message.error('该产品已经存在！')
            } else {
                //隐藏对话框
                this.setState({ isModalVisible: 0 });

                //发送请求

                const result = await reqUpdateGetGaretory(_id, name)
                console.log(result, name, _id);
                if (result.status === 0) {
                    this.getCategory();
                }
            }
        } else {//在二级商品列表中修改分类
            if (subCategory.some(item => item.name === name)) {
                message.error('该商品已经存在！')
            } else {
                //隐藏对话框
                this.setState({ isModalVisible: 0 });

                //发送请求

                const result = await reqUpdateGetGaretory(_id, name)
                console.log(result, name, _id);
                if (result.status === 0) {
                    this.getCategory();
                }
            }
        }
        this.refObj.current.resetFields();
    }
    /*添加分类/商品*/
    addCategory = async () => {
        const { inputValue, categoryName, isValue } = this.addValues;
        const { category, parentId, subCategory } = this.state;
        /*一级分类页面点击添加按钮*/
        if (parentId === '0') {
            if (isValue === false) {
                message.error('您尚未输入商品名称！');
            } else {
                if (categoryName === '0') {
                    //给总分类添加一个一级分类
                    if (category.some(item => item.name === inputValue)) {
                        return message.error('您输入的内容已经存在！');
                    } else {
                        const result = await reqAddGetGaretory('0', inputValue);
                        
                        if (result.status === 0) {
                            this.getCategory();
                        }
                        this.addref.current.resetFields();
                        this.setState({ isModalVisible: 0 });
                    }
                } else {//给某一个一级分类添加子分类
                    let findValueId;//对应Option选项的id
                    for (let x of category) {
                        console.log(x);
                        if (x.name === categoryName) {
                            findValueId = x._id
                        }
                    }
                    const result = await reqAddGetGaretory(findValueId, inputValue);
                    
                    if (result.status === 0) {
                        this.getCategory();
                    }
                    this.addref.current.resetFields();
                    this.setState({ isModalVisible: 0 });
                }
            }
        } else {
            if (isValue === false) {
                message.error('您尚未输入商品名称！');
            } else {
                //给parentId子分类添加商品
                if (subCategory.some(item => item.name === inputValue)) {
                    return message.error('您输入的内容已经存在！');
                } else {
                    const result = await reqAddGetGaretory(parentId, inputValue);
                    if (result.status === 0) {
                        this.getCategory();
                    }
                    this.setState({ isModalVisible: 0 });
                }
            }
        }
    }
    /*删除商品*/
    deleteProduct = (recordObj) => {
    }
    /*获取一级或者二级分类列表（由parentId决定）*/
    getCategory = async () => {
        const { parentId } = this.state;
        this.setState({ loading: true });
        const response = await reqGetGaretory(parentId);
        this.setState({ loading: false });
        if (response.status === 0) {
            const category = response.data;
            if (parentId === '0') {
                this.setState({ category })
            } else {
                this.setState({ subCategory: category });

            }
        } else {
            message.error('获取分类列表失败')
        }

    }
    /*修改parentId为二级分类列表Id*/
    getSubCategory = (recordObj) => {
        const { name, _id } = recordObj;
        this.setState({ parentId: _id, categoryName: name }, () => {
            this.getCategory();
        })

    }
    /*返回一级分类*/
    backFirstCategory = () => {
        this.setState({
            parentId: '0',
            categoryName: '',
            subCategory: []
        })
    }
    render() {
        const { category, loading, subCategory, parentId, categoryName, isModalVisible } = this.state
        const recordObj = this.recordObj || {}
        return (
            <div>
                <Card title={parentId === '0' ? '一级分类列表' : (
                    <Fragment>
                        <span style={{ color: 'rgb(54, 163, 255', cursor: 'pointer' }} onClick={this.backFirstCategory}>一级分类列表</span>
                        <ArrowRightOutlined style={{ margin: '0 10px' }} />
                        <span>{categoryName}</span>
                    </Fragment>
                )}
                    extra={
                        <Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}>添加</Button>
                    }
                    className="card"
                >
                    <Table
                        loading={loading}
                        dataSource={(parentId === '0' ? category : subCategory)}
                        columns={this.columns}
                        rowKey={record => record._id}
                        pagination={{ defaultPageSize: 6, position: 'bottomRight' }}
                        className="table"
                        bordered />;
                </Card>
                {/* 修改分类对话框 */}
                <Modal
                    title="修改分类"
                    visible={isModalVisible === 2 ? true : false}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消">
                    <UpdateForm
                        getInputValue={(value) => this.inputValue = value}
                        getFormRef={(refObj) => this.refObj = refObj}
                        currentName={recordObj.name}
                    />
                </Modal>
                {/* 添加分类对话框 */}
                <Modal
                    title="添加分类"
                    visible={isModalVisible === 1 ? true : false}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消">
                    <AddForm
                        getValues={valuesObj => this.addValues = valuesObj}
                        getAddForm = {addref => this.addref = addref}
                        category={category}
                        categoryName={categoryName}
                        parentId={parentId} />
                </Modal>
            </div>
        )
    }
}
