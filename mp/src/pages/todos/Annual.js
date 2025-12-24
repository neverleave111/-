// src/pages/todos/Annual.js
import React from 'react';
import { Card } from 'antd';
import TodoCalendar from '../../components/TodoCalendar';
import apiConfig from '../../apiConfig';

const Annual = () => {
  return (
    <div>
      <h2>年检事项日历</h2>
      <Card style={{ marginTop: 16 }}>
        <TodoCalendar 
          apiUrl={apiConfig.getAnnualTodos} 
          type="annual" 
        />
      </Card>
    </div>
  );
};

export default Annual;