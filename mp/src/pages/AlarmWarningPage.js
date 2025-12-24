// src/pages/AlarmWarningPage.js
import React from 'react';
import { Tabs } from 'antd';
import AlarmTable from './alarm/AlarmTable';
import WarningTable from './alarm/WarningTable';

const { TabPane } = Tabs;

const AlarmWarningPage = () => {
  return (
    <div>
      <h2>告警预警管理</h2>
      <Tabs defaultActiveKey="alarm" style={{ marginTop: 16 }}>
        <TabPane tab="告警表" key="alarm">
          <AlarmTable />
        </TabPane>
        <TabPane tab="预警表" key="warning">
          <WarningTable />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AlarmWarningPage;