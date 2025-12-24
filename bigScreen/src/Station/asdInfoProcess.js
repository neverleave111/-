import {
  ExclamationCircleTwoTone,
} from "@ant-design/icons";

const asdHelp = (allAsdInfoData, start, end, downUp) => {
  let visible = false
  let asdArr = []
  if (downUp == "down") {
    let tmpArr = allAsdInfoData?.downItems
    if (tmpArr) {
      for (let i = start - 1; i < end; i++) {
        asdArr.push({
          label: tmpArr[i].asdId,
          key: tmpArr[i].asdId,
          icon: < ExclamationCircleTwoTone />,
          danger: tmpArr[i].asdStatus
        })
        if (tmpArr[i].asdStatus) {
          visible = true
        }
      }
    }
  } else {
    let tmpArr = allAsdInfoData?.upItems
    if (tmpArr) {
      for (let i = start - 1; i < end; i++) {
        asdArr.push({
          label: tmpArr[i].asdId,
          key: tmpArr[i].asdId,
          icon: < ExclamationCircleTwoTone />,
          danger: tmpArr[i].asdStatus
        })
        if (tmpArr[i].asdStatus) {
          visible = true
        }
      }
    }
  }
  return {
    visible,
    asdArr
  }
}

export const asdInfoProcess = (allAsdInfoData) => {
  let asdDownNum01 = asdHelp(allAsdInfoData, 1, 1, "down")
  let asdDownNum02 = asdHelp(allAsdInfoData, 2, 2, "down")
  let asdDownNum03 = asdHelp(allAsdInfoData, 3, 3, "down")
  let asdDownNum04 = asdHelp(allAsdInfoData, 4, 4, "down")
  let asdDownNum05 = asdHelp(allAsdInfoData, 5, 6, "down")
  let asdDownNum06 = asdHelp(allAsdInfoData, 7, 8, "down")
  let asdDownNum07 = asdHelp(allAsdInfoData, 9, 12, "down")
  let asdDownNum08 = asdHelp(allAsdInfoData, 13, allAsdInfoData?.downItems?.length, "down")
  let asdUpNum01 = asdHelp(allAsdInfoData, 1, 1, "up")
  let asdUpNum02 = asdHelp(allAsdInfoData, 2, 2, "up")
  let asdUpNum03 = asdHelp(allAsdInfoData, 3, 3, "up")
  let asdUpNum04 = asdHelp(allAsdInfoData, 4, 4, "up")
  let asdUpNum05 = asdHelp(allAsdInfoData, 5, 6, "up")
  let asdUpNum06 = asdHelp(allAsdInfoData, 7, 8, "up")
  let asdUpNum07 = asdHelp(allAsdInfoData, 9, 12, "up")
  let asdUpNum08 = asdHelp(allAsdInfoData, 13, allAsdInfoData?.upItems?.length, "up")
  return [
    [asdDownNum01,
      asdDownNum02,
      asdDownNum03,
      asdDownNum04,
      asdDownNum05,
      asdDownNum06,
      asdDownNum07,
      asdDownNum08,
    ],
    [asdUpNum01,
      asdUpNum02,
      asdUpNum03,
      asdUpNum04,
      asdUpNum05,
      asdUpNum06,
      asdUpNum07,
      asdUpNum08,
    ]
  ]
}