// // src/components/AlarmWarningTable.js
// import React, { useState, useEffect } from 'react';
// import { 
//   Table, Button, Form, Input, DatePicker, Select, 
//   Modal, message, Popconfirm, Space, Tag, Typography,
//   Card, Row, Col, Divider
// } from 'antd';
// import { 
//   EditOutlined, DownloadOutlined, EyeOutlined 
// } from '@ant-design/icons';
// import Cookies from 'js-cookie';
// import moment from 'moment';
// import apiConfig from '../apiConfig';
// import { exportCSV } from '../utils/export'; // 假设存在CSV导出工具函数

// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
// const { Title, Text } = Typography;

// // 通用的告警/预警表格组件
// const AlarmWarningTable = ({ apiUrl, updateApiUrl, title }) => {
//   // 状态管理
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [searchForm] = Form.useForm();
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [viewVisible, setViewVisible] = useState(false);
//   const [stations, setStations] = useState([]);

//   // 获取站点列表
//   const fetchStations = async () => {
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.getAllStations, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const result = await response.json();
//       if (result.code === 200) {
//         console.log("站点数据：", result.data);
//         setStations(result.data || []);
//       }
//     } catch (error) {
//       console.error('获取站点列表失败:', error);
//     }
//   };

//   // 获取数据列表
//   const fetchData = async (params = {}) => {
//     setLoading(true);
//     try {
//       const token = Cookies.get('token');
//       // 构建查询参数
//       const queryParams = new URLSearchParams();
//       Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== '') {
//           queryParams.append(key, value);
//         }
//       });

//       const url = queryParams.toString() 
//         ? `${apiUrl}?${queryParams.toString()}` 
//         : apiUrl;

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
      
//       const result = await response.json();
//       if (result.code === 200) {
//         setData(result.data || []);
//       } else {
//         message.error(result.message || `获取${title}数据失败`);
//       }
//     } catch (error) {
//       console.error(`获取${title}数据出错:`, error);
//       message.error('请求失败，请重试');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 初始化
//   useEffect(() => {
//     fetchStations();
//     fetchData();
//   }, [apiUrl]);

//   // 搜索处理
//   const handleSearch = async () => {
//     try {
//       const values = await searchForm.validateFields();
//       // 处理日期范围
//       const params = { ...values };
//       if (values.dateRange && values.dateRange.length === 2) {
//         params.startDate = values.dateRange[0].format('YYYY-MM-DD');
//         params.endDate = values.dateRange[1].format('YYYY-MM-DD');
//       }
//       delete params.dateRange;
      
//       fetchData(params);
//     } catch (error) {
//       console.error('搜索参数验证失败:', error);
//     }
//   };

//   // 重置搜索
//   const handleReset = () => {
//     searchForm.resetFields();
//     fetchData();
//   };

//   // 导出CSV
//   const handleExport = () => {
//     if (data.length === 0) {
//       message.warning('没有数据可导出');
//       return;
//     }
    
//     // 准备导出数据
//     const exportData = data.map((item, index) => ({
//       '序号': index + 1,
//       '车站': item.stationName || '',
//       '上下行': item.direction === 'up' ? '上行' : '下行',
//       '设备编号': item.equipmentId || '',
//       '故障内容': item.faultContent || '',
//       '日期': item.date || '',
//       '处理状态': item.status === 'processed' ? '已处理' : '未处理'
//     }));
    
//     exportCSV(exportData, `${title}_${moment().format('YYYYMMDD')}`);
//   };

//   // 查看处理详情
//   const handleView = (record) => {
//     setCurrentRecord(record);
//     setViewVisible(true);
//   };

//   // 编辑处理
//   const handleEdit = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue({
//       processingTime: record.processingTime ? moment(record.processingTime) : null,
//       processingMethod: record.processingMethod || '',
//       processingResult: record.processingResult || ''
//     });
//     setVisible(true);
//   };

//   // 保存处理结果
//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = Cookies.get('token');
      
