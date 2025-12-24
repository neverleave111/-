// // src/pages/StationManagement.js
// import React, { useState } from 'react';
// import { Form, Input, Button, Table, Modal, message, Popconfirm, Select } from 'antd';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';

// const { Option } = Select;

// const StationManagement = () => {
//   // 搜索表单
//   const [searchForm] = Form.useForm();
//   // 查询结果
//   const [lineId, setLineId] = useState('');
//   const [lineName, setLineName] = useState('');
//   const [stations, setStations] = useState([]); // 站点数组
//   const [loading, setLoading] = useState(false);
//   const [total, setTotal] = useState(0);        // 后端返回的总数

//   // 新增车站弹窗
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [addForm] = Form.useForm();

//   // 编辑车站弹窗
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editForm] = Form.useForm();
//   const [currentStation, setCurrentStation] = useState(null);

//   // 一键生成站点弹窗
//   const [initModalVisible, setInitModalVisible] = useState(false);
//   const [initForm] = Form.useForm();

//   /**
//    * 1. 查询站点信息
//    */
//   const handleSearch = async () => {
//     try {
//       const values = await searchForm.validateFields();
//       // lineId 必填，lineName 可选
//       const { lineId: searchLineId, lineName: searchLineName } = values;
//       setLineId(searchLineId);
//       setLineName(searchLineName || '');

//       setLoading(true);
//       const token = Cookies.get('token');
//       // 拼接 query 参数
//       const queryParams = new URLSearchParams({
//         lineId: searchLineId,
//       });
//       if (searchLineName) {
//         queryParams.append('lineName', searchLineName);
//       }

//       const response = await fetch(
//         `${apiConfig.getAllStationHeaders}?${queryParams.toString()}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token,
//           },
//           credentials: 'include',
//         }
//       );

//       const data = await response.json();
//       if (data.code === 200 && data.data) {
//         // 后端返回的结构
//         // {
//         //   lineId: 'Taiyuan_2',
//         //   lineName: '太原地铁二号线',
//         //   Items: [ { stationId, stationName, ... }, ... ],
//         //   Total: 2
//         // }
//         setStations(data.data.Items || []);
//         setTotal(data.data.Total || 0);
//         setLineId(data.data.lineId);     // 更新最新的 lineId
//         setLineName(data.data.lineName); // 更新最新的 lineName
//         message.success('获取站点信息成功！');
//       } else {
//         message.error(data.message || '获取站点信息失败！');
//       }
//     } catch (error) {
//       console.error('Error fetching station headers:', error);
//       message.error('请求错误');
//     }
//     setLoading(false);
//   };

//   /**
//    * 2. 新增车站
//    */
//   const handleAddStation = async () => {
//     try {
//       const values = await addForm.validateFields();
//       // doorAmount 需要是数组字符串，可在表单里输入 "20,20" 再 split
//       const doorAmountArray = values.doorAmount
//         ? values.doorAmount.split(',').map((item) => item.trim())
//         : [];

//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.doAddStation, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify({
//           lineId: values.lineId,
//           stationName: values.stationName || '', // 可选
//           stationNo: parseInt(values.stationNo, 10),
//           platformAmount: parseInt(values.platformAmount, 10),
//           doorAmount: doorAmountArray,
//         }),
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         message.success('车站新增成功');
//         setAddModalVisible(false);
//         addForm.resetFields();
//         // 新增后刷新站点列表
//         handleSearch();
//       } else {
//         message.error(data.message || '车站新增失败');
//       }
//     } catch (error) {
//       console.error('新增车站出错:', error);
//     }
//   };

//   /**
//    * 3. 编辑车站
//    */
//   const openEditModal = (record) => {
//     setCurrentStation(record);
//     // 后端返回 door 数量分散在 platform12Doors、platform34Doors，
//     // 也可能没有这些字段，需要自己定义如何将其组合成数组。
//     // 这里假设 doorAmount = [ platform12Doors, platform34Doors ].
//     // 如果后端返回 stationId, stationName, platformAmount, doorAmount 等，
//     // 你可以直接用。此处演示把 platform12Doors + platform34Doors 合并为 "24,24".
//     let combinedDoors = '';
//     if (record.platform12Doors && record.platform34Doors) {
//       combinedDoors = `${record.platform12Doors},${record.platform34Doors}`;
//     } else {
//       // 如果后端返回其他结构，需要自行处理
//       combinedDoors = '';
//     }

