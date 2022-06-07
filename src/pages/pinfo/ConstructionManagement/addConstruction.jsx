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
import './index.less';
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

  //文章属性单选框
  const handleChange = (event) => {
    switch (event.target.value) {
      case '1':
        setAttributeChoose(1);

        return;
      case '2':
        setAttributeChoose(2);

        return;
      case '3':
        setAttributeChoose(3);
        return;
      case '4':
        setAttributeChoose(4);
        return;
    }
  };

  //是否同意发布单选框
  const handlePublish = (event) => {
    switch (event.target.value) {
      case 1:
        setPublish(1);

        return;
      case 2:
        setPublish(2);

        return;
    }
  };

  //条件渲染审核内容
  // const judgeTitle = () => {
  //   if (title === '审核文章') {
  //     return (
  //       <Form>
  //         <Form.Item
  //           label="是否同意发布"
  //           name="articleStatus"
  //           rules={[{ required: true, message: '请选择是否同意发布' }]}
  //           initialValue={data.articleStatus}
  //         >
  //           <Radio.Group id="attributeChoose" onChange={handlePublish}>
  //             <Radio value={1}>不通过</Radio>
  //             <Radio value={2}>通过</Radio>
  //           </Radio.Group>
  //         </Form.Item>
  //         <Form.Item label="理由" name="reason" initialValue={data.reason}>
  //           <Input
  //             placeholder="请输入描述"
  //             style={{ width: '300px', height: '80px' }}
  //             maxLength="10"
  //           />
  //         </Form.Item>
  //       </Form>
  //     );
  //   } else {
  //     return <div></div>;
  //   }
  // };

  //条件渲染图片上传按钮
  const handleUpload = () => {
    if (attributeChoose == 2 || attributeChoose == 3)
      return (
        <Form.Item label="封面图片" rules={[{ required: false }]}>
          <Upload {...prop_ForImg}>
            <Button icon={<UploadOutlined />}>上传</Button>
          </Upload>
        </Form.Item>
      );
    else return <b />;
  };

  //条件渲染发布时间必选或不必选
  const handleOptional = () => {
    if (publish == 1 && title === '审核文章') {
      return (
        <Form.Item
          label="发布时间"
          name="endTime"
          initialValue={
            data.endTime !== null && data.endTime !== undefined ? moment(data.endTime) : ''
          }
        >
          <DatePicker onChange={handleTimeChange} />
        </Form.Item>
      );
    } else if (publish == 2 || publish == 0 || title === '编辑文章') {
      return (
        <Form.Item
          label="发布时间"
          name="endTime"
          rules={[{ required: true, message: '请选择发布时间' }]}
          initialValue={
            data.endTime !== null && data.endTime !== undefined ? moment(data.endTime) : ''
          }
        >
          <DatePicker onChange={handleTimeChange} />
        </Form.Item>
      );
    }
  };

  //条件渲染图片展示
  const handleImg = () => {
    if (data.image)
      return <img className="image_item" src={'data:image/jpeg;base64,' + data.image} />;
    else return <img src="" />;
  };

  //******************用户身份限制treenode********/
  const changeTreeNode = () => {
    if (data.id) {
      return (
        <TreeSelect
          showSearch
          style={{ width: '125px' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择"
          allowClear
          treeDefaultExpandAll
          // onChange={onChange}
        >
          <TreeNode value="10" title="社团建设" disabled="true">
            <TreeNode value="117" title="管理办法" />
            <TreeNode value="67" title="社团管理" />
            <TreeNode value="66" title="社团组织" disabled="true" />
            <TreeNode value="68" title="社团动态" />
          </TreeNode>
        </TreeSelect>
      );
    } else {
      return (
        <TreeSelect
          showSearch
          style={{ width: '125px' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择"
          allowClear
          multiple
          treeDefaultExpandAll
          // onChange={onChange}
        >
          <TreeNode value="10" title="社团建设" disabled="true">
            <TreeNode value="117" title="管理办法" />
            <TreeNode value="67" title="社团管理" />
            <TreeNode value="66" title="社团组织" disabled="true" />
            <TreeNode value="68" title="社团动态" />
          </TreeNode>
        </TreeSelect>
      );
    }
  };

  //******************图片上传********************/
  function beforeUpload_ForImg(file) {
    return false;
  }

  const prop_ForImg = {
    name: 'img',
    beforeUpload: { beforeUpload_ForImg },
    headers: {
      authorization: 'authorization-text'
    },
    accept: '.bmp,.jpg,.png',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setImg(info.file); //截获文件流数组，可以上传多个
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  //******************文件上传********************//
  function beforeUpload_ForFile(file) {
    return false;
  }

  const prop_ForFile = {
    name: 'file',
    multiple: true,
    beforeUpload: { beforeUpload_ForFile },
    maxCount: 25,
    defaultFileList: data.files,

    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <DownloadOutlined />,
      showRemoveIcon: true
    },
    onDownload(info) {
      downLoadFiles(info.name, info.path);
    },
    //action: '#',
    accept: '.doc,.docx,.pdf,.xls,.xlsx',
    onChange(info) {
      const { status } = info.file;

      if (status === 'removed') {
        urlDelete.push(info.file.path);

        //删除文件
        fileArray.splice(
          fileArray.findIndex((item) => item.name === info.file.name),
          1
        );
      }
      if (typeof status === 'undefined') {
        //添加问价
        fileArray.push(info.file); //截获文件流数组
      }
      if (status === 'done') {
        message.success(`${info.file.name} 成功上传文件.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传文件失败.`);
      }
    },
    onDrop(e) {}
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

  const autoSize = { minRows: 3, maxRows: 3 };

  return (
    <div className="addDoor1">
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={onFinish} form={form}>
        <Form.Item
          label="文章分类"
          name="classId"
          rules={[{ required: true, message: '请选择文章分类' }]}
          initialValue={data.classId}
        >
          {changeTreeNode()}
          {/* <TreeSelect
            showSearch
            style={{ width: '200px' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择"
            allowClear
            treeDefaultExpandAll
          >
            <TreeNode value="1" title="首页"></TreeNode>
            <TreeNode value="101" title="组织架构" disabled="false">
              <TreeNode value="104" title="单位概况" />
              <TreeNode value="105" title="内设机构" />
              <TreeNode value="13" title="机关建设" />
            </TreeNode>
            <TreeNode value="3" title="工作动态" disabled="false">
              <TreeNode value="7" title="通知公告" />
              <TreeNode value="12" title="动态信息" />
              <TreeNode value="4" title="绩效管理" />
              <TreeNode value="146" title="部门预决赛" />
            </TreeNode>
            <TreeNode value="102" title="科研管理" disabled="false">
              <TreeNode value="38" title="课题管理" disabled="false">
                <TreeNode value="6" title="规划课题" disabled="false">
                  <TreeNode value="15" title="公告通知" />
                  <TreeNode value="17" title="管理制度" />
                </TreeNode>
                <TreeNode value="163" title="社科联课题" disabled="false">
                  <TreeNode value="164" title="公告通知" />
                  <TreeNode value="165" title="管理制度" />
                </TreeNode>
              </TreeNode>
              <TreeNode value="25" title="基地管理" disabled="false">
                <TreeNode value="24" title="基地简介" />
                <TreeNode value="160" title="动态信息" />
                <TreeNode value="161" title="公告通知" />
                <TreeNode value="162" title="管理制度" />
              </TreeNode>
            </TreeNode>
            <TreeNode value="10" title="社团建设" disabled="false">
              <TreeNode value="117" title="管理办法" />
              <TreeNode value="67" title="社团管理" />
              <TreeNode value="66" title="社团组织" />
              <TreeNode value="68" title="社团动态" />
            </TreeNode>
            <TreeNode value="118" title="社科普及" disabled="false">
              <TreeNode value="9" title="科普宣传" disabled="false">
                <TreeNode value="39" title="社科能人讲师团" />
                <TreeNode value="36" title="基层宣讲点" />
                <TreeNode value="76" title="社科动态" />
              </TreeNode>
              <TreeNode value="119" title="钱塘大讲坛" />
              <TreeNode value="122" title="社科普及基地" />
            </TreeNode>
            <TreeNode value="141" title="南宋研究" disabled="false">
              <TreeNode value="166" title="浙江省南宋史研究基地" />
            </TreeNode>
          </TreeSelect> */}
        </Form.Item>
        <Form.Item
          label="文章标题"
          name="title"
          rules={[
            { required: true, message: '请输入文章标题' },
            { max: 50, message: '输入内容不能超过50字符' }
          ]}
          initialValue={data.title}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="文章属性"
          name="articleType"
          rules={[{ required: true, message: '请选择文章属性' }]}
          initialValue={data.articleType}
        >
          <Radio.Group id="attributeChoose" onChange={handleChange}>
            <Radio value="1">普通文章</Radio>
            <Radio value="2">头条文章</Radio>
            <Radio value="3">首页头条文章</Radio>
            <Radio value="4">首页置顶文章</Radio>
          </Radio.Group>
        </Form.Item>
        {handleOptional()}

        {handleUpload()}
        <Form.Item name="imgShow" rules={[{ required: false }]}>
          {handleImg()}
        </Form.Item>
        <Form.Item label="作者" name="author" initialValue={data.author}>
          <Input placeholder="请输入" style={{ width: '212px' }} maxLength="50" />
        </Form.Item>
        <Form.Item label="来源" name="source" initialValue={data.source}>
          <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
        </Form.Item>

        <Form.Item label="正文" name="content">
          <div className="card-content" style={{ marginTop: '20px' }}>
            <p className="notice"> </p>
            <div>
              <p style={{ color: 'red' }}>
                1.文字(纯文本)、图片(单张)、表格请使用复制（Ctrl+C）和粘贴（Ctrl+V），复制粘贴到系统中！！！
              </p>
              <p style={{ color: 'red' }}>
                2.下载的文档，文档中存在格式错乱，图片、表格无法显示等情况，需手动修改！！！
              </p>
            </div>
          </div>
          <Editor content={content} setValue={(value) => setContent1(value)} />
        </Form.Item>

        <Form.Item
          label="附件"
          name="summary"
          rules={[
            {
              required: false
            }
          ]}
          initialValue={data.summary}
        >
          <Input placeholder="请输入" style={{ width: '212px' }} maxLength="10" />
        </Form.Item>
        <Form.Item
          style={{ display: 'inline', position: 'relative', bottom: '45px', left: '361px' }}
        >
          <Dragger className="upload-block" {...prop_ForFile}>
            <span className="upload-text">将文档拖拽至虚线框内或点击上传</span>
          </Dragger>
        </Form.Item>
        {/* {judgeTitle()} */}
        {title === '审核文章' ? (
          <Form.Item
            label="是否同意发布"
            name="articleStatus"
            rules={[{ required: true, message: '请选择是否同意发布' }]}
            initialValue={data.articleStatus}
          >
            <Radio.Group id="articleStatus" onChange={handlePublish}>
              <Radio value={1}>不通过</Radio>
              <Radio value={2}>通过</Radio>
            </Radio.Group>
          </Form.Item>
        ) : (
          <div></div>
        )}
        {title === '审核文章' ? (
          <Form.Item label="理由" name="reason" initialValue={data.reason}>
            <Input
              placeholder="请输入描述"
              style={{ width: '300px', height: '80px' }}
              maxLength="10"
            />
          </Form.Item>
        ) : (
          <div></div>
        )}
      </Form>
    </div>
  );
});
export default AddDoor;