//       // 准备提交数据
//       const updateData = {
//         id: currentRecord.id,
//         status: 'processed',
//         processingTime: values.processingTime.format('YYYY-MM-DD HH:mm:ss'),
//         processingMethod: values.processingMethod,
//         processingResult: values.processingResult
//       };
      
//       const response = await fetch(updateApiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(updateData)
//       });
      
//       const result = await response.json();
//       if (result.code === 200) {
//         message.success('处理成功');
//         setVisible(false);
//         // 重新获取数据
//         fetchData();
//       } else {
//         message.error(result.message || '处理失败');
//       }
//     } catch (error) {
//       console.error('保存处理结果失败:', error);
//     }
//   };

//   // 表格列定义
//   const columns = [
//     {
//       title: '序号',
//       key: 'index',
//       render: (_, __, index) => index + 1
//     },
//     {
//       title: '车站',
//       dataIndex: 'stationName',
//       key: 'stationName',
//       filterDropdown: () => (
//         <div style={{ padding: 8 }}>
//           <Select
//             placeholder="选择车站"
//             style={{ width: '100%' }}
//             onChange={(value) => {
//               fetchData({ stationId: value });
//             }}
//             allowClear
//           >
//             {stations.map(station => (
//               <Option key={station.stationId} value={station.stationId}>
//                 {station.stationName}
//               </Option>
//             ))}
//           </Select>
//         </div>
//       )
//     },
//     {
//       title: '上下行',
//       dataIndex: 'direction',
//       key: 'direction',
//       render: (direction) => (
//         <Tag color={direction === 'up' ? 'blue' : 'orange'}>
//           {direction === 'up' ? '上行' : '下行'}
//         </Tag>
//       ),
//       filters: [
//         { text: '上行', value: 'up' },
//         { text: '下行', value: 'down' }
//       ],
//       onFilter: (value, record) => record.direction === value
//     },
//     {
//       title: '设备编号',
//       dataIndex: 'equipmentId',
//       key: 'equipmentId'
//     },
//     {
//       title: '故障内容',
//       dataIndex: 'faultContent',
//       key: 'faultContent'
//     },
//     {
//       title: '日期',
//       dataIndex: 'date',
//       key: 'date'
//     },
//     {
//       title: '处理状态',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'processed' ? 'green' : 'red'}>
//           {status === 'processed' ? '已处理' : '未处理'}
//         </Tag>
//       ),
//       filters: [
//         { text: '已处理', value: 'processed' },
//         { text: '未处理', value: 'unprocessed' }
//       ],
//       onFilter: (value, record) => record.status === value
//     },
//     {
//       title: '操作',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           {record.status === 'processed' ? (
//             <Button 
//               type="text" 
//               icon={<EyeOutlined />} 
//               onClick={() => handleView(record)}
//             >
//               查看处理
//             </Button>
//           ) : (
//             <Button 
//               type="text" 
//               icon={<EditOutlined />} 
//               onClick={() => handleEdit(record)}
//             >
//               处理
//             </Button>
//           )}
//         </Space>
//       )
//     }
//   ];

//   return (
//     <Card>
//       <div style={{ marginBottom: 16 }}>
//         <Row gutter={[16, 16]} align="middle">
//           <Col span={18}>
//             <Form form={searchForm} layout="inline" onFinish={handleSearch}>
//               <Form.Item name="dateRange" label="时间"
//               style={{ width: 250 }}>
//                 <RangePicker />
//               </Form.Item>
//               <Form.Item name="stationId" label="车站">
//                 <Select placeholder="选择车站" allowClear>
//                   {stations.map(station => (
//                     <Option key={station.stationId} value={station.stationId}>
//                       {station.stationName}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item name="equipmentId" label="设备编号">
//                 <Input placeholder="输入设备编号" allowClear 
//                 style={{ width: 130 }}/>
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">搜索</Button>
//               </Form.Item>
//               <Form.Item>
//                 <Button onClick={handleReset}>重置</Button>
//               </Form.Item>
//             </Form>
//           </Col>
//           <Col span={6} style={{ textAlign: 'right' }}>
//             <Button 
//               type="primary" 
//               icon={<DownloadOutlined />} 
//               onClick={handleExport}
//             >
//               导出CSV
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={data}
//         rowKey="id"
//         loading={loading}
//         pagination={{ pageSize: 10 }}
//       />

