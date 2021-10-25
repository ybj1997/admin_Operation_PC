import React, { Component } from 'react'
import './index.less'

export default class ButtonSlf extends Component {
    render() {
        const props = this.props;
        return (
            <button {...props}></button>
        )
    }
}
