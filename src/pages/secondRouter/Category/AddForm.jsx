import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'

export default class AddForm extends Component {
    FormRef = React.createRef();

    getValue = () => {
        const { getValues } = this.props
        //获取品类名称
        const categoryName = this.categoryName || '0';
        //获取输入内容
        const inputValue = this.FormRef.current.getFieldValue('addInput')
        getValues({ categoryName, inputValue })
        console.log(categoryName, inputValue);
    }
    UNSAFE_componentWillMount(){
        const {getAddForm}=this.props;
        getAddForm(this.FormRef)
        console.log('addform传递ref',this.FormRef);
    }

    componentDidMount() {
        const { getValues } = this.props
        getValues({ isValue: false })
    }

    render() {
        const { Item } = Form
        const { Option } = Select
        const { category, categoryName ,parentId} = this.props
        console.log(category, categoryName);
        return (
            <Form
                initialValues={{ 'category': categoryName === '' ? '0' : categoryName }}
                ref={this.FormRef}
            >
                {parentId === '0' ? <Item
                    name='category'
                    //自定义校验的使用和获取promise值的方法
                    //自定义校验中获取value的方法
                    rules={[
                        ({ getFieldValue }) => ({
                            validator: async (_, value) => {
                                this.categoryName = value;
                                console.log(getFieldValue('category'))
                                return Promise.resolve(console.log(value))
                            }
                        })
                    ]}
                >
                    <Select >
                        <Option value="0" key='0'>一级分类列表</Option>
                        {category.map(item => {
                            return <Option value={item.name} key={item._id}>{item.name}</Option>
                        })}
                    </Select>
                </Item> : null}    
                <Item
                    name='addInput'
                    rules={[
                        { required: true, message: '请输入名称！' },
                    ]}
                    
                >
                    <Input placeholder="请输入分类名称" onChange={this.getValue}/>
                </Item>
            </Form>
        )
    }
}
