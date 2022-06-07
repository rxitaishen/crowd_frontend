import React, { useEffect, useRef, useState } from 'react';
import { Select, Tabs } from 'antd';
import ArticleManger from './constructionManger';

const Door = () => {

  //获取用户登录信息
  return (
    <div className="admin-container">
      <div className='outside'>
          <div className='topText12'>管理收货地址</div>
          <ArticleManger roleno={'supperAdminRole'} />;
      </div>
    </div>
  );
};
export default Door;
