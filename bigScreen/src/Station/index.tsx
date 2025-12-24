import React, { useState, useEffect, useMemo } from "react";
import {
  Layout,
  theme,
  Row,
  Col,
  Dropdown,
  Space,
  Typography,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import {
  DownOutlined,
  ZoomInOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { StationAlertTable } from "./stationAlertTable";
import { StationErrorTable } from "./stationErrorTable";
import "./index.css";
import {
  lineInfoProcess,
  stationInfoProcess,
  findLabelByKey,
} from "../utils/headersInfoProcess";
import axios from "axios";
import { asdInfoProcess } from "./asdInfoProcess";
import { useParams } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const Station: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { lineId, lineName, stationId, stationName } = useParams();
  const [lineSelect, setLineSelect] = useState<MenuProps["items"]>([]);
  const [stationSelect, setStationSelect] = useState<MenuProps["items"]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [allAsdInfo, setAllAsdInfo] = useState<any>({});

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const lineSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpLineName = findLabelByKey(lineSelect ?? [], key);
    const tmpStationId = key + "_S_1";
    window.location.href = `/station/${key}/${tmpLineName}/${tmpStationId}/S_1`;
  };

  const stationSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpStationName = findLabelByKey(stationSelect ?? [], key);
    window.location.href = `/station/${lineId}/${lineName}/${key}/${tmpStationName}`;
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    window.location.href = `/asd/${lineId}/${lineName}/${stationId}/${stationName}/${key}`;
  };

  const fetchData = async () => {
    try {
      const [lineSelectResponse, stationSelectResponse, allAsdInfoResponse] =
        await Promise.all([
          axios.get("http://127.0.0.1:3007/station/getAllMetros"),
          axios.get("http://127.0.0.1:3007/station/getAllStationHeaders", {
            params: {
              lineId,
              lineName,
            },
          }),
          axios.get("http://127.0.0.1:3007/station/getAllASDStatus", {
            params: {
              lineId,
              lineName,
              stationId,
              stationName,
              upAmount: 40,
              downAmount: 40,
            },
          }),
        ]);
      setLineSelect(lineInfoProcess(lineSelectResponse));
      setStationSelect(stationInfoProcess(stationSelectResponse));
      setAllAsdInfo(allAsdInfoResponse);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const [upASD, downASD] = useMemo(
    () => (allAsdInfo?.data ? asdInfoProcess(allAsdInfo?.data?.data) : []),
    [allAsdInfo]
  );

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
                window.location.href = "http://myecharts:80/myEcharts";
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
                <Title
                  style={{
                    color: "white",
                    marginLeft: 0,
                    marginTop: 10,
                    whiteSpace: "nowrap",
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
        <div className="stationContainer">
          <div className="station">
            {allAsdInfo?.data && (
              <Row
                style={{
                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {upASD?.map((asd, num) => (
                  <Col span="1" push="1">
                    {asd.visible && (
                      <Dropdown
                        menu={{
                          items: asd.asdArr,
                          onClick: handleMenuClick,
                        }}
                        overlayStyle={{ maxHeight: 200, overflowY: "auto" }}
                        placement="top"
                      >
                        <Button danger>{num + 1}</Button>
                      </Dropdown>
                    )}
                  </Col>
                ))}
                {downASD?.reverse().map((asd, num) => (
                  <Col span="1" push="5">
                    {asd.visible && (
                      <Dropdown
                        overlayStyle={{ maxHeight: 200, overflowY: "auto" }}
                        menu={{
                          items: asd.asdArr,
                          onClick: handleMenuClick,
                        }}
                        placement="top"
                      >
                        <Button danger>{8 - num}</Button>
                      </Dropdown>
                    )}
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
        <div style={{ marginTop: "-280px" }}>
          <Button
            type="primary"
            icon={<ZoomInOutlined />}
            size="large"
            onClick={handleClick}
            style={{ marginLeft: "30px", fontSize: "20px" }}
          >
            告/预警表
          </Button>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            size="large"
            onClick={() => {
              window.location.href = `/stationTable/${lineId}/${lineName}/${stationId}/${stationName}`;
            }}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          >
            更多告/预警表
          </Button>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            size="large"
            onClick={() => {
              window.location.href = `/cabinet/${lineId}/${lineName}/${stationId}/${stationName}`;
            }}
            style={{ marginLeft: "10px", fontSize: "20px" }}
          >
            机柜情况
          </Button>
        </div>
        {isVisible && (
          <div className="stationTable" style={{ height: "400px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Title level={3} type="danger">
                  告警表
                </Title>
                <StationErrorTable
                  lineId={lineId ?? ""}
                  lineName={lineName ?? ""}
                  stationId={stationId ?? ""}
                  stationName={stationName ?? ""}
                  pageSize={4}
                />
              </Col>
              <Col span={12}>
                <Title level={3} type="warning">
                  预警表
                </Title>
                <StationAlertTable
                  lineId={lineId ?? ""}
                  lineName={lineName ?? ""}
                  stationId={stationId ?? ""}
                  stationName={stationName ?? ""}
                  pageSize={4}
                />
              </Col>
            </Row>
          </div>
        )}
      </Layout>
    </Layout>
  );
};

export default Station;
