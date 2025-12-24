import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import axios from "axios";
import { asdParams } from "./asdInterface";

export const StationAlertTable: React.FC<asdParams> = ({
  lineId,
  lineName,
  stationId,
  stationName,
  platform,
  asdNo,
}) => {
  const { Text } = Typography;

  const [alertData, setAlertData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const alertDataResponse = await axios.get(
        "http://127.0.0.1:3007/asd/getASDRealTimeWarnings",
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
      setAlertData(alertDataResponse.data.data.Items);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const alertTableData = alertData.map((item, index) => {
    return {
      key: (index + 1).toString(),
      id: (index + 1).toString(),
      upDown: item.platform,
      equipmentId: item.deviceId,
      alertContent: item.content,
      alertDate: item.date,
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
      dataIndex: "alertContent",
      key: "alertContent",
      render: (text: any) => <Text type="warning">{text}</Text>,
    },
    {
      title: "日期",
      dataIndex: "alertDate",
      key: "alertDate",
    },
  ];
  return <Table dataSource={alertTableData} columns={columns} size="small" />;
};
