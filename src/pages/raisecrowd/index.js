import { useEffect, useState, useCallback, useRef } from 'react'
import HeaderMenu from '../../components/header';
import { Link,useHistory } from 'react-router-dom'
import { Form, Button, Layout, Upload, message, Input, Checkbox, Select, Row, Col,DatePicker,
    Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import store from '../../redux/store'
import './index.css'
import BraftEditor from 'braft-editor';
import axios from 'axios';
import 'braft-editor/dist/index.css';

import { login, logout } from '../../redux/login_action'
const { Header, Content, Footer } = Layout;

const { RangePicker } = DatePicker;
var date1_hou = '';
var str = window.location.host.split(':');
console.log('window.location.host', str[0]);
function RaiseCrowd() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]); //上传文件接获的文件列表 里面包涵文件流？
    const [file, setFile] = useState({}); //上传文件接获的文件流
    const [verifyCode, setverifyCode] = useState(''); //设置验证码，不设置state的话会导致验证码不改变，为初始值？
    const [proList, setProList] = useState([])
    var tempObj = new FormData(); //用于上传文件的formdata数据格式
    var history = useHistory()

    //检测是否已登录，如果没登录就爆出消息去登录
    useEffect(()=>{
        if(store.getState() !== 1){
            console.log('未登录')
            alert('未登录，请先登录')
            history.push('/login')
        }
    })
   

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

    //提交按钮
    const handleSubmit = () => {
        form.validateFields().then(
            (fieldsValue) => {
                //输出表单对象
                console.log('verifyCode', verifyCode);
                console.log('表单对象', fieldsValue);

                //将表单数据写入formdata对象中
                for (var key in fieldsValue) {
                    if(key != 'indexImage' || key != 'time'){
                        var value = eval(`fieldsValue.${key}`); //eval函数执行字符串代码
                        tempObj.append(key, value);
                    }
                    else{
                        continue
                    }
                }
                //加入文件流
                tempObj.append('file', file);
                tempObj.append('timeStart', date1_hou.startTime);
                tempObj.append('timeEnd', date1_hou.endTime);

                axios.post(`/api/projects/addproject`,tempObj).then( res =>{
                    console.log('res=>',res.data); 
                    if(res.data=="添加成功"){
                        alert("添加成功")
                    }
                    else if(res.data=="添加失败"){
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

    //******************文件上传********************/
    function beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('文件必须小于10mb!');
        }
        return false;
    }

    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: { beforeUpload },
        //action: '#',
        accept: '.jpg,.png,.doc',
        onChange(info) {
            console.log('info', info);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
                setFileList(info.fileList); //截获文件流数组
                console.log('file的类型是', typeof file); //是个obj
                setFile(info.file); //截获文件流数组
            }
            if (status === 'done') {
                message.success(`${info.file.name} 成功上传文件.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 上传文件失败.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        }
    };


    return (
        <Layout className="layout">
            <HeaderMenu />
            <Content style={{ padding: '0 50px' }}>
                <br />
                <div id = "divide" >  </div>
                <div className="site-layout-content">
                    <Row >
                        <Col span={12}>
                            <div className="img-up-form">
                                <img id='imageLeftFrom' src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.beautydiary.com.cn%2Fupload%2Fimg%2FpNOP0tNKlNSw3hfPpivZPZTgZ4BIveNYoX1vR2RBXUxYCqqpaGdxN0nXZ8yQt3PlKPGREAeSm8F5VlggmQE8VI94tXuU4eAxHosCSVAlpn0.jpg&refer=http%3A%2F%2Fwww.beautydiary.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640434564&t=b63a2cb6798332d446a93b07ba103d64' />
                            </div>
                        </Col>
                        <Col span={12}>
                            {/* <div className="form-div"> */}
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
                                                <RangePicker style={{width:'300px'}} onChange={handleChange} />
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
                                        <Form.Item
                                            label="上传封面"
                                            name="indexImage"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入'
                                                }
                                            ]}
                                        >
                                            <Dragger {...props} style={{ width: '300px' }}>
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">点击或拖拽上传文件</p>
                                            </Dragger>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" style={{ marginLeft: '228px' }}>
                                                提交
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                {/* </div> */}
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>)

}

export default RaiseCrowd;
