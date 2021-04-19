<template>
  <d2-container>
    <div class="flex align-center mb-30">
      <div class="label color-333 font-size-8">运营状态：</div>
      <div class="flex-sub">
        <el-select v-model="selRunStatus" class="input-width-100" size="mini">
          <el-option
            v-for="item in runOptions"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="echart-box" >
      <div id="myEchar" style="width:100%;height:100%;"></div>
    </div>
  </d2-container>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'operation',
  data () {
    return {
      selRunStatus: null,
      runOptions: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(document.getElementById('myEchar'), echarts)
      const myEchar = document.getElementById('myEchar')
      const options = {
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
        ]
      }
      var myChart1 = echarts.init(myEchar)
      // 绘制图表
      // myChart1.clear() // 解决数据残留问题
      myChart1.setOption(options, true)
    })
  }
}
</script>

<style lang="scss" scoped>
.echart-box{
  width:100%;
  height:85%;
}
.flex{
  display:flex;
}
.align-center{
  align-items: center;
}
.justify-center{
  justify-content: center;
}
.flex-sub{
  flex:1;
}
.mb-30{
  margin-bottom:30px;
}
</style>
