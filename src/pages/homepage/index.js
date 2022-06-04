import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './index.module.css';
import { Router, useHistory , Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login,logout} from '../../redux/login_action'
import store from '../../redux/store'
import axios from'axios'
import HeaderMenu from '../../components/header';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

const Homepage = () => {
  const history = useHistory()
  
  return (
    <>
    <HeaderMenu/>
    <div className={styles.container}>
      
    
        <div className={styles.header}>
            <Header/>
        </div>
        <div className={styles.content}>
            <Content/>
        </div>
        <div className={styles.footer}>
            <Footer/>
        </div>
    </div>
    </>
  );
};

export default Homepage