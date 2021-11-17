
import './App.css';
import { Router, Route, browserHistory,Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Listli from './components/Listli';
const { Header, Content, Footer } = Layout;


function App() {
  return (
    <Layout className="layout">
      <div className='topText'>

        <div className='topText-child'>联系我们</div>
        <div className='topText-child'>关于我们</div>
        <div className='topText-child'>客服热线</div>
      </div>
      <Header>
        <div className='header'>
        <div className="logo" ><img src='众筹.png' style={{ height: '83px' }} alt="es-lint want to get" /></div>
        <Menu mode="horizontal" defaultSelectedKeys={['0']}>

          {/* {new Array(5).fill(null).map((_, index) => {
          const key = index + 1;
          return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
        })} */}
          <Menu.Item key={0}>首页</Menu.Item>
          <Menu.Item key={1}>产品众筹</Menu.Item>
          <Menu.Item key={2}>历史项目</Menu.Item>
          <Menu.Item key={3}><Button >发起众筹</Button></Menu.Item>

        </Menu>
        <div className='loginOrRegister'>
          <div className='login' ><Link to="/login" >登录</Link></div> \
          <div className='register'><Link to="/register" >注册</Link></div>
        </div>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <div className="front-img">
            <img src='首页大图.png' alt='nothing' className='imgOfFront'></img>
          </div>

          <br />
          <br />
          <div className="front-num">
            <div className="site-statistic-demo-card">
              <Row gutter={8}>
                <Col span={6}>
                  <Card hoverable>
                    <Statistic
                      style={{}}
                      title="项目总数"
                      value={489}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<ArrowUpOutlined />}

                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card hoverable>
                    <Statistic
                      title="预约金额"
                      value={1156023.21}
                      precision={2}
                      valueStyle={{ color: '#cf1322' }}
                      prefix={<ArrowDownOutlined />}

                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card hoverable>
                    <Statistic
                      title="支持人次"
                      value={12650}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<ArrowUpOutlined />}

                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card hoverable>
                    <Statistic
                      title="支持金额"
                      value={21045866.26}
                      precision={2}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<ArrowUpOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            <div className='list-group'>
              <Listli />
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>)

}

export default App;
