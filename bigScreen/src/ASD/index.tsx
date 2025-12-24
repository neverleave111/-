import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  theme,
  Typography,
  Row,
  Col,
  Select,
  Dropdown,
  Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { StationErrorTable } from "./errorTable";
import { StationAlertTable } from "./alertTable";
import { AsdButtonLeft, AsdButtonRight } from "./asdButton";
import { ThreeModel } from "./threeModel";
import { useParams } from "react-router-dom";
import {
  lineInfoProcess,
  stationInfoProcess,
  asdInfoProcess,
  findLabelByKey,
} from "../utils/headersInfoProcess";
import { equipStatusHelper, workMode } from "./dataHelper";
import axios from "axios";

const { Content, Sider, Header } = Layout;
const { Title, Text } = Typography;
interface asdStatusInterface {
  temperature: number;
  humidity: number;
  voltage: number;
  mode: number;
}

const ASD: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { lineId, lineName, stationId, stationName, asdId } = useParams();

  // 这里应该默认值从url来
  const [lineSelect, setLineSelect] = useState<MenuProps["items"]>([]);
  const [stationSelect, setStationSelect] = useState<MenuProps["items"]>([]);
  const [asdIdSelect, setAsdIdSelect] = useState([]);
  const [equipStatus, setEquipStatus] = useState({});
  const [asdStatus, setAsdStatus] = useState<asdStatusInterface>({
    temperature: 0,
    humidity: 0,
    voltage: 0,
    mode: 0,
  });

  const lineSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpLineName = findLabelByKey(lineSelect ?? [], key);
    const tmpStationId = key + "_S_1";
    window.location.href = `/asd/${key}/${tmpLineName}/${tmpStationId}/S_1/asd101`;
  };

  const stationSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpStationName = findLabelByKey(stationSelect ?? [], key);
    window.location.href = `/asd/${lineId}/${lineName}/${key}/${tmpStationName}/asd101`;
  };

  const fetchData = async () => {
    try {
      const [
        lineSelectResponse,
        stationSelectResponse,
        asdSelectResponse,
        motorStatusResponse,
        lockStatusResponse,
        dcuStatusResponse,
        beltStatusResponse,
        safetyLoopStatusResponse,
        asdInfoResponse,
      ] = await Promise.all([
        axios.get("http://127.0.0.1:3007/asd/getAllMetros"),
        axios.get("http://127.0.0.1:3007/asd/getAllStationHeadersShort", {
          params: {
            lineId,
            lineName,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getAllASDNumbers", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getASDMotorStatus", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform: asdId ? parseInt(asdId.slice(3, 4)) : 1,
            asdNo: asdId ? parseInt(asdId.slice(-2)) : 0,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getASDLockStatus", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform: asdId ? parseInt(asdId.slice(3, 4)) : 1,
            asdNo: asdId ? parseInt(asdId.slice(-2)) : 0,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getASDDCUStatus", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform: asdId ? parseInt(asdId.slice(3, 4)) : 1,
            asdNo: asdId ? parseInt(asdId.slice(-2)) : 0,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getASDBeltStatus", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform: asdId ? parseInt(asdId.slice(3, 4)) : 1,
            asdNo: asdId ? parseInt(asdId.slice(-2)) : 0,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getASDSafetyLoopStatus", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform: asdId ? parseInt(asdId.slice(3, 4)) : 1,
            asdNo: asdId ? parseInt(asdId.slice(-2)) : 0,
          },
        }),
        axios.get("http://127.0.0.1:3007/asd/getASDInfo", {
          params: {
            lineId,
            lineName,
            stationId,
            stationName,
            platform: asdId ? parseInt(asdId.slice(3, 4)) : 1,
            asdNo: asdId ? parseInt(asdId.slice(-2)) : 0,
          },
        }),
      ]);
      setLineSelect(lineInfoProcess(lineSelectResponse));
      setStationSelect(stationInfoProcess(stationSelectResponse));
      setAsdIdSelect(asdInfoProcess(asdSelectResponse));
      setEquipStatus(
        equipStatusHelper(
          motorStatusResponse,
          lockStatusResponse,
          dcuStatusResponse,
          beltStatusResponse,
          safetyLoopStatusResponse
        )
      );
      setAsdStatus({
        temperature: asdInfoResponse.data?.data?.temperature ?? 0,
        humidity: asdInfoResponse.data?.data?.humidity ?? 0,
        voltage: asdInfoResponse.data?.data?.voltage ?? 0,
        mode: asdInfoResponse.data?.data?.mode ?? 0,
      });
    } catch (error) {
      console.log("error");
    }
  };

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
          <Col
            span={3}
            style={{
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              onClick={(value) => {
                window.location.href = "http://localhost:80/myEcharts";
              }}
            >
              <Title
                style={{
                  color: "white",
                  marginLeft: 0,
                  marginTop: 10,
                  whiteSpace: "nowrap",
                }}
              >
                首页&lt;
              </Title>
            </Typography>
            <Select
              defaultValue={asdId}
              style={{ width: 100, marginTop: 25, marginLeft: 30 }}
              onChange={(value) => {
                window.location.href = `/asd/${lineId}/${lineName}/${stationId}/${stationName}/${value}`;
              }}
              options={asdIdSelect}
            />
          </Col>
          <Col
            span={19}
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
                <Title
                  style={{ color: "white", marginLeft: 0, marginTop: 10 }}
                  onClick={() => {
                    window.location.href = "http://127.0.0.1:8080";
                  }}
                >
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
      <Layout>
        <Sider width={400} style={{ background: colorBgContainer }}>
          <Title level={3} type="danger">
            告警表
          </Title>
          <StationErrorTable
            lineId={lineId ?? ""}
            lineName={lineName ?? ""}
            stationId={stationId ?? ""}
            stationName={stationName ?? ""}
            platform={asdId ? parseInt(asdId.slice(3, 4)) : 1}
            asdNo={asdId ? parseInt(asdId.slice(-2)) : 0}
          />
          <Title level={3} type="warning">
            预警表
          </Title>
          <StationAlertTable
            lineId={lineId ?? ""}
            lineName={lineName ?? ""}
            stationId={stationId ?? ""}
            stationName={stationName ?? ""}
            platform={asdId ? parseInt(asdId.slice(3, 4)) : 1}
            asdNo={asdId ? parseInt(asdId.slice(-2)) : 0}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Row>
              <Text strong>
                温度:{asdStatus.temperature}摄氏度, 湿度:{asdStatus.humidity}%,
                电压:
                {asdStatus.voltage}V, asd工作模式:
                {(workMode as any)[asdStatus.mode]}
              </Text>
            </Row>
            <Row gutter={[16, 0]}>
              <Col
                span={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AsdButtonLeft equipStatus={equipStatus} />
              </Col>
              <Col
                span={16}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "translateY(50px)",
                }}
              >
                <div
                  style={{
                    margin: "30px",
                  }}
                >
                  <ThreeModel />
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AsdButtonRight equipStatus={equipStatus} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ASD;
