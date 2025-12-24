// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Login from './Login';
import UserManagement from './pages/UserManagement';
import LinesManagement from './pages/LinesManagement';
import StationManagement from './pages/StationManagement'; 
import PersonalInfo from './pages/PersonalInfo';// 引入
import RequireAuth from './RequireAuth';
import TodoManagement from './pages/TodoManagement';
import Maintenance from './pages/todos/Maintenance';
import Inspection from './pages/todos/Inspection';
import Annual from './pages/todos/Annual';
import AlarmWarningPage from './pages/AlarmWarningPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/users"
          element={
            <RequireAuth>
              <DashboardLayout>
                <UserManagement />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        {/* 线路管理 */}
        <Route
          path="/lines"
          element={
            <RequireAuth>
              <DashboardLayout>
                <LinesManagement />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        {/* 其他路由... */}
        <Route
          path="/stations"
          element={
            <RequireAuth>
              <DashboardLayout>
                <StationManagement />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/personal"
          element={
            <RequireAuth>
              <DashboardLayout>
                <PersonalInfo />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/todos"
          element={
            <RequireAuth>
              <DashboardLayout>
                <TodoManagement />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/todos/maintenance"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Maintenance />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/todos/inspection"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Inspection />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/todos/annual"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Annual />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route path="/alarm-warning" 
        element={<RequireAuth>
              <DashboardLayout>
                <AlarmWarningPage />
              </DashboardLayout>
            </RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
