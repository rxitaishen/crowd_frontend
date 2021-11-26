import { useEffect, useState, useCallback, useRef } from 'react'
import HeaderMenu from '../../components/header';
import { Link } from 'react-router-dom'
import { Form, Button, Layout, Upload, message, Input, Checkbox, Select, Row, Col,DatePicker,
    Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import store from '../../redux/store'
import './index.css'
import BraftEditor from 'braft-editor';
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
                console.log(fieldsValue.code); //用户所填的验证码值
                // var co = fieldsValue.code;
                // var coobj = { inputStr: co };
                // console.log('coobj', coobj);
                // demo1Api.Verify(coobj).then((res) => {
                //   console.log('验证码回应信息是', res.data);
                //   if (res.data.body) {
                //     console.log('验证码正确');
                //   } else {
                //     console.log('校验码错误');
                //   }
                // });
                // console.log('验证码正确');

                //将表单数据写入formdata对象中
                for (var key in fieldsValue) {
                    var value = eval(`fieldsValue.${key}`); //eval函数执行字符串代码
                    tempObj.append(key, value);
                }
                //加入文件流
                tempObj.append('file', file);

                //后端需要这个参数，就随便设值了
                tempObj.append('EssaysCollectionId', 14);

                //后端需要这个参数，是自己的ip地址，用于区分是哪个用户上交了
                tempObj.append('ip', str[0]);

                console.log('tempObj', tempObj.get('code')); //formdata对象一定要写get才能consolog

                //连带文件流一起发送请求,将formdata发送出去
                //注意！！虽然完成了formdata数据重构,但之前犯傻传回去的还是表单的fieldsValue，
                //导致了请求头出错（因为表单数据fieldsValue里没有文件流，就会报错），折腾了一天

                // demo1Api.infoUpload(tempObj).then((res) => {
                //     console.log('提交后的res', res);
                //     //根据res的返回值来提示用户
                // });
                //重置表单

                //getVerify();
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
                                            name="title"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入'
                                                }
                                            ]}
                                        >
                                            <Space direction="vertical">
                                                <RangePicker style={{width:'300px'}} onChange={handleChange} />
                                            </Space>
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
