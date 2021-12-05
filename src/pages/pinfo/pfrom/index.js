import {
    Form, Button, Layout, Upload, message, Input, Menu, Select, Row, Col, DatePicker,
    Space
} from 'antd';
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
                label="项目名称"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入'
                    }
                ]}
            >
                <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
            </Form.Item>
            <Form.Item
                label="目标金额"
                name="moneyTarget"
                rules={[
                    {
                        required: true,
                        message: '请输入'
                    }
                ]}
            >
                <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
            </Form.Item>
            <Form.Item
                label="申报人姓名"
                name="owner"
                rules={[
                    {
                        required: true,
                        message: '请输入'
                    }
                ]}
            >
                <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
            </Form.Item>
           
            <Form.Item
                label="项目描述"
                name="description"
                rules={[
                    {
                        required: true,
                        message: '请输入'
                    }
                ]}
            >
                <Input.TextArea rows={5} style={{ width: '300px' }} showCount maxLength={100} />
            </Form.Item>
          

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '228px' }}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Pfrom;