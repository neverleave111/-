// // src/components/TodoCalendar.js
// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';
// import { Calendar, Modal, Form, Select, Input, Button, message } from 'antd';
// const { TextArea } = Input; // 从 Input 中解构出 TextArea


// const { Option } = Select;

// const TodoCalendar = ({ apiUrl, type }) => {
//   const [todos, setTodos] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);
//   const [form] = Form.useForm();
  
//   // 类型映射
//   const typeMap = {
//     maintenance: '维保',
//     inspection: '巡检',
//     annual: '年检'
//   };

//   // 获取待办事项数据
//   const fetchTodos = async () => {
//     setLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
      
//       if (data.code === 200) {
//         // 假设数据格式为 { "2023-10-01": [{id, title, content, status}, ...], ... }
//         setTodos(data.data);
//       } else {
//         message.error(data.message || `获取${typeMap[type]}数据失败`);
//       }
//     } catch (error) {
//       console.error('获取待办事项出错:', error);
//       message.error('请求错误');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, [apiUrl]);

//   // 打开编辑弹窗
//   const openModal = (date, todo = null) => {
//     const dateStr = date.format('YYYY-MM-DD');
//     setCurrentTodo({
//       ...todo,
//       date: dateStr
//     });
    
//     form.setFieldsValue({
//       title: todo?.title || '',
//       content: todo?.content || '',
//       status: todo?.status || 'pending',
//       lineId: todo?.lineId || '',
//       stationId: todo?.stationId || ''
//     });
    
//     setModalVisible(true);
//   };

//   // 保存待办事项
//   const saveTodo = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = Cookies.get('token');
//       const todoData = {
//         ...currentTodo,
//         ...values,
//         type
//       };

//       const response = await fetch(apiConfig.updateTodo, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(todoData)
//       });

//       const data = await response.json();
      
//       if (data.code === 200) {
//         message.success('保存成功');
//         setModalVisible(false);
//         fetchTodos(); // 刷新数据
//       } else {
//         message.error(data.message || '保存失败');
//       }
//     } catch (error) {
//       console.error('保存待办事项出错:', error);
//     }
//   };

//   // 日历单元格渲染
//   const dateCellRender = (date) => {
//     const dateStr = date.format('YYYY-MM-DD');
//     const dayTodos = todos[dateStr] || [];
    
//     return (
//       <div>
//         {dayTodos.length > 0 && (
//           <div style={{ marginTop: 5 }}>
//             {dayTodos.slice(0, 2).map(todo => (
//               <div 
//                 key={todo.id} 
//                 style={{ 
//                   fontSize: 12, 
//                   marginBottom: 2,
//                   color: todo.status === 'completed' ? '#52c41a' : '#1890ff'
//                 }}
//                 onClick={() => openModal(date, todo)}
//               >
//                 {todo.title}
//               </div>
//             ))}
//             {dayTodos.length > 2 && (
//               <div style={{ fontSize: 12, color: '#888' }}>
//                 +{dayTodos.length - 2} 更多
//               </div>
//             )}
//           </div>
//         )}
//         <Button 
//           type="text" 
//           size="small" 
//           style={{ fontSize: 12, padding: 0, color: '#888' }}
//           onClick={() => openModal(date)}
//         >
//           添加
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Calendar 
//         dateCellRender={dateCellRender}
//         loading={loading}
//       />
      
//       <Modal
//         title={currentTodo?.id ? `编辑${typeMap[type]}事项` : `新增${typeMap[type]}事项`}
//         visible={modalVisible}
//         onOk={saveTodo}
//         onCancel={() => setModalVisible(false)}
//         destroyOnClose={true}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="标题"
//             name="title"
//             rules={[{ required: true, message: '请输入标题' }]}
//           >
//             <Input placeholder={`请输入${typeMap[type]}标题`} />
//           </Form.Item>
          
//           <Form.Item
//             label="线路"
//             name="lineId"
//             rules={[{ required: true, message: '请选择线路' }]}
//           >
//             <Select placeholder="请选择线路">
//               {/* 这里可以根据实际线路数据动态生成 */}
//               <Option value="line1">线路1</Option>
//               <Option value="line2">线路2</Option>
//             </Select>
//           </Form.Item>
          
