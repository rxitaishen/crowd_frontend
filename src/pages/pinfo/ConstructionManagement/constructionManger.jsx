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

  //因为每次都渲染了一次，让他们重新回到了初始值？
  // var date1_hou = '';
  // var xulie = [];
  // var wheatherSearch = false;
  // var tableObj = {};
  useEffect(() => {
    getList({ classId: 10 });
  }, [wheatherReset]);

  //点击审核
  const handleVerify = (code) => {
    var params = { id: code };
    api.articleInfo(params).then((res) => {
      setJson(res.data.data);
      setTitle('审核文章');
      setVisible(true);
    });
  };

  //判断角色设置是否能够审核
  const judgeRole = (record) => {
    if (
      roleno === 'sklAdminRole' ||
      roleno === 'sklPlanningReviewerRole' ||
      roleno === 'sklSocialReviewerRole' ||
      roleno === 'sklCompanyReviewerRole' ||
      roleno === 'supperAdminRole'
    ) {
      return (
        <div>
          <a onClick={() => handleVerify(record.id)}>审核</a>
          <Divider type="vertical" />
          <a onClick={() => handleEdit(record.id)}>编辑</a>
        </div>
      );
    } else {
      return (
        <div>
          <a onClick={() => handleEdit(record.id)}>编辑</a>
        </div>
      );
    }
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
      if (!(date1_hou.endTime === '' || date1_hou.startTime === '')) {
        fieldsValue = Object.assign(fieldsValue, date1_hou);
      }

      tableObj = Object.assign({}, fieldsValue); //克隆对象
      if (fieldsValue.classId) {
        fieldsValue = Object.assign(fieldsValue, { rows: rows, page: 1 });
      } else {
        fieldsValue = Object.assign(fieldsValue, { rows: rows, page: 1, classId: 10 });
      }
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
    var params = { id: code };
    api.articleInfo(params).then((res) => {
      setJson(res.data.data);
      setTitle('编辑文章');
      setVisible(true);
    });
  };
  //这边是看详情
  const handleDetail = (id) => {
    api.detailList({ id }).then((res) => {
      const { data } = res.data;
      let list = [
        { name: '立项申请主题', value: data.topic },
        {
          name: '申请起至日期',
          value: `${data.startTime && data.startTime.slice(0, 10)}至${data.endTime &&
            data.endTime.slice(0, 10)}`
        },
        { name: '申请类型', value: data.template },
        { name: '指标要求', value: data.requireContent },
        {
          name: '状态',
          value: data.enableState === 0 ? '关闭' : data.enableState === 1 ? '开放' : ''
        }
      ];
      setDetailList(list);
      setTitle('编辑立项申请');
      setDetailVisible(true);
    });
  };
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '文章分类',
      dataIndex: 'className',
      key: 'className'
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
      title: '访问量',
      dataIndex: 'hits',
      key: 'hits'
    },
    {
      title: '审核进度',
      dataIndex: 'articleStatus',
      key: 'articleStatus',
      render: (text) => <span>{text === 0 ? '待审核' : text === 1 ? '审核不通过' : '已发布'}</span>
    },
    {
      title: '提交日期',
      dataIndex: 'createTime',
      key: 'createTime'
      //   render: (text) => <span>{text === 0 ? '关闭' : text === 1 ? '开放' : ''}</span>
    },
    {
      title: '发布时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => <span>{text ? text.slice(0, 10) : ''}</span>
    },
    {
      title: '审核日期',
      dataIndex: 'auditTime',
      key: 'auditTime'
      //   render: (text) => <span>{text === 0 ? '关闭' : text === 1 ? '开放' : ''}</span>
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
        <Popconfirm
          placement="bottomLeft"
          title={'确定删除？'}
          onConfirm={() => toDelete()}
          okText="确定"
          cancelText="取消"
        >
          <Button style={{ backgroundColor: '#dbd6d6', marginRight: '10px' }}>删除</Button>
        </Popconfirm>
        <Button type="primary" style={{ marginRight: '10px' }} onClick={handleAdd}>
          新建
        </Button>
        <Button onClick={reset} style={{ marginRight: '10px' }}>
          重置
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: '10px' }}
          onClick={handleSubmit}
        >
          查询
        </Button>

        {/* </div> */}
        <div className="function-list">
          <Form
            id="Form-chaxun"
            form={form}
            labelAlign="left"
            layout="inline"
            onFinish={handleSubmit}
          >
            <Row gutter={8}>
              <Col key="0" className="gutter-row" span={5}>
                <Form.Item label="文章标题" name="title">
                  <Input placeholder="请输入" maxLength="10" />
                </Form.Item>
              </Col>
              <Col key="0" className="gutter-row" span={6}>
                <Form.Item label="文章分类：" name="classId">
                  <TreeSelect
                    showSearch
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChange}
                  >
                    <TreeNode value={10} title="社团建设" disabled="true">
                      <TreeNode value={117} title="管理办法" />
                      <TreeNode value={67} title="社团管理" />
                      <TreeNode value={66} title="社团组织" disabled="true" />
                      <TreeNode value={68} title="社团动态" />
                    </TreeNode>
                  </TreeSelect>
                </Form.Item>
              </Col>
              <Col key="0" className="gutter-row" span={5}>
                <Form.Item label="审核进度：" name="articleStatus">
                  <TreeSelect
                    showSearch
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择"
                    allowClear
                    treeDefaultExpandAll
                    // onChange={onChange}
                  >
                    <TreeNode value={0} title="待审核" />
                    <TreeNode value={1} title="审核不通过" />
                    <TreeNode value={2} title="已发布" />
                  </TreeSelect>
                </Form.Item>
              </Col>
              <Col key="0" className="gutter-row" span={8}>
                <Form.Item label="提交日期：" name="createTime">
                  <Space direction="vertical">
                    <RangePicker onChange={handleChange} />
                  </Space>
                </Form.Item>
              </Col>
            </Row>
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
