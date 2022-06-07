import React, { useImperativeHandle, forwardRef, useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Radio,
  message,
  Select,
  TreeSelect,
  Checkbox,
  Upload,
  Button,
  Image
} from 'antd';
import BraftEditor from 'braft-editor';

import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css';
import moment from 'moment';
import api from '../../../api/admin';
import './index.less';

const { TreeNode } = TreeSelect;
const { Option } = Select;

const CheckboxGroup = Checkbox.Group;
const { Dragger } = Upload;
var fileArray = [];
var urlDelete = [];

const NsEdit = forwardRef((props, ref) => {
  var { data } = props;
  const [form] = Form.useForm();

  // data = data.result;
  if (data.result) {
    data = data.result;
  }
  //******************文件上传********************//

  const onFinish = () => {
    form.validateFields().then((values) => {
      values.content = values.content.toHTML();

      if (data.id) {
        // 此操作为编辑
        let tempObj = new FormData(); //用于上传文件的formdata数据格式
        let obj = { ...data, ...values };

        api.updateSocietyOrgansizations(obj).then((res) => {
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
          } else {
            message.error('编辑失败');
          }
        });
      } else {
        let tempObj = new FormData(); //用于上传文件的formdata数据格式
        // 此操作为添加

        // //加入formdata
        // for (var key2 in values) {
        //   var value2 = eval(`values.${key2}`); //eval函数执行字符串代码
        //   if (typeof value2 != 'undefined' && value2 != '') tempObj.append(key2, value2);
        // }

        //发送请求
        api.addSocietyOrgansizations(values).then((res) => {
          tempObj = null;

          if (res.data.data.typeName === '添加成功！') {
            message.success('提交成功');
            props.againQuery();
          } else {
            message.error('添加失败');
          }
        });
      }
    });
  };
  useImperativeHandle(ref, () => {
    return {
      submit: onFinish
    };
  });

  const autoSize = { minRows: 3, maxRows: 3 };

  return (
    <div className="addDoor">
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={onFinish} form={form}>
        <Form.Item
          label="学会名称："
          name="societyName"
          rules={[
            { required: true, message: '请输入学会名称' },
            { max: 50, message: '输入内容不能超过50字符' }
          ]}
          initialValue={data.societyName}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="成立年月："
          name="societyEstablishDate"
          initialValue={data.societyEstablishDate}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="现在第几届：" name="last" initialValue={data.last}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="该届到期时间：" name="dueDate" initialValue={data.dueDate}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="学会性质：" name="societyNature" initialValue={data.societyNature}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="挂靠单位："
          name="societyUnit"
          rules={[
            { required: true, message: '请输入学会名称' },
            { max: 50, message: '输入内容不能超过50字符' }
          ]}
          initialValue={data.societyUnit}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="名誉会长："
          name="societyHonoraryPresident"
          initialValue={data.societyHonoraryPresident}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="会长(理事长)："
          name="societyPresident"
          rules={[
            { required: true, message: '请输入学会名称' },
            { max: 50, message: '输入内容不能超过50字符' }
          ]}
          initialValue={data.societyPresident}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="副会长："
          name="societyVicePresident"
          initialValue={data.societyVicePresident}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="秘书长：" name="societySecretary" initialValue={data.societySecretary}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="个人会员数：" name="members" initialValue={data.members}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="团体会员数：" name="number" initialValue={data.number}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="联系人：" name="contacts" initialValue={data.contacts}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="电话：" name="phone" initialValue={data.cellPhone}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="手机：" name="cellPhone" initialValue={data.phone}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="邮箱：" name="fax" initialValue={data.fax}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="邮讯处：" name="address" initialValue={data.address}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="邮政编码：" name="postcode" initialValue={data.postcode}>
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="学会主要任务（宗旨）"
          name="content"
          initialValue={BraftEditor.createEditorState(
            // data.societyIntroduce
            //   .replace(/&lt;/g, '<')
            //   .replace(/&gt;/g, '>')
            //   .replace(/&amp;/g, '&')
            //   .replace(/&quot;/g, '"')
            //   .replace(/&nbsp;/g, ' ')
            //   .replace(/&apos;/g, "'")
            data.societyIntroduce
              ? data.societyIntroduce
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&amp;/g, '&')
                  .replace(/&quot;/g, '"')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&apos;/g, "'")
              : data.societyIntroduce
          )}
          rules={[{ required: true, message: '请输入正文' }]}
        >
          <BraftEditor />
        </Form.Item>
      </Form>
    </div>
  );
});
export default NsEdit;
