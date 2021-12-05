import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Router, useHistory , Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login,logout} from '../../redux/login_action'
import store from '../../redux/store'
import axios from'axios'

const NormalLoginForm = () => {
  var arr = [{name:'123',pass:'123'}];
  const history = useHistory()
  const onFinish = (values) => {
    console.log('Received valuess of form: ', values);
    axios.post(`/api/login`,values).then(
      res=>{
          console.log('res=>',res.data); 
          if(res.data=="登录成功"){
            store.dispatch(login())
            console.log('登陆成功',store.getState());
            history.push('/')
          }
          else if(res.data=="登录失败"){
              alert("登录失败，请注册")
          }
      }
  )    
  };

  // const onFinish = (values) =>{
  //   axios.post(`/codf/code`).then((res,err) =>{
  //     if(err){
  //       console.log('出错',err.response.status);
  //     }
  //     console.log(res.status);
  //   })
  // }

  // useEffect(() => {
  //   store.dispatch(logout)
  // })
  return (
    <div className='container'>
      <h1>请登录</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialvaluess={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
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
          <Form.Item name="remember" valuesPropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" >登录
          </Button>
          还没有账号？ <Link to="/register">去注册</Link> or <Link to="/"><span >暂不注册?</span></Link>
          
         
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm