// src/pages/alarm/WarningTable.js
import React from 'react';
import AlarmWarningTable from '../../components/AlarmWarningTable';
import apiConfig from '../../apiConfig';

const WarningTable = () => {
  return (
    <AlarmWarningTable 
      apiUrl={apiConfig.getWarningList} 
      updateApiUrl={apiConfig.updateWarningStatus} 
      title="预警记录" 
    />
  );
};

export default WarningTable;