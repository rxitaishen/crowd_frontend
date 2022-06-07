import { Divider, Table, Popconfirm, Modal, Form, Input, DatePicker, Upload, Button } from "antd";
import "./index.css";
import axios from "axios";
import store from "../../../redux/store";
import { useEffect, useState, useRef } from "react";
import { InboxOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const ProjectFrom = (props) => {
  const [data, setData] = useState([]);
  const title = '编辑项目'
  const [visible, setVisible] = useState(false);
  const modalChild = useRef(null);
  const [verifyCode, setverifyCode] = useState(''); //设置验证码，不设置state的话会导致验证码不改变，为初始值？
  var tempObj = new FormData(); //用于上传文件的formdata数据格式
  var fileArray = [];
  var date1_hou = '';

  const testdata = [
    {
      name:'1',
      moneyHave:'1',
      moneyTarget:'1',
      moneyTarget:'1'


    }
  ]


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
        console.log('verifyCode', verifyCode);
        console.log('表单对象', fieldsValue);

        //将表单数据写入formdata对象中
        for (var key in fieldsValue) {
          if (key != 'indexImage' || key != 'time') {
            var value = eval(`fieldsValue.${key}`); //eval函数执行字符串代码
            tempObj.append(key, value);
          }
          else {
            continue
          }
        }
        //加入文件流
        if (Object.keys(fileArray).length != 0) {
          for (let i = 0; i < fileArray.length; i++) {
            tempObj.append('file', fileArray[i]);
          }
        }
        tempObj.append('timeStart', date1_hou.startTime);
        tempObj.append('timeEnd', date1_hou.endTime);
        fileArray = [];
        axios.post(`/api/projects/addproject`, tempObj).then(res => {
          console.log('res=>', res.data);
          if (res.data == "添加成功") {
            alert("添加成功")
          }
          else if (res.data == "添加失败") {
            alert("添加失败")
          }
        })
        //重置表单
        reset();
      }
      // console.log(fileList);
    );
  };
  const { Dragger } = Upload;

  //重置表单
  const reset = () => {
    form.resetFields();
    console.log('表单已重置');
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
    axios.get(`/api/projects/view/${name}`).then((res) => {
      axios.get(`/api/projects/detail/${name}`).then((res) => {
        props.history.push({
          pathname: "/detail",
          query: { data_ori: res.data },
        });
      });
    });
    
    setVisible(true)
  };

  const handleDeleteClick = (name) => {
    axios.get(`/api/projects/view/${name}`).then((res) => {
      axios.get(`/api/projects/detail/${name}`).then((res) => {
        props.history.push({
          pathname: "/detail",
          query: { data_ori: res.data },
        });
      });
    });
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
              onConfirm={() => handleDeleteClick(record.id)}
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

  useEffect(() => {
    console.log("store.getState(): ", store.getState());
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
  }, []);

  return (
    <div>
      <div className="outside">
        <div className="topText12">管理项目</div>
        <Table
          columns={columns}
          dataSource={testdata}
          scroll={{
            y: "1000px",
          }}
          pagination={{
            howQuickJumper: true,
            position: ["right"],
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
            initialValue={store.getState()}
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
          >
            <Input.TextArea rows={5} style={{ width: '300px' }} showCount maxLength={100} />
          </Form.Item>
          {/* <Form.Item
              label="南宋研究简介"
              name="content"
              // initialValue={BraftEditor.createEditorState(data.baseFunc)}
              rules={[{ required: true, message: '请输入正文' }]}
              >
              <BraftEditor style={{ width: '350px' ,height:'400px'}} />
              </Form.Item> */}
          {/* <Form.Item
            label="上传封面"
            name="indexImage"

          >
            <span style={{ color: 'red' }}>注意！</span>上传的第一张图将作为封面
            <Dragger {...props} style={{ width: '300px' }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽上传文件</p>
            </Dragger>
          </Form.Item> */}

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
