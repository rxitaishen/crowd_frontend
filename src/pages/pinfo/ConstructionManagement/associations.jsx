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
  Select
} from 'antd';
import AssociationsEdit from './associationsEdit';

import api from '../../../api/admin';
const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
const { RangePicker } = DatePicker;
var wheatherSearch = false;
var tableObj = {};
var date1_hou = '';
var xulie = [];
const ArticleManger = () => {
  const [form] = Form.useForm();
  const { templateList } = {};
  const table = useRef(null);
  const modalChild = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [status, setStatus] = useState(null);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [wheatherReset, setWheatherReset] = useState(1);
  const [detailList, setDetailList] = useState([]);
  const [json, setJson] = useState({}); // 存储添加和编辑 详情的数据
  const [title, setTitle] = useState(''); // Modal的标题

  //因为每次都渲染了一次，让他们重新回到了初始值？
  // var date1_hou = '';
  // var xulie = [];
  // var wheatherSearch = false;
  // var tableObj = {};
  useEffect(() => {
    getList({});
  }, [wheatherReset]);

  //获取用户登录信息

  //获取list
  const getList = (params) => {
    api.selectSocietyOrgansizations(params).then((res) => {
      setData(res.data.data.rows || []);
      setTotal(res.data.data.total || 0);
    });
  };

  //删除
  const toDelete = () => {
    xulie = unique(xulie); //去重
    var params = { ids: xulie };

    api.deleteSocietyOrgansizations(params).then((res) => {
      getList({});
      xulie = {};
    });
  };

  //列表选择
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (xulie) {
        var c = xulie.concat(selectedRowKeys);
        xulie = c.slice(0);
      } else {
        xulie = selectedRowKeys.slice(0);
      }
      // xulie.push.apply(xulie, selectedRowKeys);
    }
  };
  //数组去重
  function unique(arr) {
    return Array.from(new Set(arr));
  }
  //设置查询时的分类
  // const handleStatus = (value) => {
  //   setStatus(value);
  //   getList({ page: 1, rows, enableState: value });
  // };

  //新建文章
  const handleAdd = () => {
    setTitle('新建文章');
    setJson({});
    setVisible(true);
  };

  //表格查询按钮
  const handleSubmit = () => {
    form.validateFields().then((fieldsValue) => {
      //输出表单对象
      wheatherSearch = true;
      //对象重构
      fieldsValue = Object.assign(fieldsValue, date1_hou);

      tableObj = Object.assign({}, fieldsValue); //克隆对象

      fieldsValue = Object.assign(fieldsValue, { rows: rows, page: 1 });
      //提交代码查询
      getList(fieldsValue);
    });
  };

  //输入日期结束
  const handleChange = (value, dateString) => {
    //更新date_hou值
    date1_hou = { startTime: dateString[0], endTime: dateString[1] };
  };

  //重置表单
  const reset = () => {
    form.resetFields();
    tableObj = {};
    wheatherSearch = false;
    setWheatherReset(wheatherReset + 1);
  };

  //这边是编辑
  const handleEdit = (code) => {
    code = parseInt(code);
    var params = { id: code };
    //TODO:这里好像没有接口
    api.societyOrganizationsInfo(params).then((res) => {
      setJson(res.data.data);
      setTitle('编辑文章');
      setVisible(true);
    });
  };

  const columns = [
    {
      title: '学会名称',
      dataIndex: 'societyName',
      key: 'societyName'
    },
    {
      title: '挂靠单位',
      dataIndex: 'societyUnit',
      key: 'societyUnit'
      //   render: (text, record) => {
      //     return (
      //       <span>
      //         {record.startTime && record.startTime.slice(0, 10)}至
      //         {record.endTime && record.endTime.slice(0, 10)}
      //       </span>
      //     );
      //   }
    },
    {
      title: '会长（理事长）',
      dataIndex: 'societyPresident',
      key: 'societyPresident'
    },
    {
      title: '提交日期',
      dataIndex: 'createTime',
      key: 'createTime'
      //   render: (text) => <span>{text === 0 ? '关闭' : text === 1 ? '开放' : ''}</span>
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => handleEdit(record.id)}>编辑</a>
          </div>
        );
      }
    }
  ];
  const pageRowsChange = (page, rows) => {
    // handleSubmit();
    setPage(page);
    setRows(rows);
    if (wheatherSearch) {
      var tableObj_ForPage = tableObj;
      tableObj_ForPage = Object.assign(tableObj_ForPage, { rows: rows, page: page });
      getList(tableObj_ForPage);
    } else {
      getList({ page, rows });
    }
  };

  //模态框的点击事件，从子组件那边用react的一个hook传过来了
  const handleOk = () => {
    modalChild.current.submit();
  };

  //关闭按钮
  const handleCancel = () => {
    setVisible(false);
  };

  //重新获取数据
  const againQuery = () => {
    getList({});
    setVisible(false);
  };
  //&& 如果左边的表达式可以转换为ture，则计算右边表达式，并返回右边表达式的值
  const scrollY = table.current && table.current.offsetHeight - 120;
  // const scrollY = 170;
  return (
    <div className="admin-container">
      <div className="function-btns">
        <div className="button">
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '10px' }}
            onClick={handleSubmit}
          >
            查询
          </Button>
          <Button onClick={reset} style={{ marginRight: '10px' }}>
            重置
          </Button>

          <Button type="primary" style={{ marginRight: '10px' }} onClick={handleAdd}>
            新建
          </Button>
          <Popconfirm
            placement="bottomLeft"
            title={'确定删除？'}
            onConfirm={() => toDelete()}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{ backgroundColor: '#dbd6d6', marginRight: '10px' }}>删除</Button>
          </Popconfirm>
        </div>
        <div className="function-list">
          <Form
            id="Form-chaxun"
            form={form}
            labelAlign="left"
            layout="inline"
            onFinish={handleSubmit}
          >
            <Form.Item label="学会名称：" name="societyName">
              <Input placeholder="请输入" style={{ width: '200px' }} maxLength="10" />
            </Form.Item>
            <Form.Item label="挂靠单位：" name="societyUnit">
              <Input placeholder="请输入" style={{ width: '200px' }} maxLength="10" />
            </Form.Item>
            <Form.Item label="提交时间：" name="startTime">
              <Space direction="vertical">
                <RangePicker style={{ width: 240 }} onChange={handleChange} />
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="admin-table-pagination" ref={table}>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
          scroll={{ y: scrollY }}
          pagination={{
            current: page,
            pageSize: rows,
            total: total,
            pageSizeOptions: ['10', '30', '50', '100'],
            showSizeChanger: true,
            onShowSizeChange: pageRowsChange,
            showTotal: (total) => `共${total}条`,
            showQuickJumper: true,
            onChange: pageRowsChange
          }}
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
        width={'1000px'}
      >
        <AssociationsEdit
          data={json}
          templateList={templateList}
          ref={modalChild}
          againQuery={againQuery}
          role={'supperAdminRole'}
        />
      </Modal>
    </div>
  );
};
export default ArticleManger;
