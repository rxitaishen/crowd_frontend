import { Divider, Table, Popconfirm, Modal, Form, Input, DatePicker, Upload, Button, message } from "antd";
import "./index.css";
import axios from "axios";
import store from "../../../redux/store";
import { useEffect, useState, useRef } from "react";
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment'

const { RangePicker } = DatePicker;

const ProjectFrom = (props) => {
  const [data, setData] = useState([]);
  const title = '编辑项目';
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const modalChild = useRef(null);

  var date1_hou = '';

  const [form] = Form.useForm();

  //模态框的点击事件，从子组件那边用react的一个hook传过来了
  const handleOk = () => {
    modalChild.current.submit();
  };

  //关闭按钮
  const handleCancel = () => {
    setVisible(false);
  };

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


  //输入日期结束
  const handleChange = (value, dateString) => {
    //更新date_hou值
    date1_hou = { startTime: dateString[0], endTime: dateString[1] };
};

  const handleNameClick = (name) => {
    axios.get(`/api/projects/view/${name}`).then((res) => {
      axios.get(`/api/projects/detail/${name}`).then((res) => {
        props.history.push({
          pathname: "/detail",
          query: { data_ori: res.data },
        });
      });
    });

  };

  const handleEditClick = (name) => {
    axios.post(`/api/projects/search/name`, {proName: name}).then((res) => {
        console.log('编辑项目',res.data);
        setEditData(res.data);
        setVisible(true)
    })    
  };

  const handleDeleteClick = (name) => {
    axios.delete(`/api/projects/${name}`).then((res) => {
        console.log('删除项目', res);
        refrash()
    })
  };

  const columns = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "投资金额",
      dataIndex: "moneyHave",
      key: "moneyHave",
    },
    {
      title: "项目状态",
      dataIndex: "moneyTarget",
      key: "moneyTarget",
      render: (text, record) => {
        return record.moneyHave >= record.moneyTarget ? "众筹完成" : "正在众筹";
      },
    },
    {
      title: "操作",
      dataIndex: "moneyTarget",
      key: "moneyTarget",
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => handleNameClick(record.name)}>查看</a>

            <Divider type="vertical" />

            <a onClick={() => handleEditClick(record.name)}>编辑</a>

            <Divider type="vertical" />

            <Popconfirm
              title="确认是否删除"
              placement="topRight"
              onConfirm={() => handleDeleteClick(record.name)}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

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
    console.log("store.getState(): ", store.getState());
    refrash();
  }, []);

  return (
    <div>
      <div className="outside">
        <div className="topText12">管理项目</div>
        <Table
          columns={columns}
          dataSource={data}
          
          scroll={{
            y: "350px",
          }}
        />
      </div>
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
        <Form
          form={form}
          ref={modalChild}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入'
              }
            ]}
            initialValue={editData.name}
          >
            <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
          </Form.Item>
          <Form.Item
            label="目标金额"
            name="moneyTarget"
            rules={[
              {
                required: true,
                message: '请输入'
              }
            ]}
            initialValue={editData.moneyTarget}
          >
            <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
          </Form.Item>
          <Form.Item
            label="申报人姓名"
            name="owner"
            rules={[
              {
                required: true,
                message: '请输入'
              }
            ]}
            initialValue={editData.owner}
          >
            <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
          </Form.Item>
          <Form.Item
            label="招标时间段"
            name="time"
            rules={[
              {
                required: true,
                message: '请输入'
              }
            ]}
            initialValue={[moment(editData.timeStart,'YYYY-MM-DD'), moment(editData.timeEnd,'YYYY-MM-DD')]}
          >
            {/* <Space direction="vertical"> */}
            <RangePicker style={{ width: '300px' }} onChange={handleChange} />
            {/* </Space> */}
          </Form.Item>
          <Form.Item
            label="项目描述"
            name="description"
            rules={[
              {
                required: true,
                message: '请输入'
              }
            ]}
            initialValue={editData.description}
          >
            <Input.TextArea rows={5}  style={{ width: '300px' }} showCount maxLength={100} />
          </Form.Item>

          {/* <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: '228px' }}>
              提交
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};
export default ProjectFrom;
