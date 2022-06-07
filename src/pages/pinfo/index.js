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
import ProjectOrder from './projectorder';
import Door from './ConstructionManagement';
import Authentication from './authentication'

const { Header, Content, Footer } = Layout;


function Pinfo(props) {
    function handleClick1() {
        props.history.push("/pinfo/pfrom");
    }
    function handleClick2() {
        props.history.push("/pinfo/projectfrom");
    }
    function handleClick3() {
        // props.history.push("/home");
        props.history.push("/pinfo/porder");
    }
    function handleClick5() {
        props.history.push("/pinfo/authentication");
    }

    //检测是否已登录，如果没登录就爆出消息去登录
    useEffect(() => {
    })


    return (
        <Layout className="layout">
            <HeaderMenu />
            <Content style={{ padding: '0 50px' }}>
                <br />
                <div id="divide" >  </div>
                <div className="layout-pinfo">
                    <Row >
                        <Col span={4}>
                            <div className="img-up-form">
                                <Menu
                                    style={{ width: 150 }}
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline"
                                >
                                    <Menu.Item key="1" onClick={handleClick1}>
                                        个人设置
                                    </Menu.Item>
                                    <Menu.Item key="2" onClick={handleClick3} >
                                        订单管理
                                    </Menu.Item>
                                    <Menu.Item key="3" onClick={handleClick2} >
                                        项目管理 
                                    </Menu.Item>
                                    <Menu.Item key="4" >
                                        财富中心
                                    </Menu.Item>
                                    <Menu.Item key="5" onClick={handleClick5}>
                                        账号认证
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </Col>
                        <Col span={20}>
                            <div className='children'>
                                <Switch>
                                    <Route path="/pinfo/pfrom" component={Pfrom}/>
                                    <Route path="/pinfo/projectfrom" component={ProjectFrom}/>
                                    <Route path="/pinfo/porder" component={ProjectOrder}/>
                                    <Route path="/pinfo/pDoor" component={Door}/>
                                    <Route path="/pinfo/authentication" component={Authentication} />
                                    <Redirect to="/pinfo/pfrom" />
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>)
}

export default withRouter(Pinfo);
