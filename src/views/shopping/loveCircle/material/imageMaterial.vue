<template>
  <d2-container>
    <el-row>
      <el-col class="flex justify-center" :span="10">
        <preview-model></preview-model>
      </el-col>
      <el-col class="flex justify-center" :span="10">
        <div class="publish-box">
          <div class="title color-333 font-bold">爱粉圈素材编辑区</div>
          <!-- 素材基础信息 -->
          <div>
            <div class="color-666 font-size-9 mb-9 text-center">素材基础信息</div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">素材名称：</div>
              <div class="flex-sub">
                <el-input class="input-width-100" show-word-limit maxlength="10" size="mini" v-model="materialName" />
              </div>
            </div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">素材分类：</div>
              <div class="flex-sub">
                <el-cascader
                class="input-width-100"
                v-model="materailClassValue"
                size="mini"
                :options="materailClassList"
                @change="selMaClassChange" />
              </div>
            </div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">权限模板：</div>
              <div class="flex-sub">
                <el-select v-model="permissionValue" class="input-width-100" size="mini">
                  <el-option
                    v-for="item in permissionOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">虚拟转发：</div>
              <div class="flex-sub">
                <el-input type="number" class="input-width-100" size="mini" v-model="virtualNum" />
              </div>
            </div>
          </div>
          <!-- 素材图文信息 -->
          <div>
             <div class="color-666 font-size-9 mb-9 text-center">素材图文信息</div>
             <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">发布人：</div>
              <div class="flex-sub">
                <el-select v-model="publisher" class="input-width-100" size="mini">
                  <el-option
                    v-for="item in publisherOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">展示商品：</div>
              <div class="flex-sub">
                <el-input class="input-width-100" size="mini" v-model="materialName" />
              </div>
              <div class="btn ml-5">选择商品</div>
            </div>
            <div class="color-333 font-size-8 mb-9">已绑商品: 我是商品，我是商品我是商品</div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">文本内容：</div>
              <div class="flex-sub">
                <el-input type="textarea" class="input-width-100" size="mini" v-model="content" />
              </div>
            </div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">上传图片：</div>
              <div class="flex-sub">
                <el-upload
                  class="upload-btn"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-progress="uploadProImgPropress"
                  :on-success="uploadProImgSuccess">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </div>
            <div class="flex align-center mb-9">
              <div class="label color-333 font-size-8">关联商品：</div>
              <div class="flex-sub">
                <el-input class="input-width-100" size="mini" v-model="relatePro" />
              </div>
              <div class="btn ml-5">选择商品</div>
            </div>
            <div class="color-333 font-size-8 mb-9">关联商品: 我是商品，我是商品我是商品</div>
          </div>
          <div class="submit-btn-box">
            <el-button type="primary" size="mini">上传</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 选择商品弹窗 -->
    <SelProDialog :selProDialogShow="selProDialogShow"></SelProDialog>
  </d2-container>
</template>

<script>
import PreviewModel from './components/PreviewModel'
import SelProDialog from './components/SelProDialog'
export default {
  name: 'imageMaterial',
  components: {
    PreviewModel,
    SelProDialog
  },
  data () {
    return {
      // 素材名
      materialName: '',
      // 虚拟转发
      virtualNum: null,
      // 权限模板
      permissionValue: '',
      // 权限模板选项集合
      permissionOption: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 素材分类
      materailClassValue: [],
      // 素材分类选项集合
      materailClassList: [
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
      ],
      // 发布人
      publisher: '',
      // 发布人选项合集
      publisherOption: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 文本内容
      content: '',
      // 关联商品
      relatePro: null,
      // 选择商品弹窗显示隐藏
      selProDialogShow: false
    }
  },
  methods: {
    selMaClassChange (e) {
      console.log(e)
    },
    uploadProImgSuccess (response, file, fileList) {
      console.log(response, file, fileList)
    },
    uploadProImgPropress (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.publish-box{
  width:300px;
  min-height:610px;
  background: #F7F8FA;
  padding:0 10px;
  box-sizing: border-box;
  .title{
    height:30px;
    line-height:30px;
    text-align: center;
    font-size: 10px;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .label{
    width:65px;
  }
  .input-width-100{
    width:100% !important;
  }
  .btn{
    width: 49px;
    height: 16px;
    background: #2589FF;
    border-radius: 1px;
    text-align:center;
    line-height:16px;
    font-size:8px;
    color:#ffffff;
  }
  .upload-btn{
    width:75px;
    height:75px;
    background: #FFFFFF;
    border-radius: 1px;
    text-align: center;
    line-height:75px;
  }
  .submit-btn-box{
    margin-top:20px;
    text-align: center;
  }
}
.text-center{
  text-align: center;
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
.mt-40{
  margin-top:40px;
}
.ml-5{
  margin-left:5px;
}
</style>
