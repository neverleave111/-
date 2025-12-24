// src/utils/export.js
export const exportCSV = (data, filename) => {
  // 获取表头
  const headers = Object.keys(data[0]);
  
  // 构建CSV内容
  let csvContent = headers.join(',') + '\n';
  
  // 构建数据行
  data.forEach(item => {
    const values = headers.map(header => {
      const value = item[header] || '';
      // 处理包含逗号或引号的情况
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    csvContent += values.join(',') + '\n';
  });
  
  // 创建Blob对象
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // 创建下载链接
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};