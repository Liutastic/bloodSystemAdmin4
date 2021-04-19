<template>
  <div class="pre-model-box">
    <!-- 页面标题 -->
    <div class="title color-333 border-dashed font-bold">爱粉圈素材预览发布</div>
    <!-- 发布者信息模块 -->
    <div class="every-temple-part border-dashed flex align-center justify-between padding-lr-8 padding-tb-10">
      <div class="flex align-center">
        <el-avatar size="mini" :src="circleUrl"></el-avatar>
        <div class="flex flex-direction-column ml-9">
          <span class="font-size-9 color-333">可甜</span>
          <span class="font-size-8 color-999 mt-3">16小时前</span>
        </div>
      </div>
      <div class="font-size-8 color-999">
        <el-image class="transmit-icon" src="" fit="'fit'"></el-image>
        10.6万
      </div>
      <div class="right-del-btn">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- 文案模块 -->
    <div class="every-temple-part text-box border-dashed padding-lr-8 padding-tb-10 font-size-9 color-333">
      <div>
        开心的一天从此刻开始
      </div>
      <div class="right-del-btn">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- 图片链接九宫格模块 -->
    <div class="every-temple-part border-dashed padding-lr-8 padding-tb-10">
      <div class="flex flex-wrap" :class="{'nine-img-box': proImgList.length !== 4}">
        <div class="pro-img-box" v-for="(item, index) in proImgList" :key="index">
          <el-image
          class="pro-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="'contain'"></el-image>
          <i class="el-icon-error del-icon"></i>
        </div>
      </div>
      <div class="right-del-btn">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
    <!-- 商品详细部分 -->
    <div class="every-temple-part border-dashed padding-lr-8 padding-tb-10">
      <div class="flex">
        <el-image
          class="bottom-pro-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="'contain'"></el-image>
        <div class="pro-right-info flex justify-between flex-direction-column">
          <div class="color-333 font-size-10 hidden-ellipsis">冰糖橙10斤现摘现发橙子冰糖橙1010斤现摘现发橙子冰糖橙10</div>
          <div class="pro-price-part flex">
            <div class="flex align-center justify-center flex-direction-column padding-lr-6">
              <div class="font-size-15 color-red font-bold">¥280</div>
              <div class="font-size-14 color-red font-bold">会员价</div>
            </div>
            <div class="flex-sub pro-white-part flex justify-between">
              <div class="flex align-center justify-center flex-direction-column">
                <div class="font-size-15 color-999">¥280</div>
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
      <div class="right-del-btn">
        <i class="el-icon-circle-close right-del-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewModel',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      proImgList: [1, 2, 3, 4]
    }
  }
}
</script>
<style lang="scss" scoped>
.pre-model-box{
  width:300px;
  min-height:610px;
  background: #F7F8FA;
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
</style>