//       {/* 处理编辑弹窗 */}
//       <Modal
//         title="处理记录"
//         visible={visible}
//         onOk={handleSave}
//         onCancel={() => setVisible(false)}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item 
//             name="processingTime" 
//             label="处理时间" 
//             rules={[{ required: true, message: '请选择处理时间' }]}
//           >
//             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//           </Form.Item>
//           <Form.Item 
//             name="processingMethod" 
//             label="处理方式" 
//             rules={[{ required: true, message: '请输入处理方式' }]}
//           >
//             <TextArea rows={3} placeholder="请输入处理方式" />
//           </Form.Item>
//           <Form.Item 
//             name="processingResult" 
//             label="处理结果" 
//             rules={[{ required: true, message: '请输入处理结果' }]}
//           >
//             <TextArea rows={3} placeholder="请输入处理结果" />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* 查看处理详情弹窗 */}
//       <Modal
//         title="处理详情"
//         visible={viewVisible}
//         onCancel={() => setViewVisible(false)}
//         footer={null}
//         destroyOnClose
//       >
//         {currentRecord && (
//           <div>
//             <p><strong>车站：</strong>{currentRecord.stationName}</p>
//             <p><strong>设备编号：</strong>{currentRecord.equipmentId}</p>
//             <p><strong>故障内容：</strong>{currentRecord.faultContent}</p>
//             <Divider />
//             <p><strong>处理时间：</strong>{currentRecord.processingTime}</p>
//             <p><strong>处理方式：</strong>{currentRecord.processingMethod}</p>
//             <p><strong>处理结果：</strong>{currentRecord.processingResult}</p>
//           </div>
//         )}
//       </Modal>
//     </Card>
//   );
// };

// export default AlarmWarningTable;



// src/components/AlarmWarningTable.js
// import React, { useState, useEffect } from 'react';
// import { 
//   Table, Button, Form, Input, DatePicker, Select, 
//   Modal, message, Popconfirm, Space, Tag, Typography,
//   Card, Row, Col, Divider
// } from 'antd';
// import { 
//   EditOutlined, DownloadOutlined, EyeOutlined, ExclamationCircleOutlined
// } from '@ant-design/icons';
// import Cookies from 'js-cookie';
// import moment from 'moment';
// import apiConfig from '../apiConfig';
// import { exportCSV } from '../utils/export'; // 假设存在CSV导出工具函数

// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
// const { Title, Text } = Typography;

// // 通用的告警/预警表格组件
// const AlarmWarningTable = ({ apiUrl, updateApiUrl, title }) => {
//   // 状态管理
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [searchForm] = Form.useForm();
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const [viewVisible, setViewVisible] = useState(false);
//   const [stations, setStations] = useState([]);

//   // 获取站点列表
//   const fetchStations = async () => {
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.getAllStations, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
//       const result = await response.json();
//       if (result.code === 200) {
//         console.log("站点数据：", result.data);
//         setStations(result.data || []);
//       }
//     } catch (error) {
//       console.error('获取站点列表失败:', error);
//     }
//   };

//   // 获取数据列表
//   const fetchData = async (params = {}) => {
//     setLoading(true);
//     try {
//       const token = Cookies.get('token');
//       // 构建查询参数
//       const queryParams = new URLSearchParams();
//       Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== '') {
//           queryParams.append(key, value);
//         }
//       });

//       const url = queryParams.toString() 
//         ? `${apiUrl}?${queryParams.toString()}` 
//         : apiUrl;

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         }
//       });
      
//       const result = await response.json();
//       if (result.code === 200) {
//         setData(result.data || []);
//       } else {
//         message.error(result.message || `获取${title}数据失败`);
//       }
//     } catch (error) {
//       console.error(`获取${title}数据出错:`, error);
//       message.error('请求失败，请重试');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 初始化
//   useEffect(() => {
//     fetchStations();
//     fetchData();
//   }, [apiUrl]);

