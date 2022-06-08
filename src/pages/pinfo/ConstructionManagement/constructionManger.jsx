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

import api from '../../../api/admin';
const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;
const { RangePicker } = DatePicker;
var wheatherSearch = false;
var tableObj = {};
var date1_hou = '';
var xulie = [];
const ArticleManger = (props) => {
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
  const roleno = props.roleno;

  useEffect(() => {
    getList({ classId: 10 });
  }, [wheatherReset]);

  //点击审核
  const handleDelete = (code) => {
    var params = { id: code };
    api.articleInfo(params).then((res) => {
      setJson(res.data.data);
      setTitle('审核文章');
      setVisible(true);
    });
  };

  //判断角色设置是否能够审核
  const judgeRole = (record) => {
      return (
        <div>
          <a onClick={() => handleEdit(record.id)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
          placement="bottomLeft"
          title={'确定删除？'}
          onConfirm={() => toDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <a >删除</a>
        </Popconfirm>
          
        </div>
      );
  };

  //获取list
  const getList = (params) => {
    api.specialList(params).then((res) => {
      setData(res.data.data.rows || []);
      setTotal(res.data.data.total || 0);
    });
  };

  //删除
  const toDelete = () => {
    xulie = unique(xulie); //去重
    var params = { ids: xulie };

    api.articlesDelete(params).then((res) => {
      getList({ classId: 10 });
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
    setTitle('新建收货地址');
    setJson({});
    setVisible(true);
  };

  //这边是编辑
  const handleEdit = (code) => {
    var params = { id: code };
    api.articleInfo(params).then((res) => {
      setJson(res.data.data);
      setTitle('编辑收货地址');
      setVisible(true);
    });
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
        return judgeRole(record);
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
    getList({ classId: 10 });
    setVisible(false);
  };
  //&& 如果左边的表达式可以转换为ture，则计算右边表达式，并返回右边表达式的值
  const scrollY = table.current && table.current.offsetHeight - 120;
  // const scrollY = 170;
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
      >
        <AddDoor
          title={title}
          data={json}
          templateList={templateList}
          ref={modalChild}
          againQuery={againQuery}
          role={roleno}
        />
      </Modal>
    </div>
  );
};
export default ArticleManger;
