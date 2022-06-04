import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './index.module.css';
import { Router, useHistory , Link } from 'react-router-dom'
import { Button, Radio } from 'antd';

const Header = () => {
  const history = useHistory()
  
  return (
    <div className={styles.container}>
        <div className={styles.head}>
            <h1>开始众筹活动</h1>
            <span className={styles.headspan}>众筹网帮助您为项目筹集创意、资源、种子用户、合作伙伴，只需几个简单步骤就可以建立专案，无需任何手续费。</span>
            <Button className={styles.button} type="primary" size='large' onClick={() => history.push('/raiseCrowd')}>
                立即创建项目
            </Button>
        </div>
        <div className={styles.foot}>
            <div className={styles.text}>
                <h1>我们是为了社会事业</h1>
                <div>我们为非营利组织，社会企业，社区团体，活动家，政客和个人公民而存在，他们正在使世界变得更美好，正在帮助他人，并相信我们对彼此以及对子孙后代负有责任。在zhongchou.com上，您的项目不会在科技产品和设计项目中迷失方向。</div>
            </div>
            <div className={styles.text}>
                <h1>我们为您保留您所筹集所有的100％</h1>
                <div>组织的一般慈善呼吁并不是我们真正的事情。如果您有一个项目，或者可以将您的组织成本削减到项目中，那么我们很乐意邀请​​您。</div>
            </div>
            <div className={styles.text}>
                <h1>我们追求收费透明</h1>
                <div>广告系列活动者无需支付设置费，月费或平台费。捐赠者除了向我们的付款处理者捐赠之外，还要支付2.0％-2.9％+ 30c的付款处理费。通过让捐赠者在捐赠之上向我们添加可选提示，我们可以让捐赠者选择是否要捐赠给我们-这完全是可选的，捐赠时完全透明。</div>
            </div>
        </div>
    </div>
  );
};

export default Header