//           <Form.Item
//             label="站点"
//             name="stationId"
//             rules={[{ required: true, message: '请选择站点' }]}
//           >
//             <Select placeholder="请选择站点">
//               {/* 这里可以根据实际站点数据动态生成 */}
//               <Option value="station1">站点1</Option>
//               <Option value="station2">站点2</Option>
//             </Select>
//           </Form.Item>
          
//           <Form.Item
//             label="内容"
//             name="content"
//           >
//             <TextArea rows={4} placeholder={`请输入${typeMap[type]}内容`} />
//           </Form.Item>
          
//           <Form.Item
//             label="状态"
//             name="status"
//           >
//             <Select placeholder="请选择状态">
//               <Option value="pending">待处理</Option>
//               <Option value="processing">处理中</Option>
//               <Option value="completed">已完成</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default TodoCalendar;












// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';
// import { Calendar, Modal, Form, Select, Input, Button, message, Spin } from 'antd';
// const { TextArea } = Input;
// const { Option } = Select;

// const TodoCalendar = ({ apiUrl, type }) => {
//   const [todos, setTodos] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);
//   const [form] = Form.useForm();

//   // 新增：线路/站点相关状态
//   const [lines, setLines] = useState([]); // 线路列表
//   const [stations, setStations] = useState([]); // 站点列表
//   const [lineLoading, setLineLoading] = useState(false); // 线路加载状态
//   const [stationLoading, setStationLoading] = useState(false); // 站点加载状态
//   const [currentLineId, setCurrentLineId] = useState(''); // 当前选中的线路ID

//   // 类型映射
//   const typeMap = {
//     maintenance: '维保',
//     inspection: '巡检',
//     annual: '年检'
//   };

//   // ---------------------- 新增：获取线路列表 ----------------------
//   const fetchLines = async () => {
//     setLineLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.getAllLines, { // 后端获取所有线路的接口
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setLines(data.data || []); // 假设后端返回格式：{code:200, data: [{lineId: 'line1', lineName: '线路1'}, ...]}
//       } else {
//         message.error(data.message || '获取线路列表失败');
//         setLines([]);
//       }
//     } catch (error) {
//       console.error('获取线路出错:', error);
//       message.error('线路请求错误');
//       setLines([]);
//     } finally {
//       setLineLoading(false);
//     }
//   };

//   // ---------------------- 新增：根据线路ID获取站点列表 ----------------------
//   const fetchStationsByLine = async (lineId) => {
//     if (!lineId) {
//       setStations([]);
//       return;
//     }
//     setStationLoading(true);
//     try {
//       const token = Cookies.get('token');
//       // 请求参数带上线路ID（两种方式：query参数或body，这里用query更符合查询场景）
//       const response = await fetch(`${apiConfig.getStationsByLine}?lineId=${lineId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setStations(data.data || []); // 假设后端返回格式：{code:200, data: [{stationId: 'station1', stationName: '站点1'}, ...]}
//       } else {
//         message.error(data.message || '获取站点列表失败');
//         setStations([]);
//       }
//     } catch (error) {
//       console.error('获取站点出错:', error);
//       message.error('站点请求错误');
//       setStations([]);
//     } finally {
//       setStationLoading(false);
//     }
//   };

//   // ---------------------- 原有：获取待办事项数据 ----------------------
//   const fetchTodos = async () => {
//     setLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setTodos(data.data);
//       } else {
//         message.error(data.message || `获取${typeMap[type]}数据失败`);
//       }
//     } catch (error) {
//       console.error('获取待办事项出错:', error);
//       message.error('请求错误');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------- 新增：线路选择变化处理 ----------------------
//   const handleLineChange = (value) => {
//     setCurrentLineId(value);
//     form.setFieldValue('stationId', ''); // 切换线路时清空站点选择
//     fetchStationsByLine(value); // 拉取当前线路的站点
//   };

//   // ---------------------- 生命周期：初始化数据 ----------------------
//   useEffect(() => {
//     fetchTodos(); // 加载待办数据
//     fetchLines(); // 加载线路数据（组件挂载时只加载一次）
//   }, [apiUrl]);

