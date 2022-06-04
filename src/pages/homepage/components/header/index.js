import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './index.module.css';
import { Router, useHistory , Link } from 'react-router-dom'


const Header = () => {
  const history = useHistory()
  
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.leftTop}>热门金额榜</div>
            <div className={styles.leftBootom}>
                <img  src='https://imgzhongchou.s3.ap-southeast-1.amazonaws.com/63251DC8D07E6F1C'/>
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.rigthtTop}>最新News</div>
            <div className={styles.rightMid}>
                <div className={styles.list}>
                    <span className={styles.listT1}>2022-05-26 11:28:51</span>
                    <span className={styles.listT2}>StarkWare 融资一亿美元 通过D轮融资阶段</span>
                    <span className={styles.listT3}>StarkWare是一个致力于解决区块链隐私，通过安全协议维护隐私数据信息，来保障用户不受到隐私的侵犯。</span>
                </div>
                
                <div className={styles.list}>
                    <span className={styles.listT1}>2022-05-26 11:15:03</span>
                    <span className={styles.listT2}>双湃智安 Pre-A融资 投资方筹集数千万元</span>
                    <span className={styles.listT3}>双湃智安是一家专注于工业互联网安全的创新科技公司，该公司主要通过安全的服务以及操作，来维护数字化转型的工业资产。</span>
                </div>
            
                <div className={styles.list}>
                    <span className={styles.listT1}>2022-05-26 10:59:38</span>
                    <span className={styles.listT2}>clicOH A轮融资 集结2500万美元</span>
                    <span className={styles.listT3}>clicOH是一家国外服务于电商物流的平台。主要是链接拉丁美洲的物流基础来全天管理物流配送以及存储包装各种外来的订单项目。</span>
                </div>                
            </div>
            <div className={styles.rigthtBootom}>
                <div className={styles.rb}>
                    <span className={styles.rbtext}>注册人数</span>
                    <span className={styles.rbnum}>3090人</span>
                </div>
                <div className={styles.rb}>
                    <span className={styles.rbtext}>参与项目</span>
                    <span className={styles.rbnum}>22个</span>
                </div>
                <div className={styles.rb}>
                    <span className={styles.rbtext}>成功项目</span>
                    <span className={styles.rbnum}>1个</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Header