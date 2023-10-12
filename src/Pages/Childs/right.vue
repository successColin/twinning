/**
* @name: right
* @author: DELL
* @date: 2022/10/24 16:06
* @description：right
* @update: 2022/10/24 16:06
*/
<!-- 页面 -->
<template>
  <div class="right slide-left">
    <div class="rightBox">
<!--      <transition name="el-zoom-in-bottom">-->
        <div class="hook slide-top" v-show="v1">
          <div class="btn1" :class="{active: active==3}" @click="active=3">设备数据</div>
          <div class="btn2" @click="active=1" :class="{active: active==1}">探测点A</div>
          <div class="btn3" @click="active=2" :class="{active: active==2}">探测点B</div>
          <div class="pie"></div>
          <div class="name1">运行状况</div>
          <div class="pie2" id="pie"></div>
          <div class="name2">10<span class="sm">天</span>05<span class="sm">小时</span></div>
          <div class="name3">本次运行时长</div>
          <div class="name4">129<span class="sm">天</span>05<span class="sm">小时</span></div>
          <div class="name5">运行总时长</div>
        </div>
<!--      </transition>-->
<!--      <transition name="el-zoom-in-bottom">-->
        <div class="bar slide-top" v-if="v2">
          <div class="bar1" id="bar"></div>
        </div>
<!--      </transition>-->
<!--      <transition name="el-zoom-in-bottom">-->
        <div class="mix slide-top" v-if="v3">
          <div class="bar2" id="mixBar"></div>
        </div>
<!--      </transition>-->
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import pie from '@/assets/images/pie.png';
import rect from '@/assets/images/rect.png';

export default {
  data() {
    return {
      active: 1,
      v1: false,
      v2: false,
      v3: false,
    };
  },

  components: {},

  computed: {},

  mounted() {
    setTimeout(() => {
      this.v1 = true;
      this.initPie();
    }, 500);
    setTimeout(() => {
      this.v2 = true;
      this.$nextTick(() => {
        this.initFunnel();
      })
    }, 750);

    setTimeout(() => {
      this.v3 = true;
      this.$nextTick(() => {
        this.initRadar();
      })
    }, 1000);
  },

  methods: {
    initPie() {
      const chartDom = document.getElementById('pie');
      const myChart = echarts.init(chartDom);
      const option = {

        title: [{
          text: '75%',
          x: 'center',
          top: '43%',
          textStyle: {
            fontSize: '18',
            color: '#FFFFFF',
            fontFamily: 'DINAlternate-Bold, DINAlternate',
            foontWeight: '600',
          },
        }],
        polar: {
          radius: ['42%', '52%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [{
          name: '',
          type: 'bar',
          roundCap: true,
          barWidth: 90,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(66, 66, 66, .3)',
          },
          data: [60],
          coordinateSystem: 'polar',

          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#39BAEC',
              },
                {
                  offset: 1,
                  color: '#40D0E8',
                },
              ]),
            },
          },
        },
        ],

      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    initFunnel() {
      const chartDom = document.getElementById('bar');
      const myChart = echarts.init(chartDom);
      const option = {
        grid: {
          left: 30,
          top: 35,
          right: 30,
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
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
        color: ['#0DBAF0'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#A8D4E9'
            }
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
          name: '停机时长(h)',
          nameTextStyle: {
            color: "rgba(255,255,255,0.8)",
            fontSize: 16,
            padding: [0, 0, -5, 0]
          },
        },
        series: [
          {
            data: [82, 93, 90, 93, 12, 13, 13, 23, 43, 46, 64, 87],
            type: 'line',
            areaStyle: {
              origin: 'auto',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#0DBAF0'// 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0, 0, 0, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            symbol: 'none'
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    initRadar() {
      const chartDom = document.getElementById('mixBar');
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          },
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#333'
            }
          },
        },
        legend: {
          data: ['系列一', '系列二', '系列三'],
          top: 'bottom',
          left: 'center',
          orient: 'horizontal',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#fff',
          }
        },
        grid: {
          left: 30,
          top: 35,
          right: 30,
          bottom: 30,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [2011, 2012, 2013, 2014, 2015, 2016, 2017],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#A8D4E9'
              }
            },
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位',
            min: 0,
            axisLabel: {
              formatter: '{value}',
              color: '#fff'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#323536',
                type: 'dashed'
              }
            },
          },
          {
            type: 'value',
            name: '单位',
            min: 0,
            interval: 5,
            axisLabel: {
              formatter: '{value}',
              color: '#fff'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#323536',
                type: 'dashed'
              }
            },
          }
        ],
        series: [
          {
            name: '系列一',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 26.7, 15.6, 12.2, 12.6, 20.0, 6.4, 3.3
            ],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A97E6' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#49FDFD'// 100% 处的颜色
                }], false)
              }
            },

          },
          {
            name: '系列二',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            lineStyle: {
              color: '#D6E6ED'
            },
            symbol: `image://${rect}`,
            symbolSize: 12,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 7.7, 15.6, 12.2, 28.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: '系列三',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            lineStyle: {
              color: '#49FDFD'
            },
            areaStyle: {
              origin: 'auto',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#3DACAC'// 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0, 0, 0, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth: true,
            symbol: `image://${pie}`,
            symbolSize: 14,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
    window.removeEventListener('resize', () => {
    });
  },
  name: "right",
};
</script>