//   // ---------------------- 原有：打开编辑弹窗（新增站点加载逻辑） ----------------------
//   const openModal = (date, todo = null) => {
//     const dateStr = date.format('YYYY-MM-DD');
//     setCurrentTodo({ ...todo, date: dateStr });
//     const targetLineId = todo?.lineId || '';

//     // 1. 先设置当前线路ID
//     setCurrentLineId(targetLineId);
//     // 2. 如果有线路ID，先拉取对应站点，再设置表单值（避免站点选项不匹配）
//     if (targetLineId) {
//       fetchStationsByLine(targetLineId).then(() => {
//         form.setFieldsValue({
//           title: todo?.title || '',
//           content: todo?.content || '',
//           status: todo?.status || 'pending',
//           lineId: targetLineId,
//           stationId: todo?.stationId || ''
//         });
//       });
//     } else {
//       // 无线路ID时直接设置表单值
//       form.setFieldsValue({
//         title: todo?.title || '',
//         content: todo?.content || '',
//         status: todo?.status || 'pending',
//         lineId: '',
//         stationId: ''
//       });
//       setStations([]); // 清空站点列表
//     }

//     setModalVisible(true);
//   };

//   // ---------------------- 原有：保存待办事项 ----------------------
//   const saveTodo = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = Cookies.get('token');
//       const todoData = { ...currentTodo, ...values, type };

//       const response = await fetch(apiConfig.updateTodo, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(todoData)
//       });

//       const data = await response.json();
//       if (data.code === 200) {
//         message.success('保存成功');
//         setModalVisible(false);
//         fetchTodos();
//       } else {
//         message.error(data.message || '保存失败');
//       }
//     } catch (error) {
//       console.error('保存待办事项出错:', error);
//     }
//   };

//   // ---------------------- 原有：日历单元格渲染 ----------------------
//   const dateCellRender = (date) => {
//     const dateStr = date.format('YYYY-MM-DD');
//     const dayTodos = todos[dateStr] || [];
//     return (
//       <div>
//         {dayTodos.length > 0 && (
//           <div style={{ marginTop: 5 }}>
//             {dayTodos.slice(0, 2).map(todo => (
//               <div
//                 key={todo.id}
//                 style={{
//                   fontSize: 12,
//                   marginBottom: 2,
//                   color: todo.status === 'completed' ? '#52c41a' : '#1890ff',
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => openModal(date, todo)}
//               >
//                 {todo.title}
//               </div>
//             ))}
//             {dayTodos.length > 2 && (
//               <div style={{ fontSize: 12, color: '#888' }}>+{dayTodos.length - 2} 更多</div>
//             )}
//           </div>
//         )}
//         <Button
//           type="text"
//           size="small"
//           style={{ fontSize: 12, padding: 0, color: '#888' }}
//           onClick={() => openModal(date)}
//         >
//           添加
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Calendar dateCellRender={dateCellRender} loading={loading} />

//       <Modal
//         title={currentTodo?.id ? `编辑${typeMap[type]}事项` : `新增${typeMap[type]}事项`}
//         visible={modalVisible}
//         onOk={saveTodo}
//         onCancel={() => setModalVisible(false)}
//         destroyOnClose={true}
//         maskClosable={false}
//         width={600}
//       >
//         <Form form={form} layout="vertical">
//           {/* 标题 */}
//           <Form.Item
//             label="标题"
//             name="title"
//             rules={[{ required: true, message: '请输入标题' }]}
//           >
//             <Input placeholder={`请输入${typeMap[type]}标题`} />
//           </Form.Item>

