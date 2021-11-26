import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Router, Route, useHistory,Link} from 'react-router-dom'
import {login,logout} from '../../redux/login_action'
import store from '../../redux/store'
import axios from'axios'

const NormalLoginForm = () => {

  const history = useHistory()

  const onFinish = (values) => {
    console.log('Received valuess of form: ', values);
    axios.post(`/api/register`,values).then(
      res=>{
          console.log('res=>',res.data); 
          if(res.data=="注册成功"){
            store.dispatch(login())
            console.log('注册成功',store.getState());
            history.push('/')
          }
          else if(res.data=="登录失败"){
              alert("登录失败，请注册")
          }
      }
  )    
  };

  return (
    <div className='container'>
      <h1>请注册</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="passWord"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
          已有账号？ <Link to="/login">去登录</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm