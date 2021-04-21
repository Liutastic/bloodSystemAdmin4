<template>
  <div class="pre-model-box">
    <!-- 页面标题 -->
    <div class="title color-333 border-dashed font-bold">爱粉圈素材预览发布</div>
    <!-- 发布者信息模块 -->
    <div v-show="isShowOnePart" class="every-temple-part border-dashed flex align-center justify-between padding-lr-8 padding-tb-10">
      <div class="flex align-center">
        <el-avatar size="'mini'" :src="issuerInfo.avatar | qiniu"></el-avatar>
        <div class="flex flex-direction-column ml-9">
          <span class="font-size-9 color-333">{{issuerInfo.name}}</span>
          <span class="font-size-8 color-999 mt-3">刚刚</span>
        </div>
      </div>
      <div class="font-size-8 color-999">
        <el-image class="transmit-icon" src="" fit="'fit'"></el-image>
        {{showVirtualNum}}
      </div>
      <div class="right-del-btn" @click="delTemplate(1)">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- 文案模块 -->
    <div v-show="content" class="every-temple-part text-box border-dashed padding-lr-8 padding-tb-10 font-size-9 color-333">
      <div>
        {{content}}
      </div>
      <div class="right-del-btn" @click="delTemplate(2)">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- 图片链接九宫格模块 -->
    <div v-if="type === 'image' && proImgList.length" class="every-temple-part border-dashed padding-lr-8 padding-tb-10">
      <div class="flex flex-wrap" :class="{'nine-img-box': proImgList.length !== 4}">
        <div class="pro-img-box" v-for="(item, index) in proImgList" :key="index">
          <el-image
          class="pro-img"
          :src="item.url | qiniu"
          fit="'contain'"></el-image>
          <i class="el-icon-error del-icon cursor" @click="delProImg(index)"></i>
        </div>
      </div>
      <div class="right-del-btn" @click="delTemplate(3)">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- // 视频 -->
    <div v-if="type === 'video' && proImgList.length" class="every-temple-part border-dashed padding-lr-8 padding-tb-10">
      <video
        :src="proImgList[0].url | qiniu(750, 'video')"
        class="video"
        controls="controls">
        您的浏览器不支持视频播放
      </video>
      <div class="right-del-btn" @click="delTemplate(3)">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- 商品详细部分 -->
    <div v-show="isShowFourPart" class="every-temple-part border-dashed padding-lr-8 padding-tb-10">
      <div class="flex">
        <el-image
          class="bottom-pro-img"
          :src="showProInfo.image | qiniu"
          fit="'contain'"></el-image>
        <div class="pro-right-info flex justify-between flex-direction-column">
          <div class="color-333 font-size-10 hidden-ellipsis">{{showProInfo.name}}</div>
          <div class="pro-price-part flex">
            <div class="flex align-center justify-center flex-direction-column padding-lr-6">
              <div class="font-size-15 color-red font-bold">¥{{showProInfo.vip_price}}</div>
              <div class="font-size-14 color-red font-bold">会员价</div>
            </div>
            <div class="flex-sub pro-white-part flex justify-between">
              <div class="flex align-center justify-center flex-direction-column">
                <div class="font-size-15 color-999">¥{{showProInfo.price}}</div>
                <div class="font-size-10 color-999">零售价</div>
              </div>
              <div class="btn-box flex align-center justify-center flex-direction-column">
                <div class="font-size-10 color-999">会员立省300元</div>
                <div class="look-detail-btn mt-3">查看详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-del-btn" @click="delTemplate(4)">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <div v-if="isShowEmptyTip" class="empty color-999 font-size-9">右边添加数据进行预览</div>
  </div>
</template>

