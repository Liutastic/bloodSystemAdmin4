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
            :props="props"
            v-model="categoryValue"
            size="mini"
            :show-all-levels="false" />
          </div>
        </div>
      </div>
      <div>
        <el-button class="ml-5" @click="search" size="mini" type="primary">查找</el-button>
      </div>
    </div>
    <!-- 商品列表部分 -->
    <div class="pro-list-box" v-infinite-scroll="load">
      <div class="pro-item mb-9 flex justify-between align-center" v-for="(item, index) in proList" :key="index">
        <div class="pro-left-part flex align-center flex-sub">
          <el-image
            class="pro-img"
            :src="item.image | qiniu"
            fit="contain"></el-image>
          <div class="pro-left-info color-333 font-size-8  ml-10">
            <div class="mb-5 hidden-ellipsis">{{item.name}}</div>
            <div class="mb-5">价格：{{item.price}}元</div>
            <div class="mb-5">会员价：{{item.vip_price}}元</div>
            <div>{{item.updated_at}}</div>
          </div>
        </div>
        <div>
          <el-button class="ml-5" @click="selPro(item)" size="mini" type="danger">选择</el-button>
        </div>
      </div>
      <div v-if="proList.length && isFinished" class="mt-10 color-333 font-size-9 text-center">已经没有更多啦~</div>
      <div v-if="!proList.length && firstLoad" class="empty-tip color-333 font-size-9">请输入搜索条件进行检索~</div>
      <div v-if="!proList.length && !firstLoad" class="empty-tip color-333 font-size-9">暂无相关商品~</div>
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
    const _self = this
    return {
      // 判断商品列表是否已经全部加载完成
      isFinished: false,
      // 判断获取商品是否加载完成
      isLoading: true,
      page: 1,
      keyWord: '',
      // 商品列表
      proList: [],
      firstLoad: true,
      // 素材分类
      categoryValue: [],
      // 级联选择器懒加载配置
      props: {
        lazy: true,
        label: 'name',
        value: 'id',
        async lazyLoad (node, resolve) { // 区域树懒加载的方法
          console.log('出现懒加载', node)
          const { data } = node
          console.log(data)
          // if ((data && data.haschild === false) || (data && data.leaf === true)) {
          //   return resolve([])
          // }
          let id
          if (data) {
            id = data.id
          }
          const temp = await _self.getProCategoryList(id)
          resolve(temp)
        }
      }
    }
  },
  methods: {
    // 关闭弹窗
    close () {
      this.$emit('closeSelProDialog')
    },
    load () {
      if (this.isFinished) {
        return
      }
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.page++
      this.getProList()
      console.log('触底加载')
    },
    search () {
      this.proList = []
      console.log(this.categoryValue, this.keyWord)
      this.getProList()
    },
    // 选择商品
    selPro (val) {
      console.log('选择商品', val)
      this.$emit('selHrefPro', val)
    },
    // 获取商品分类列表
    async getProCategoryList (id) {
      const { code, msg, data } = await this.$apis.GetProCategoryList({ category_id: id })
      console.log('获取商品分类', code, msg, data)
      return data.data
    },
    // 获取商品列表
    async getProList () {
      const params = {
        category_id: this.categoryValue.length ? this.categoryValue[this.categoryValue.length - 1] : null,
        keyWord: this.keyWord,
        page: this.page
      }
      const { code, msg, data } = await this.$apis.GetProList(params)
      console.log('获取商品列表', code, msg, data)
      if (code === 0) {
        this.firstLoad = false
        this.proList.push(...data.data)
        if (!data.data.length) {
          this.isFinished = true
        }
        this.isLoading = false
      }
    }
  },
  mounted () {
    // console.log('商品列表执行')
    // this.getProList()
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
  width:100%;
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
    background:#ffffff;
  }
  .pro-left-info{
    width:75%;
  }
  .empty-tip{
    text-align: center;
    position:relative;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
}
.text-center{
  text-align: center;
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
.mt-10{
  margin-top:10px;
}
.ml-5{
  margin-left:5px;
}
.ml-10{
  margin-left:10px;
}
</style>
