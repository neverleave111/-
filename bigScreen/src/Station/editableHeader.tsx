import React, { useState, useEffect, useRef } from "react";
import { Table, Typography, Input } from "antd";

const { Text } = Typography;

export const EditableHeader = ({ title, onChange }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  // 自动聚焦逻辑
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handlePressEnter = () => {
    setEditing(false);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {editing ? (
        <Input
          ref={inputRef}
          size="small"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={handleBlur}
          onPressEnter={handlePressEnter}
          style={{ width: "100%" }}
        />
      ) : (
        <div>{title}</div>
      )}
    </div>
  );
};
