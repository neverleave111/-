// src/pages/UserManagement.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import apiConfig from '../apiConfig';
import Cookies from 'js-cookie';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 控制“注册用户”弹窗
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 注册表单实例
  const [form] = Form.useForm();

  // 1. 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.userAll, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // 如果后端需要在 header 中携带 token
        },
        credentials: 'include' // 确保请求中携带 cookie
      });
      const data = await response.json();
      if (data.code === 200 && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        message.error(data.message || '获取用户列表失败');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('请求错误');
    }
    setLoading(false);
  };

  // 页面加载时获取用户数据
  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. 打开/关闭弹窗
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 3. 注册新用户
  const handleRegisterUser = async () => {
    try {
      const values = await form.validateFields(); // 验证表单
      const response = await fetch(apiConfig.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();

      if (data.code === 200) {
        message.success('用户注册成功');
        handleCloseModal();
        fetchUsers(); // 刷新用户列表
      } else {
        message.error(data.message || '用户注册失败');
      }
    } catch (error) {
      console.error('注册用户出错:', error);
    }
  };

  // 配置表格列，根据后端返回的字段
  const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name',
    }
];

  return (
    <div>
      <h2>用户管理</h2>
      <Button type="primary" onClick={handleOpenModal} style={{ marginBottom: 16 }}>
        注册新用户
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
      />

      <Modal
        title="注册新用户"
        visible={isModalVisible}
        onOk={handleRegisterUser}
        onCancel={handleCloseModal}
        okText="注册"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="888888" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            // 如果不填写，可以不必 required
          >
            <Select placeholder="请选择角色">
              <Option value={0}>运维</Option>
              <Option value={1}>管理员</Option>
              <Option value={2}>超级管理员</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="13509984148" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
