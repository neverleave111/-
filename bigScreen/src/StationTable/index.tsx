import React, { useState, useEffect } from "react";
import { Layout, theme, Row, Col, Dropdown, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { StationAlertTable } from "../Station/stationAlertTable";
import { StationErrorTable } from "../Station/stationErrorTable";
import "./index.css";
import {
  lineInfoProcess,
  stationInfoProcess,
  findLabelByKey,
} from "../utils/headersInfoProcess";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const StationTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { lineId, lineName, stationId, stationName } = useParams();
  const [lineSelect, setLineSelect] = useState<MenuProps["items"]>([]);
  const [stationSelect, setStationSelect] = useState<MenuProps["items"]>([]);

  const lineSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpLineName = findLabelByKey(lineSelect ?? [], key);
    const tmpStationId = key + "_S_1";
    window.location.href = `/stationTable/${key}/${tmpLineName}/${tmpStationId}/S_1`;
  };

  const stationSelectOnClick: MenuProps["onClick"] = ({ key }) => {
    const tmpStationName = findLabelByKey(stationSelect ?? [], key);
    window.location.href = `/stationTable/${lineId}/${lineName}/${key}/${tmpStationName}`;
  };

  const fetchData = async () => {
    try {
      const [lineSelectResponse, stationSelectResponse] = await Promise.all([
        axios.get("http://127.0.0.1:3007/station/getAllMetros"),
        axios.get("http://127.0.0.1:3007/station/getAllStationHeaders", {
          params: {
            lineId,
            lineName,
          },
        }),
      ]);
      setLineSelect(lineInfoProcess(lineSelectResponse));
      setStationSelect(stationInfoProcess(stationSelectResponse));
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
      <Layout>
        <div className="stationTable" style={{ height: "1000px" }}>
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
                pageSize={12}
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
                pageSize={12}
              />
            </Col>
          </Row>
        </div>
      </Layout>
    </Layout>
  );
};

export default StationTable;