//   // 搜索处理
//   const handleSearch = async () => {
//     try {
//       const values = await searchForm.validateFields();
//       // 处理日期范围
//       const params = { ...values };
//       if (values.dateRange && values.dateRange.length === 2) {
//         params.startDate = values.dateRange[0].format('YYYY-MM-DD');
//         params.endDate = values.dateRange[1].format('YYYY-MM-DD');
//       }
//       delete params.dateRange;
      
//       fetchData(params);
//     } catch (error) {
//       console.error('搜索参数验证失败:', error);
//     }
//   };

//   // 重置搜索
//   const handleReset = () => {
//     searchForm.resetFields();
//     fetchData();
//   };

//   // 导出CSV
//   const handleExport = () => {
//     if (data.length === 0) {
//       message.warning('没有数据可导出');
//       return;
//     }
    
//     // 准备导出数据
//     const exportData = data.map((item, index) => ({
//       '序号': index + 1,
//       '车站': item.stationName || '',
//       '上下行': item.direction === 'up' ? '上行' : '下行',
//       '设备编号': item.equipmentId || '',
//       '故障内容': item.faultContent || '',
//       '日期': item.date || '',
//       '处理状态': item.status === 'processed' ? '已处理' : (item.status === 'false_positive' ? '误报' : '未处理')
//     }));
    
//     exportCSV(exportData, `${title}_${moment().format('YYYYMMDD')}`);
//   };

//   // 查看处理详情
//   const handleView = (record) => {
//     setCurrentRecord(record);
//     setViewVisible(true);
//   };

//   // 编辑处理（打开弹窗）
//   const handleEdit = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue({
//       status: record.status || 'unprocessed',
//       processingTime: record.processingTime ? moment(record.processingTime) : null,
//       processingMethod: record.processingMethod || '',
//       processingResult: record.processingResult || ''
//     });
//     setVisible(true);
//   };

//   // 直接标记为误报的快捷操作
//   const handleMarkFalse = async (record) => {
//     try {
//       const token = Cookies.get('token');
//       // 如果需要后端记录处理时间或处理结果，这里可以传入相应字段
//       const updateData = {
//         id: record.id,
//         status: 'false_positive',
//         // 可选：记录标记时间或说明
//         processingTime: moment().format('YYYY-MM-DD HH:mm:ss'),
//         processingMethod: '标记为误报',
//         processingResult: '误报'
//       };
//       const response = await fetch(updateApiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(updateData)
//       });
//       const result = await response.json();
//       if (result.code === 200) {
//         message.success('已标记为误报');
//         fetchData();
//       } else {
//         message.error(result.message || '标记失败');
//       }
//     } catch (error) {
//       console.error('标记误报失败:', error);
//       message.error('标记失败，请重试');
//     }
//   };

//   // 保存处理结果（含状态）
//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields();
//       const token = Cookies.get('token');
      
//       // 准备提交数据
//       const updateData = {
//         id: currentRecord.id,
//         status: values.status || 'processed',
//         processingTime: values.processingTime ? values.processingTime.format('YYYY-MM-DD HH:mm:ss') : null,
//         processingMethod: values.processingMethod,
//         processingResult: values.processingResult
//       };
      
//       const response = await fetch(updateApiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(updateData)
//       });
      
//       const result = await response.json();
//       if (result.code === 200) {
//         message.success('处理成功');
//         setVisible(false);
//         // 重新获取数据
//         fetchData();
//       } else {
//         message.error(result.message || '处理失败');
//       }
//     } catch (error) {
//       console.error('保存处理结果失败:', error);
//       message.error('保存失败，请重试');
//     }
//   };