<style lang='scss' scoped>
.slide-left {
  -webkit-animation: slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.right {
  position: absolute;
  width: 463px;
  //height: 1024px;
  right: -463px;
  top: 54px;
  bottom: 0;
  background: url(~@/assets/images/bg-right.png) no-repeat center;
  background-size: 100% 100%;

  .rightBox {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    .hook {
      height: 256px;
      position: absolute;
      width: 360px;
    }

    .sm {
      font-size: 14px;
    }

    .btn1 {
      position: absolute;
      width: 120px;
      height: 36px;
      left: 49px;
      top: 232px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #262626;
      border-radius: 16px;
      cursor: pointer;
      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      opacity: 0.6;
      color: #FFFFFF;
    }

    .btn2 {
      position: absolute;
      width: 100px;
      height: 36px;
      left: 191px;
      top: 232px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #262626;
      //background: #5690FF;
      border-radius: 16px;
      cursor: pointer;
      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      opacity: 0.6;
      color: #FFFFFF;
    }

    .btn3 {
      position: absolute;
      width: 100px;
      height: 36px;
      left: 313px;
      top: 232px;
      align-items: center;
      justify-content: center;
      display: flex;
      /* grey */

      background: #262626;
      border-radius: 16px;
      cursor: pointer;
      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      opacity: 0.6;
      color: #FFFFFF;
    }

    .active {
      background: #5690FF;
      opacity: 1;
    }

    .name1 {
      position: absolute;
      width: 64px;
      height: 21px;
      left: 68px;
      top: 301px;

      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #FFFFFF;
    }

    .pie {
      position: absolute;
      width: 360px;
      height: 200px;
      left: 52px;
      top: 288px;

      /* grey */

      background: #262626;
      border-radius: 12px;
    }

    .pie2 {
      position: absolute;
      width: 194px;
      height: 194px;
      left: 218px;
      top: 294px;
    }

    .name2 {
      position: absolute;
      width: 126px;
      height: 32px;
      left: 82px;
      top: 346px;

      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      /* identical to box height */


      color: #FFFFFF;

    }

    .name3 {
      position: absolute;
      //width: 72px;
      height: 16px;
      left: 82px;
      top: 380px;

      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height */


      color: #FFFFFF;

      opacity: 0.6;
    }

    .name4 {

      position: absolute;
      width: 127px;
      height: 32px;
      left: 82px;
      top: 407px;

      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      /* identical to box height */


      color: #FFFFFF;

    }

    .name5 {
      position: absolute;
      //width: 60px;
      height: 16px;
      left: 82px;
      top: 537px;

      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height */


      color: #FFFFFF;

      opacity: 0.6;
    }

    .bar {
      position: absolute;
      width: 360px;
      height: 253px;
      left: 52px;
      top: 512px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #262626;
      border-radius: 12px;

      .bar1 {
        width: 95%;
        height: 95%;
      }
    }

    .mix {
      position: absolute;
      width: 360px;
      height: 200px;
      left: 52px;
      top: 789px;

      /* grey */

      background: #262626;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      .bar2 {
        width: 95%;
        height: 95%;
      }
    }
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2022-10-27 10:54:16
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-463px);
    transform: translateX(-463px);
  }
}

@keyframes slide-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-463px);
    transform: translateX(-463px);
  }
}

.slide-top {
  -webkit-animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2022-10-26 17:15:8
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-100px);
    transform: translateY(-100px);
    opacity: 1;
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-100px);
    transform: translateY(-100px);
    opacity: 1;
  }
}
</style>
