// src/pages/alarm/AlarmTable.js
import React from 'react';
import AlarmWarningTable from '../../components/AlarmWarningTable';
import apiConfig from '../../apiConfig';

const AlarmTable = () => {
  return (
    <AlarmWarningTable 
      apiUrl={apiConfig.getAlarmList} 
      updateApiUrl={apiConfig.updateAlarmStatus} 
      title="告警记录" 
    />
  );
};

export default AlarmTable;