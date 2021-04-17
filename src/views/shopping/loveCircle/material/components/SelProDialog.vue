<template>
<el-dialog
  title="素材基础信息"
  :visible.sync="selProDialogShow"
  width="40%"
  center>
  <div>
    <div class="flex align-center mb-9">
      <div class="label color-333 font-size-8">查找商品：</div>
      <div class="flex-sub">
        <el-input class="input-width-100" size="mini" v-model="keyWord" />
      </div>
      <el-button class="ml-5" @click="save" size="mini" type="primary">查找</el-button>
    </div>
    <div class="flex align-center mb-9">
      <div class="label color-333 font-size-8">分类查找：</div>
      <div class="flex-sub">
        <el-cascader
        style="width:89%;"
        v-model="classValue"
        size="mini"
        :options="classOption"
        @change="selclassChange" />
      </div>
    </div>
    <!-- 商品列表部分 -->
    <div class="pro-list-box">
      <div class="pro-item flex justify-between align-center">
        <div class="flex align-center">
          <el-image
            class="pro-img"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="contain"></el-image>
          <div class="color-333 font-size-8  ml-5">
            <div class="mb-5">冰糖橙10斤现摘现摘现斤现摘现发橙子冰糖</div>
            <div class="mb-5">价格：580元</div>
            <div class="mb-5">会员价：280元</div>
            <div>2021-04-15 16:28:28</div>
          </div>
        </div>
        <el-button class="ml-5" @click="save" size="mini" type="danger">选择</el-button>
      </div>
    </div>
  </div>
</el-dialog>
</template>

<script>
export default {
  name: 'SelProDialog',
  props: {
    selProDialogShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyWord: '',
      // 素材分类
      classValue: [],
      // 素材分类选项集合
      classOption: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }
      ]
    }
  },
  methods: {
    selclassChange (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.pro-list-box{
  margin-top:20px;
  .pro-item{
    background:#F7F8FA;
    padding:5px;
  }
  .pro-img{
    width: 65px;
    height: 65px;
  }
}
.input-width-100{
  width:100% !important;
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
.justify-between{
  justify-content: space-between;
}
.flex-sub{
  flex:1;
}
.font-size-9{
  font-size: 9px;
}
.font-size-8{
  font-size: 8px;
}
.padding-lr-8{
  padding-left:8px;
  padding-right:8px;
}
.padding-tb-10{
  padding-top:10px;
  padding-bottom:10px;
}
.color-333{
  color:#333333;
}
.color-666{
  color:#666666;
}
.mb-9{
  margin-bottom:9px;
}
.mb-5{
  margin-bottom:5px;
}
.mt-40{
  margin-top:40px;
}
.ml-5{
  margin-left:5px;
}
</style>
