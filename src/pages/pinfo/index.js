import { useEffect, useState, useCallback, useRef } from 'react'
import HeaderMenu from '../../components/header';
import {
    Form, Button, Layout, Upload, message, Input, Menu, Select, Row, Col, DatePicker,
    Space
} from 'antd';
import store from '../../redux/store'
import { withRouter,Router, Link,Route, Redirect, Switch } from 'react-router-dom';
import './index.css'
import Pfrom from './pfrom';
import ProjectFrom from './projectfrom';

const { Header, Content, Footer } = Layout;


function Pinfo(props) {
    function handleClick1() {
        props.history.push("/pinfo/pfrom");
    }
    function handleClick2() {
        props.history.push("/pinfo/projectfrom");
    }
    function handleClick3() {
        props.history.push("/home");
    }

    //检测是否已登录，如果没登录就爆出消息去登录
    useEffect(() => {
        if (store.getState() !== 1) {
            console.log('未登录')
            alert('未登录，请先登录')
            props.history.push('/login')
        }
    })


    return (
        <Layout className="layout">
            <HeaderMenu />
            <Content style={{ padding: '0 50px' }}>
                <br />
                <div id="divide" >  </div>
                <div className="site-layout-content">
                    <Row >
                        <Col span={4}>
                            <div className="img-up-form">
                                <Menu
                                    style={{ width: 256 }}
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline"
                                >
                                    <Menu.Item key="1" >
                                    <Link to="/pinfo/pfrom">个人设置</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" >
                                        订单管理
                                    </Menu.Item>
                                    <Menu.Item key="3"  >
                                    <Link to='/pinfo/projectfrom'>项目管理 </Link>
                                    </Menu.Item>
                                    <Menu.Item key="4" >
                                        财富中心
                                    </Menu.Item>
                                    <Menu.Item key="5" >
                                        消息中心
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Col>
                        <Col span={20}>
                        <Switch>
							<Route path="/pinfo/pfrom" component={Pfrom}/>
							<Route path="/pinfo/projectfrom" component={ProjectFrom}/>
							<Redirect to="/pinfo/pfrom"/>
						</Switch>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>)
}

export default withRouter(Pinfo);
