// // src/pages/LinesManagement.js
// import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
// import Cookies from 'js-cookie';
// import apiConfig from '../apiConfig';

// const LinesManagement = () => {
//   // 线路列表
//   const [lines, setLines] = useState([]);
//   // 加载状态
//   const [loading, setLoading] = useState(false);

//   // 控制“添加线路”弹窗
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [addForm] = Form.useForm();

//   // 控制“编辑线路”弹窗
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [editForm] = Form.useForm();
//   // 当前正在编辑的线路（存储 lineId, lineName 等）
//   const [currentLine, setCurrentLine] = useState(null);

//   // 1. 获取所有线路
//   const fetchLines = async () => {
//     setLoading(true);
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.metroAll, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         //   'Authorization': token // 如果后端需要在 Header 中携带 token
//         },
//         // credentials: 'include' // 确保请求中携带 Cookie（若后端需要）
//       });
//       const data = await response.json();
//       if (data.code === 200 && Array.isArray(data.data)) {
//         // 假设 data.data 为线路数组
//         setLines(data.data);
//       } else {
//         message.error(data.message || '获取线路信息失败');
//       }
//     } catch (error) {
//       console.error('Error fetching lines:', error);
//       message.error('请求错误');
//     }
//     setLoading(false);
//   };

//   // 页面加载时获取线路数据
//   useEffect(() => {
//     fetchLines();
//   }, []);

//   // 2. 添加线路
//   const handleAddLine = async () => {
//     try {
//       const values = await addForm.validateFields(); // 验证表单
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.addMetro, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(values)
//       });
//       const data = await response.json();

//       if (data.code === 200) {
//         message.success('线路添加成功');
//         setIsAddModalVisible(false);
//         addForm.resetFields();
//         fetchLines(); // 刷新线路列表
//       } else {
//         message.error(data.message || '线路添加失败');
//       }
//     } catch (error) {
//       console.error('添加线路出错:', error);
//     }
//   };

//   // 3. 编辑线路
//   // 点击“编辑”时，先打开弹窗并填充表单
//   const handleOpenEditModal = (record) => {
//     setCurrentLine(record);
//     editForm.setFieldsValue({
//       ID: record.id,
//       lineId: record.line_id,
//       lineName: record.line_name
//     });
//     setIsEditModalVisible(true);
//   };

//   // 点击弹窗“确定”时，调用后端接口
//   const handleEditLine = async () => {
//     try {
//       const values = await editForm.validateFields(); // 验证表单
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.editMetro, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify(values)
//       });
//       const data = await response.json();

//       if (data.code === 200) {
//         message.success('线路修改成功');
//         setIsEditModalVisible(false);
//         editForm.resetFields();
//         fetchLines(); // 刷新线路列表
//       } else {
//         message.error(data.message || '线路修改失败');
//       }
//     } catch (error) {
//       console.error('编辑线路出错:', error);
//     }
//   };

//   // 4. 删除线路
//   const handleDeleteLine = async (record) => {
//     try {
//       const token = Cookies.get('token');
//       const response = await fetch(apiConfig.deleteMetro, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify({ lineId: record.line_id })
//       });
//       console.error('编辑线路出错:', record);
//       const data = await response.json();

//       if (data.code === 200) {
//         message.success('线路删除成功');
//         fetchLines(); // 刷新列表
//       } else {
//         message.error(data.message || '线路删除失败');
//       }
//     } catch (error) {
//       console.error('删除线路出错:', error);
//     }
//   };

//   // 配置表格列
//   const columns = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'Id',
//       },
//     {
//       title: '线路ID',
//       dataIndex: 'line_id',
//       key: 'lineId',
//     },
//     {
//       title: '线路名称',
//       dataIndex: 'line_name',
//       key: 'lineName',
//     },
//     {
//       title: '操作',
//       key: 'action',
//       render: (text, record) => (
//         <>
//           <Button
//             type="link"
//             onClick={() => handleOpenEditModal(record)}
//             style={{ marginRight: 8 }}
//           >
//             编辑线路
//           </Button>
//           <Popconfirm
//             title="确定删除该线路吗？"
//             onConfirm={() => handleDeleteLine(record)}
//             okText="确定"
//             cancelText="取消"
//           >
//             <Button type="link" danger>
//               删除线路
//             </Button>
//           </Popconfirm>
//         </>
//       )
//     }
//   ];

//   return (
//     <div>
//       <h2>线路管理</h2>
//       <Button
//         type="primary"
//         onClick={() => setIsAddModalVisible(true)}
//         style={{ marginBottom: 16 }}
//       >
//         + 添加线路
//       </Button>

//       <Table
//         rowKey="lineId"
//         columns={columns}
//         dataSource={lines}
//         loading={loading}
//       />

//       {/* 添加线路弹窗 */}
//       <Modal
//         title="添加线路"
//         visible={isAddModalVisible}
//         onOk={handleAddLine}
//         onCancel={() => {
//           setIsAddModalVisible(false);
//           addForm.resetFields();
//         }}
//         okText="添加"
//         cancelText="取消"
//       >
//         <Form form={addForm} layout="vertical">
//           <Form.Item
//             label="线路ID"
//             name="lineId"
//             rules={[{ required: true, message: '请输入线路ID' }]}
//           >
//             <Input placeholder="Qingdao_2" />
//           </Form.Item>
//           <Form.Item
//             label="线路名称"
//             name="lineName"
//             rules={[{ required: true, message: '请输入线路名称' }]}
//           >
//             <Input placeholder="青岛地铁二号线" />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* 编辑线路弹窗 */}
//       <Modal
//         title="编辑线路"
//         visible={isEditModalVisible}
//         onOk={handleEditLine}
//         onCancel={() => {
//           setIsEditModalVisible(false);
//           editForm.resetFields();
//         }}
//         okText="保存"
//         cancelText="取消"
//       >
//         <Form form={editForm} layout="vertical">
//           <Form.Item
//             label="线路ID"
//             name="lineId"
//             rules={[{ required: false, message: '请输入线路ID' }]}
//           >
//             <Input disabled placeholder="" />
//           </Form.Item>
//           <Form.Item
//             label="线路名称"
//             name="lineName"
//             rules={[{ required: true, message: '请输入线路名称' }]}
//           >
//             <Input placeholder="青岛地铁二号线" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default LinesManagement;

