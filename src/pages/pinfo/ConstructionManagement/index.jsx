import React, { useEffect, useRef, useState } from 'react';
import { Select, Tabs } from 'antd';
import ArticleManger from './constructionManger';
import Associations from './associations';
import { unset } from 'lodash';

const { Option } = Select;
const { TabPane } = Tabs;
const Door = () => {
  const [changeTab, setChangeTab] = useState('1');

  const handleTabChange = () => {
    if (changeTab === '1') {
      return <ArticleManger roleno={'supperAdminRole'} />;
    } else if (changeTab === '2') {
      return <Associations />;
    }
  };

  //获取用户登录信息
  return (
    <div className="admin-container">
      <div className="function-btns" style={{ display: 'flex', flexDirection: 'unset' }}>
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => {
            setChangeTab(key);
          }}
        >
          <TabPane tab="审核" key="1" onClick={() => {}}>
            {/* <ArticleManger /> */}
          </TabPane>

          <TabPane tab="社团组织" key="2">
            {/* <Associations /> */}
          </TabPane>
        </Tabs>
      </div>
      {handleTabChange()}
    </div>
  );
};
export default Door;
