import { Divider, Table, Popconfirm } from 'antd';
import './index.css'
import axios from 'axios';
import store from '../../../redux/store'
import { UserOutlined } from '@ant-design/icons';
import { Link, withRouter, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

const ProjectFrom = (props) => {
    const [data, setData] = useState([]);

    const handleNameClick = (name) => {
        axios.get(`/api/projects/view/${name}`).then((res)=>{
            axios.get(`/api/projects/detail/${name}`).then((res)=>{
                props.history.push({pathname:'/detail', query:{data_ori:res.data}})
            })
        })
    }

    const columns = [
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '投资金额',
            dataIndex: 'moneyHave',
            key: 'moneyHave',
        },
        {
            title: '项目状态',
            dataIndex: 'moneyTarget',
            key: 'moneyTarget',
            render: (text,record)=>{
                return record.moneyHave >= record.moneyTarget ? '众筹完成' : '正在众筹'
            }
        },
        {
            title: '操作',
            dataIndex: 'moneyTarget',
            key: 'moneyTarget',
            render: (text,record)=>{
                return (
                    <div>
                      <a onClick={() => handleNameClick(record.name)}>查看</a>
                    
                      <Divider type="vertical" />
            
                      <Popconfirm
                        title="确认是否删除"
                        placement="topRight"
                        onConfirm={() => handleNameClick(record.id)}
                        okText="确认"
                        cancelText="取消"
                      >
                        <a>删除</a>
                      </Popconfirm>
                    </div>
                  );
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