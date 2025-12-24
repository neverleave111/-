import React from "react";
import "./infoLight.css";

// 状态类型
type StatusType = string;

// 组件属性接口
interface WarningLightProps {
  status?: StatusType;
}

export const InfoLight: React.FC<WarningLightProps> = ({ status }) => {
  return <div className={`warning-light ${status}`}></div>;
};
