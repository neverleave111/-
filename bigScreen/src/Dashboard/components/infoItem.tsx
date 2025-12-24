import { Card } from "antd";
import { InfoLight } from "../../Components/infoLight";
import { BlobOptions } from "buffer";

const statusMap = {
  safe: "success",
  warning: "warning",
  alert: "error",
};

interface IProps {
  name: string;
  status?: string;
  value?: string;
}

export const InfoItem: React.FC<IProps> = ({ name, value }) => {
  return (
    <Card
      style={{
        width: 300,
        height: 90,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          // flexDirection: "column",
          // justifyItems: "center",
          alignItems: "center",
        }}
      >
        <InfoLight status={value ?? undefined} />
        <div style={{ marginLeft: 20, fontSize: 20 }}>{name}</div>
      </div>
    </Card>
  );
};
