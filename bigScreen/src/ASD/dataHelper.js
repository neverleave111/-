export const equipStatusHelper = (motorStatusResponse, lockStatusResponse, dcuStatusResponse, beltStatusResponse, safetyLoopStatusResponse) => {
  return {
    motorStatus: statusHelper(motorStatusResponse),
    lockStatus: statusHelper(lockStatusResponse),
    dcuStatus: statusHelper(dcuStatusResponse),
    beltStatus: statusHelper(beltStatusResponse),
    safetyLoopStatus: statusHelper(safetyLoopStatusResponse),
  }
}

function statusHelper(statusResponse) {
  return statusResponse?.data?.data?.status
}

export const workMode = {
  0: "自动",
  1: "手动",
  2: "隔离",
  3: "远程隔离"
}