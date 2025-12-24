import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import axios from "axios";
import { EditableHeader } from "./editableHeader";
import { stationParams } from "./stationInterface";

export const StationErrorTable: React.FC<stationParams> = ({
  lineId,
  lineName,
  stationId,
  stationName,
  pageSize,
}) => {
  const { Text } = Typography;
  const [content, setContent] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [errorData, setErrorData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const errorDataResponse = await axios.get(
        "http://127.0.0.1:3007/station/getStationRealTimeAlarms",
        {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            content: content,
            platform: platform,
            deviceId: deviceId,
            startDate: startDate,
          },
        }
      );
      setErrorData(errorDataResponse.data.data.Items);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [content, platform, deviceId, startDate]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const errorTableData = errorData.map((item, index) => {
    return {
      key: (index + 1).toString(),
      id: (index + 1).toString(),
      upDown: item.platform,
      equipmentId: item.deviceId,
      errorContent: item.content,
      errorDate: item.date,
    };
  });

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: () => (
        <EditableHeader
          title="上下行"
          onChange={(val) => {
            setPlatform(val);
          }}
        />
      ),
      dataIndex: "upDown",
      key: "upDown",
    },
    {
      title: () => (
        <EditableHeader title="设备编号" onChange={(val) => setDeviceId(val)} />
      ),
      dataIndex: "equipmentId",
      key: "equipmentId",
    },
    {
      title: () => (
        <EditableHeader title="故障内容" onChange={(val) => setContent(val)} />
      ),
      dataIndex: "errorContent",
      key: "errorContent",
      render: (text: any) => <Text type="danger">{text}</Text>,
    },
    {
      title: () => (
        <EditableHeader title="日期" onChange={(val) => setStartDate(val)} />
      ),
      dataIndex: "errorDate",
      key: "errorDate",
    },
  ];

  return (
    <Table
      dataSource={errorTableData}
      columns={columns}
      pagination={{ pageSize }}
      style={{ backgroundColor: "#f1f8ba" }}
      size="small"
    />
  );
};
