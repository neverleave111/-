// src/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RequireAuth({ children }) {
  const token = Cookies.get('token');
  console.log("匹配到的路由：", token);
  // 如果不存在 token，则跳转到登录页
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 如果存在 token，则渲染子组件（受保护页面）
  return children;
}

export default RequireAuth;
