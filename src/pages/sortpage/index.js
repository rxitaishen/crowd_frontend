import { useEffect, useState } from 'react'
import './index.css';
import HeaderMenu from '../../components/header';
import { Link } from 'react-router-dom'
import { Statistic, Card, Row, Col, Avatar, Layout, Menu, Breadcrumb, Button, Dropdown, Image } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import Listli from '../../components/Listli';
import axios from 'axios'
const { Header, Content, Footer } = Layout;

var data_ori = []
function SortPage() {

  const [proList, setProList] = useState([])

  useEffect(() => {
    axios.get(`/api/projects/search/all`).then(
      res => {
        if (res.data.length != 0) {
          // console.log('查询所有项目得到结果', res);
          
          data_ori = res.data
          deleteList(data_ori)
          console.log('原始数据是',data_ori);
          setProList(data_ori)
        }
        else {
          console.log('没有项目');
        }
      }
    )
  },[])

  function sortDataHot(a, b) {
    return b.viewNum - a.viewNum
  }
  function sortDataCp(a, b) {
    let num1 = parseInt((a.moneyHave/a.moneyTarget)*100)
    let num2 = parseInt((b.moneyHave/b.moneyTarget)*100)
    return num2 - num1
  }
  function deleteList(num){
    for (let i = 0; i < num.length; i++) {
      if (num[i]["moneyHave"] >= num[i]["moneyTarget"]) {
        num.splice(i, 1);
          i--;
      }
    }
  }
  const handleIndex = () =>{
    console.log('点击默认');
    setProList(data_ori);
  }
  
  const handleHot = () =>{
    console.log('点击热门');//按浏览量
    let data_temp = data_ori.concat()
    data_temp.sort(sortDataHot);
    setProList(data_temp)
  }
  const handleComplete = () =>{
    console.log('点击完成');//按完成度
    let data_temp = data_ori.concat()
    data_temp.sort(sortDataCp);
    setProList(data_temp)
  }
  return (
    <Layout className="layout">
      <HeaderMenu />
      <Content style={{ padding: '0 50px' }}>
        
        <br />
        <div className="site-layout-content">
          <div className="front-img">
            <img src='./首页大图.png' alt='nothing' className='imgOfFront'></img>
          </div>
        <div className="sort">
        <a onClick={handleIndex}><div className="by-index">默认</div></a>
        <a onClick={handleHot}><div className='by-view'>最热门</div></a>
        <a onClick={handleComplete}><div className="by-progress">最高完成度</div></a>
        </div>
          <br />
          <br />
          <div className="front-num">
            
            <div className='list-group'>
              {proList
                ? proList.map((item) => (
                  <Listli
                  key={item._id}
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

export default SortPage;
