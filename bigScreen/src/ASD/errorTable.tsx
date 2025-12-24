import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import axios from "axios";
import { asdParams } from "./asdInterface";

export const StationErrorTable: React.FC<asdParams> = ({
  lineId,
  lineName,
  stationId,
  stationName,
  platform,
  asdNo,
}) => {
  const { Text } = Typography;

  const [errorData, setErrorData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const errorDataResponse = await axios.get(
        "http://127.0.0.1:3007/asd/getASDRealTimeAlarms",
        {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform,
            asdNo,
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
      title: "上下行",
      dataIndex: "upDown",
      key: "upDown",
    },
    {
      title: "设备编号",
      dataIndex: "equipmentId",
      key: "equipmentId",
    },
    {
      title: "故障内容",
      dataIndex: "errorContent",
      key: "errorContent",
      render: (text: any) => <Text type="danger">{text}</Text>,
    },
    {
      title: "日期",
      dataIndex: "errorDate",
      key: "errorDate",
    },
  ];

  return <Table dataSource={errorTableData} columns={columns} size="small" />;
};
