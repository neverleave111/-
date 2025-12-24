import React, { useState, useEffect } from "react";
import {
  Layout,
  theme,
  Row,
  Col,
  Dropdown,
  Space,
  Typography,
  Tooltip,
} from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./index.css";
import {
  lineInfoProcess,
  stationInfoProcess,
  findLabelByKey,
} from "../utils/headersInfoProcess";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MessageIcon } from "../Components/messageIcon";

const { Content, Sider, Header } = Layout;
const { Title } = Typography;

interface batteryStatusInterface {
  temperature: number;
  switchStatus: number;
  batteryStatus: number;
}

interface plcStatusInterface {
  upPLCStatus: number;
  downPLCStatus: number;
  message: string;
}

interface cabinetStatusInterface {
  upPLCStatus: number;
  downPLCStatus: number;
  upPEDCStatus: number;
  downPEDCStatus: number;
}

const color = {
  2: "#e2c700",
  1: "red",
  0: "#52c41a",
};

const Cabinet: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { lineId, lineName, stationId, stationName } = useParams();
  const [lineSelect, setLineSelect] = useState<MenuProps["items"]>([]);
  const [stationSelect, setStationSelect] = useState<MenuProps["items"]>([]);
  const [batteryStatus, setBatteryStatus] = useState<batteryStatusInterface>({
    temperature: 0,
    switchStatus: 0,
    batteryStatus: 0,
  });

  const [cabinetStatus, setCabinetStatus] = useState<cabinetStatusInterface>({
    upPLCStatus: 0,
    downPLCStatus: 0,
    upPEDCStatus: 0,
    downPEDCStatus: 0,
  });

  const lineSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpLineName = findLabelByKey(lineSelect ?? [], key);
    const tmpStationId = key + "_S_1";
    window.location.href = `/cabinet/${key}/${tmpLineName}/${tmpStationId}/S_1`;
  };

  const stationSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpStationName = findLabelByKey(stationSelect ?? [], key);
    window.location.href = `/cabinet/${lineId}/${lineName}/${key}/${tmpStationName}`;
  };

  const fetchData = async () => {
    try {
      const [lineSelectResponse, stationSelectResponse, cabinetStatusResponse] =
        await Promise.all([
          axios.get("http://127.0.0.1:3007/cabinet/getAllMetros"),
          axios.get("http://127.0.0.1:3007/cabinet/getAllStationHeadersShort", {
            params: {
              lineId,
              lineName,
            },
          }),
          // axios.get("http://127.0.0.1:3007/cabinet/getBatteryStatus", {
          //   params: {
          //     lineId,
          //     lineName,
          //     stationId,
          //     stationName,
          //   },
          // }),
          axios.get("http://127.0.0.1:3007/cabinet/getCabinetStatus", {
            params: {
              lineId,
              lineName,
              stationId,
              stationName,
            },
          }),
        ]);
      setLineSelect(lineInfoProcess(lineSelectResponse));
      setStationSelect(stationInfoProcess(stationSelectResponse));
      // setBatteryStatus({
      //   temperature: batteryStatusResponse.data?.data?.temperature ?? 0,
      //   switchStatus: batteryStatusResponse.data?.data?.switchStatus ?? 0,
      //   batteryStatus: batteryStatusResponse.data?.data?.batteryStatus ?? 0,
      // });
      setCabinetStatus({
        upPLCStatus: cabinetStatusResponse?.data?.data?.upPLCStatus ?? 0,
        downPLCStatus: cabinetStatusResponse?.data?.data?.downPLCStatus ?? 0,
        upPEDCStatus: cabinetStatusResponse?.data?.data?.upPEDCStatus ?? 0,
        downPEDCStatus: cabinetStatusResponse?.data?.data?.downPEDCStatus ?? 0,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(cabinetStatus);
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#0958d9",
        }}
      >
        <Row>
          <Col span={2}>
            <Typography
              onClick={(value) => {
                window.location.href = "http://localhost:80/myEcharts";
              }}
            >
              <Title
                style={{
                  color: "white",
                  marginLeft: -35,
                  marginTop: 10,
                  whiteSpace: "nowrap",
                }}
              >
                首页&lt;
              </Title>
            </Typography>
          </Col>
          <Col
            span={20}
            style={{
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            <Link
              to={`/station/${lineId}/${lineName}/${stationId}/${stationName}`}
            >
              <Typography>
                <Title style={{ color: "white", marginLeft: 0, marginTop: 10 }}>
                  站台门智能运维系统
                </Title>
              </Typography>
            </Link>

            <Dropdown
              menu={{ items: lineSelect, onClick: lineSelectOnClick }}
              overlayStyle={{ maxHeight: 200, overflowY: "auto" }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ backgroundColor: "transparent" }}>
                  <Typography>
                    <Title
                      style={{
                        color: "white",
                        marginLeft: 35,
                        marginTop: 10,
                      }}
                    >
                      {lineName}
                    </Title>
                  </Typography>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

            <Dropdown
              menu={{ items: stationSelect, onClick: stationSelectOnClick }}
              overlayStyle={{ maxHeight: 200, overflowY: "auto" }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ backgroundColor: "transparent" }}>
                  <Typography>
                    <Title
                      style={{
                        color: "white",
                        marginLeft: 25,
                        marginTop: 10,
                      }}
                    >
                      {stationName}
                    </Title>
                  </Typography>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
          <Col span={2}>
            <Typography
              onClick={(value) => {
                window.location.href = `/dashboard/${lineId}/${lineName}/${stationId}/${stationName}`;
              }}
            >
              <Title
                style={{
                  color: "white",
                  marginLeft: -70,
                  marginTop: 10,
                  whiteSpace: "nowrap",
                }}
              >
                &gt;站台主监控
              </Title>
            </Typography>
          </Col>
        </Row>
      </Header>
      <Layout
        style={{
          backgroundColor: "#FFF",
        }}
      >
        <div className="cabinetContainer">
          <div className="cabinet">
            <Row style={{ position: "relative", top: "21%" }}>
              <Col push="2">
                <Tooltip title="上行PEDC">
                  <ExclamationCircleTwoTone
                    twoToneColor={color[cabinetStatus.upPEDCStatus]}
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row style={{ position: "relative", top: "27.5%" }}>
              <Col push="2">
                <Tooltip title="上行PLC">
                  <ExclamationCircleTwoTone
                    twoToneColor={color[cabinetStatus.upPLCStatus]}
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
                {/* <MessageIcon
                  message="上行PLC"
                  color={color[plcStatus.upPLCStatus]}
                  status={plcStatus.upPLCStatus}
                /> */}
              </Col>
              <Col push="3">
                <Tooltip title="下行PLC">
                  <ExclamationCircleTwoTone
                    twoToneColor={color[cabinetStatus.downPLCStatus]}
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
                {/* <MessageIcon
                  message="下行PLC"
                  color={color[plcStatus.upPLCStatus]}
                  status={plcStatus.upPLCStatus}
                /> */}
              </Col>
              <Col push="16">
                <Tooltip title="驱动电源模块">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row style={{ position: "relative", top: "34%" }}>
              <Col push="2">
                <Tooltip title="下行 PEDC">
                  <ExclamationCircleTwoTone
                    twoToneColor={color[cabinetStatus.downPEDCStatus]}
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
              <Col push="11">
                <Tooltip title="控制电源模块">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row style={{ position: "relative", top: "36%" }}>
              <Col push="21">
                <Tooltip title="电池单元">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row style={{ position: "relative", top: "40%" }}>
              <Col push="12">
                <Tooltip title="控制电源开关">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
              <Col push="16">
                <Tooltip title="驱动电源开关">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row style={{ position: "relative", top: "77%" }}>
              <Col push="7">
                <Tooltip title="PSC">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
              <Col push="11">
                <Tooltip title="控制电源柜">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
              <Col push="16">
                <Tooltip title="驱动电源柜">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
              <Col push="20">
                <Tooltip title="电池柜">
                  <ExclamationCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "25px" }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default Cabinet;
