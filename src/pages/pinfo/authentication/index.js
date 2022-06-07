import React from 'react'
import './index.css'
import { UserOutlined, HomeOutlined, SolutionOutlined } from '@ant-design/icons'

export default function Authentication() {
    return (
        <div className='outside'>
            <div className='topText12'>加入众筹认证</div>
            <div className='card'>
                <div className='icon'>
                    <SolutionOutlined style={{ fontSize: '50px' }} /></div>
                <div>

                    <p className='top'>个人认证</p>
                    <p className='detail'>个人用户真实身份认证</p>
                </div>
                <button >去认证</button>
            </div>

            <div className='card'>
                <div className='icon'>
                    <HomeOutlined style={{ fontSize: '50px' }} />
                </div>
                <div>
                    <p className='top'>企业认证</p>
                    <p className='detail'>合法企业的身份认证</p>
                </div>
                <button >去认证</button>
            </div>
            <div className='card'>
                <div className='icon'>
                    <UserOutlined style={{ fontSize: '50px' }} /></div>
                <div>
                    <p className='top'>学生认证</p>
                    <p className='detail'>学生的身份认证</p>
                </div>
                <button >去认证</button>

            </div>
        </div>
    )
}
