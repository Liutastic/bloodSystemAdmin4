<template>
<el-dialog
  title="素材基础信息"
  :visible.sync="selProDialogShow"
  @close = "close"
  width="40%"
  center>
  <div class="content-box">
    <div class="flex justify-between">
      <div class="flex-sub">
        <div class="flex align-center mb-9">
          <div class="label color-333 font-size-8">查找商品：</div>
          <div class="flex-sub">
            <el-input class="input-width-100" size="mini" v-model="keyWord" />
          </div>
        </div>
        <div class="flex align-center mb-9">
          <div class="label color-333 font-size-8">分类查找：</div>
          <div class="flex-sub">
            <el-cascader
            style="width:100%;"
            v-model="classValue"
            size="mini"
            :options="classOption"
            @change="selclassChange" />
          </div>
        </div>
      </div>
      <div>
        <el-button class="ml-5" @click="search" size="mini" type="primary">查找</el-button>
      </div>
    </div>
    <!-- 商品列表部分 -->
    <div class="pro-list-box" v-infinite-scroll="load">
      <div class="pro-item mb-9 flex justify-between align-center" v-for="(item, index) in [1,2,,3,4,4,4,4]" :key="index">
        <div class="pro-left-part flex align-center flex-sub">
          <el-image
            class="pro-img"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="'contain'"></el-image>
          <div class="pro-left-info color-333 font-size-8  ml-10">
            <div class="mb-5 hidden-ellipsis">冰糖橙10斤现摘现摘现斤现摘现发橙子冰糖冰糖橙现摘现发橙子冰糖冰糖橙现摘现发橙子冰糖冰糖橙</div>
            <div class="mb-5">价格：580元</div>
            <div class="mb-5">会员价：280元</div>
            <div>2021-04-15 16:28:28</div>
          </div>
        </div>
        <div>
          <el-button class="ml-5" @click="selPro" size="mini" type="danger">选择</el-button>
        </div>
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
    // 关闭弹窗
    close () {
      this.$emit('closeSelProDialog')
    },
    selclassChange (e) {
      console.log(e)
    },
    load () {
      console.log('触底加载')
    },
    search () {

    },
    selPro () {

    }
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  padding:0 20px;
}
.pro-list-box{
  margin-top:10px;
  height:300px;
  // padding-right:15px;
  overflow-y:auto;
  .pro-left-part{
    overflow: hidden;
  }
  .pro-item{
    background:#F7F8FA;
    padding:5px;
    width:100%;
  }
  .pro-img{
    width: 65px;
    height: 65px;
  }
  .pro-left-info{
    width:75%;
  }
}
.input-width-100{
  width:100% !important;
}
.hidden-ellipsis{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  width:100%;
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
.ml-10{
  margin-left:10px;
}
</style>
