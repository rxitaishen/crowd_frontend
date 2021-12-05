import {
    Form, Button, Layout, Avatar, message, Input, Menu, Select, Row, Col, DatePicker,
    Table
} from 'antd';
import './index.css'
import store from '../../../redux/store'
import { UserOutlined } from '@ant-design/icons';
import { Link, withRouter, useLocation } from 'react-router-dom'

const ProjectFrom = (props) => {


    const columns = [
        {
            title: '项目名称',
            dataIndex: 'pName',
            key: 'pName',
            render: text => <a>{text}</a>,
        },
        {
            title: '投资金额',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '项目状态',
            dataIndex: 'status',
            key: 'status',
        },
        
    ];

    const data = [
        {
            key: '1',
            pName: 'John Brown',
            money: 32,
            status:'已截止'
        },
        {
            key: '2',
            pName: 'Jim Green',
            money: 42,
            status:'已截止'
        },
        {
            key: '3',
            pName: 'Joe Black',
            money: 32,
            status:'已截止'
        },
    ];

    return (
        <div className='projectfrom-form'>
            <Table 
            columns={columns} 
            dataSource={data} 
            scroll={{
                y:'1000px'
            }} 
            pagination={{
                howQuickJumper: true,
                position:["right"]
            }}/>
        </div>
    )
}
export default ProjectFrom;