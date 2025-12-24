// src/pages/todos/Maintenance.js
import React from 'react';
import { Card } from 'antd';
import TodoCalendar from '../../components/TodoCalendar';
import apiConfig from '../../apiConfig';

const Maintenance = () => {
  return (
    <div>
      <h2>维保事项日历</h2>
      <Card style={{ marginTop: 16 }}>
        <TodoCalendar 
          apiUrl={apiConfig.getMaintenanceTodos} 
          type="maintenance" 
        />
      </Card>
    </div>
  );
};

export default Maintenance;