//           {/* 线路选择（动态加载） */}
//           <Form.Item
//             label="线路"
//             name="lineId"
//             rules={[{ required: true, message: '请选择线路' }]}
//           >
//             <Select
//               placeholder="请选择线路"
//               onChange={handleLineChange} // 线路变化触发站点更新
//               loading={lineLoading} // 加载状态提示
//               showSearch
//               filterOption={(input, option) =>
//                 (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {lines.map(line => (
//                 <Option key={line.lineId} value={line.lineId}>
//                   {line.lineName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* 站点选择（根据线路动态加载） */}
//           <Form.Item
//             label="站点"
//             name="stationId"
//             rules={[{ required: true, message: '请选择站点' }]}
//             dependencies={['lineId']} // 依赖线路字段，线路变化时触发校验重置
//           >
//             <Select
//               placeholder="请先选择线路"
//               loading={stationLoading} // 加载状态提示
//               showSearch
//               filterOption={(input, option) =>
//                 (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
//               }
//               disabled={!currentLineId} // 未选线路时禁用站点选择
//             >
//               {stations.map(station => (
//                 <Option key={station.stationId} value={station.stationId}>
//                   {station.stationName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* 内容 */}
//           <Form.Item label="内容" name="content">
//             <TextArea rows={4} placeholder={`请输入${typeMap[type]}内容`} />
//           </Form.Item>

//           {/* 状态 */}
//           <Form.Item label="状态" name="status">
//             <Select placeholder="请选择状态" defaultValue="pending">
//               <Option value="pending">待处理</Option>
//               <Option value="processing">处理中</Option>
//               <Option value="completed">已完成</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default TodoCalendar;





// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';
// import { Calendar, Modal, Form, Select, Input, Button, message, Spin } from 'antd';
// const { TextArea } = Input;
// const { Option } = Select;

// const TodoCalendar = ({ apiUrl, type }) => {
//   const [todos, setTodos] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentTodo, setCurrentTodo] = useState(null);
//   const [form] = Form.useForm();

//   // 线路/站点相关状态
//   const [lines, setLines] = useState([]);
//   const [stations, setStations] = useState([]);
//   const [lineLoading, setLineLoading] = useState(false);
//   const [stationLoading, setStationLoading] = useState(false);
//   const [currentLineId, setCurrentLineId] = useState('');

//   // 类型映射
//   const typeMap = {
//     maintenance: '维保',
//     inspection: '巡检',
//     annual: '年检'
//   };

//   // 获取线路列表
//   const fetchLines = async () => {
//     setLineLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.getAllLines, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setLines(data.data || []);
//       } else {
//         message.error(data.message || '获取线路列表失败');
//         setLines([]);
//       }
//     } catch (error) {
//       console.error('获取线路出错:', error);
//       message.error('线路请求错误');
//       setLines([]);
//     } finally {
//       setLineLoading(false);
//     }
//   };

//   // 根据线路ID获取站点列表
//   const fetchStationsByLine = async (lineId) => {
//     if (!lineId) {
//       setStations([]);
//       return;
//     }
//     setStationLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(`${apiConfig.getStationsByLine}?lineId=${lineId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setStations(data.data || []);
//       } else {
//         message.error(data.message || '获取站点列表失败');
//         setStations([]);
//       }
//     } catch (error) {
//       console.error('获取站点出错:', error);
//       message.error('站点请求错误');
//       setStations([]);
//     } finally {
//       setStationLoading(false);
//     }
//   };

//   // 获取待办事项数据
//   const fetchTodos = async () => {
//     setLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         setTodos(data.data);
//       } else {
//         message.error(data.message || `获取${typeMap[type]}数据失败`);
//       }
//     } catch (error) {
//       console.error('获取待办事项出错:', error);
//       message.error('请求错误');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 线路选择变化处理
//   const handleLineChange = (value) => {
//     setCurrentLineId(value);
//     form.setFieldValue('stationId', '');
//     fetchStationsByLine(value);
//   };

//   // 初始化数据
//   useEffect(() => {
//     fetchTodos();
//     fetchLines();
//   }, [apiUrl]);

//   // 打开编辑弹窗
//   const openModal = (date, todo = null) => {
//     const dateStr = date.format('YYYY-MM-DD');
//     setCurrentTodo({ ...todo, date: dateStr });
//     const targetLineId = todo?.lineId || '';

//     setCurrentLineId(targetLineId);
//     if (targetLineId) {
//       fetchStationsByLine(targetLineId).then(() => {
//         form.setFieldsValue({
//           title: todo?.title || '',
//           content: todo?.content || '',
//           status: todo?.status || 'pending',
//           lineId: targetLineId,
//           stationId: todo?.stationId || ''
//         });
//       });
//     } else {
//       form.setFieldsValue({
//         title: todo?.title || '',
//         content: todo?.content || '',
//         status: todo?.status || 'pending',
//         lineId: '',
//         stationId: ''
//       });
//       setStations([]);
//     }

