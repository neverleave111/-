import React from "react";
import "./door.css";

// 状态类型
type StatusType = "success" | "warning" | "hand" | "divide" | "allBlock";

// 组件属性接口
interface DoorProps {
  status?: StatusType;
  openStatus: string;
  isPED?: boolean;
  isEED?: boolean;
}

const transform = (str, isPED, isEED) => {
  if (isPED || isEED) {
    return "eed";
  }
  if (str == "success") {
    return "02";
  } else if (str == "warning") {
    return "03";
  } else if (str == "divide") {
    return "05";
  } else if (str == "hand") {
    return "04";
  } else if (str == "allBlock") {
    return "01";
  }
};

export const Door: React.FC<DoorProps> = ({
  status,
  openStatus,
  isPED,
  isEED,
}) => {
  if (isEED) {
  }
  let imageUrl =
    "/door_" + transform(status, isPED, isEED) + "_" + openStatus + ".png";

  if (!status || !openStatus) {
    imageUrl = "/door_02_close.png";
  }
  // console.log(imageUrl);

  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "35px",
        height: "53px",
      }}
      // style={{ backgroundImage: `url(${imageUrl})` }}
      // className={`door`}
    ></div>
  );
};
