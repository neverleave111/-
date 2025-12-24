let isStationAlarmingArr = new Array(35).fill(false);
let isStationWarningArr = new Array(35).fill(false);
const now = new Date()

// 地图模块
function plotLine() {
  const colorTable = {
    2: "#7fb80e",
    1: "red",
    0: "#ffff00"
  }
  var myChart = echarts.init(document.querySelector(".map .chart"));
  var data = [
    {
      name: "青岛地铁二号线",
      tooltip: {
        formatter: "{b}<br />"
      },
      symbolSize: 0.1,
      value: [70, 750],
      x: 800,
      y: 400,
      fixed: true,
      // draggable: false,
      category: 1,
      label: {
        color: "#35c2ff",
        position: 'bottom',
        fontSize: 24,
        fontWeight: 1000
      },
      itemStyle: {
        normal: {
          color: "#7fb80e"
        }
      },
    },
    //地铁一号线，站点间X轴坐标相差50，Y轴坐标相同
    {
      name: "四川路（轮渡）",
      tooltip: {
        formatter: "{b}<br />"
      },
      symbol: 'circle',
      symbolSize: [20, 20],
      value: [-120, 400],
      x: 800,
      y: 400,
      fixed: true,
      // draggable: false,
      category: 1,
      label: {
        color: "#FFF",
        position: 'right',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`
      },
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_1/四川路（轮渡）"
    },
    {
      name: "小港",
      x: 400,
      y: 400,
      value: [-120, 440],
      tooltip: {
        formatter: "{b} <br />"
      },
      fixed: true,
      symbol: 'circle',
      symbolSize: [15, 15],
      label: {
        color: "transparent",
        fontSize: "1px",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'none',
      },
      category: 1,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_2/小港"
    },

    {
      name: "国际邮轮港",
      x: 1000,
      y: 1000,
      value: [-120, 480],
      fixed: true,
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b} <br />"
      },
      label: {
        color: "transparent",
        position: 'bottom',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
      },
      category: 1,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_3/国际邮轮港"
    },
    {
      name: "泰山路",
      symbol: 'circle',
      symbolSize: [15, 15],
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top',
      },
      tooltip: {
        formatter: "{b} <br />"
      },
      value: [-60, 480],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_4/泰山路"
    },
    {
      name: "利津路",
      symbol: 'circle',
      symbolSize: [15, 15],
      label: {
        color: "transparent",
        position: 'bottom',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
      },
      tooltip: {
        formatter: "{b}<br />"
      },
      value: [0, 480],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_5/利津路"
    },
    {
      name: "台东",
      symbol: 'circle',
      symbolSize: [15, 15],
      label: {
        color: "transparent",
        position: 'bottom',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
      },
      tooltip: {
        formatter: "{b}<br />"
      },
      value: [60, 480],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_6/台东"
    },
    {
      name: "海信桥",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        position: 'top',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
      },
      value: [120, 440],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_7/海信桥"
    },
    {
      name: "芝泉路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        position: 'bottom',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
      },
      value: [180, 400],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_8/芝泉路"
    },
    {
      name: "五四广场",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top',
      },
      value: [240, 360],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_9/五四广场"
    },
    {
      name: "浮山所",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [300, 360],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_10/浮山所"
    },
    {
      name: "燕儿岛路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top',
      },
      value: [360, 360],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_11/燕儿岛路"
    },
    {
      name: "高雄路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [420, 360],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_12/高雄路"
    },
    {
      name: "麦岛",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top',
      },
      value: [480, 360],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_13/麦岛"
    },
    {
      name: "海游路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [540, 400],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_14/海游路"
    },
    {
      name: "海川路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top'
      },
      value: [600, 440],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_15/海川路"
    },
    {
      name: "海安路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [660, 480],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: '#7fb80e',
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_16/海安路"
    },
    {
      name: "石老人浴场",
      symbol: 'circle',
      symbolSize: [20, 20],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "#efefef",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'right'
      },
      value: [660, 520],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: '#7fb80e'
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_17/石老人浴场"
    },
    {
      name: "苗岭路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [660, 560],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_18/苗岭路"
    },
    {
      name: "同安路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top'
      },
      value: [660, 600],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_19/同安路"
    },
    {
      name: "辽阳东路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [660, 640],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_20/辽阳东路"
    },
    {
      name: "东韩",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top'
      },
      value: [600, 680],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_21/东韩"
    },
    {
      name: "华楼山路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'bottom',
      },
      value: [540, 720],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_22/华楼山路"
    },
    {
      name: "枣山路",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top',
      },
      value: [480, 760],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_23/枣山路"
    },
    {
      name: "李村",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        position: 'bottom',
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
      },
      value: [400, 760],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_24/李村"
    },
    {
      name: "李村公园",
      symbol: 'circle',
      symbolSize: [15, 15],
      tooltip: {
        formatter: "{b}<br />"
      },
      label: {
        color: "transparent",
        fontFamily: `"WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "Microsoft YaHei", sans-serif`,
        position: 'top',
      },
      value: [400, 790],
      x: 1000,
      y: 1000,
      fixed: true,
      category: 2,
      itemStyle: {
        color: "#7fb80e"
      },
      url: "http://localhost:8080/station/QD_line2/青岛 2 号线/QD_line2_S_25/李村公园"
    },
  ];
  data = data.map((item, index) => {
    if (index > 0) {
      if (isStationAlarmingArr[index - 1]) {
        item.itemStyle.color = "red"
      } else if (isStationWarningArr[index - 1]) {
        item.itemStyle.color = "yellow"
      }
      else {
        item.itemStyle.color = '#7fb80e'
      }
    }
    return item
  })
  option = ({
    title: {
      text: '北京地铁线路图',
      textStyle: {
        color: 'white',
        fontSize: 20
      },
      x: 'center',
      top: 10
    },
    //不设置背景颜色就是透明色
    // backgroundColor: '#000',
    xAxis: {
      show: false,
      min: 0,
      max: 1200,
      // type: "value",
      //开启x轴坐标
      axisPointer: {
        show: false
      },
    },
    yAxis: {
      show: false,
      min: 0,
      max: 1200,
      //   type: "value",
      //开启y轴坐标
      axisPointer: {
        show: false
      },
    },
    tooltip: {},

    series: [
      {
        type: "graph",
        zlevel: 5,
        draggable: false,
        coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

        // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
        // edgeLabel: {
        //   normal: {
        //     textStyle: {
        //       fontSize: 60
        //     }
        //   }
        // },
        symbol: "rect",
        symbolOffset: ["15%", 0],

        label: {
          normal: {
            show: true
          }
        },
        data: data,
        links: [{
          source: "四川路（轮渡）",
          target: "小港"
          // lineStyle: {
          //   normal: {
          //     color: "#12b5d0",
          //
          //   }
          // }
        },
        {
          source: "小港",
          target: "国际邮轮港",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "国际邮轮港",
          target: "泰山路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "泰山路",
          target: "利津路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "利津路",
          target: "台东",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "台东",
          target: "海信桥",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },

        {
          source: "海信桥",
          target: "芝泉路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },

        {
          source: "芝泉路",
          target: "五四广场",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },

        {
          source: "五四广场",
          target: "浮山所",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },

        {
          source: "浮山所",
          target: "燕儿岛路"
          // lineStyle: {
          //   normal: {
          //     color: "#12b5d0",
          //
          //   }
          // }
        },
        {
          source: "燕儿岛路",
          target: "高雄路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "高雄路",
          target: "麦岛",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "麦岛",
          target: "海游路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "海游路",
          target: "海川路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "海川路",
          target: "海安路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "海安路",
          target: "石老人浴场",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "石老人浴场",
          target: "苗岭路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "苗岭路",
          target: "同安路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "同安路",
          target: "辽阳东路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "辽阳东路",
          target: "东韩",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "东韩",
          target: "华楼山路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "华楼山路",
          target: "枣山路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "枣山路",
          target: "李村",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },
        {
          source: "李村",
          target: "李村公园",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            }
          }
        },

        {
          source: "南稍门",
          target: "永宁门",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "永宁门",
          target: "钟楼",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "钟楼",
          target: "北大街",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "北大街",
          target: "安远门",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "安远门",
          target: "龙首原",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "龙首原",
          target: "大明宫西",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "大明宫西",
          target: "市图书馆",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "市图书馆",
          target: "凤城五路",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "凤城五路",
          target: "行政中心",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "行政中心",
          target: "运动公园",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "运动公园",
          target: "北苑",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "北苑",
          target: "北客站",
          lineStyle: {
            normal: {
              // color: "red",
            }
          }
        },
        {
          source: "鱼化寨",
          target: "丈八北路",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "丈八北路",
          target: "延平门",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "延平门",
          target: "科技路",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "科技路",
          target: "太白南路",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "太白南路",
          target: "吉祥村",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "吉祥村",
          target: "小寨",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "小寨",
          target: "大雁塔",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "大雁塔",
          target: "北池头",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "北池头",
          target: "青龙寺",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "青龙寺",
          target: "延兴门",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "延兴门",
          target: "咸宁路",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "咸宁路",
          target: "长乐公园",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "长乐公园",
          target: "通化门",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "通化门",
          target: "胡家庙",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "胡家庙",
          target: "石家街",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "石家街",
          target: "辛家庙",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "辛家庙",
          target: "广泰门",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "广泰门",
          target: "桃花潭",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "桃花潭",
          target: "浐灞中心",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "浐灞中心",
          target: "香湖湾",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "香湖湾",
          target: "务庄",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "务庄",
          target: "国际港务区",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "国际港务区",
          target: "双寨",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "双寨",
          target: "新筑",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        {
          source: "新筑",
          target: "保税区",
          lineStyle: {
            normal: {
              color: "#FF00FF",
            }
          }
        },
        //地铁四号线和机场城际的连线
        {
          source: "航天新城",
          target: "航天东路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "航天东路",
          target: "神舟大道",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "神舟大道",
          target: "东长安街",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "东长安街",
          target: "飞天路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "飞天路",
          target: "航天大道",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "航天大道",
          target: "金滹沱",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "金滹沱",
          target: "曲江池西",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "曲江池西",
          target: "大唐芙蓉园",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "大唐芙蓉园",
          target: "大雁塔",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "大雁塔",
          target: "青岛科技大学",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "青岛科技大学",
          target: "建筑科技大学",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "建筑科技大学",
          target: "和平门",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "和平门",
          target: "大差市",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "大差市",
          target: "五路口",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "五路口",
          target: "火车站",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "火车站",
          target: "含元殿",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "含元殿",
          target: "大明宫",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "大明宫",
          target: "大明宫北",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "大明宫北",
          target: "余家寨",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "余家寨",
          target: "百花村",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "百花村",
          target: "常青路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "常青路",
          target: "市中医院",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "市中医院",
          target: "行政中心",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "行政中心",
          target: "文景路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "文景路",
          target: "凤城九路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "凤城九路",
          target: "凤城十二路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "凤城十二路",
          target: "元朔路",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "元朔路",
          target: "北客站(北广场)",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        //机场城际各站点连线
        {
          source: "北客站(北广场)",
          target: "渭河南",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "渭河南",
          target: "秦宫",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "秦宫",
          target: "秦汉新城",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "秦汉新城",
          target: "长陵",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "长陵",
          target: "摆旗寨",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "摆旗寨",
          target: "艺术中心",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "艺术中心",
          target: "空港新城",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "空港新城",
          target: "机场（T5）",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        {
          source: "机场（T5）",
          target: "机场西（T1、T2、T3）",
          lineStyle: {
            normal: {
              color: "#48D1CC",
            }
          }
        },
        ],
        lineStyle: {
          normal: {
            opacity: 1, //线条透明度
            color: "#53B5EA",
            curveness: 0, //站点间连线曲度，0表示直线
            width: 10 //线条宽度
          }
        }
      },
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        zlevel: 7,
        animation: true,
        effect: {
          show: true,
          period: 5,
          trailLength: 0.71,
          symbolSize: 14,
          symbol: "circle",
          loop: true,
          color: 'yellow'
          //   color: "rgba(55,155,255,0.5)"
        },
        lineStyle: {
          normal: {
            // color: "green",
            width: 0,
            curveness: 0 //动画线路的曲度
          }
        },
      },
    ]
  });
  myChart.setOption(option);
  myChart.on('click', function (params) {
    if (params.componentType === 'series' && params.seriesType === 'graph' && params.dataType === 'node') {
      var url = params.data.url;
      if (url) {
        window.location.href = url;
      }
    }
  });

  // 监听浏览器缩放，图表对象调用缩放resize函数
  window.addEventListener("resize", function () {
    myChart.resize();
  });
};





// // 更新告警饼形图
// (function () {
//   // 1. 实例化对象
//   var myChart = echarts.init(document.querySelector(".pieAlarm .chart"));
//   const recordData = {
//     monthData: [{
//       value: 51,
//       name: "信号输入电压",
//     },
//     {
//       value: 42,
//       name: "安全回路电压、电流",
//     },
//     {
//       value: 27,
//       name: "皮带松动",
//     },
//     {
//       value: 5,
//       name: "门体调节不到位",
//     },
//     ],
//     yearData: [{
//       value: 301,
//       name: "信号输入电压",
//     },
//     {
//       value: 451,
//       name: "安全回路电压、电流",
//     },
//     {
//       value: 141,
//       name: "皮带松动",
//     },
//     {
//       value: 30,
//       name: "门体调节不到位",
//     },
//     ]
//   };
//   // 2.指定配置
//   var option = {
//     color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
//     tooltip: {
//       trigger: "item",
//       formatter: "{a} <br/>{b}: {c} ({d}%)",
//     },

//     legend: {
//       bottom: "0%",
//       // 修改小图标的大小
//       itemWidth: 10,
//       itemHeight: 10,
//       // 修改图例组件的文字为 12px
//       textStyle: {
//         color: "rgba(255,255,255,.5)",
//         fontSize: "12",
//       },
//     },
//     series: [{
//       name: "故障统计分布",
//       type: "pie",
//       // 这个radius可以修改饼形图的大小
//       // radius 第一个值是内圆的半径 第二个值是外圆的半径
//       radius: ["40%", "60%"],
//       center: ["50%", "45%"],
//       avoidLabelOverlap: false,
//       // 图形上的文字
//       label: {
//         show: false,
//         position: "center",
//       },
//       // 链接文字和图形的线是否显示
//       labelLine: {
//         show: false,
//       },
//       data: recordData.monthData,
//       flag: 'month',
//     }],
//   };

//   // 3. 把配置给实例对象
//   myChart.setOption(option);
//   // 4. 让图表跟随屏幕自动的去适应
//   window.addEventListener("resize", function () {
//     myChart.resize();
//   });

//   // 切换实时故障统计饼图的年月
//   $(".pieAlarm h2").on("click", "a", function () {
//     // alert(1);
//     // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
//     // console.log(yearData[$(this).index()]);
//     option.series[0].data = option.series[0].flag === 'month' ? recordData.yearData : recordData.monthData;
//     option.series[0].flag = option.series[0].flag === 'month' ? "year" : "month";
//     // 需要重新渲染
//     myChart.setOption(option);
//   });
// })();

// // 更新预警饼形图
// (function () {
//   // 1. 实例化对象
//   var myChart = echarts.init(document.querySelector(".pieWarning .chart"));
//   const recordData = {
//     monthData: [{
//       value: 75,
//       name: "信号输入电压",
//     },
//     {
//       value: 69,
//       name: "安全回路电压、电流",
//     },
//     {
//       value: 3,
//       name: "皮带松动",
//     },
//     {
//       value: 1,
//       name: "门体调节不到位",
//     },
//     ],
//     yearData: [{
//       value: 852,
//       name: "信号输入电压",
//     },
//     {
//       value: 731,
//       name: "安全回路电压、电流",
//     },
//     {
//       value: 220,
//       name: "皮带松动",
//     },
//     {
//       value: 271,
//       name: "门体调节不到位",
//     },
//     ]
//   };
//   // 2.指定配置
//   var option = {
//     color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
//     tooltip: {
//       trigger: "item",
//       formatter: "{a} <br/>{b}: {c} ({d}%)",
//     },

//     legend: {
//       bottom: "0%",
//       // 修改小图标的大小
//       itemWidth: 10,
//       itemHeight: 10,
//       // 修改图例组件的文字为 12px
//       textStyle: {
//         color: "rgba(255,255,255,.5)",
//         fontSize: "12",
//       },
//     },
//     series: [{
//       name: "故障统计分布",
//       type: "pie",
//       // 这个radius可以修改饼形图的大小
//       // radius 第一个值是内圆的半径 第二个值是外圆的半径
//       radius: ["40%", "60%"],
//       center: ["50%", "45%"],
//       avoidLabelOverlap: false,
//       // 图形上的文字
//       label: {
//         show: false,
//         position: "center",
//       },
//       // 链接文字和图形的线是否显示
//       labelLine: {
//         show: false,
//       },
//       data: recordData.monthData,
//       flag: 'month',
//     }],
//   };

//   // 3. 把配置给实例对象
//   myChart.setOption(option);
//   // 4. 让图表跟随屏幕自动的去适应
//   window.addEventListener("resize", function () {
//     myChart.resize();
//   });

//   // 切换实时故障统计饼图的年月
//   $(".pieWarning h2").on("click", "a", function () {
//     // alert(1);
//     // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
//     // console.log(yearData[$(this).index()]);
//     option.series[0].data = option.series[0].flag === 'month' ? recordData.yearData : recordData.monthData;
//     option.series[0].flag = option.series[0].flag === 'month' ? "year" : "month";
//     // 需要重新渲染
//     myChart.setOption(option);
//   });
// })();
// fetchTodoCounts() —— 调用后端接口并更新显示数字
(function () {
  const API_AGG = "http://127.0.0.1:3007/metro/getTodoCounts";
  // 点击跳转（保持原行为）
  const LINKS = {
    maintenance: "http://localhost:8081/todos/maintenance",
    inspection: "http://localhost:8081/todos/inspection",
    annual: "http://localhost:8081/todos/annual"
  };

  // 初始 loading
  $("#todo-maintenance-count, #todo-inspection-count, #todo-annual-count").addClass("todo-loading").text("...");

  function updateCounts(m, i, a) {
    $("#todo-maintenance-count").removeClass("todo-loading").text(m ?? 0);
    $("#todo-inspection-count").removeClass("todo-loading").text(i ?? 0);
    $("#todo-annual-count").removeClass("todo-loading").text(a ?? 0);
  }

  function fetchTodoCounts() {
    $.ajax({
      url: API_AGG,
      type: "GET",
      dataType: "json",
      success: function (res) {
        const json = res && (res.data ? res.data : res);
        const m = Number(json.maintenance ?? json.maintain ?? json.maintenanceCount ?? 0);
        const i = Number(json.inspection ?? json.inspect ?? json.inspectionCount ?? 0);
        const a = Number(json.annual ?? json.yearly ?? json.annualCount ?? 0);
        updateCounts(m, i, a);
      },
      error: function (err) {
        console.warn("获取待办数量失败：", err);
        updateCounts(0, 0, 0);
      }
    });
  }

  // 绑定点击（回车也触发）
  $("#todo-maintenance").on("click keydown", function (e) { if (e.type === "click" || e.key === "Enter") window.open(LINKS.maintenance, "_blank"); });
  $("#todo-inspection").on("click keydown", function (e) { if (e.type === "click" || e.key === "Enter") window.open(LINKS.inspection, "_blank"); });
  $("#todo-annual").on("click keydown", function (e) { if (e.type === "click" || e.key === "Enter") window.open(LINKS.annual, "_blank"); });

  // 首次拉取并周期刷新（例如 60s）
  fetchTodoCounts();
  const todoTimer = setInterval(fetchTodoCounts, 60 * 1000);
  window.addEventListener("beforeunload", () => clearInterval(todoTimer));
})();

// 维修预警Top10表格数据加载
(function loadMaintenanceWarningData() {
  // 从后端接口获取数据
  fetch('http://127.0.0.1:3005/maintenance-warning/top10')
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应不正常');
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.getElementById('maintenanceWarningTableBody');
      tableBody.innerHTML = '';

      // 渲染表格数据
      data.forEach((item, index) => {
        const row = document.createElement('tr');

        // 设置行数据
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.station}</td>
          <td>${item.direction}</td>
          <td>${item.equipmentId}</td>
          <td>${item.faultContent}</td>
          <td>${item.date}</td>
          <td class="status-${getStatusClass(item.status)}">${getStatusText(item.status)}</td>
        `;

        tableBody.appendChild(row);
      });

      // 绑定点击事件实现跳转
      bindTableClickEvent();
    })
    .catch(error => {
      console.error('加载维修预警数据失败:', error);
      document.getElementById('maintenanceWarningTableBody').innerHTML =
        '<tr><td colspan="7" style="text-align: center;">数据加载失败</td></tr>';
    });
})();

// 状态文本转换
function getStatusText(status) {
  const statusMap = {
    'pending': '待处理',
    'processing': '处理中',
    'misreport': '误报',
    'completed': '已完成'
  };
  return statusMap[status] || status;
}

// 状态样式类转换
function getStatusClass(status) {
  return status || 'pending';
}

// 绑定表格点击事件
function bindTableClickEvent() {
  const table = document.getElementById('maintenanceWarningTable');
  table.addEventListener('click', function () {
    window.location.href = 'http://localhost:8081/alarm-warning';
  });
}

// 页面加载完成后加载数据
window.addEventListener('load', function () {
  loadMaintenanceWarningData();

  // 每5分钟刷新一次数据
  setInterval(loadMaintenanceWarningData, 300000);
});
// —— 更新告警饼形图 —— 
(function () {
  var myChart = echarts.init(document.querySelector(".pieAlarm .chart"));

  // 用于存放后台拉回来的两套数据
  const recordData = {
    monthData: [],  // 当月
    yearData: []    // 全年
  };

  // 定义两个 AJAX 请求参数
  const alarmTypeMonthReq = {
    url: "http://127.0.0.1:3006/metro/getMetroAlarmsTypeCountByMonth",
    type: "GET",
    data: { lineId: "QD_line2", month: (new Date()).getMonth() + 1 }
  };
  const alarmTypeYearReq = {
    url: "http://127.0.0.1:3006/metro/getMetroAlarmsTypeCountByYear",
    type: "GET",
    data: { lineId: "QD_line2" }
  };

  // 并行拉数据
  $.when(
    $.ajax(alarmTypeMonthReq),
    $.ajax(alarmTypeYearReq)
  ).done(function (resMonth, resYear) {
    // jQuery AJAX done: [ data, status, jqXHR ]
    recordData.monthData = resMonth[0].data.Items;
    recordData.yearData = resYear[0].data.Items;

    // 在这里才初始化并渲染
    initPie();
  });

  function initPie() {
    var option = {
      color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        bottom: "0%",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: "rgba(255,255,255,.5)", fontSize: "12" }
      },
      series: [{
        name: "故障统计分布",
        type: "pie",
        radius: ["40%", "60%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: { show: false, position: "center" },
        labelLine: { show: false },
        data: recordData.monthData, // 默认显示当月
        flag: 'month'
      }]
    };

    myChart.setOption(option);
    window.addEventListener("resize", () => myChart.resize());

    // “当月 / 全年” 切换
    $(".pieAlarm h2").on("click", "a", function () {
      option.series[0].data = option.series[0].flag === 'month'
        ? recordData.yearData
        : recordData.monthData;
      option.series[0].flag = option.series[0].flag === 'month' ? 'year' : 'month';
      myChart.setOption(option);
    });
  }
})();


// —— 更新预警饼形图 —— 
(function () {
  var myChart = echarts.init(document.querySelector(".pieWarning .chart"));

  const recordData = { monthData: [], yearData: [] };

  const warnTypeMonthReq = {
    url: "http://127.0.0.1:3006/metro/getMetroWarningsTypeCountByMonth",
    type: "GET",
    data: { lineId: "QD_line2", month: (new Date()).getMonth() + 1 }
  };
  const warnTypeYearReq = {
    url: "http://127.0.0.1:3006/metro/getMetroWarningsTypeCountByYear",
    type: "GET",
    data: { lineId: "QD_line2" }
  };

  $.when(
    $.ajax(warnTypeMonthReq),
    $.ajax(warnTypeYearReq)
  ).done(function (resMonth, resYear) {
    recordData.monthData = resMonth[0].data.Items;
    recordData.yearData = resYear[0].data.Items;
    initPieWarning();
  });

  function initPieWarning() {
    var option = {
      color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
      tooltip: { trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
      legend: {
        bottom: "0%", itemWidth: 10, itemHeight: 10,
        textStyle: { color: "rgba(255,255,255,.5)", fontSize: "12" }
      },
      series: [{
        name: "预警统计分布",
        type: "pie",
        radius: ["40%", "60%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: { show: false, position: "center" },
        labelLine: { show: false },
        data: recordData.monthData,
        flag: 'month'
      }]
    };

    myChart.setOption(option);
    window.addEventListener("resize", () => myChart.resize());

    $(".pieWarning h2").on("click", "a", function () {
      option.series[0].data = option.series[0].flag === 'month'
        ? recordData.yearData
        : recordData.monthData;
      option.series[0].flag = option.series[0].flag === 'month' ? 'year' : 'month';
      myChart.setOption(option);
    });
  }
})();


// 实时故障告警表和统计 (当年全线路)
(function () {

  let alarmParamsContent = ''
  let alarmStationId = ''
  let alarmPlatform = ''
  let alarmDeviceId = ''
  let alarmStartDate = ''
  let warningParamsContent = ''
  let warningStationId = ''
  let warningPlatform = ''
  let warningDeviceId = ''
  let warningStartDate = ''


  const alarmParamsFn = () => ({
    url: "http://127.0.0.1:3007/metro/getMetroRealTimeAlarms",
    type: 'GET',
    data: {
      lineId: "QD_line2",
      stationId: alarmStationId,
      platform: alarmPlatform,
      deviceId: alarmDeviceId,
      startDate: alarmStartDate,
      content: alarmParamsContent
    }, // 携带 lineId 参数
    success: function (data) {
      const tbody = $("#alarmTable");// 假设你的表格有一个特定的ID
      tbody.empty();
      isStationAlarmingArr = new Array(35).fill(false)
      data.data.Items.forEach((rowData, index) => {
        const tr = $("<tr>");
        tr.append($("<td>").text(index + 1));
        for (const key in rowData) {

          if (key === "stationId") {
            isStationAlarmingArr[Number(rowData[key].split('_').pop()) - 1] = true
          }

          if (key === "stationName" || key === "platform" || key === "deviceId" || key === "content") {
            tr.append($("<td>").text(rowData[key]));
          } else if (key === "date") {
            tr.append($("<td>").text(rowData[key].split(" ")[0]));
          }
        }
        tbody.append(tr);
      })
      plotLine()
    },
    error: function (err) {
      const testArr = [{
        stationId: "QD_line2_1",
        stationName: "金安桥",
      }]
      plotLine()
      console.error("请求失败:", err)
    }
  })

  const warningParams = () => ({
    url: "http://127.0.0.1:3007/metro/getMetroRealTimeWarnings",
    type: 'GET',
    data: {
      lineId: "QD_line2",
      stationId: warningStationId,
      platform: warningPlatform,
      deviceId: warningDeviceId,
      startDate: warningStartDate,
      content: warningParamsContent
    }, // 携带 lineId 参数
    success: function (data) {
      const tbody = $("#warningTable");// 假设你的表格有一个特定的ID
      tbody.empty();
      data.data.Items.forEach((rowData, index) => {
        isStationWarningArr = new Array(35).fill(false)
        const tr = $("<tr>");
        tr.append($("<td>").text(index + 1));

        for (const key in rowData) {
          if (key === "stationId") {
            isStationWarningArr[Number(rowData[key].split('_').pop()) - 1] = true
          }

          if (key === "stationName" || key === "platform" || key === "deviceId" || key === "content") {
            tr.append($("<td>").text(rowData[key]));
          } else if (key === "date") {
            tr.append($("<td>").text(rowData[key].split(" ")[0]));
          }
        }
        tbody.append(tr);
      })
      if (data.data?.Items?.length > 0) {
        isStationAlarming = true
      } else {
        isStationAlarming = false
      }
      plotLine()
    },
    error: function (err) {
      plotLine()
      console.error("请求失败:", err)
    }
  })

  const alarmCountParamsByYear = {
    url: "http://127.0.0.1:3007/metro/getMetroAlarmsCountByYear",
    type: 'GET',
    data: {
      lineId: "QD_line2",
    }, // 携带 lineId 参数
  }

  const alarmCountParamsByMonth = {
    url: "http://127.0.0.1:3007/metro/getMetroAlarmsCountByMonth",
    type: 'GET',
    data: {
      lineId: "QD_line2",
      month: now.getMonth() + 1
    }, // 携带 lineId 参数
  }

  const warningCountParamsByYear = {
    url: "http://127.0.0.1:3007/metro/getMetroWarningsCountByYear",
    type: 'GET',
    data: {
      lineId: "QD_line2",
      lineName: "北京地铁 6 号线",
      stationId: "QD_line2_S_1",
      stationName: "东四"
    }, // 携带 lineId 参数
  }

  const warningCountParamsByMonth = {
    url: "http://127.0.0.1:3007/metro/getMetroWarningsCountByMonth",
    type: 'GET',
    data: {
      lineId: "QD_line2",
      lineName: "北京地铁 6 号线",
      stationId: "QD_line2_S_1",
      stationName: "东四",
      month: now.getMonth() + 1
    }, // 携带 lineId 参数
  }



  $.ajax(alarmParamsFn())
  $.ajax(warningParams())

  $('#alarmTableHead th').each(function (columnIndex) {
    if (columnIndex > 0) {
      const $th = $(this); // 当前 th 元素的 jQuery 对象
      let originalHeaderText = $th.text(); // 保存原始表头文本
      $th.css('cursor', 'pointer'); // 设置鼠标指针为手型

      $th.on('click', function () {
        // 如果当前 th 中已经有 input 元素，则聚焦并返回，避免重复创建
        if ($th.find('input').length > 0) {
          $th.find('input').focus();
          return;
        }

        // 保存当前的文本（可能在 blur 后已改变）
        originalHeaderText = $th.text();
        $th.empty(); // 清空 th 内容

        const $input = $('<input type="text">')
          .attr('placeholder', `筛选 ${originalHeaderText}...`)
          .css({
            'width': '90%',
            'min-width': '80px', // 确保输入框不会太小
            'box-sizing': 'border-box',
            'font-size': 'inherit', // 继承表头的字体大小
            'padding': '2px 4px' // 调整内边距
          });

        // 输入框失去焦点时的处理
        $input.on('blur', function () {
          if ($(this).val().trim() === '') {
            $th.text(originalHeaderText); // 如果为空，恢复原始文本
            // 当恢复表头时，清除该列的筛选（显示所有行）
            $('#alarmTable tr').show();
          }
          // 如果不为空，可以让输入框保留，或者根据需求决定是否恢复表头
          // 此处示例：如果为空则恢复表头，否则保留输入框状态，但筛选已在keyup中完成
        });

        // 输入框内容改变时的处理 (keyup事件)
        $input.on('keyup', function (event) {
          const filterValue = $(this).val().toLowerCase().trim();
          if (columnIndex === 1) {
            alarmStationId = filterValue
          }
          if (columnIndex === 2) {
            alarmPlatform = filterValue
          }
          if (columnIndex === 3) {
            alarmDeviceId = filterValue
          }
          if (columnIndex === 4) {
            alarmParamsContent = filterValue
          }
          if (columnIndex === 5) {
            alarmStartDate = filterValue
          }

          $.ajax(alarmParamsFn())
          // 按下回车键，可以使输入框失去焦点
          if (event.key === 'Enter') {
            $input.blur();
          }
        });

        $th.append($input); // 将输入框添加到 th 中
        $input.focus(); // 自动聚焦到输入框
      });
    }
  });

  $('#warningTableHead th').each(function (columnIndex) {
    if (columnIndex > 0) {
      const $th = $(this); // 当前 th 元素的 jQuery 对象
      let originalHeaderText = $th.text(); // 保存原始表头文本
      $th.css('cursor', 'pointer'); // 设置鼠标指针为手型

      $th.on('click', function () {
        // 如果当前 th 中已经有 input 元素，则聚焦并返回，避免重复创建
        if ($th.find('input').length > 0) {
          $th.find('input').focus();
          return;
        }

        // 保存当前的文本（可能在 blur 后已改变）
        originalHeaderText = $th.text();
        $th.empty(); // 清空 th 内容

        const $input = $('<input type="text">')
          .attr('placeholder', `筛选 ${originalHeaderText}...`)
          .css({
            'width': '90%',
            'min-width': '80px', // 确保输入框不会太小
            'box-sizing': 'border-box',
            'font-size': 'inherit', // 继承表头的字体大小
            'padding': '2px 4px' // 调整内边距
          });

        // 输入框失去焦点时的处理
        $input.on('blur', function () {
          if ($(this).val().trim() === '') {
            $th.text(originalHeaderText); // 如果为空，恢复原始文本
            // 当恢复表头时，清除该列的筛选（显示所有行）
            $('#warningTable tr').show();
          }
          // 如果不为空，可以让输入框保留，或者根据需求决定是否恢复表头
          // 此处示例：如果为空则恢复表头，否则保留输入框状态，但筛选已在keyup中完成
        });

        // 输入框内容改变时的处理 (keyup事件)
        $input.on('keyup', function (event) {
          const filterValue = $(this).val().toLowerCase().trim();
          if (columnIndex === 1) {
            warningStationId = filterValue
          }
          if (columnIndex === 2) {
            warningPlatform = filterValue
          }
          if (columnIndex === 3) {
            warningDeviceId = filterValue
          }
          if (columnIndex === 4) {
            warningParamsContent = filterValue
          }
          if (columnIndex === 5) {
            warningStartDate = filterValue
          }
          $.ajax(warningParams())
          // 按下回车键，可以使输入框失去焦点
          if (event.key === 'Enter') {
            $input.blur();
          }
        });

        $th.append($input); // 将输入框添加到 th 中
        $input.focus(); // 自动聚焦到输入框
      });
    }
  });

  // 更新告警柱状图
  const updateAlarmBarChart = (resAlarmCountByYear, resAlarmCountByMonth) => {
    // 1实例化对象
    var myChart = echarts.init(document.querySelector(".barAlarm .chart"));
    // 2. 指定配置项和数据
    const data = [{
      color: ["#2f89cf"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // 修改图表的大小
      grid: {
        left: "0%",
        top: "10px",
        right: "0%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: [{
        type: "category",
        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12",
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false,
        },
      },],
      yAxis: [{
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12,
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },],
      series: [{
        name: "当天故障数",
        type: "bar",
        barWidth: "35%",
        data: resAlarmCountByMonth?.[0]?.data?.Items,
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },],
    },
    {
      color: ["#2f89cf"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // 修改图表的大小
      grid: {
        left: "0%",
        top: "10px",
        right: "0%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: [{
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        axisTick: {
          alignWithLabel: true,
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12",
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false,
        },
      },],
      yAxis: [{
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12,
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },],
      series: [{
        name: "本月故障数",
        type: "bar",
        barWidth: "35%",
        data: resAlarmCountByYear?.[0]?.data?.Items,
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },],
    },
    ];
    var option = data[0];

    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
      myChart.resize();
    });

    $(".barAlarm h2").on("click", "a", function () {
      // alert(1);
      // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
      // console.log(yearData[$(this).index()]);
      option = data[$(this).index()];
      // 需要重新渲染
      myChart.setOption(option);
    });
  }


  // 更新故障预警表柱状图
  const updateWarningBarChart = (resWarningCountByYear, resWarningCountByMonth) => {
    // 1实例化对象
    var myChart = echarts.init(document.querySelector(".barWarning .chart"));
    // 2. 指定配置项和数据
    const data = [{
      color: ["#2f89cf"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // 修改图表的大小
      grid: {
        left: "0%",
        top: "10px",
        right: "0%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: [{
        type: "category",
        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12",
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false,
        },
      },],
      yAxis: [{
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12,
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },],
      series: [{
        name: "当天预警故障数",
        type: "bar",
        barWidth: "35%",
        data: resWarningCountByMonth?.[0]?.data?.Items,
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },],
    },
    {
      color: ["#2f89cf"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // 修改图表的大小
      grid: {
        left: "0%",
        top: "10px",
        right: "0%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: [{
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        axisTick: {
          alignWithLabel: true,
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12",
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false,
        },
      },],
      yAxis: [{
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12,
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },],
      series: [{
        name: "本月预警故障数",
        type: "bar",
        barWidth: "35%",
        data: resWarningCountByYear?.[0]?.data?.Items ?? [],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },],
    },
    ];
    var option = data[0];

    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
      myChart.resize();
    });

    $(".barWarning h2").on("click", "a", function () {
      // alert(1);
      option = data[$(this).index()];
      // 需要重新渲染
      myChart.setOption(option);
    });
  }

  updateAlarmBarChart()
  updateWarningBarChart()

  const requestAlarmCountByYear = $.ajax(alarmCountParamsByYear);
  const requestAlarmCountByMonth = $.ajax(alarmCountParamsByMonth);
  const requestWarningCountByYear = $.ajax(warningCountParamsByYear);
  const requestWarningCountByMonth = $.ajax(warningCountParamsByMonth);
  $.when(requestAlarmCountByYear, requestAlarmCountByMonth).done(updateAlarmBarChart)
  $.when(requestWarningCountByYear, requestWarningCountByMonth).done(updateWarningBarChart)

  setInterval(() => {
    $.ajax(alarmParamsFn())
    $.ajax(warningParams())
    const requestAlarmCountByYear = $.ajax(alarmCountParamsByYear);
    const requestAlarmCountByMonth = $.ajax(alarmCountParamsByMonth);
    const requestWarningCountByYear = $.ajax(warningCountParamsByYear);
    const requestWarningCountByMonth = $.ajax(warningCountParamsByMonth);
    $.when(requestAlarmCountByYear, requestAlarmCountByMonth).done(updateAlarmBarChart)
    $.when(requestWarningCountByYear, requestWarningCountByMonth).done(updateWarningBarChart)
  }, 5000)
})()





