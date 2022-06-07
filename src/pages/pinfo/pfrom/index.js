import {
    Form, Button, Layout, Avatar, message, Input, Menu, Select, Row, Col, DatePicker,
    Space
} from 'antd';
import './index.css'
import store from '../../../redux/store'
import { UserOutlined } from '@ant-design/icons';
import { Link, withRouter, useLocation } from 'react-router-dom'

const Pfrom = (props) => {
    const [form] = Form.useForm();

    //提交按钮
    const handleSubmit = () => {
        form.validateFields().then(
            (fieldsValue) => {

            }
            // console.log(fileList);
        );
    };
    return (
        <div className='pform-form'>
            <div className='head-img'>
                <Avatar size={64} icon={<UserOutlined />}/>
            </div>
            <div className='form-body'>
            <Form
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="用户名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入'
                        }
                    ]}
                    initialValue={store.getState()}
                >
                    <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phoneNum"
                >
                    <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
                </Form.Item>
                <Form.Item
                    label="QQ"
                    name="QQ"
                   
                >
                    <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
                </Form.Item>

                <Form.Item
                    label="自我介绍"
                    name="email"
                    
                >
                    <Input.TextArea rows={5} style={{ width: '300px' }} showCount maxLength={100} />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    
                    <Button type="primary" htmlType="submit" >
                        提交
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}
export default Pfrom;