import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import Cookies from 'js-cookie';
import apiConfig from '../apiConfig';

const LinesManagement = () => {
  // 线路列表
  const [lines, setLines] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(false);

  // 控制“添加线路”弹窗
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();

  // 控制“编辑线路”弹窗
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  // 当前正在编辑的线路（存储 lineId, lineName 等）
  const [currentLine, setCurrentLine] = useState(null);

  // 1. 获取所有线路
  const fetchLines = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.metroAll, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //   'Authorization': token // 如果后端需要在 Header 中携带 token
        },
        // credentials: 'include' // 确保请求中携带 Cookie（若后端需要）
      });
      const data = await response.json();
      if (data.code === 200 && Array.isArray(data.data.Items)) {
        // 新的接口响应中线路数据在 data.data.Items 里
        setLines(data.data.Items);
      } else {
        message.error(data.message || '获取线路信息失败');
      }
    } catch (error) {
      console.error('Error fetching lines:', error);
      message.error('请求错误');
    }
    setLoading(false);
  };

  // 页面加载时获取线路数据
  useEffect(() => {
    fetchLines();
  }, []);

  // 2. 添加线路
  const handleAddLine = async () => {
    try {
      const values = await addForm.validateFields(); // 验证表单
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.addMetro, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();

      if (data.code === 200) {
        message.success('线路添加成功');
        setIsAddModalVisible(false);
        addForm.resetFields();
        fetchLines(); // 刷新线路列表
      } else {
        message.error(data.message || '线路添加失败');
      }
    } catch (error) {
      console.error('添加线路出错:', error);
    }
  };

  // 3. 编辑线路
  // 点击“编辑”时，先打开弹窗并填充表单
  const handleOpenEditModal = (record) => {
    setCurrentLine(record);
    editForm.setFieldsValue({
      ID: record.ID,
      lineId: record.lineId,
      lineName: record.lineName
    });
    setIsEditModalVisible(true);
  };

  // 点击弹窗“确定”时，调用后端接口
  const handleEditLine = async () => {
    try {
      const values = await editForm.validateFields(); // 验证表单
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.editMetro, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();

      if (data.code === 200) {
        message.success('线路修改成功');
        setIsEditModalVisible(false);
        editForm.resetFields();
        fetchLines(); // 刷新线路列表
      } else {
        message.error(data.message || '线路修改失败');
      }
    } catch (error) {
      console.error('编辑线路出错:', error);
    }
  };

  // 4. 删除线路
  const handleDeleteLine = async (record) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(apiConfig.deleteMetro, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ lineId: record.lineId })
      });
      const data = await response.json();

      if (data.code === 200) {
        message.success('线路删除成功');
        fetchLines(); // 刷新列表
      } else {
        message.error(data.message || '线路删除失败');
      }
    } catch (error) {
      console.error('删除线路出错:', error);
    }
  };

  // 配置表格列
  const columns = [
    {
        title: '序号',
        key: 'index',
        render: (_, __, index) => index + 1
    },
    {
      title: '线路ID',
      dataIndex: 'lineId',
      key: 'lineId',
    },
    {
      title: '线路名称',
      dataIndex: 'lineName',
      key: 'lineName',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            type="link"
            onClick={() => handleOpenEditModal(record)}
            style={{ marginRight: 8 }}
          >
            编辑线路
          </Button>
          <Popconfirm
            title="确定删除该线路吗？"
            onConfirm={() => handleDeleteLine(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除线路
            </Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div>
      <h2>线路管理</h2>
      <Button
        type="primary"
        onClick={() => setIsAddModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        + 添加线路
      </Button>

      <Table
        rowKey="lineId"
        columns={columns}
        dataSource={lines}
        loading={loading}
      />

      {/* 添加线路弹窗 */}
      <Modal
        title="添加线路"
        visible={isAddModalVisible}
        onOk={handleAddLine}
        onCancel={() => {
          setIsAddModalVisible(false);
          addForm.resetFields();
        }}
        okText="添加"
        cancelText="取消"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="线路ID"
            name="lineId"
            rules={[{ required: true, message: '请输入线路ID' }]}
          >
            <Input placeholder="Taiyuan_2" />
          </Form.Item>
          <Form.Item
            label="线路名称"
            name="lineName"
            rules={[{ required: true, message: '请输入线路名称' }]}
          >
            <Input placeholder="太原地铁二号线" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑线路弹窗 */}
      <Modal
        title="编辑线路"
        visible={isEditModalVisible}
        onOk={handleEditLine}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
        okText="保存"
        cancelText="取消"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="线路ID"
            name="lineId"
            rules={[{ required: false, message: '请输入线路ID' }]}
          >
            <Input disabled placeholder="" />
          </Form.Item>
          <Form.Item
            label="线路名称"
            name="lineName"
            rules={[{ required: true, message: '请输入线路名称' }]}
          >
            <Input placeholder="太原地铁二号线" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LinesManagement;    