//   // 表格列定义
//   const columns = [
//     {
//       title: '序号',
//       key: 'index',
//       render: (_, __, index) => index + 1
//     },
//     {
//       title: '车站',
//       dataIndex: 'stationName',
//       key: 'stationName',
//       filterDropdown: () => (
//         <div style={{ padding: 8 }}>
//           <Select
//             placeholder="选择车站"
//             style={{ width: '100%' }}
//             onChange={(value) => {
//               fetchData({ stationId: value });
//             }}
//             allowClear
//           >
//             {stations.map(station => (
//               <Option key={station.stationId} value={station.stationId}>
//                 {station.stationName}
//               </Option>
//             ))}
//           </Select>
//         </div>
//       )
//     },
//     {
//       title: '上下行',
//       dataIndex: 'direction',
//       key: 'direction',
//       render: (direction) => (
//         <Tag color={direction === 'up' ? 'blue' : 'orange'}>
//           {direction === 'up' ? '上行' : '下行'}
//         </Tag>
//       ),
//       filters: [
//         { text: '上行', value: 'up' },
//         { text: '下行', value: 'down' }
//       ],
//       onFilter: (value, record) => record.direction === value
//     },
//     {
//       title: '设备编号',
//       dataIndex: 'equipmentId',
//       key: 'equipmentId'
//     },
//     {
//       title: '故障内容',
//       dataIndex: 'faultContent',
//       key: 'faultContent'
//     },
//     {
//       title: '日期',
//       dataIndex: 'date',
//       key: 'date'
//     },
//     {
//       title: '处理状态',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => {
//         if (status === 'processed') {
//           return <Tag color="green">已处理</Tag>;
//         } else if (status === 'false_positive') {
//           return <Tag color="default">误报</Tag>;
//         } else {
//           return <Tag color="red">未处理</Tag>;
//         }
//       },
//       filters: [
//         { text: '已处理', value: 'processed' },
//         { text: '未处理', value: 'unprocessed' },
//         { text: '误报', value: 'false_positive' }
//       ],
//       onFilter: (value, record) => record.status === value
//     },
//     {
//       title: '操作',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           {record.status === 'processed' ? (
//             <Button 
//               type="text" 
//               icon={<EyeOutlined />} 
//               onClick={() => handleView(record)}
//             >
//               查看处理
//             </Button>
//           ) : (
//             <>
//               <Button 
//                 type="text" 
//                 icon={<EditOutlined />} 
//                 onClick={() => handleEdit(record)}
//               >
//                 处理
//               </Button>

//               {/* 快捷标记为误报（确认） */}
//               <Popconfirm
//                 title="确认将该条标记为误报？"
//                 icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
//                 onConfirm={() => handleMarkFalse(record)}
//                 okText="是"
//                 cancelText="否"
//               >
//                 <Button type="text">标记为误报</Button>
//               </Popconfirm>
//             </>
//           )}
//         </Space>
//       )
//     }
//   ];

//   return (
//     <Card>
//       <div style={{ marginBottom: 16 }}>
//         <Row gutter={[16, 16]} align="middle">
//           <Col span={18}>
//             <Form form={searchForm} layout="inline" onFinish={handleSearch}>
//               <Form.Item name="dateRange" label="时间"
//               style={{ width: 250 }}>
//                 <RangePicker />
//               </Form.Item>
//               <Form.Item name="stationId" label="车站">
//                 <Select placeholder="选择车站" allowClear>
//                   {stations.map(station => (
//                     <Option key={station.stationId} value={station.stationId}>
//                       {station.stationName}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item name="equipmentId" label="设备编号">
//                 <Input placeholder="输入设备编号" allowClear 
//                 style={{ width: 130 }}/>
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">搜索</Button>
//               </Form.Item>
//               <Form.Item>
//                 <Button onClick={handleReset}>重置</Button>
//               </Form.Item>
//             </Form>
//           </Col>
//           <Col span={6} style={{ textAlign: 'right' }}>
//             <Button 
//               type="primary" 
//               icon={<DownloadOutlined />} 
//               onClick={handleExport}
//             >
//               导出CSV
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={data}
//         rowKey="id"
//         loading={loading}
//         pagination={{ pageSize: 10 }}
//       />

