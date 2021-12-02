
import './index.css';
import { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Statistic, Card, Row, Col } from 'antd';
import HeaderMenu from '../../components/header';
import { Link, withRouter, useLocation } from 'react-router-dom'

import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Listli from '../../components/Listli';
const { Header, Content, Footer } = Layout;


function Detail(props) {
  const info = props.location.query.data_ori

  const {img,data} = info
  const {name,description,viewNum,suportNum,timeStart,timeEnd,moneyTarget,moneyHave,owner} = data
  // const {data} = location.action.query
  useEffect(() => {
    console.log(props.location.query.data_ori);
  }, [])
  return (
    <Layout className="layout">

      <HeaderMenu />
      <Content >
        <div className='content'>
          
          <div className='content-up'>
            <div className='content-upleft'>
              <div className='title'>
                <span>ceac</span>
              </div>
              <div  className='imgdiv'>
                <img src={img[0]} style={{width:'100%',height:'290px'}}/>
              </div>
            </div>
            <div className='content-upright'>
              <div className='raise-money'>
                <span className='text'>目前累计资金</span>
                <span>{moneyHave}</span>
                <span>此项目须在{timeEnd}前，获得{moneyTarget}的支持才可成功！</span>
              </div>
              <div className='status'><span>成交数：</span><span>剩余时间：</span></div>
              <Button>立即支持</Button>
              <div className='owner'>
                <div className='owner-pic'>antd头像</div>
                <div className='owner-name'>{owner}</div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>)

}

export default withRouter(Detail);