//     setModalVisible(true);
//   };

//   // 保存待办事项（核心修改部分）
//   const saveTodo = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = Cookies.get('token');
//       const todoData = { ...currentTodo, ...values, type };

//       const response = await fetch(apiConfig.updateTodo, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(todoData)
//       });

//       const data = await response.json();
//       if (data.code === 200) {
//         message.success('保存成功');
//         setModalVisible(false);
        
//         // 关键修改：手动更新本地状态，无需重新请求后端
//         const newTodo = data.data; // 后端返回的新创建/更新的待办对象
//         const targetDate = newTodo.date;
        
//         // 更新本地todos状态
//         setTodos(prevTodos => {
//           // 复制当前状态（避免直接修改状态）
//           const updatedTodos = { ...prevTodos };
          
//           if (currentTodo?.id) {
//             // 编辑现有待办：找到并替换
//             if (updatedTodos[targetDate]) {
//               updatedTodos[targetDate] = updatedTodos[targetDate].map(t => 
//                 t.id === newTodo.id ? newTodo : t
//               );
//             }
//           } else {
//             // 新增待办：添加到对应日期
//             if (!updatedTodos[targetDate]) {
//               updatedTodos[targetDate] = [];
//             }
//             updatedTodos[targetDate].push(newTodo);
//           }
//           return updatedTodos;
//         });
//       } else {
//         message.error(data.message || '保存失败');
//       }
//     } catch (error) {
//       console.error('保存待办事项出错:', error);
//     }
//   };

//   // 日历单元格渲染
//   const dateCellRender = (date) => {
//     const dateStr = date.format('YYYY-MM-DD');
//     const dayTodos = todos[dateStr] || [];
//     return (
//       <div>
//         {dayTodos.length > 0 && (
//           <div style={{ marginTop: 5 }}>
//             {dayTodos.slice(0, 2).map(todo => (
//               <div
//                 key={todo.id}
//                 style={{
//                   fontSize: 12,
//                   marginBottom: 2,
//                   color: todo.status === 'completed' ? '#52c41a' : '#1890ff',
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => openModal(date, todo)}
//               >
//                 {todo.title}
//               </div>
//             ))}
//             {dayTodos.length > 2 && (
//               <div style={{ fontSize: 12, color: '#888' }}>+{dayTodos.length - 2} 更多</div>
//             )}
//           </div>
//         )}
//         <Button
//           type="text"
//           size="small"
//           style={{ fontSize: 12, padding: 0, color: '#888' }}
//           onClick={() => openModal(date)}
//         >
//           添加
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Calendar dateCellRender={dateCellRender} loading={loading} />

//       <Modal
//         title={currentTodo?.id ? `编辑${typeMap[type]}事项` : `新增${typeMap[type]}事项`}
//         visible={modalVisible}
//         onOk={saveTodo}
//         onCancel={() => setModalVisible(false)}
//         destroyOnClose={true}
//         maskClosable={false}
//         width={600}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="标题"
//             name="title"
//             rules={[{ required: true, message: '请输入标题' }]}
//           >
//             <Input placeholder={`请输入${typeMap[type]}标题`} />
//           </Form.Item>

//           <Form.Item
//             label="线路"
//             name="lineId"
//             rules={[{ required: true, message: '请选择线路' }]}
//           >
//             <Select
//               placeholder="请选择线路"
//               onChange={handleLineChange}
//               loading={lineLoading}
//               showSearch
//               filterOption={(input, option) =>
//                 (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
//               }
//             >
//               {lines.map(line => (
//                 <Option key={line.lineId} value={line.lineId}>
//                   {line.lineName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="站点"
//             name="stationId"
//             rules={[{ required: true, message: '请选择站点' }]}
//             dependencies={['lineId']}
//           >
//             <Select
//               placeholder="请先选择线路"
//               loading={stationLoading}
//               showSearch
//               filterOption={(input, option) =>
//                 (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
//               }
//               disabled={!currentLineId}
//             >
//               {stations.map(station => (
//                 <Option key={station.stationId} value={station.stationId}>
//                   {station.stationName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item label="内容" name="content">
//             <TextArea rows={4} placeholder={`请输入${typeMap[type]}内容`} />
//           </Form.Item>

