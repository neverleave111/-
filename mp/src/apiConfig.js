// src/apiConfig.js
// const API_BASE_URL = "http://10.60.101.12:5000";
const API_BASE_URL = "http://172.29.156.236:5000";
// const API_BASE_URL = "http://127.0.0.1:3007";
const apiConfig = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  userAll: `${API_BASE_URL}/userall`,
  userinfo: `${API_BASE_URL}/userinfo`,

  // 线路管理相关
  metroAll: `${API_BASE_URL}/metroAll`,     // GET - 获取所有线路
  addMetro: `${API_BASE_URL}/addMetro`,     // POST - 添加线路
  editMetro: `${API_BASE_URL}/editMetro`,   // POST - 修改线路
  deleteMetro: `${API_BASE_URL}/deleteMetro`, // POST - 删除线路
  getAllStationHeaders: `${API_BASE_URL}/getAllStationHeaders`, // GET
  doAddStation: `${API_BASE_URL}/doAddStation`,                // POST
  doEditStation: `${API_BASE_URL}/doEditStation`,              // POST
  doDeleteStation: `${API_BASE_URL}/doDeleteStation`,          // POST
  initStation: `${API_BASE_URL}/initStation`,
  getMaintenanceTodos: `${API_BASE_URL}/todos/maintenance`,  // 获取维保待办
  getInspectionTodos: `${API_BASE_URL}/todos/inspection`,    // 获取巡检待办
  getAnnualTodos: `${API_BASE_URL}/todos/annual`,            // 获取年检待办
  updateTodo: `${API_BASE_URL}/todos/update`,                // 更新待办事项
  addTodo: `${API_BASE_URL}/todos/add`,                      // 添加待办事项
  getAllStations: `${API_BASE_URL}/getAllStations`, // 获取所有站点
  getAlarmList: `${API_BASE_URL}/getMetroRealTimeAlarms`,     // 获取告警数据
  getWarningList: `${API_BASE_URL}/getMetroRealTimeWarnings`, // 获取预警数据
  updateAlarmStatus: `${API_BASE_URL}/updateAlarm`,       // 更新告警状态
  updateWarningStatus: `${API_BASE_URL}/updateWarning`,   // 更新预警状态
};

export default apiConfig;
