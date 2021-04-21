<template>
  <div class="content-box">
    <div class="select-box flex align-center mb-30">
      <div class="label color-333 font-size-9">运营状态：</div>
      <div class="flex-sub">
        <el-select v-model="selRunStatus" @change="optionChange" class="input-width-100" size="mini">
          <el-option
            v-for="item in categoryOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="echart-box" >
      <div id="myEchar" style="width:100%;height:100%;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'operation',
  data () {
    return {
      selRunStatus: null,
      categoryOptions: [],
      myChart: null
    }
  },
  async mounted () {
    const { code, msg, data } = await this.$apis.GetRunCategoryList({})
    console.log('分类', code, msg, data)
    this.categoryOptions = data
    console.log(this.categoryOptions)
    this.$nextTick(() => {
      const myEchar = document.getElementById('myEchar')
      this.myChart = echarts.init(myEchar)
      this.updateData({})
    })
  },
  methods: {
    optionChange (val) {
      // 0=素材排名(前30) 1=单个一级分类下素材排名(前15)
      this.updateData({ id: val, type: 0 })
      console.log(val)
    },
    async updateData (params) {
      this.$loading()
      const { code, msg, data } = await this.$apis.GetRunStatusData(params)
      console.log(code, msg, data)
      // data.series[0].data[0] = 500
      // data.series[0].data[3] = 100000
      if (code === 0) {
        this.$loading().close()
        this.$nextTick(() => {
          const options = {
            color: ['#6ba5d9'],
            title: {
              text: '爱粉圈素材转发排行',
              left: 'center',
              textStyle: {
                fontSize: 15,
                color: '#333333'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            // legend: {
            //   data: ['2011年']
            // },
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
              data: data.xAxis.data
            },
            series: [
              {
                name: data.series[0].name,
                type: 'bar',
                data: data.series[0].data,
                label: {
                  show: true, // 开启显示
                  position: 'right' // 在上方显示
                }
              }
            ]
          }
          // 绘制图表
          this.myChart.clear() // 解决数据残留问题
          this.myChart.setOption(options, true)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-box{
  width:100%;
  height:calc(100% - 70px);
  overflow:scroll;
  background:#ffffff;
  padding:70px 20px;
  position:relative;
  .select-box{
    height:50px;
    width:100%;
    position:absolute;
    top:0;
    left:0;
    border-bottom:1px solid #eeeeee;
    z-index:1;
    background:#ffffff;
    padding-left:20px;
    box-sizing: border-box;
  }
}
.echart-box{
  width:80%;
  height:100%;
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
.font-size-9{
  font-size:9px;
}
</style>
