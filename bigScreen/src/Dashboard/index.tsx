import { Button, Row, Col, Typography } from "antd";
import { InfoBox } from "./components/infoBox";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const { Title } = Typography;

function isNthBitOne(str, n) {
  // 将字符串转换为整数
  const num = parseInt(str, 10);

  // 检查转换是否成功（避免 NaN 值）
  if (isNaN(num)) {
    return false;
  }

  // 将整数转换为二进制字符串
  const binaryStr = num.toString(2);

  // 计算需要检查的位数在二进制字符串中的位置（从右边开始）
  const bitPosition = binaryStr.length - n - 1;

  // 检查该位置是否为 1
  return bitPosition >= 0 && binaryStr[bitPosition] === "1";
}

const Dashboard: React.FC = () => {
  const { lineId, lineName, stationId, stationName } = useParams();
  // const [allAsdInfo, setAllAsdInfo] = useState<any>({});
  const [allDashInfo, setDashInfo] = useState<any>({
    data: {
      data: {
        lineId: "", // MetroID -> json:"lineId"
        lineName: "", // MetroName -> json:"lineName"
        stationId: "", // StationID -> json:"stationId"
        stationName: "", // StationName -> json:"stationName"
        plcSigUpStatus: "", // PlcSigUpStatus -> json:"plcSigUpStatus"
        plcSigDownStatus: "", // PlcSigDownStatus -> json:"plcSigDownStatus"
        EEDUpStatus: "", // EEDUpStatus -> json:"EEDUpStatus"
        EEDDownStatus: "", // EEDDownStatus -> json:"EEDDownStatus"
        PEDUpStatus: "0", // PEDUpStatus -> json:"PEDUpStatus"
        plcPslUpStatus: "0",
        PEDDownStatus: "", // PEDDownStatus -> json:"PEDDownStatus"
        asdAllUpStatus: "", // ASDAllUpStatus -> json:"asdAllUpStatus"
        asdAllDownStatus: "", // ASDAllDownStatus -> json:"asdAllDownStatus"
        ASDAllUpAlarm: "", // ASDAllUpAlarm -> json:"ASDAllUpAlarm"
        ASDAllDownAlarm: "", // ASDAllDownAlarm -> json:"ASDAllDownAlarm"
        upDoors: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // UpDoors -> json:"upDoors"
        downDoors: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // DownDoors -> json:"downDoors"
        upPED: [1, 0], // UpPED -> json:"upPED"
        downPED: [], // DownPED -> json:"downPED"
        upEED: [1, 0, 0, 0, 0, 1, 0, 0], // UpEED -> json:"upEED"
        downEED: [], // DownEED -> json:"downEED"
      },
    },
  });
  const lineArr1: any[] = [
    { name: "主电源故障" },
    { name: "驱动电源故障" },
    { name: "控制电源故障" },
    { name: "电池故障" },
    { name: "电源总线故障" },
  ];

  // 按理这是个对象
  const lineArr2: any[] = [
    { name: "全开启" },
    { name: "互锁解除" },
    { name: "SIG 关门命令" },
    { name: "SIG 开门命令" },
    { name: "全闭锁" },
    { name: "PSL 关门命令" },
    { name: "PSL 开门命令" },
    { name: "IBP 全开门命令" },
  ];

  const lineArr3: any[] = [
    { name: "手动模式" },
    { name: "隔离模式" },
    { name: "应急门开" },
    { name: "端门开" },
    { name: "整侧开门故障" },
    { name: "整侧关门故障" },
    { name: "手动解锁" },
    { name: "障碍物" },
    { name: "电机故障" },
    { name: "电磁锁故障" },
    { name: "PLC 总线故障" },
    { name: "DCU 过热" },
    { name: "DCU 过电流" },
    { name: "DCU 总线 1 故障" },
    { name: "DCU 总线 2 故障" },
  ];

  const lineArr4: any[] = [
    { name: "全开启" },
    { name: "互锁解除" },
    { name: "SIG 关门命令" },
    { name: "SIG 开门命令" },
    { name: "全闭锁" },
    { name: "PSL 关门命令" },
    { name: "PSL 开门命令" },
    { name: "IBP 全开门命令" },
  ];

  const lineArr5: any[] = [
    { name: "手动模式" },
    { name: "隔离模式" },
    { name: "应急门开" },
    { name: "端门开" },
    { name: "整侧开门故障" },
    { name: "整侧关门故障" },
    { name: "手动解锁" },
    { name: "障碍物" },
    { name: "电机故障" },
    { name: "电磁锁故障" },
    { name: "PLC 总线故障" },
    { name: "DCU 过热" },
    { name: "DCU 过电流" },
    { name: "DCU 总线 1 故障" },
    { name: "DCU 总线 2 故障" },
  ];

  const PSDUp = [
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
  ];

  const PSDDown = [
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
    "success",
  ];

  const fetchData = async () => {
    try {
      const [allDashInfoResponse] = await Promise.all([
        axios.get("http://127.0.0.1:3007/station/getDashBoardInfo", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
          },
        }),
      ]);
      setDashInfo(allDashInfoResponse);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const checkPSDStatus = (item, index, isUp) => {
    const res: any = {};
    if (isNthBitOne(item, 1)) {
      if (isNthBitOne(item, 0)) {
        res.openStatus = "half";
      } else {
        res.openStatus = "half";
      }
    } else {
      if (isNthBitOne(item, 0)) {
        res.openStatus = "open";
      } else {
        res.openStatus = "close";
      }
    }
    res.status = "success";
    if (isNthBitOne(item, 5)) {
      res.status = "divide";
    }
    if (isNthBitOne(item, 4)) {
      res.status = "hand";
    }

    const alarmArray = isUp
      ? allDashInfo?.data?.data?.upDoorsAlarm
      : allDashInfo?.data?.data?.downDoorsAlarm;

    const checkASDISAlarm = () => {
      if (
        isNthBitOne(alarmArray[index], 18) &&
        isNthBitOne(alarmArray[index], 19)
      ) {
        return "allBlock";
      } else if (
        isNthBitOne(alarmArray[index], 0) ||
        isNthBitOne(alarmArray[index], 1) ||
        isNthBitOne(alarmArray[index], 2) ||
        isNthBitOne(alarmArray[index], 5) ||
        isNthBitOne(alarmArray[index], 7) ||
        isNthBitOne(alarmArray[index], 8) ||
        isNthBitOne(alarmArray[index], 10) ||
        isNthBitOne(alarmArray[index], 11) ||
        isNthBitOne(alarmArray[index], 12) ||
        isNthBitOne(alarmArray[index], 13) ||
        isNthBitOne(alarmArray[index], 14) ||
        isNthBitOne(alarmArray[index], 15) ||
        isNthBitOne(alarmArray[index], 16) ||
        isNthBitOne(alarmArray[index], 18) ||
        isNthBitOne(alarmArray[index], 19)
      ) {
        return "warning";
      } else {
        return false;
      }
    };
    if (alarmArray) {
      const ASDISAlarm = checkASDISAlarm();
      if (ASDISAlarm) {
        res.status = ASDISAlarm;
      }
    }
    // if (isUp && allAsdInfo?.data?.data?.upItems[index].asdStatus === "1") {
    //   res.status = "warning";
    // } else if (allAsdInfo?.data?.data?.downItems[index].asdStatus === "1") {
    //   res.status = "warning";
    // }
    return res;
  };

  const checkEDStatus = (item, index) => {
    return {
      status: "success",
      openStatus: isNthBitOne(item, 0) ? "open" : "close",
    };
  };

  const upAsd =
    allDashInfo?.data?.data?.upDoors?.map((item, index) => {
      return checkPSDStatus(item, index, true);
    }) ?? [];

  const downAsd =
    allDashInfo?.data?.data?.downDoors?.map((item, index) => {
      return checkPSDStatus(item, index, false);
    }) ?? PSDDown;

  const PEDUp = allDashInfo?.data?.data?.upPED?.map(checkEDStatus) ?? [];
  const PEDDown = allDashInfo?.data?.data?.downPED?.map(checkEDStatus) ?? [];

  const EEDUp = allDashInfo?.data?.data?.upEED?.map(checkEDStatus) ?? [];
  const EEDDown = allDashInfo?.data?.data?.downEED?.map(checkEDStatus) ?? [];

  // 其实应该下方到组件的
  const updateInfoArr = () => {
    // PLC 开启状态：全开启， 互锁解除， SIG 关门命令， SIG 开门命令
    if (isNthBitOne(allDashInfo?.data?.data?.plcSigUpStatus, 0)) {
      lineArr2[2].value = "success";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcSigUpStatus, 1)) {
      lineArr2[3].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.asdAllUpStatus, 1)) {
      lineArr2[0].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.asdAllUpStatus, 0)) {
      lineArr2[4].value = "success";
    }

    if (isNthBitOne(allDashInfo?.data?.data?.plcPslUpStatus, 4)) {
      lineArr2[1].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcPslUpStatus, 5)) {
      lineArr2[5].value = "success";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcPslUpStatus, 6)) {
      lineArr2[6].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcIbpUpStatus, 2)) {
      lineArr2[7].value = "alert";
    }

    if (isNthBitOne(allDashInfo?.data?.data?.plcSigDownStatus, 0)) {
      lineArr4[2].value = "success";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcSigDownStatus, 1)) {
      lineArr4[3].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.asdAllDownStatus, 1)) {
      lineArr4[0].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.asdAllDownStatus, 0)) {
      lineArr4[4].value = "success";
    }

    if (isNthBitOne(allDashInfo?.data?.data?.plcPslDownStatus, 4)) {
      lineArr4[1].value = "success";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcPslDownStatus, 5)) {
      lineArr4[5].value = "success";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcPslDownStatus, 6)) {
      lineArr4[6].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcIbpDownStatus, 2)) {
      lineArr4[7].value = "alert";
    }

    if (isNthBitOne(allDashInfo?.data?.data?.asdAllUpStatus, 4)) {
      lineArr3[0].value = "warning";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.asdAllUpStatus, 5)) {
      lineArr3[1].value = "divide";
    }

    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownStatus, 4)) {
      lineArr5[0].value = "warning";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownStatus, 5)) {
      lineArr5[1].value = "divide";
    }

    // 应急门
    if (isNthBitOne(allDashInfo?.data?.data?.EEDUpStatus, 0)) {
      lineArr3[2].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.EEDDownStatus, 0)) {
      lineArr5[2].value = "alert";
    }
    // 端门
    if (isNthBitOne(allDashInfo?.data?.data?.PEDUpStatus, 0)) {
      lineArr3[3].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.PEDDownStatus, 0)) {
      lineArr5[3].value = "alert";
    }

    // PLC 告警
    // 上行
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 0)) {
      lineArr3[4].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 1)) {
      lineArr3[5].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 2)) {
      lineArr3[6].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 5)) {
      lineArr3[7].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 7)) {
      lineArr3[8].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 8)) {
      lineArr3[9].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcUpAlarm1, 15)) {
      lineArr3[10].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 11)) {
      lineArr3[11].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 12)) {
      lineArr3[12].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 18)) {
      lineArr3[13].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllUpAlarm, 19)) {
      lineArr3[14].value = "alert";
    }
    // 下行
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 0)) {
      lineArr5[4].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 1)) {
      lineArr5[5].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 2)) {
      lineArr5[6].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 5)) {
      lineArr5[7].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 7)) {
      lineArr5[8].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 8)) {
      lineArr5[9].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.plcDownAlarm1, 15)) {
      lineArr5[10].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 11)) {
      lineArr5[11].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 12)) {
      lineArr5[12].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 18)) {
      lineArr5[13].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.ASDAllDownAlarm, 19)) {
      lineArr5[14].value = "alert";
    }

    //电源
    if (isNthBitOne(allDashInfo?.data?.data?.powerAlarm, 0)) {
      lineArr1[0].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.powerAlarm, 1)) {
      lineArr1[1].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.powerAlarm, 2)) {
      lineArr1[2].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.powerAlarm, 3)) {
      lineArr1[3].value = "alert";
    }
    if (isNthBitOne(allDashInfo?.data?.data?.powerAlarm, 4)) {
      lineArr1[4].value = "alert";
    }
  };

  updateInfoArr();

  return (
    <>
      <Button
        block
        color="primary"
        size="large"
        style={{ fontSize: 24 }}
        onClick={() => {
          window.location.href = `/station/${lineId}/${lineName}/${stationId}/${stationName}`;
        }}
      >
        回到站级页面
      </Button>
      <InfoBox title="设备房" infoItemArray={lineArr1} />
      <Row>
        <Col
          span={12}
          style={{
            borderRight: "1px solid #ccc", // 分割线
            padding: 16,
          }}
        >
          <Title level={1}>上行</Title>
          <InfoBox title="状态和命令" infoItemArray={lineArr2} />
          <InfoBox title="告警" infoItemArray={lineArr3} />
          <InfoBox
            title="上行PSD"
            infoDoorsArray={upAsd}
            EEDArray={EEDUp}
            PEDArray={PEDUp}
          />
        </Col>
        <Col span={12} style={{ padding: 16 }}>
          <Title level={1}>下行</Title>
          <InfoBox title="状态和命令" infoItemArray={lineArr4} />
          <InfoBox title="告警" infoItemArray={lineArr5} />
          <InfoBox
            title="下行PSD"
            infoDoorsArray={downAsd}
            EEDArray={EEDDown}
            PEDArray={PEDDown}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
