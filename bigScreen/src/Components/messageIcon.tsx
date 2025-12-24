import React from "react";
import { Tooltip } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";

export const MessageIcon: React.FC<{message: string, color: string, status: number}> = ({message, color, status}) => {
  return (
    status === 0 ? 
    (<ExclamationCircleTwoTone
      twoToneColor={color}
      style={{ fontSize: "25px" }}
    /> ) : (<Tooltip title={message}>
    <ExclamationCircleTwoTone
      twoToneColor={color}
      style={{ fontSize: "25px" }}
    />
  </Tooltip> )
  )
};
