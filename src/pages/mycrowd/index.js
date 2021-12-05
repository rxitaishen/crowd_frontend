import { useEffect, useState } from 'react'
import './index.css';
import HeaderMenu from '../../components/header';
import { Link } from 'react-router-dom'
import { Form, DatePicker, Space, message, Input, Select, Button, Layout, Dropdown, Image } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import Listli from '../../components/Listli';
import axios from 'axios'
const { Header, Content, Footer } = Layout;

var date2_hou = ''
var data_ori = []
function Mycrowd() {
  const [form] = Form.useForm();

  const [proList, setProList] = useState([])

  //表格查询按钮
  const handleSubmit = () => {
    form.validateFields().then((fieldsValue) => {
      //输出表单对象
      //console.log(fieldsValue);

      //对象重构
      fieldsValue.create_time = date2_hou;
      console.log(fieldsValue);
      
    });
  };

  //日期改变
  function onChange(date, dateString) {
    console.log(date, dateString);
    date2_hou = dateString;
  }

  //重置表单
  const reset = () => {
    form.resetFields();
    console.log('表单已重置');
  };

  function deleteList(num){
    for (let i = 0; i < num.length; i++) {
      if (num[i]["owner"] !== '胡泽乾') {
        num.splice(i, 1);
          i--;
      }
    }
  }

  useEffect(() => {
    axios.get(`/api/projects/search/all`).then(
      res => {
        if (res.data.length != 0) {
          // console.log('查询所有项目得到结果', res);
          data_ori = res.data
          deleteList(data_ori)
          setProList(data_ori)
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
        <br />
        <div className="site-layout-content">
          <br />
          <br />
          <div className="front-num">
            <div className="site-statistic-demo-card">
              <Form
                id="Form-chaxun"
                form={form}
                labelAlign="left"
                layout="inline"
                onFinish={handleSubmit}
              >
                <Form.Item label="项目名称：" name="essaysName">
                  <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
                </Form.Item>
                <Form.Item label="项目状态：" name="categoryName">
                  <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
                </Form.Item>

                <Form.Item name="anniu">
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button onClick={reset}>重置</Button>
                </Form.Item>
              </Form>
            </div>
            <div className='list-group'>
              {proList
                ? proList.map((item) => (
                  <Listli
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

export default Mycrowd;
