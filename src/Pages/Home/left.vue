/**
* @name: left
* @author: DELL
* @date: 2022/10/24 16:04
* @description：left
* @update: 2022/10/24 16:04
*/
<!-- 页面 -->
<template>
  <div class="left">
    <div class="leftBox">
      <div class="homeName"></div>
      <div class="bar" id="bar"></div>
      <div class="bar2" id="bar2"></div>
      <div class="listWrap">
        <div class="listContent">
          <div class="listHead">
            <div class="listTh">序号</div>
            <div class="listTh">设备名称</div>
            <div class="listTh">故障率</div>
            <div class="listTh">停机时间</div>
          </div>
          <div class="listBox">
            <div class="listTr"
                 v-for="(item, i) in list"
                 :key="i"
                 :class="{active: i===active}"
                 @click="active=i"
            >
              <div class="listTd">{{ i + 1 }}</div>
              <div class="listTd">{{ item.n }}</div>
              <div class="listTd">{{ item.p }}</div>
              <div class="listTd">{{ item.h }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      active: 2,
      list: [
        {
          n: '风机ALT',
          h: '12H',
          p: '8%'
        },
        {
          n: '风机ALT',
          h: '12H',
          p: '8%'
        },
        {
          n: 'ROBOTO',
          h: '12H',
          p: '8%'
        },
        {
          n: '风机ALT',
          h: '12H',
          p: '8%'
        }, {
          n: '风机ALT',
          h: '12H',
          p: '8%'
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.initBar();
    this.initBar2();
  },

  methods: {
    initBar() {
      const chartDom = document.getElementById('bar');
      const myChart = echarts.init(chartDom);

      const option = {
        grid: {
          left: 40,
          top: 20,
          right: 0,
          bottom: 30
        },
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          },
          formatter: '{b0}: {c0}%',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#333'
            }
          },
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#323536',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#fff',
            formatter: '{value} %'
          },
        },
        series: [
          {
            data: [20, 25, 15, 80, 70, 11, 13],
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#078AE7' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#4511EB'// 100% 处的颜色
                }], false)
              }
            },
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    initBar2() {
      const chartDom = document.getElementById('bar2');
      const myChart = echarts.init(chartDom);

      const option = {
        legend: {
          top: 'top',
          left: 'right',
          orient: 'horizontal',
          type: 'scroll',
          itemWidth: 10,
          itemHeight: 2,
          textStyle: {
            color: '#fff',
          }
        },
        grid: {
          left: 20,
          top: 25,
          right: 30,
          bottom: 0,
          containLabel: true
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
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false,
            lineStyle: {
              color: '#323536',
              type: 'dashed'
            }
          },
        },
        yAxis: {
          type: 'category',
          data: ['1月', '2月', '3月'],
          axisLabel: {
            show: false,
            color: '#fff',
            formatter: '{value} %'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#323536',
              type: 'dashed'
            }
          },
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [182, 234, 290],
            itemStyle: {
              color: '#250BC5',
              borderRadius: [5, 5, 5, 5]
            },
            barGap: '60%',
            showBackground: true
          },
          {
            name: '2012',
            type: 'bar',
            data: [193, 234, 310],
            itemStyle: {
              color: '#0093FE',
              borderRadius: [5, 5, 5, 5]
            },
            barGap: '60%',
            showBackground: true
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  },
  beforeDestroy() {
    window && window.removeEventListener('resize');
  },
  name: "left",
};
</script>

<style lang='scss' scoped>
.left {
  position: absolute;
  width: 463px;
  //height: 1024px;
  left: 5px;
  top: 54px;
  bottom: 0;
  background: linear-gradient(91.81deg, rgba(23, 23, 23, 0.8) 44.64%, rgba(23, 23, 23, 0) 98.94%);

  .leftBox {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .homeName {
      width: 254px;
      height: 58px;
      background: url(~@/assets/images/title.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      width: 244px;
      height: 40px;
      left: 51px;
      top: 159px;
    }

    .bar {
      position: absolute;
      width: 300px;
      height: 179.53px;
      left: 46px;
      top: 252px;
    }

    .bar2 {
      position: absolute;
      width: 300px;
      height: 148.21px;
      left: 40px;
      top: 493px;
    }

    .listWrap {
      position: absolute;
      width: 328px;
      height: 164px;
      left: 51px;
      top: 703px;
      //border: 1px solid red;
      .listContent {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .listHead {
          width: 100%;
          height: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to bottom, #2F2280, #19547E);

          .listTh {
            flex: 1;
            text-align: center;
            font-size: 12px;
            color: #FFFFFF;
          }
        }

        .listBox {
          flex: 1;
          display: flex;
          flex-direction: column;

          .listTr {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(0, 0, 0, 0);
            border-bottom: 1px solid rgba(0, 0, 0, 0);
            box-sizing: border-box;
            cursor: pointer;

            &.active {
              background-image: linear-gradient(to right, #151F2E, #0950B0, #151F2E);
              /*首先我们设置边框只显示右侧，宽度为2px的实线。*/
              border-top: 1px solid;
              border-bottom: 1px solid;
              /*设置线性渐变*/
              border-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #00bbf2 20%, rgba(255, 255, 255, 0) 99%) 2 2 2 2;

              & > .listTd:first-child {
                background: url(~@/assets/images/arror.png) no-repeat left center;
                background-size: 0.6rem 0.6rem;
              }
            }

            .listTd {
              flex: 1;
              color: #fff;
              font-size: 13px;
              text-align: center;
              font-style: italic;
            }
          }
        }
      }
    }
  }
}
</style>
