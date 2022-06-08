import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styles from './index.module.css';
import { Router, useHistory , Link } from 'react-router-dom'


const Header = () => {
  const history = useHistory()
  
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.leftTop}><h1>众筹网</h1></div>
            <div className={styles.leftMid}>
                <h2>
                    我们是一个专注于发现新奇好物平台。为创作者发声。
                </h2>
            </div>
            <div className={styles.footer}>
            我们在塑造一个发现新奇好物的平台，为人们带来更多乐趣和可能性。

            众筹网团队经常问自己：为什么创新精神没有得到应有的奖励？为什么一些品质拙劣的产品反而能大获“成功”？或许市场和资本只相信成王败寇。但众筹网坚信，人们与生俱来的创造力才是文化创意生产的核心。

            借助互联网的力量，众筹网给每一位创造者提供了建立个人品牌的机会。所有人都可以向世界展示自己独一无二的创意作品，讲述这个创意是如何萌发，并一步步长大。 更重要的是，优秀的创作者会因为自己的辛勤付出获得相应资金支持，吸引一批志趣相投的伙伴，一起将创意变成现实。

            当志同道合的人们相遇，创意的火花随时会被点燃。

            这就是众筹网存在的意义。
            </div>
        </div>
        <div className={styles.right}>
            {/* <div className={styles.rigthtL}> */}
                <div style={{ display:'inline-block',marginLeft:'50px',borderRadius:'4px' , background: "red",height:'100%',width:'30%',overflow:'hidden' }}>
                    <img src='./首页小图1.png'></img>
                </div>
            {/* </div> */}
            {/* <div className={styles.rightR}> */}
                <div style={{ display:'inline-block',marginLeft:'50px',borderRadius:'4px' , background: "blue",height:'100%',width:'30%' ,overflow:'hidden'}}>
                <img src='./首页小图2.png'></img>
                </div>
            {/* </div> */}
        </div>
    </div>
  );
};

export default Header