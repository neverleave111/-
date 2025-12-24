// import React from "react";
// import { Button, Space } from "antd";

// const asdEquipmentLeft = [
//   {
//     name: "电机",
//     id: "motorStatus",
//   },
//   {
//     name: "电磁锁",
//     id: "lockStatus",
//   },
//   {
//     name: "DCU",
//     id: "dcuStatus",
//   },
// ];

// const asdEquipmentRight = [
//   {
//     name: "指示灯",
//   },
//   {
//     name: "皮带",
//     id: "beltStatus",
//   },
//   {
//     name: "安全回路",
//     id: "safetyLoopStatus",
//   },
// ];

// const color = {
//   2: "#FFBF00",
//   1: "red",
// };

// export const AsdButtonLeft = (equipStatus) => {
//   return (
//     <Space direction="vertical" style={{ width: "100%" }} size="large">
//       {asdEquipmentLeft.map((equipment) =>
//         color[equipStatus.equipStatus[equipment.id]] ? (
//           <Button
//             type="primary"
//             block
//             style={{
//               backgroundColor: color[equipStatus.equipStatus[equipment.id]],
//             }}
//           >
//             {equipment.name}
//           </Button>
//         ) : (
//           <Button type="primary" block>
//             {equipment.name}
//           </Button>
//         )
//       )}
//     </Space>
//   );
// };

// export const AsdButtonRight = (equipStatus) => (
//   <Space direction="vertical" style={{ width: "100%" }} size="large">
//     {asdEquipmentRight.map((equipment) =>
//       color[equipStatus.equipStatus[equipment.id]] ? (
//         <Button
//           type="primary"
//           block
//           style={{
//             backgroundColor: color[equipStatus.equipStatus[equipment.id]],
//           }}
//         >
//           {equipment.name}
//         </Button>
//       ) : (
//         <Button type="primary" block>
//           {equipment.name}
//         </Button>
//       )
//     )}
//   </Space>
// );


import React, { useState } from "react";
import { Button, Space, Modal, Spin, message } from "antd";

const asdEquipmentLeft = [
  {
    name: "电机",
    id: "motorStatus",
  },
  {
    name: "电磁锁",
    id: "lockStatus",
  },
  {
    name: "DCU",
    id: "dcuStatus",
  },
];

const asdEquipmentRight = [
  {
    name: "指示灯",
    id: "indicatorlightStatus",
  },
  {
    name: "皮带",
    id: "beltStatus",
  },
  {
    name: "安全回路",
    id: "safetyLoopStatus",
  },
];

const color = {
  2: "#FFBF00",
  1: "red",
};

/**
 * 注意：
 * - 默认向后端请求的 URL 为 `/api/equipment/{id}`，若你后端接口不同，
 *   直接修改 fetch 中的 url 构造（第 46 行）。
 * - 组件对传入的 equipStatus 做兼容：如果父组件直接把状态对象传入（如 {motorStatus:2,...}）
 *   或者以 props 形式传入（如 <AsdButtonLeft equipStatus={...} />）都能工作。
 */

const EquipmentButtons = ({ items = [], rawEquipStatus = {} }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  // rawEquipStatus 可能就是 { equipStatus: {...} } 或者直接就是状态映射
  const statusMap = rawEquipStatus?.equipStatus ?? rawEquipStatus ?? {};

  const closeModal = () => {
    setVisible(false);
    setLoading(false);
    setDetail(null);
    setSelectedName("");
  };

  const fetchDetail = async (id) => {
    // 如果你的后端 URL 不是这个格式，请把下面这一行改为你的接口格式
    const url = `http://127.0.0.1:3007/asd/equipment/${id}`;
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    // 常见后端返回 { success: true, data: {...} } 或者直接返回对象
    return json && json.success !== undefined ? json.data ?? json : json;
  };

  const onClickItem = async (item) => {
    // 无 id 的部件直接提示
    if (!item.id) {
      message.info(`${item.name} 无可用详细信息`);
      return;
    }

    setSelectedName(item.name);
    setVisible(true);
    setLoading(true);
    setDetail(null);

    try {
      const data = await fetchDetail(item.id);
      setDetail(data ?? null);
    } catch (err) {
      message.error(`${item.name} 详情获取失败：${err.message}`);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {items.map((equipment) => {
          const key = equipment.id ?? equipment.name;
          const s = equipment.id ? statusMap[equipment.id] : undefined;
          const bg = s && color[s] ? color[s] : undefined;
          return (
            <Button
              key={key}
              type="primary"
              block
              onClick={() => onClickItem(equipment)}
              style={bg ? { backgroundColor: bg, borderColor: bg } : undefined}
            >
              {equipment.name}
            </Button>
          );
        })}
      </Space>

      <Modal
        title={selectedName ? `${selectedName} 详情` : "详情"}
        visible={visible}
        onCancel={closeModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin tip="加载中..." />
          </div>
        ) : detail ? (
          // 如果后端返回对象，则漂亮地展示 JSON；否则直接显示文本
          typeof detail === "object" ? (
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(detail, null, 2)}
            </pre>
          ) : (
            <div>{String(detail)}</div>
          )
        ) : (
          <div style={{ color: "#999" }}>暂无详细信息</div>
        )}
      </Modal>
    </>
  );
};

// 保持原接口形式的兼容性：如果父组件直接把状态对象传入（非 props 形式），也能工作
export const AsdButtonLeft = (equipStatus) => {
  // equipStatus 可能是 props（{ equipStatus: {...} }）或直接是状态映射（{motorStatus:2,...}）
  const raw = equipStatus ?? {};
  return <EquipmentButtons items={asdEquipmentLeft} rawEquipStatus={raw} />;
};

export const AsdButtonRight = (equipStatus) => {
  const raw = equipStatus ?? {};
  return <EquipmentButtons items={asdEquipmentRight} rawEquipStatus={raw} />;
};
