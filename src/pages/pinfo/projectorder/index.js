import { Divider, Table, Popconfirm } from 'antd';
import './index.css'
import axios from 'axios';
import store from '../../../redux/store'
import { UserOutlined } from '@ant-design/icons';
import { Link, withRouter, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

const ProjectFrom = (props) => {
    const [data, setData] = useState([]);

    const testdata = [
        {
            address: '1',
            paper: '1',
            paperTime: '1',
            paperState:'6'
        }
    ]

    const handleNameClick = (name) => {
        axios.get(`/api/projects/view/${name}`).then((res)=>{
            axios.get(`/api/projects/detail/${name}`).then((res)=>{
                props.history.push({pathname:'/detail', query:{data_ori:res.data}})
            })
        })
    }

    const columns = [
        {
            title: '收货地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '下单项目',
            dataIndex: 'paper',
            key: 'paper',
        },
        {
            title: '下单时间',
            dataIndex: 'paperTime',
            key: 'paperTime',
            /* render: (text,record)=>{
                return record.moneyHave >= record.moneyTarget ? '众筹完成' : '正在众筹'
            } */
        },
        {
            title: '状态',
            dataIndex: 'paperState',
            key: 'paperState',
            render: (text,record) => { 
                return (
                    <div>
                        {record.paperState == 1 && <p>待付款</p>}
                        {record.paperState == 2 && <p>已付款</p>}
                        {record.paperState == 3 && <p>代发货</p>}
                        {record.paperState == 4 && <p>待收货</p>}
                        {record.paperState == 5 && <p>已完成</p>}
                        {record.paperState == 6 && <p>已取消</p>}
                    </div>
                )
            }
        },
        
    ];


    useEffect(() => {
        console.log('store.getState(): ', store.getState());
        // TODO: 新增接口
        axios.post(`/api/projects/searchOrder/owner`,{owner: store.getState()}).then(
            res=>{
                console.log('res=>',res.data); 
                if (res.data!== '未找到相关信息'){
                    setData(res.data);
                }
                else{
                    console.log('没有相关信息');
                }
            }
          )
    }, [])

    return (
        <div >
             <div className='topText12'>管理订单</div>
            <Table 
            columns={columns} 
            dataSource={testdata} 
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