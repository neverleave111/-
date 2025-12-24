// src/pages/TodoManagement.js
import React from 'react';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { 
  ToolOutlined, 
  EyeOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

const TodoManagement = () => {
  return (
    <div>
      <h2>待办事项管理</h2>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card 
            title="维保事项" 
            bordered={true}
            actions={[
              <Link to="/todos/maintenance">
                <ToolOutlined /> 查看详情
              </Link>
            ]}
          >
            <p>管理所有线路和站点的维保计划与记录</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="巡检事项" 
            bordered={true}
            actions={[
              <Link to="/todos/inspection">
                <EyeOutlined /> 查看详情
              </Link>
            ]}
          >
            <p>管理所有线路和站点的巡检计划与记录</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="年检事项" 
            bordered={true}
            actions={[
              <Link to="/todos/annual">
                <CalendarOutlined /> 查看详情
              </Link>
            ]}
          >
            <p>管理所有线路和站点的年度检查计划与记录</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TodoManagement;