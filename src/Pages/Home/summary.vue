/**
* @name: Ssummary
* @author: DELL
* @date: 2022/10/24 15:04
* @description：Ssummary
* @update: 2022/10/24 15:04
*/
<!-- 页面 -->
<template>
  <div class="summary">
    <div class="summaryMain">
      <div class="summaryItem">
        <div class="title">总设备</div>
        <div class="num">2305</div>
      </div>
      <div class="summaryItem">
        <div class="title">正常运行设备</div>
        <div class="num">2279</div>
      </div>
      <div class="summaryItem">
        <div class="title">故障设备</div>
        <div class="num">9</div>
      </div>
      <div class="summaryItem">
        <div class="title">停机设备</div>
        <div class="num">17</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {
  },

  methods: {},
  name: "Ssummary",
};
</script>

<style lang='scss' scoped>

.summary {
  width: 783px;
  height: 74px;
  position: absolute;
  top: 122px;
  margin-left: 50%;
  transform: translate(-50%);

  .summaryMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
    //gap: 160px;
    .summaryItem {
      flex: 1;

      .num {
        font-family: 'Microsoft YaHei';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 42px;
        text-align: center;
        color: #FFFFFF;
      }

      .title {
        font-family: 'Microsoft YaHei';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}
</style>
