import React from "react";

const StatusSpan = ({ status }) => {
  let color = "";
  let text = "";

  switch (status) {
    case "AUTO":
      color = "green";
      text = "自动模式";
      break;
    case "MANUAL":
      color = "yellow";
      text = "手动模式";
      break;
    case "ISOLATION":
      color = "purple";
      text = "隔离模式";
      break;
    case "REMOTE_ISOLATION":
      color = "white";
      text = "远程隔离";
      break;
    case "COMMUNICATION_FAILURE":
      color = "gray";
      text = "通讯故障";
      break;
    default:
      color = "black";
      text = "未知状态";
  }

  return <span style={{ color }}>{text}</span>;
};

export default StatusSpan;
