import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Space,
  Radio,
  message,
  Select,
  TreeSelect,
  Checkbox,
  Upload,
  Button,
  Image
} from 'antd';

import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css';
import moment from 'moment';
import api from '../../../api/admin';
// import './index.css';
import Editor from './components/Editor';

const { TreeNode } = TreeSelect;

const CheckboxGroup = Checkbox.Group;
const { Dragger } = Upload;
var fileArray = [];
var urlDelete = [];
var date1_hou = '';
const AddDoor = forwardRef((props, ref) => {
  const { data } = props;
  const { title } = props;
  const [form] = Form.useForm();
  const child = useRef(null);
  const [img, setImg] = useState({}); //上传文件接获的图片流
  const [content, setContent] = useState('');
  const [content1, setContent1] = useState(''); // 保存修改后的内容
  const [attributeChoose, setAttributeChoose] = useState(0);
  const [publish, setPublish] = useState(data.articleStatus ? data.articleStatus : 0);
  useEffect(() => {
    setContent(
      data.content
        ? data.content
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&nbsp;/g, ' ')
            .replace(/&apos;/g, "'")
        : ''
    );
  }, []);
  const downLoadFiles = (finalResultFileName, finalResultPath) => {
    // utils.download(
    //   api,
    //   {
    //     path: finalResultPath
    //   },
    //   finalResultFileName
    // );
  };

  //日期选择
  const handleTimeChange = (value, dateString) => {
    //更新date_hou值
    if (dateString === '') {
      date1_hou = { endTime: '' };
    } else {
      date1_hou = { endTime: new Date(dateString) };
    }
  };


  





  const onFinish = () => {
    form.validateFields().then((values) => {
      if (content1 === '') {
        message.warning('请输入正文');
      } else {
        values.content = content1;
        if (data.id) {
          // 此操作为编辑
          let tempObj = new FormData(); //用于上传文件的formdata数据格式
          let obj = { ...data, ...values };

          if (!(date1_hou.endTime === '')) {
            obj = Object.assign(obj, date1_hou);
          }
          for (var key1 in obj) {
            if (key1 != 'image' && key1 != 'files') {
              var value1 = eval(`obj.${key1}`); //eval函数执行字符串代码
              if (!(!value1 && typeof value1 != 'undefined' && value1 != 0))
                tempObj.append(key1, value1);
            }
          }

          //加入文件流
          if (Object.keys(fileArray).length != 0) {
            for (let i = 0; i < fileArray.length; i++) {
              tempObj.append('files', fileArray[i]);
            }
          }
          if (Object.keys(urlDelete).length != 0) {
            for (let i = 0; i < urlDelete.length; i++) {
              tempObj.append('urlDelete', urlDelete[i]);
            }
          }
          if (Object.keys(img).length != 0) {
            tempObj.append('image', img);
          }
          fileArray = [];
          urlDelete = [];
          api.articlesUpdate(tempObj).then((res) => {
            tempObj = null;
            // if (res.data.data) {
            //   message.success('修改成功');
            //   props.againQuery();
            // } else {
            //   message.error('修改失败');
            // }
            if (res.data.data.typeName === '编辑成功！') {
              message.success('编辑成功');
              props.againQuery();
            } else if (
              res.data.data.typeName === '文章属性为头条文章或首页文章时，需上传封面图片！'
            ) {
              message.error('文章属性为头条文章或首页文章时，需上传封面图片！');
            } else if (res.data.data.typeName === '已发布文章不能编辑或审核！') {
              message.error('已发布文章不能编辑或审核！');
            } else {
              message.error('编辑失败');
            }
          });
        } else {
          let tempObj = new FormData(); //用于上传文件的formdata数据格式
          // 此操作为添加
          if (!(date1_hou.endTime === '')) {
            values = Object.assign(values, date1_hou);
          }
          //加入formdata
          for (var key2 in values) {
            var value2 = eval(`values.${key2}`); //eval函数执行字符串代码
            if (typeof value2 != 'undefined' && value2 != '') tempObj.append(key2, value2);
          }

          //加入文件流 filearray就是包涵了多个文件的数组
          if (Object.keys(fileArray).length != 0) {
            for (let i = 0; i < fileArray.length; i++) {
              tempObj.append('files', fileArray[i]);
            }
          }
          if (Object.keys(img).length != 0) tempObj.append('image', img);

          fileArray = [];
          urlDelete = [];
          //发送请求
          api.articlesAdd(tempObj).then((res) => {
            tempObj = null;

            if (res.data.data.typeName === '提交成功！') {
              message.success('提交成功');
              props.againQuery();
            } else if (
              res.data.data.typeName === '文章属性为头条文章或首页文章时，需上传封面图片！'
            ) {
              message.error('文章属性为头条文章或首页文章时，需上传封面图片！');
            } else {
              message.error('添加失败');
            }
          });
        }
      }
    });
  };
  useImperativeHandle(ref, () => {
    return {
      submit: onFinish
    };
  });


  return (
    <div className="addDoor1">
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} form={form}>
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
    </div>
  );
});
export default AddDoor;