//           <Form.Item label="状态" name="status">
//             <Select placeholder="请选择状态" defaultValue="pending">
//               <Option value="pending">待处理</Option>
//               <Option value="processing">处理中</Option>
//               <Option value="completed">已完成</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default TodoCalendar;






import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiConfig from '../apiConfig';
import { Calendar, Modal, Form, Select, Input, Button, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const TodoCalendar = ({ apiUrl, type }) => {
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [form] = Form.useForm();

  // 线路/站点相关状态
  const [lines, setLines] = useState([]);
  const [stations, setStations] = useState([]);
  const [lineLoading, setLineLoading] = useState(false);
  const [stationLoading, setStationLoading] = useState(false);
  const [currentLineId, setCurrentLineId] = useState('');

  // 类型映射
  const typeMap = {
    maintenance: '维保',
    inspection: '巡检',
    annual: '年检'
  };

  // 获取线路列表
  const fetchLines = async () => {
    setLineLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.getAllLines, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      if (data.code === 200) {
        setLines(data.data || []);
      } else {
        message.error(data.message || '获取线路列表失败');
        setLines([]);
      }
    } catch (error) {
      console.error('获取线路出错:', error);
      message.error('线路请求错误');
      setLines([]);
    } finally {
      setLineLoading(false);
    }
  };

  // 根据线路ID获取站点列表
  const fetchStationsByLine = async (lineId) => {
    if (!lineId) {
      setStations([]);
      return;
    }
    setStationLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${apiConfig.getStationsByLine}?lineId=${lineId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      if (data.code === 200) {
        setStations(data.data || []);
      } else {
        message.error(data.message || '获取站点列表失败');
        setStations([]);
      }
    } catch (error) {
      console.error('获取站点出错:', error);
      message.error('站点请求错误');
      setStations([]);
    } finally {
      setStationLoading(false);
    }
  };

  // 获取待办事项数据
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.json();
      if (data.code === 200) {
        setTodos(data.data);
      } else {
        message.error(data.message || `获取${typeMap[type]}数据失败`);
      }
    } catch (error) {
      console.error('获取待办事项出错:', error);
      message.error('请求错误');
    } finally {
      setLoading(false);
    }
  };

  // 线路选择变化处理
  const handleLineChange = (value) => {
    setCurrentLineId(value);
    form.setFieldValue('stationId', '');
    fetchStationsByLine(value);
  };

  // 初始化数据
  useEffect(() => {
    fetchTodos();
    fetchLines();
  }, [apiUrl]);

  // 打开编辑弹窗
  const openModal = (date, todo = null) => {
    const dateStr = date.format('YYYY-MM-DD');
    setCurrentTodo({ ...todo, date: dateStr });
    const targetLineId = todo?.lineId || '';

    setCurrentLineId(targetLineId);
    if (targetLineId) {
      fetchStationsByLine(targetLineId).then(() => {
        form.setFieldsValue({
          title: todo?.title || '',
          content: todo?.content || '',
          status: todo?.status || 'pending',
          lineId: targetLineId,
          stationId: todo?.stationId || ''
        });
      });
    } else {
      form.setFieldsValue({
        title: todo?.title || '',
        content: todo?.content || '',
        status: todo?.status || 'pending',
        lineId: '',
        stationId: ''
      });
      setStations([]);
    }

    setModalVisible(true);
  };

  // 保存待办事项
  const saveTodo = async () => {
    try {
      const values = await form.validateFields();
      const token = Cookies.get('token');
      const todoData = { ...currentTodo, ...values, type };

      const response = await fetch(apiConfig.updateTodo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(todoData)
      });

      const data = await response.json();
      if (data.code === 200) {
        message.success('保存成功');
        setModalVisible(false);

        const newTodo = data.data;
        const targetDate = newTodo.date;

        setTodos(prevTodos => {
          const updatedTodos = { ...prevTodos };

          if (currentTodo?.id) {
            if (updatedTodos[targetDate]) {
              updatedTodos[targetDate] = updatedTodos[targetDate].map(t =>
                t.id === newTodo.id ? newTodo : t
              );
            }
          } else {
            if (!updatedTodos[targetDate]) {
              updatedTodos[targetDate] = [];
            }
            updatedTodos[targetDate].push(newTodo);
          }
          return updatedTodos;
        });
      } else {
        message.error(data.message || '保存失败');
      }
    } catch (error) {
      console.error('保存待办事项出错:', error);
    }
  };

  // 日历单元格渲染（日视图）
  const dateCellRender = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayTodos = todos[dateStr] || [];
    return (
      <div>
        {dayTodos.length > 0 && (
          <div style={{ marginTop: 5 }}>
            {dayTodos.slice(0, 2).map(todo => (
              <div
                key={todo.id}
                style={{
                  fontSize: 12,
                  marginBottom: 2,
                  color: todo.status === 'completed' ? '#52c41a' : '#1890ff',
                  cursor: 'pointer'
                }}
                onClick={() => openModal(date, todo)}
              >
                {todo.title}
              </div>
            ))}
            {dayTodos.length > 2 && (
              <div style={{ fontSize: 12, color: '#888' }}>+{dayTodos.length - 2} 更多</div>
            )}
          </div>
        )}
        <Button
          type="text"
          size="small"
          style={{ fontSize: 12, padding: 0, color: '#888' }}
          onClick={() => openModal(date)}
        >
          添加
        </Button>
      </div>
    );
  };

  // 月视图格子渲染（year 模式）
  const monthCellRender = (date) => {
    const monthStr = date.format('YYYY-MM');
    const monthTodos = Object.entries(todos)
      .filter(([day]) => day.startsWith(monthStr))
      .flatMap(([_, list]) => list);

    if (monthTodos.length === 0) return null;

    const statusCount = monthTodos.reduce(
      (acc, todo) => {
        acc[todo.status] = (acc[todo.status] || 0) + 1;
        return acc;
      },
      {}
    );

    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12 }}>
        <li style={{ color: '#1890ff' }}>总数: {monthTodos.length}</li>
        {statusCount.pending && (
          <li style={{ color: '#faad14' }}>待处理: {statusCount.pending}</li>
        )}
        {statusCount.processing && (
          <li style={{ color: '#1890ff' }}>处理中: {statusCount.processing}</li>
        )}
        {statusCount.completed && (
          <li style={{ color: '#52c41a' }}>已完成: {statusCount.completed}</li>
        )}
      </ul>
    );
  };

  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        loading={loading}
      />

      <Modal
        title={currentTodo?.id ? `编辑${typeMap[type]}事项` : `新增${typeMap[type]}事项`}
        visible={modalVisible}
        onOk={saveTodo}
        onCancel={() => setModalVisible(false)}
        destroyOnClose={true}
        maskClosable={false}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder={`请输入${typeMap[type]}标题`} />
          </Form.Item>

          <Form.Item
            label="线路"
            name="lineId"
            rules={[{ required: true, message: '请选择线路' }]}
          >
            <Select
              placeholder="请选择线路"
              onChange={handleLineChange}
              loading={lineLoading}
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {lines.map(line => (
                <Option key={line.lineId} value={line.lineId}>
                  {line.lineName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="站点"
            name="stationId"
            rules={[{ required: true, message: '请选择站点' }]}
            dependencies={['lineId']}
          >
            <Select
              placeholder="请先选择线路"
              loading={stationLoading}
              showSearch
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
              disabled={!currentLineId}
            >
              {stations.map(station => (
                <Option key={station.stationId} value={station.stationId}>
                  {station.stationName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="内容" name="content">
            <TextArea rows={4} placeholder={`请输入${typeMap[type]}内容`} />
          </Form.Item>

          <Form.Item label="状态" name="status">
            <Select placeholder="请选择状态" defaultValue="pending">
              <Option value="pending">待处理</Option>
              <Option value="processing">处理中</Option>
              <Option value="completed">已完成</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoCalendar;
