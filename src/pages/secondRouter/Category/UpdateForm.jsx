import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class UpdateForm extends Component {

    constructor(props) {
        super(props);
        const { getFormRef } = this.props;
        getFormRef(this.formRef);
        console.log('传递Ref');
    }
    formRef = React.createRef();
    inputValue = () => {
        const { getInputValue } = this.props;
        const value = this.formRef.current.getFieldValue('updateForm');
        getInputValue(value);
    }

    render() {
        const { currentName } = this.props
        console.log(currentName);
        return (
            <Form
                ref={this.formRef}
            >
                <Form.Item
                    name='updateForm'
                    rules={[
                        { required: true, message: '请输入名称！' },
                    ]}
                    onChange={this.inputValue}
                >
                    <Input
                        placeholder={currentName}
                    />
                </Form.Item>
            </Form>
        )
    }
}