<script>
export default {
  name: 'PreviewModel',
  props: {
    issuerInfo: {
      type: Object,
      default: () => {}
    },
    proImgList: {
      type: Array,
      default: () => []
    },
    showProInfo: {
      type: Object,
      default: () => {}
    },
    virtualNum: {
      type: String,
      default: '0'
    },
    content: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'image'
    }
  },
  computed: {
    showVirtualNum () {
      return this.virtualNum > 10000 ? this.virtualNum / 10000 + '万' : this.virtualNum
    },
    // 判断是否展示发布人信息模块
    isShowOnePart () {
      return this.virtualNum || JSON.stringify(this.issuerInfo) !== '{}'
    },
    // 判断是否展示展示商品模块
    isShowFourPart () {
      return JSON.stringify(this.showProInfo) !== '{}'
    },
    // 判断是否展示空白提示
    isShowEmptyTip () {
      return JSON.stringify(this.issuerInfo) === '{}' && JSON.stringify(this.showProInfo) === '{}' && !this.proImgList.length && !this.content && !this.virtualNum
    }
  },
  data () {
    return {
    }
  },
  methods: {
    delProImg (index) {
      this.$emit('delProImg', index)
    },
    // 删除版块 1=发布人 2=文案 3=商品图片 4=展示商品
    delTemplate (type) {
      console.log('删除', type)
      switch (type) {
        case 1:
          this.$emit('delPublisherPart')
          break
        case 2:
          this.$emit('delContentPart')
          break
        case 3:
          this.$emit('delProImgPart')
          break
        case 4:
          this.$emit('delShowProPart')
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pre-model-box{
  width:300px;
  min-height:610px;
  background: #F7F8FA;
  position:relative;
  .empty{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .title{
    height:30px;
    line-height:30px;
    text-align: center;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .transmit-icon{
    width:15px;
    height:15px;
    background:gray;
  }
  .text-box{
    line-height:20px;
  }
  .nine-img-box{
    &>.pro-img-box:nth-of-type(3n) {
      margin-right:0;
    }
  }
  .pro-img-box{
    position:relative;
    margin-right:3px;
    margin-bottom:3px;
    .del-icon{
      position: absolute;
      top:4px;
      right:4px;
      color:#FE2C2C;
    }
    .pro-img{
      width: 92px;
      height: 92px;
      display:block;
    }
  }
  .pro-right-info{
    width:206px;
  }
  .bottom-pro-img{
    width:70px;
    height:70px;
    display:block;
    margin-right:8px;
  }
  .pro-price-part{
    background: #F2CF7F;
    border-radius: 5px;
    padding:2px 2px 2px 0px;
    .pro-white-part{
      background:#ffffff;
      border-radius: 0px 5px 5px 0px;
      padding:6px 7px;
    }
    .look-detail-btn{
      width: 60px;
      height: 14px;
      background: #F33841;
      text-align: center;
      border-radius: 7px;
      line-height:14px;
      color:#ffffff;
      font-size:8px;
    }
    .btn-box{
      padding-left:10px;
      border-left: 1px solid #F5F5F5;
    }
  }
  .every-temple-part{
    position:relative;
    .right-del-btn{
      width: 30px;
      height: 24px;
      background: #FDC35B;
      border-radius: 0px 22px 24px 0px;
      position:absolute;
      right:-30px;
      top:50%;
      transform: translateY(-50%);
      text-align: center;
      line-height:24px;
      cursor: pointer;
    }
    .right-del-icon{
      color:#ffffff;
    }
  }
}
.video{
  width:60%;
}
.border-dashed{
  border-bottom: 1px dashed #979797;
}
.hidden-ellipsis{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.color-red{
  color: #F33C45;
}
.color-999{
  color:#999999;
}
.font-bold{
  font-weight: bold;
}
.padding-lr-8{
  padding-left:8px;
  padding-right:8px;
}
.padding-lr-6{
  padding-left:6px;
  padding-right:6px;
}
.padding-tb-10{
  padding-top:10px;
  padding-bottom:10px;
}
.color-333{
  color:#333333;
}
.font-size-15{
  font-size: 15px;
}
.font-size-14{
  font-size: 14px;
}
.font-size-8{
  font-size: 8px;
}
.font-size-10{
  font-size:10px;
}
.font-size-9{
  font-size: 9px;
}
.flex-wrap{
  flex-wrap: wrap;
}
.flex{
  display:flex;
}
.flex-sub{
  flex:1;
}
.flex-direction-column{
  flex-direction: column;
}
.align-center{
  align-items: center;
}
.justify-between{
  justify-content: space-between;
}
.justify-center{
  justify-content: center;
}
.mb-25{
  margin-bottom:25px;
}
.ml-9{
  margin-left:9px;
}
.mt-3{
  margin-top:3px;
}
.mt-40{
  margin-top:40px;
}
.cursor{
  cursor: pointer;
}
</style>