//     editForm.setFieldsValue({
//       stationId: record.stationId,
//       stationName: record.stationName || '',
//       platformAmount: record.platformAmount,
//       doorAmount: combinedDoors,
//     });
//     setEditModalVisible(true);
//   };

//   const handleEditStation = async () => {
//     try {
//       const values = await editForm.validateFields();
//       // doorAmount 同样 split
//       const doorAmountArray = values.doorAmount
//         ? values.doorAmount.split(',').map((item) => item.trim())
//         : [];

//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.doEditStation, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify({
//           stationId: values.stationId,
//           stationName: values.stationName,
//           platformAmount: parseInt(values.platformAmount, 10),
//           doorAmount: doorAmountArray,
//         }),
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         message.success('车站修改成功');
//         setEditModalVisible(false);
//         editForm.resetFields();
//         handleSearch();
//       } else {
//         message.error(data.message || '车站修改失败');
//       }
//     } catch (error) {
//       console.error('修改车站出错:', error);
//     }
//   };

//   /**
//    * 4. 删除车站
//    */
//   const handleDeleteStation = async (record) => {
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.doDeleteStation, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify({
//           stationId: record.stationId,
//         }),
//       });
//       const data = await response.json();
//       if (data.code === 200) {
//         message.success('车站删除成功');
//         handleSearch();
//       } else {
//         message.error(data.message || '车站删除失败');
//       }
//     } catch (error) {
//       console.error('删除车站出错:', error);
//     }
//   };

//   /**
//    * 5. 一键生成站点
//    */
//   const handleInitStation = async () => {
//     try {
//       const values = await initForm.validateFields();
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.initStation, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify({
//           lineId: values.lineId || '',
//           stationAmount: parseInt(values.stationAmount, 10),
//           doorAmount: parseInt(values.doorAmount, 10),
//         }),
//       });
//       const data = await response.json();
//       if (data.code === 0) {
//         message.success('一键生成站点成功');
//         setInitModalVisible(false);
//         initForm.resetFields();
//         // 刷新列表
//         handleSearch();
//       } else {
//         message.error(data.message || '站点生成失败');
//       }
//     } catch (error) {
//       console.error('一键生成站点出错:', error);
//     }
//   };

//   /**
//    * 表格列配置
//    * 注意：后端返回的字段名与前端 dataIndex 对应
//    */
//   const columns = [
//     {
//       title: '站点ID',
//       dataIndex: 'stationId',
//       key: 'stationId',
//     },
//     {
//       title: '站点名称',
//       dataIndex: 'stationName',
//       key: 'stationName',
//     },
//     {
//       title: '站台数量',
//       dataIndex: 'platformAmount',
//       key: 'platformAmount',
//     },
//     {
//       title: '12号门数量',
//       dataIndex: 'platform12Doors',
//       key: 'platform12Doors',
//     },
//     {
//       title: '34号门数量',
//       dataIndex: 'platform34Doors',
//       key: 'platform34Doors',
//     },
//     {
//       title: '操作',
//       key: 'action',
//       render: (_, record) => (
//         <>
//           <Button type="link" onClick={() => openEditModal(record)}>
//             编辑
//           </Button>
//           <Popconfirm
//             title="确认删除该站点？"
//             onConfirm={() => handleDeleteStation(record)}
//             okText="确认"
//             cancelText="取消"
//           >
//             <Button type="link" danger>
//               删除
//             </Button>
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>站点管理</h2>

//       {/* 搜索表单 */}
//       <Form layout="inline" form={searchForm} style={{ marginBottom: 16 }}>
//         <Form.Item
//           label="线路ID"
//           name="lineId"
//           rules={[{ required: true, message: '请输入线路ID' }]}
//         >
//           <Input placeholder="BJ_line6" style={{ width: 180 }} />
//         </Form.Item>
//         <Form.Item label="线路名称" name="lineName">
//           <Input placeholder="可选" style={{ width: 180 }} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" onClick={handleSearch}>
//             搜索
//           </Button>
//         </Form.Item>
//         <Form.Item>
//           <Button onClick={() => {
//             searchForm.resetFields();
//             setStations([]);
//             setTotal(0);
//           }}>
//             重置
//           </Button>
//         </Form.Item>
//       </Form>

//       {/* 线路信息展示 */}
//       <div style={{ marginBottom: 16 }}>
//         <span>当前线路ID: {lineId || '无'}</span>
//         <span style={{ marginLeft: 24 }}>当前线路名称: {lineName || '无'}</span>
//       </div>

//       {/* 操作按钮 */}
//       <div style={{ marginBottom: 16 }}>
//         <Button
//           type="primary"
//           onClick={() => setAddModalVisible(true)}
//           style={{ marginRight: 8 }}
//         >
//           新增车站
//         </Button>
//         <Button
//           onClick={() => setInitModalVisible(true)}
//           style={{ marginRight: 8 }}
//         >
//           一键生成站点
//         </Button>
//       </div>

//       {/* 表格 */}
//       <Table
//         rowKey="stationId"
//         columns={columns}
//         dataSource={stations}
//         loading={loading}
//         pagination={{ total }}
//       />

//       {/* 新增车站弹窗 */}
//       <Modal
//         title="新增车站"
//         visible={addModalVisible}
//         onOk={handleAddStation}
//         onCancel={() => {
//           setAddModalVisible(false);
//           addForm.resetFields();
//         }}
//         okText="新增"
//         cancelText="取消"
//       >
//         <Form form={addForm} layout="vertical">
//           <Form.Item
//             label="线路ID"
//             name="lineId"
//             rules={[{ required: true, message: '请输入线路ID' }]}
//           >
//             <Input placeholder="BJ_line6" />
//           </Form.Item>
//           <Form.Item
//             label="站点名称"
//             name="stationName"
//           >
//             <Input placeholder="可选" />
//           </Form.Item>
//           <Form.Item
//             label="站点序号"
//             name="stationNo"
//             rules={[{ required: true, message: '请输入站点序号' }]}
//           >
//             <Input type="number" placeholder="1" />
//           </Form.Item>
//           <Form.Item
//             label="站台数量"
//             name="platformAmount"
//             rules={[{ required: true, message: '请输入站台数量' }]}
//           >
//             <Input type="number" placeholder="2" />
//           </Form.Item>
//           <Form.Item
//             label="门数量 (用逗号分隔)"
//             name="doorAmount"
//             rules={[{ required: true, message: '请输入门数量' }]}
//           >
//             <Input placeholder="例如：20,20" />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* 编辑车站弹窗 */}
//       <Modal
//         title="编辑车站"
//         visible={editModalVisible}
//         onOk={handleEditStation}
//         onCancel={() => {
//           setEditModalVisible(false);
//           editForm.resetFields();
//         }}
//         okText="保存"
//         cancelText="取消"
//       >
//         <Form form={editForm} layout="vertical">
//           <Form.Item
//             label="车站ID"
//             name="stationId"
//             rules={[{ required: true, message: '请输入车站ID' }]}
//           >
//             <Input disabled placeholder="Qingdao_1_S_11" />
//           </Form.Item>
//           <Form.Item
//             label="车站名称"
//             name="stationName"
//             rules={[{ required: true, message: '请输入车站名称' }]}
//           >
//             <Input placeholder="东郭庄站" />
//           </Form.Item>
//           <Form.Item
//             label="站台数量"
//             name="platformAmount"
//             rules={[{ required: true, message: '请输入站台数量' }]}
//           >
//             <Input type="number" placeholder="4" />
//           </Form.Item>
//           <Form.Item
//             label="门数量 (用逗号分隔)"
//             name="doorAmount"
//             rules={[{ required: true, message: '请输入门数量' }]}
//           >
//             <Input placeholder="20,20" />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* 一键生成站点弹窗 */}
//       <Modal
//         title="一键生成站点"
//         visible={initModalVisible}
//         onOk={handleInitStation}
//         onCancel={() => {
//           setInitModalVisible(false);
//           initForm.resetFields();
//         }}
//         okText="生成"
//         cancelText="取消"
//       >
//         <Form form={initForm} layout="vertical">
//           <Form.Item
//             label="线路ID"
//             name="lineId"
//             // 如果后端可选，这里就不做 required
//           >
//             <Input placeholder="Qingdao_1" />
//           </Form.Item>
//           <Form.Item
//             label="站点数量"
//             name="stationAmount"
//           >
//             <Input type="number" placeholder="10" />
//           </Form.Item>
//           <Form.Item
//             label="门数量"
//             name="doorAmount"
//           >
//             <Input type="number" placeholder="20" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default StationManagement;
// src/pages/StationManagement.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Modal, message, Popconfirm, Select } from 'antd';
import Cookies from 'js-cookie';
import apiConfig from '../apiConfig';

const { Option } = Select;

const StationManagement = () => {
  // 线路列表（下拉框的数据来源）
  const [lines, setLines] = useState([]);
  // 当前选中的线路信息
  const [selectedLine, setSelectedLine] = useState(null);

  // 站点列表
  const [stations, setStations] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 总数（分页用，如果需要）
  const [total, setTotal] = useState(0);

  // 新增车站弹窗
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();

  // 编辑车站弹窗
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [currentStation, setCurrentStation] = useState(null);

  // 一键生成站点弹窗
  const [initModalVisible, setInitModalVisible] = useState(false);
  const [initForm] = Form.useForm();

  /**
   * 1. 组件挂载后，获取所有线路列表
   */
  useEffect(() => {
    fetchAllMetros();
  }, []);

  // 获取所有线路列表
  const fetchAllMetros = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.metroAll, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': token,
        },
        // credentials: 'include',
      });
      const data = await response.json();
      if (data.code === 200 && Array.isArray(data.data.Items)) {
        // data.data 里是线路数组，如 [{ lineId: 'BJ_line6', lineName: '北京地铁6号线' }, ...]
        setLines(data.data.Items);
        console.log('ggg:', lines);
      } else {
        message.error(data.message || '获取线路列表失败');
      }
    } catch (error) {
      console.error('Error fetching lines:', error);
      message.error('请求错误');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 2. 当用户在下拉框中选择某条线路后，调用后端接口获取对应的站点信息
   */
  const handleLineChange = async (value) => {
    // value 通常是 lineId，或同时存储 lineName
    // 假设 lines 中每个元素是 { lineId, lineName }
    const line = lines.find((item) => item.lineId === value);
    if (!line) return;

    setSelectedLine(line);
    // 清空原站点列表
    setStations([]);
    setTotal(0);

    // 调用 getAllStationHeaders?lineId=xxx&lineName=xxx
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const queryParams = new URLSearchParams({
        lineId: line.lineId,
      });
      if (line.lineName) {
        queryParams.append('lineName', line.lineName);
      }

      const response = await fetch(
        `${apiConfig.getAllStationHeaders}?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': token,
          },
          // credentials: 'include',
        }
      );
      const data = await response.json();
      if (data.code === 200 && data.data) {
        // data.data.Items: 站点数组
        setStations(data.data.Items || []);
        setTotal(data.data.Total || 0);
        message.success(`获取站点信息成功: ${line.lineName || line.lineId}`);
      } else {
        message.error(data.message || '获取站点信息失败');
      }
    } catch (error) {
      console.error('Error fetching station headers:', error);
      message.error('请求错误');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 3. 新增车站
   */
  const handleAddStation = async () => {
    try {
      const values = await addForm.validateFields();
      // doorAmount 需要是数组字符串，可在表单里输入 "20,20" 再 split
      const doorAmountArray = values.doorAmount
        ? values.doorAmount.split(',').map((item) => item.trim())
        : [];

      const token = Cookies.get('token');
      const response = await fetch(apiConfig.doAddStation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          lineId: values.lineId,
          stationName: values.stationName || '', // 可选
          stationNo: parseInt(values.stationNo, 10),
          platformAmount: parseInt(values.platformAmount, 10),
          doorAmount: doorAmountArray,
        }),
      });
      const data = await response.json();
      if (data.code === 200) {
        message.success('车站新增成功');
        setAddModalVisible(false);
        addForm.resetFields();
        // 新增后，若仍然处于选中线路，则刷新该线路的站点
        if (selectedLine) {
          handleLineChange(selectedLine.lineId);
        }
      } else {
        message.error(data.message || '车站新增失败');
      }
    } catch (error) {
      console.error('新增车站出错:', error);
    }
  };

  /**
   * 4. 编辑车站
   */
  const openEditModal = (record) => {
    setCurrentStation(record);
    // 假设 doorAmount 对应 platform12Doors 和 platform34Doors，需要合并
    let combinedDoors = '';
    if (record.platform12Doors && record.platform34Doors) {
      combinedDoors = `${record.platform12Doors},${record.platform34Doors}`;
    } else {
      // 如果后端直接返回 doorAmount: ['20','20']，就直接 join
      // combinedDoors = (record.doorAmount || []).join(',');
    }

    editForm.setFieldsValue({
      stationId: record.stationId,
      stationName: record.stationName || '',
      platformAmount: record.platformAmount,
      doorAmount: combinedDoors,
    });
    setEditModalVisible(true);
  };

  const handleEditStation = async () => {
    try {
      const values = await editForm.validateFields();
      const doorAmountArray = values.doorAmount
        ? values.doorAmount.split(',').map((item) => item.trim())
        : [];

      const token = Cookies.get('token');
      const response = await fetch(apiConfig.doEditStation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          stationId: values.stationId,
          stationName: values.stationName,
          platformAmount: parseInt(values.platformAmount, 10),
          doorAmount: doorAmountArray,
        }),
      });
      const data = await response.json();
      if (data.code === 200) {
        message.success('车站修改成功');
        setEditModalVisible(false);
        editForm.resetFields();
        if (selectedLine) {
          handleLineChange(selectedLine.lineId);
        }
      } else {
        message.error(data.message || '车站修改失败');
      }
    } catch (error) {
      console.error('修改车站出错:', error);
    }
  };

  /**
   * 5. 删除车站
   */
  const handleDeleteStation = async (record) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.doDeleteStation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          stationId: record.stationId,
        }),
      });
      const data = await response.json();
      if (data.code === 200) {
        message.success('车站删除成功');
        if (selectedLine) {
          handleLineChange(selectedLine.lineId);
        }
      } else {
        message.error(data.message || '车站删除失败');
      }
    } catch (error) {
      console.error('删除车站出错:', error);
    }
  };

  /**
   * 6. 一键生成站点
   */
  const handleInitStation = async () => {
    try {
      const values = await initForm.validateFields();
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.initStation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          lineId: values.lineId || '',
          stationAmount: parseInt(values.stationAmount, 10),
          doorAmount: parseInt(values.doorAmount, 10),
        }),
      });
      const data = await response.json();
      if (data.code === 0) {
        message.success('一键生成站点成功');
        setInitModalVisible(false);
        initForm.resetFields();
        // 生成后，若仍然处于选中线路，则刷新
        if (selectedLine) {
          handleLineChange(selectedLine.lineId);
        }
      } else {
        message.error(data.message || '站点生成失败');
      }
    } catch (error) {
      console.error('一键生成站点出错:', error);
    }
  };

  /**
   * 表格列配置
   */
  const columns = [
    {
      title: '站点ID',
      dataIndex: 'stationId',
      key: 'stationId',
    },
    {
      title: '站点名称',
      dataIndex: 'stationName',
      key: 'stationName',
    },
    {
      title: '站台数量',
      dataIndex: 'platformAmount',
      key: 'platformAmount',
    },
    {
      title: '12号站台门数量',
      dataIndex: 'platform12Doors',
      key: 'platform12Doors',
    },
    {
      title: '34号站台门数量',
      dataIndex: 'platform34Doors',
      key: 'platform34Doors',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除该站点？"
            onConfirm={() => handleDeleteStation(record)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>站点管理</h2>

      {/* 线路下拉框 */}
      <div style={{ marginBottom: 16 }}>
        <span>选择线路：</span>
        <Select
          placeholder="请选择线路"
          style={{ width: 220 }}
          onChange={handleLineChange}
          allowClear
        >
          {lines.map((line) => (
            <Option key={line.lineId} value={line.lineId}>
              {line.lineName || line.lineId}
            </Option>
          ))}
        </Select>
      </div>

      {/* 已选线路信息展示 */}
      {selectedLine && (
        <div style={{ marginBottom: 16 }}>
          <span>当前线路ID: {selectedLine.lineId}</span>
          <span style={{ marginLeft: 24 }}>
            当前线路名称: {selectedLine.lineName}
          </span>
        </div>
      )}

      {/* 操作按钮 */}
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => setAddModalVisible(true)}
          style={{ marginRight: 8 }}
          disabled={!selectedLine}
        >
          新增车站
        </Button>
        <Button
          onClick={() => setInitModalVisible(true)}
          style={{ marginRight: 8 }}
          disabled={!selectedLine}
        >
          一键生成站点
        </Button>
      </div>

      {/* 表格 */}
      <Table
        rowKey="stationId"
        columns={columns}
        dataSource={stations}
        loading={loading}
        pagination={{ total }}
      />

      {/* 新增车站弹窗 */}
      <Modal
        title="新增车站"
        visible={addModalVisible}
        onOk={handleAddStation}
        onCancel={() => {
          setAddModalVisible(false);
          addForm.resetFields();
        }}
        okText="新增"
        cancelText="取消"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="线路ID"
            name="lineId"
            rules={[{ required: true, message: '请输入线路ID' }]}
            initialValue={selectedLine ? selectedLine.lineId : ''}
          >
            <Input placeholder="BJ_line6" disabled={!!selectedLine} />
          </Form.Item>
          <Form.Item label="站点名称" name="stationName">
            <Input placeholder="可选" />
          </Form.Item>
          <Form.Item
            label="站点序号"
            name="stationNo"
            rules={[{ required: true, message: '请输入站点序号' }]}
          >
            <Input type="number" placeholder="1" />
          </Form.Item>
          <Form.Item
            label="站台数量"
            name="platformAmount"
            rules={[{ required: true, message: '请输入站台数量' }]}
          >
            <Input type="number" placeholder="2" />
          </Form.Item>
          <Form.Item
            label="门数量 (用逗号分隔)"
            name="doorAmount"
            rules={[{ required: true, message: '请输入门数量' }]}
          >
            <Input placeholder="例如：20,20" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑车站弹窗 */}
      <Modal
        title="编辑车站"
        visible={editModalVisible}
        onOk={handleEditStation}
        onCancel={() => {
          setEditModalVisible(false);
          editForm.resetFields();
        }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="车站ID"
            name="stationId"
            rules={[{ required: true, message: '请输入车站ID' }]}
          >
            <Input disabled placeholder="Qingdao_1_S_11" />
          </Form.Item>
          <Form.Item
            label="车站名称"
            name="stationName"
            rules={[{ required: true, message: '请输入车站名称' }]}
          >
            <Input placeholder="东郭庄站" />
          </Form.Item>
          <Form.Item
            label="站台数量"
            name="platformAmount"
            rules={[{ required: true, message: '请输入站台数量' }]}
          >
            <Input type="number" placeholder="4" />
          </Form.Item>
          <Form.Item
            label="门数量 (用逗号分隔)"
            name="doorAmount"
            rules={[{ required: true, message: '请输入门数量' }]}
          >
            <Input placeholder="20,20" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 一键生成站点弹窗 */}
      <Modal
        title="一键生成站点"
        visible={initModalVisible}
        onOk={handleInitStation}
        onCancel={() => {
          setInitModalVisible(false);
          initForm.resetFields();
        }}
        okText="生成"
        cancelText="取消"
      >
        <Form form={initForm} layout="vertical">
          <Form.Item
            label="线路ID"
            name="lineId"
            initialValue={selectedLine ? selectedLine.lineId : ''}
          >
            <Input placeholder="Qingdao_1" disabled={!!selectedLine} />
          </Form.Item>
          <Form.Item label="站点数量" name="stationAmount">
            <Input type="number" placeholder="10" />
          </Form.Item>
          <Form.Item label="门数量" name="doorAmount">
            <Input type="number" placeholder="20" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StationManagement;
