// // src/layout/DashboardLayout.js
// import React, { useEffect, useState } from 'react';
// import { Layout, Menu, Avatar, Spin } from 'antd';
// import {
//   UserOutlined,
//   DeploymentUnitOutlined,
//   EnvironmentOutlined
// } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';

// const { Header, Sider, Content } = Layout;

// const DashboardLayout = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 获取当前用户信息
//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       fetchUserInfo(token);
//     }
//   }, []);

//   const fetchUserInfo = async (token) => {
//     setLoading(true);
//     try {
//       const response = await fetch(apiConfig.userinfo, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setUserInfo(data.data);
//       } else {
//         console.error(data.message || '获取用户信息失败');
//       }
//     } catch (error) {
//       console.error('获取用户信息出错:', error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       {/* 左侧导航栏，从上到下贯通 */}
//       <Sider collapsible>
//         <div
//           style={{
//             height: 64,
//             margin: '16px',
//             background: '#fff',
//             textAlign: 'center',
//             lineHeight: '64px'
//           }}
//         >
//           LOGO
//         </div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['/users']}>
//           <Menu.Item key="/users" icon={<UserOutlined />}>
//             <Link to="/users">用户管理</Link>
//           </Menu.Item>
//           <Menu.Item key="/lines" icon={<DeploymentUnitOutlined />}>
//             <Link to="/lines">线路管理</Link>
//           </Menu.Item>
//           <Menu.Item key="/stations" icon={<EnvironmentOutlined />}>
//             <Link to="/stations">站点管理</Link>
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       {/* 右侧：顶部工具栏 + 内容区 */}
//       <Layout>
//         <Header
//           style={{
//             background: '#fff',
//             padding: '0 16px',
//             boxShadow: '0 2px 8px #f0f1f2',
//             display: 'flex',
//             justifyContent: 'flex-end',
//             alignItems: 'center'
//           }}
//         >
//           {loading ? (
//             <Spin />
//           ) : userInfo ? (
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <Avatar icon={<UserOutlined />} />
//               <span style={{ marginLeft: 8 }}>{userInfo.user_name}</span>
//             </div>
//           ) : (
//             <div>未获取到用户信息</div>
//           )}
//         </Header>

//         <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default DashboardLayout;
// src/layout/DashboardLayout.js
// import React, { useEffect, useState } from 'react';
// import { Layout, Menu, Avatar, Spin, Dropdown } from 'antd';
// import {
//   UserOutlined,
//   DeploymentUnitOutlined,
//   EnvironmentOutlined,
//   HomeOutlined,
//   InfoCircleOutlined,
//   LogoutOutlined
// } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';

// const { Header, Sider, Content } = Layout;

// const DashboardLayout = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       fetchUserInfo(token);
//     }
//   }, []);

//   const fetchUserInfo = async (token) => {
//     setLoading(true);
//     try {
//       const response = await fetch(apiConfig.userinfo, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setUserInfo(data.data);
//       } else {
//         console.error(data.message || '获取用户信息失败');
//       }
//     } catch (error) {
//       console.error('获取用户信息出错:', error);
//     }
//     setLoading(false);
//   };

//   // 下拉菜单点击项处理
//   const handleMenuClick = ({ key }) => {
//     if (key === 'home') {
//       navigate('/users');
//     } else if (key === 'personal') {
//       navigate('/personal');
//     } else if (key === 'logout') {
//       // 清除 token
//       Cookies.remove('token');
//       navigate('/login');
//     }
//   };

//   // 下拉菜单
//   const dropdownMenu = (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key="home" icon={<HomeOutlined />}>
//         首页
//       </Menu.Item>
//       <Menu.Item key="personal" icon={<InfoCircleOutlined />}>
//         个人信息
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="logout" icon={<LogoutOutlined />}>
//         退出登录
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       {/* 左侧导航栏 */}
//       <Sider collapsible>
//         <div
//           style={{
//             height: 64,
//             margin: '16px',
//             background: '#fff',
//             textAlign: 'center',
//             lineHeight: '64px'
//           }}
//         >
//           LOGO
//         </div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['/users']}>
//           <Menu.Item key="/users" icon={<UserOutlined />}>
//             <Link to="/users">用户管理</Link>
//           </Menu.Item>
//           <Menu.Item key="/lines" icon={<DeploymentUnitOutlined />}>
//             <Link to="/lines">线路管理</Link>
//           </Menu.Item>
//           <Menu.Item key="/stations" icon={<EnvironmentOutlined />}>
//             <Link to="/stations">站点管理</Link>
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       {/* 右侧：顶部工具栏 + 内容区 */}
//       <Layout>
//         <Header
//           style={{
//             background: '#fff',
//             padding: '0 16px',
//             boxShadow: '0 2px 8px #f0f1f2',
//             display: 'flex',
//             justifyContent: 'flex-end',
//             alignItems: 'center'
//           }}
//         >
//           {loading ? (
//             <Spin />
//           ) : userInfo ? (
//             <Dropdown overlay={dropdownMenu} trigger={['click']}>
//               <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                 <Avatar icon={<UserOutlined />} />
//                 <span style={{ marginLeft: 8 }}>{userInfo.user_name}</span>
//               </div>
//             </Dropdown>
//           ) : (
//             <div>未获取到用户信息</div>
//           )}
//         </Header>

//         <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default DashboardLayout;

// src/layout/DashboardLayout.js
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Spin, Dropdown } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  DeploymentUnitOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiConfig from '../apiConfig';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 获取当前路由

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    setLoading(true);
    try {
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
        console.error(data.message || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息出错:', error);
    }
    setLoading(false);
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'home') {
      navigate('/users');
    } else if (key === 'personal') {
      navigate('/personal');
    } else if (key === 'logout') {
      Cookies.remove('token');
      navigate('/login');
    }
  };

  const dropdownMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        首页
      </Menu.Item>
      <Menu.Item key="personal" icon={<InfoCircleOutlined />}>
        个人信息
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧导航栏 */}
      <Sider collapsible>
        <div
          style={{
            height: 64,
            margin: '16px',
            textAlign: 'center'
          }}
        >
          {/* 替换为本地图片 */}
          <img src="https://q0.itc.cn/q_70/images03/20240405/f5506381128b42fbbf0deeedced9f038.png" alt="LOGO" style={{ maxHeight: '100%' }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // 使用 selectedKeys 动态选中当前路径
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/lines" icon={<DeploymentUnitOutlined />}>
            <Link to="/lines">线路管理</Link>
          </Menu.Item>
          <Menu.Item key="/stations" icon={<EnvironmentOutlined />}>
            <Link to="/stations">站点管理</Link>
          </Menu.Item>
          <Menu.Item key="/todos" icon={<CalendarOutlined />}>
            <Link to="/todos">待办事项</Link>
          </Menu.Item>
          <Menu.Item key="/alarm-warning" icon={<BellOutlined />}>
            <Link to="/alarm-warning">告警预警</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* 右侧：顶部工具栏 + 内容区 */}
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 16px',
            boxShadow: '0 2px 8px #f0f1f2',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            
          }}
        >
          {loading ? (
            <Spin />
          ) : userInfo ? (
            <Dropdown overlay={dropdownMenu} trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: 8,marginRight: 20 }}>{userInfo.user_name}</span>
              </div>
            </Dropdown>
          ) : (
            <div>未获取到用户信息</div>
          )}
        </Header>

        <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
