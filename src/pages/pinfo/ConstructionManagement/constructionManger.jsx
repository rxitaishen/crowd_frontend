import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  DatePicker,
  Space,
  Input,
  Button,
  Divider,
  message,
  Modal,
  Popconfirm,
  TreeSelect,
  Table,
  Row,
  Col,
  Select
} from 'antd';
import AddDoor from './addConstruction';
import store from "../../../redux/store";
import moment from 'moment'
import axios from 'axios';
var date1_hou = '';
const ArticleManger = (props) => {
  const [form] = Form.useForm();
  const { templateList } = {};
  const table = useRef(null);
  const modalChild = useRef(null);
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [title, setTitle] = useState(''); // Modal的标题

  const refrash = () => {
    axios
    .post(`/api/projects/search/owner`, { owner: store.getState() })
    .then((res) => {
      console.log("res=>", res.data);
      if (res.data !== "未找到相关信息") {
        setData(res.data);
      } else {
        console.log("没有相关信息");
      }
    });
  }

  useEffect(() => {
    refrash()
  }, []);


  
  //提交按钮
  const handleSubmit = () => {
    form.validateFields().then(
      (fieldsValue) => {
        //输出表单对象
        console.log('表单对象', fieldsValue);
        
        fieldsValue.timeStart = date1_hou || moment(fieldsValue.time[0]).format("YYYY-MM-DD")
        fieldsValue.timeEnd = date1_hou || moment(fieldsValue.time[1]).format("YYYY-MM-DD")
        fieldsValue.time = undefined;
        const param = {...fieldsValue, _id: editData._id };
        console.log('param: ', param._id);
        axios.post(`/api/projects/edit`, param).then(res => {
          console.log('res=>', res.data);
          if (res.data == "访问成功") {
            setVisible(false);
            date1_hou = '';
            refrash();
            message.success("访问成功")
          }
          else if (res.data == "访问失败") {
            setVisible(false);
            message.error("访问失败")
          }
        })
      }
    );
  };

  //新建文章
  const handleAdd = () => {
    setTitle('新建收货地址');
    setEditData({});
    setVisible(true);
  };

  //这边是编辑
  const handleEditClick = (name) => {
    axios.post(`/api/projects/search/name`, {proName: name}).then((res) => {
        console.log('编辑项目',res.data);
        setEditData(res.data);
        setVisible(true)
    })    
  };

  const handleDeleteClick = (id) => {
    axios.delete(`/api/receive/${id}`).then((res) => {
        console.log('删除项目', res);
        refrash()
    })
  };

  const columns = [
    {
      title: '收货人',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '所在地区',
      dataIndex: 'city',
      key: 'city'

    },
    {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '邮政编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '联系方式',
      dataIndex: 'callNumber',
      key: 'callNumber'
      //   render: (text) => <span>{text === 0 ? '关闭' : text === 1 ? '开放' : ''}</span>
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => handleEditClick(record.name)}>编辑</a>

            <Divider type="vertical" />

            <Popconfirm
              title="确认是否删除"
              placement="topRight"
              onConfirm={() => handleDeleteClick(record._id)}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        );
      },
    }
  ];

  //模态框的点击事件，从子组件那边用react的一个hook传过来了
  const handleOk = () => {
    modalChild.current.submit();
  };

  //关闭按钮
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="admin-container">
      <div className="function-btns">
        {/* <div className="button"> */}
        <Button type="primary" style={{ marginRight: '10px' }} onClick={handleAdd}>
          新建
        </Button>
      </div>

      <div className="admin-table-pagination" ref={table}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          scroll={{ y: "350px",}}
          
        />
      </div>
      {/* 新增 */}
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        closable={false}
        centered={true}
        wrapClassName="admin-modal"
      >
        {/* <AddDoor
          title={title}
          data={json}
          templateList={templateList}
          ref={modalChild}
          againQuery={againQuery}
          role={roleno}
        /> */}
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit} form={form}>
          <Form.Item
            label="收货人姓名"
            name="name"
            rules={[{ required: true, message: '请填写收货人姓名' }]}
            initialValue={data.name}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="callNumber"
            rules={[
              { required: true, message: '请输入联系方式' },
            ]}
            initialValue={data.callNumber}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="电子邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入电子邮箱' },
            ]}
            initialValue={data.email}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="所在城市"
            name="city"
            rules={[
              { required: true, message: '请输入所在城市' },
            ]}
            initialValue={data.city}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="详细地址"
            name="address"
            rules={[
              { required: true, message: '请输入详细地址' },
            ]}
            initialValue={data.address}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="邮政编码"
            name="code"
            rules={[
              { required: true, message: '请输入邮政编码' },
            ]}
            initialValue={data.code}
          >
            <Input placeholder="请输入" />
          </Form.Item>
      </Form>
      </Modal>
    </div>
  );
};
export default ArticleManger;