//       {/* 处理编辑弹窗 */}
//       <Modal
//         title="处理记录"
//         visible={visible}
//         onOk={handleSave}
//         onCancel={() => setVisible(false)}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item 
//             name="status"
//             label="处理状态"
//             rules={[{ required: true, message: '请选择处理状态' }]}
//           >
//             <Select>
//               <Option value="processed">已处理</Option>
//               <Option value="unprocessed">未处理</Option>
//               <Option value="false_positive">误报</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item 
//             name="processingTime" 
//             label="处理时间" 
//             rules={[{ required: false, message: '请选择处理时间' }]}
//           >
//             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//           </Form.Item>
//           <Form.Item 
//             name="processingMethod" 
//             label="处理方式" 
//             rules={[{ required: false, message: '请输入处理方式' }]}
//           >
//             <TextArea rows={3} placeholder="请输入处理方式" />
//           </Form.Item>
//           <Form.Item 
//             name="processingResult" 
//             label="处理结果" 
//             rules={[{ required: false, message: '请输入处理结果' }]}
//           >
//             <TextArea rows={3} placeholder="请输入处理结果" />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* 查看处理详情弹窗 */}
//       <Modal
//         title="处理详情"
//         visible={viewVisible}
//         onCancel={() => setViewVisible(false)}
//         footer={null}
//         destroyOnClose
//       >
//         {currentRecord && (
//           <div>
//             <p><strong>车站：</strong>{currentRecord.stationName || '-'}</p>
//             <p><strong>设备编号：</strong>{currentRecord.equipmentId || '-'}</p>
//             <p><strong>故障内容：</strong>{currentRecord.faultContent || '-'}</p>
//             <p><strong>处理状态：</strong>{
//               currentRecord.status === 'processed' ? '已处理' : (currentRecord.status === 'false_positive' ? '误报' : '未处理')
//             }</p>
//             <Divider />
//             <p><strong>处理时间：</strong>{currentRecord.processingTime || '-'}</p>
//             <p><strong>处理方式：</strong>{currentRecord.processingMethod || '-'}</p>
//             <p><strong>处理结果：</strong>{currentRecord.processingResult || '-'}</p>
//           </div>
//         )}
//       </Modal>
//     </Card>
//   );
// };

// export default AlarmWarningTable;





import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Form, Input, DatePicker, Select, 
  Modal, message, Popconfirm, Space, Tag, Typography,
  Card, Row, Col, Divider
} from 'antd';
import { 
  EditOutlined, DownloadOutlined, EyeOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import moment from 'moment';
import apiConfig from '../apiConfig';
import { exportCSV } from '../utils/export'; // 假设存在CSV导出工具函数

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title, Text } = Typography;

