/**
* @name: right
* @author: DELL
* @date: 2022/10/24 16:06
* @description：right
* @update: 2022/10/24 16:06
*/
<!-- 页面 -->
<template>
  <div class="right">
    <div class="rightBox">
      <div class="pie" id="pie"></div>
      <div class="funnel" id="funnel"></div>
      <div class="radar" id="radar"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {
    this.initPie();
    this.initFunnel();
    this.initRadar();
  },

  methods: {
    initPie() {
      const chartDom = document.getElementById('pie');
      const myChart = echarts.init(chartDom);
      const arr = [{value: 1048, name: '系列一'},
        {value: 735, name: '系列二'},
        {value: 580, name: '系列三'},
        {value: 484, name: '系列四'},
        {value: 300, name: '系列五'}];
      // const total = 1048 + 735 + 580 + 484 + 300;
      const option = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          },
          // formatter: '{b0}: {c0}%',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#333'
            }
          },
        },
        legend: {
          top: 'middle',
          left: 'right',
          orient: 'vertical',
          itemWidth: 10,
          itemHeight: 10,
          align: "left",
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          // itemGap: 15,
          // formatter: function (params) {
          //   const obj = arr.find((item) => item.name === params);
          //   const p = obj.value / total * 100;
          //   return `${params}`
          // }
        },
        series: [
          {
            name: '类型',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            center: ['25%', '50%'],
            itemStyle: {
              // borderRadius: 10,
              // borderColor: '#fff',
              // borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                color: '#fff',
                formatter: '{b}:{d}%'
              }
            },
            labelLine: {
              show: false
            },
            data: arr
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    initFunnel() {
      const chartDom = document.getElementById('funnel');
      const myChart = echarts.init(chartDom);
      const arr =  [
        { value: 60, name: '无生产情况' },
        { value: 40, name: '清洁维护' },
        { value: 20, name: '计划性维护' },
        { value: 80, name: '产线测试' },
      ];
      const option = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          },
          // formatter: '{b0}: {c0}%',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#333'
            }
          },
        },
        color: ['#55B7EE', '#2AE3FC', '#F9CC2F', '#411AEB'],
        series: [
          {
            name: '',
            type: 'funnel',
            sort: 'ascending',
            top: 1,
            bottom: 5,
            left: '20%',
            width: '60%',
            gap: 15,
            label: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
              color: '#fff'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            // emphasis: {
            //   label: {
            //     fontSize: 20
            //   }
            // },
            data: arr,
            zlevel: 1
          },
          {
            name: '',
            type: 'funnel',
            sort: 'ascending',
            top: 1,
            bottom: 5,
            left: '20%',
            width: '60%',
            gap: 15,
            label: {
              show: true,
              position: 'left',
              formatter: '{b}',
              color: '#fff',
              fontSize: 10,
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            // emphasis: {
            //   label: {
            //     fontSize: 20
            //   }
            // },
            data: arr
          },
          {
            name: '',
            type: 'funnel',
            sort: 'ascending',
            top: 1,
            bottom: 5,
            left: '20%',
            width: '60%',
            gap: 15,
            label: {
              show: true,
              position: 'right',
              formatter: '{c}单',
              color: '#fff',
              fontSize: 10,
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            // emphasis: {
            //   label: {
            //     fontSize: 20
            //   }
            // },
            data: arr
          }

        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    initRadar() {
      const chartDom = document.getElementById('radar');
      const myChart = echarts.init(chartDom);
      const option = {
        color: ['#250BC5', '#0093FE'],
        legend: {
          data: ['系列一', '系列二'],
          top: 'middle',
          left: 'right',
          orient: 'vertical',
          itemWidth: 10,
          itemHeight: 10,
          align: "left",
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
        },
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          },
          // formatter: '{b0}: {c0}%',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#333'
            }
          },
        },
        radar: {
          nameGap: 8,
          splitLine : {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#666666'
            }
          },
          indicator: [
            { name: 'A', max: 100 },
            { name: 'B', max: 100 },
            { name: 'C', max: 100 },
            { name: 'D', max: 100 },
            { name: 'E', max: 100 },
          ]
        },
        label: {
          distance: 2,
          show: false
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            symbol: 'none',
            areaStyle: {
              opacity: 0.2
            },
            data: [
              {
                value: [42, 30, 100, 15, 50, 88],
                name: '系列一'
              },
              {
                value: [50, 14, 28, 26, 42, 91],
                name: '系列二'
              }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }

  },
  name: "right",
};
</script>

<style lang='scss' scoped>
.right {
  position: absolute;
  width: 463px;
  //height: 1024px;
  right: 0;
  top: 54px;
  bottom: 0;
  background: url(~@/assets/images/bg-right.png) no-repeat center;
  background-size: 100% 100%;

  .rightBox {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .pie {
      position: absolute;
      width: 346px;
      height: 173px;
      left: 76px;
      top: 213px;
    }
    .funnel{
      position: absolute;
      width: 346px;
      height: 164.72px;
      left: 76px;
      top: 485px;
    }
    .radar{
      position: absolute;
      width: 377px;
      height: 189px;
      left: 54px;
      top: 707px;
    }
  }
}
</style>
