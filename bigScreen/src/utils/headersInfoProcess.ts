export const lineInfoProcess = (lineSelectResponse: any) => {
  const lindeInfoData = lineSelectResponse?.data?.data;
  return lindeInfoData?.Items?.map((item: any) => {
    return {
      label: item.lineName,
      key: item.lineId
    }
  })
}

export const stationInfoProcess = (stationSelectResponse: any) => {
  const stationInfoData = stationSelectResponse?.data?.data;
  return stationInfoData?.Items?.map((item: any) => {
    return {
      label: item.stationName,
      key: item.stationId
    }
  })
}

export const asdInfoProcess = (asdSelectResponse: any) => {
  const asdInfoData = asdSelectResponse?.data?.data;
  return asdInfoData.Items.map((item: any) => {
    return {
      value: item.asdId,
      label: item.asdId
    }
  })
}

export const findLabelByKey = (arr: any[], targetKey: string) => {
  const found = arr.find(item => item.key === targetKey);
  return found ? found.label : "";
}