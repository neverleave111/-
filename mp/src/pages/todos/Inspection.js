// src/pages/todos/Inspection.js
import React from 'react';
import { Card } from 'antd';
import TodoCalendar from '../../components/TodoCalendar';
import apiConfig from '../../apiConfig';

const Inspection = () => {
  return (
    <div>
      <h2>巡检事项日历</h2>
      <Card style={{ marginTop: 16 }}>
        <TodoCalendar 
          apiUrl={apiConfig.getInspectionTodos} 
          type="inspection" 
        />
      </Card>
    </div>
  );
};

export default Inspection;