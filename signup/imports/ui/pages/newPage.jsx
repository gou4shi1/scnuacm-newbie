import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Meteor } from 'meteor/meteor';

import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import 'antd/lib/button/style';
import 'antd/lib/modal/style';

import NewMemberForm from '../components/newMemberForm';
import Captcha from '../components/captcha';

export class newPage extends Component {
    handleSubmit = () => {
        if (this.captcha.state.success) {
            this.form.validateFieldsAndScroll((err, values) => {
                console.log(values);
                if (!err) {
                    Meteor.call('members.insert', values, (err) => {
                        if (err)
                            Modal.error({
                                title: '报名失败',
                                content: '好像哪里出错了QAQ。。。请稍后重试。。。',
                                onOk: this.props.history.push('/show'),
                            });
                        else
                            Modal.success({
                                title: '报名成功',
                                content: '祝你取得佳绩！',
                                onOk: this.props.history.push('/show'),
                            });
                    });
                }
            });
        }
    };

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <NewMemberForm ref={form => this.form = form} />
                <Captcha ref={captcha => this.captcha = captcha} />
                <br/><Button type="primary" size='large' onClick={this.handleSubmit} >报名</Button>
            </div>
        );
    }
}

export default withRouter(newPage);
