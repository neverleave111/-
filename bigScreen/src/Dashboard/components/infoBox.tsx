import React from "react";
import { Divider } from "antd";
import { Typography } from "antd";
import { InfoItem } from "./infoItem";
import { Door } from "../../Components/door";

const { Title } = Typography;

interface IProps {
  title: string;
  infoItemArray?: any[];
  infoDoorsArray?: any[];
  EEDArray?: any[];
  PEDArray?: any[];
}

export const InfoBox: React.FC<IProps> = ({
  title,
  infoItemArray,
  infoDoorsArray,
  EEDArray,
  PEDArray,
}) => {
  if (PEDArray) {
    console.log("PEDArray", PEDArray);
  }
  if (EEDArray) {
    console.log("EEDArray", EEDArray, EEDArray[1]?.openStatus);
  }
  return (
    <>
      <Title level={2}>{title}</Title>
      <Divider style={{ borderColor: "#4a4a4a" }}></Divider>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {infoItemArray?.map((item) => (
          <InfoItem name={item.name} value={item.value} />
        ))}
      </div>
      {infoDoorsArray && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Door
              status={PEDArray[0]?.status}
              openStatus={PEDArray[0]?.openStatus}
              isPED={true}
            />
            {/* <Door status="success" openStatus="close" isPED={true} /> */}
            P1
          </div>
          {infoDoorsArray?.map((item, index) => (
            <>
              {/* 这里可以封起来,这里是应急门 */}
              {index % 4 == 2 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Door
                      status={EEDArray[Math.floor(index / 2) - 1]?.status}
                      openStatus={
                        EEDArray[Math.floor(index / 2) - 1]?.openStatus
                      }
                      isEED={true}
                    />
                    E{Math.floor(index / 2)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Door
                      status={EEDArray[Math.floor(index / 2)]?.status}
                      openStatus={EEDArray[Math.floor(index / 2)]?.openStatus}
                      isEED={true}
                    />
                    E{Math.floor(index / 2) + 1}
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Door status={item?.status} openStatus={item?.openStatus} />
                {index + 1}
              </div>
            </>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Door
              status={PEDArray[1]?.status}
              openStatus={PEDArray[1]?.openStatus}
              isPED={true}
            />
            P2
          </div>
        </div>
      )}
      <Divider style={{ borderColor: "#000000" }}></Divider>
    </>
  );
};
