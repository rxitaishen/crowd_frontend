// import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react';
// import {
//   Form,
//   Input,
//   DatePicker,
//   Space,
//   Radio,
//   message,
//   Select,
// } from 'antd';

// import 'braft-editor/dist/index.css';
// import moment from 'moment';


// var date1_hou = '';
// const AddDoor = forwardRef((props, ref) => {
//   const [data, setData] = useState([]);
//   const [form] = Form.useForm();

//   useEffect(() => {
    
//   }, []);

//   const onFinish = () => {
//     form.validateFields().then((values) => {
//         if (data.id) {
//           // 此操作为编辑
//           let tempObj = new FormData(); //用于上传文件的formdata数据格式
//           let obj = { ...data, ...values };
//         } else {
//           let tempObj = new FormData(); //用于上传文件的formdata数据格式
//           // 此操作为添加
//           if (!(date1_hou.endTime === '')) {
//             values = Object.assign(values, date1_hou);
//           }
//         }
  
//     });
//   };
//   useImperativeHandle(ref, () => {
//     return {
//       submit: onFinish
//     };
//   });

//   const handleSubmit = () => {
//     form.validateFields().then(
//       (fieldsValue) => {
//         //输出表单对象
//         console.log('表单对象', fieldsValue);
        
//         fieldsValue.timeStart = date1_hou || moment(fieldsValue.time[0]).format("YYYY-MM-DD")
//         fieldsValue.timeEnd = date1_hou || moment(fieldsValue.time[1]).format("YYYY-MM-DD")
//         fieldsValue.time = undefined;
//         const param = {...fieldsValue, _id: editData._id };
//         console.log('param: ', param._id);
//         axios.post(`/api/projects/edit`, param).then(res => {
//           console.log('res=>', res.data);
//           if (res.data == "访问成功") {
//             setVisible(false);
//             date1_hou = '';
//             refrash();
//             message.success("访问成功")
//           }
//           else if (res.data == "访问失败") {
//             setVisible(false);
//             message.error("访问失败")
//           }
//         })
//       }
//     );
//   };


//   return (
//     <div className="addDoor1">
//       <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} form={form}>
//         <Form.Item
//           label="收货人姓名"
//           name="name"
//           rules={[{ required: true, message: '请填写收货人姓名' }]}
//           initialValue={data.name}
//         >
//           <Input placeholder="请输入" />
//         </Form.Item>
//         <Form.Item
//           label="联系方式"
//           name="callNumber"
//           rules={[
//             { required: true, message: '请输入联系方式' },
//           ]}
//           initialValue={data.callNumber}
//         >
//           <Input placeholder="请输入" />
//         </Form.Item>

//         <Form.Item
//           label="电子邮箱"
//           name="email"
//           rules={[
//             { required: true, message: '请输入电子邮箱' },
//           ]}
//           initialValue={data.email}
//         >
//           <Input placeholder="请输入" />
//         </Form.Item>

//         <Form.Item
//           label="所在城市"
//           name="city"
//           rules={[
//             { required: true, message: '请输入所在城市' },
//           ]}
//           initialValue={data.city}
//         >
//           <Input placeholder="请输入" />
//         </Form.Item>

//         <Form.Item
//           label="详细地址"
//           name="address"
//           rules={[
//             { required: true, message: '请输入详细地址' },
//           ]}
//           initialValue={data.address}
//         >
//           <Input placeholder="请输入" />
//         </Form.Item>

//         <Form.Item
//           label="邮政编码"
//           name="code"
//           rules={[
//             { required: true, message: '请输入邮政编码' },
//           ]}
//           initialValue={data.code}
//         >
//           <Input placeholder="请输入" />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// });
// export default AddDoor;
