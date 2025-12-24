// src/pages/PersonalInfo.js
import React, { useEffect, useState } from 'react';
import { Card, Spin, Descriptions, message } from 'antd';
import Cookies from 'js-cookie';
import apiConfig from '../apiConfig';

const PersonalInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.userinfo, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      if (data.code === 200) {
        setUserInfo(data.data);
      } else {
        message.error(data.message || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息出错:', error);
      message.error('请求错误');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      {loading ? (
        <Spin size="large" />
      ) : userInfo ? (
        <Card title="个人信息" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }}>
          <Descriptions column={1}>
            <Descriptions.Item label="用户名">{userInfo.user_name}</Descriptions.Item>
            <Descriptions.Item label="角色">{userInfo.roles}</Descriptions.Item>
            {/* 根据后端返回的数据，添加更多字段 */}
            {/* 例如：<Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item> */}
          </Descriptions>
        </Card>
      ) : (
        <div>暂无数据</div>
      )}
    </div>
  );
};

export default PersonalInfo;
