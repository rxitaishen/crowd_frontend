import { useEffect, useState } from 'react'
import './App.css';
import HeaderMenu from './components/header';
import { Link } from 'react-router-dom'
import { Statistic, Card, Row, Col, Avatar, Layout, Menu, Breadcrumb, Button, Dropdown, Image } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import Listli from './components/Listli';
import axios from 'axios'
const { Header, Content, Footer } = Layout;

function App() {

  const [proList, setProList] = useState([])

  useEffect(() => {
    axios.get(`/api/projects/search/all`).then(
      res => {
        if (res.data.length != 0) {
          // console.log('查询所有项目得到结果', res);
          setProList(res.data)
        }
        else {
          console.log('没有项目');
        }
      }
    )
  }, [])

  
  return (
    <Layout className="layout">
      <HeaderMenu />
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <br />
        <div className="site-layout-content">
          <div className="front-img">
            <img src='./首页大图.png' alt='nothing' className='imgOfFront'></img>
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
              {proList
                ? proList.map((item) => (
                  <Listli
                    // proName_father={item.name}
                    // proDescription_father={item.description}
                    // proViewNum_father={item.viewNum}
                    // proSuportNum_father={item.suportNum}
                    // proTimeStart_father={item.timeStart}
                    // proTimeEnd_father={item.timeEnd}
                    // proMoneyTarget_father={item.moneyTarget}
                    // proMoneyHave_father={item.moneyHave}
                    {...item}
                  ></Listli>
                ))
                : ''}
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>)

}

export default App;