// 通用的告警/预警表格组件
const AlarmWarningTable = ({ apiUrl, updateApiUrl, title }) => {
  // 状态管理
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [stations, setStations] = useState([]);

  // 获取站点列表
  const fetchStations = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.getAllStations, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        console.log("站点数据：", result.data);
        setStations(result.data || []);
      }
    } catch (error) {
      console.error('获取站点列表失败:', error);
    }
  };

  // 获取数据列表
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      // 构建查询参数
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });

      const url = queryParams.toString() 
        ? `${apiUrl}?${queryParams.toString()}` 
        : apiUrl;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      
      const result = await response.json();
      if (result.code === 200) {
        setData(result.data || []);
      } else {
        message.error(result.message || `获取${title}数据失败`);
      }
    } catch (error) {
      console.error(`获取${title}数据出错:`, error);
      message.error('请求失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 初始化
  useEffect(() => {
    fetchStations();
    fetchData();
  }, [apiUrl]);

  // 搜索处理
  const handleSearch = async () => {
    try {
      const values = await searchForm.validateFields();
      // 处理日期范围
      const params = { ...values };
      if (values.dateRange && values.dateRange.length === 2) {
        params.startDate = values.dateRange[0].format('YYYY-MM-DD');
        params.endDate = values.dateRange[1].format('YYYY-MM-DD');
      }
      delete params.dateRange;
      
      fetchData(params);
    } catch (error) {
      console.error('搜索参数验证失败:', error);
    }
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchData();
  };

  // 导出CSV
  const handleExport = () => {
    if (data.length === 0) {
      message.warning('没有数据可导出');
      return;
    }
    
    // 准备导出数据
    const exportData = data.map((item, index) => ({
      '序号': index + 1,
      '车站': item.stationName || '',
      '上下行': item.direction === 'up' ? '上行' : '下行',
      '设备编号': item.equipmentId || '',
      '故障内容': item.faultContent || '',
      '日期': item.date || '',
      '处理状态': item.status === 'processed' ? '已处理' : (item.status === 'false_positive' ? '误报' : '未处理')
    }));
    
    exportCSV(exportData, `${title}_${moment().format('YYYYMMDD')}`);
  };

  // 查看处理详情
  const handleView = (record) => {
    setCurrentRecord(record);
    setViewVisible(true);
  };

  // 编辑处理（打开弹窗）
  const handleEdit = (record) => {
    // 如果从查看弹窗点编辑，先关闭查看弹窗避免模态层叠
    setViewVisible(false);

    setCurrentRecord(record);
    form.setFieldsValue({
      status: record.status || 'unprocessed',
      processingTime: record.processingTime ? moment(record.processingTime) : null,
      processingMethod: record.processingMethod || '',
      processingResult: record.processingResult || ''
    });
    setVisible(true);
  };

  // 直接标记为误报的快捷操作
  const handleMarkFalse = async (record) => {
    try {
      const token = Cookies.get('token');
      // 如果需要后端记录处理时间或处理结果，这里可以传入相应字段
      const updateData = {
        id: record.id,
        status: 'false_positive',
        // 可选：记录标记时间或说明
        processingTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        processingMethod: '标记为误报',
        processingResult: '误报'
      };
      const response = await fetch(updateApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(updateData)
      });
      const result = await response.json();
      if (result.code === 200) {
        message.success('已标记为误报');
        fetchData();
      } else {
        message.error(result.message || '标记失败');
      }
    } catch (error) {
      console.error('标记误报失败:', error);
      message.error('标记失败，请重试');
    }
  };

  // 保存处理结果（含状态）
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const token = Cookies.get('token');
      
      // 准备提交数据
      const updateData = {
        id: currentRecord.id,
        status: values.status || 'processed',
        processingTime: values.processingTime ? values.processingTime.format('YYYY-MM-DD HH:mm:ss') : null,
        processingMethod: values.processingMethod,
        processingResult: values.processingResult
      };
      
      const response = await fetch(updateApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(updateData)
      });
      
      const result = await response.json();
      if (result.code === 200) {
        message.success('处理成功');
        setVisible(false);
        // 重新获取数据
        fetchData();
      } else {
        message.error(result.message || '处理失败');
      }
    } catch (error) {
      console.error('保存处理结果失败:', error);
      message.error('保存失败，请重试');
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (_, __, index) => index + 1
    },
    {
      title: '车站',
      dataIndex: 'stationName',
      key: 'stationName',
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Select
            placeholder="选择车站"
            style={{ width: '100%' }}
            onChange={(value) => {
              fetchData({ stationId: value });
            }}
            allowClear
          >
            {stations.map(station => (
              <Option key={station.stationId} value={station.stationId}>
                {station.stationName}
              </Option>
            ))}
          </Select>
        </div>
      )
    },
    {
      title: '上下行',
      dataIndex: 'direction',
      key: 'direction',
      render: (direction) => (
        <Tag color={direction === 'up' ? 'blue' : 'orange'}>
          {direction === 'up' ? '上行' : '下行'}
        </Tag>
      ),
      filters: [
        { text: '上行', value: 'up' },
        { text: '下行', value: 'down' }
      ],
      onFilter: (value, record) => record.direction === value
    },
    {
      title: '设备编号',
      dataIndex: 'equipmentId',
      key: 'equipmentId'
    },
    {
      title: '故障内容',
      dataIndex: 'faultContent',
      key: 'faultContent'
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'processed') {
          return <Tag color="green">已处理</Tag>;
        } else if (status === 'false_positive') {
          return <Tag color="default">误报</Tag>;
        } else {
          return <Tag color="red">未处理</Tag>;
        }
      },
      filters: [
        { text: '已处理', value: 'processed' },
        { text: '未处理', value: 'unprocessed' },
        { text: '误报', value: 'false_positive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* 对于已处理或误报的条目，显示查看和编辑，允许修正错误或撤销误报 */}
          {record.status === 'processed' || record.status === 'false_positive' ? (
            <>
              <Button 
                type="text" 
                icon={<EyeOutlined />} 
                onClick={() => handleView(record)}
              >
                查看处理
              </Button>

              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => handleEdit(record)}
              >
                编辑
              </Button>
            </>
          ) : (
            /* 未处理条目：提供处理与标记为误报 */
            <>
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => handleEdit(record)}
              >
                处理
              </Button>

              {/* 快捷标记为误报（确认） */}
              <Popconfirm
                title="确认将该条标记为误报？"
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => handleMarkFalse(record)}
                okText="是"
                cancelText="否"
              >
                <Button type="text">标记为误报</Button>
              </Popconfirm>
            </>
          )}
        </Space>
      )
    }
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={18}>
            <Form form={searchForm} layout="inline" onFinish={handleSearch}>
              <Form.Item name="dateRange" label="时间"
              style={{ width: 250 }}>
                <RangePicker />
              </Form.Item>
              <Form.Item name="stationId" label="车站">
                <Select placeholder="选择车站" allowClear>
                  {stations.map(station => (
                    <Option key={station.stationId} value={station.stationId}>
                      {station.stationName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="equipmentId" label="设备编号">
                <Input placeholder="输入设备编号" allowClear 
                style={{ width: 130 }}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">搜索</Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={handleReset}>重置</Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              icon={<DownloadOutlined />} 
              onClick={handleExport}
            >
              导出CSV
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* 处理编辑弹窗 */}
      <Modal
        title="处理记录"
        visible={visible}
        onOk={handleSave}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="status"
            label="处理状态"
            rules={[{ required: true, message: '请选择处理状态' }]}
          >
            <Select>
              <Option value="processed">已处理</Option>
              <Option value="unprocessed">未处理</Option>
              <Option value="false_positive">误报</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="processingTime" 
            label="处理时间" 
            rules={[{ required: false, message: '请选择处理时间' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item 
            name="processingMethod" 
            label="处理方式" 
            rules={[{ required: false, message: '请输入处理方式' }]}
          >
            <TextArea rows={3} placeholder="请输入处理方式" />
          </Form.Item>
          <Form.Item 
            name="processingResult" 
            label="处理结果" 
            rules={[{ required: false, message: '请输入处理结果' }]}
          >
            <TextArea rows={3} placeholder="请输入处理结果" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看处理详情弹窗 */}
      <Modal
        title="处理详情"
        visible={viewVisible}
        onCancel={() => setViewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewVisible(false)}>关闭</Button>,
          <Button key="edit" type="primary" onClick={() => { handleEdit(currentRecord); }}>
            编辑
          </Button>
        ]}
        destroyOnClose
      >
        {currentRecord && (
          <div>
            <p><strong>车站：</strong>{currentRecord.stationName || '-'}</p>
            <p><strong>设备编号：</strong>{currentRecord.equipmentId || '-'}</p>
            <p><strong>故障内容：</strong>{currentRecord.faultContent || '-'}</p>
            <p><strong>处理状态：</strong>{
              currentRecord.status === 'processed' ? '已处理' : (currentRecord.status === 'false_positive' ? '误报' : '未处理')
            }</p>
            <Divider />
            <p><strong>处理时间：</strong>{currentRecord.processingTime || '-'}</p>
            <p><strong>处理方式：</strong>{currentRecord.processingMethod || '-'}</p>
            <p><strong>处理结果：</strong>{currentRecord.processingResult || '-'}</p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default AlarmWarningTable;

