<template>
  <d2-container>
    <template slot="header">新增/编辑权限模板</template>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">模板名称：</span>
      <el-input
        size="mini"
        class="input"
        maxlength="8"
        show-word-limit
        placeholder="请输入内容"
        v-model="formData.templateName">
      </el-input>
    </el-row>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">权限分配：</span>
      <el-button size="mini" type="primary">全选权限</el-button>
      <el-button size="mini" type="danger">清空权限</el-button>
    </el-row>
    <el-row class="mb-25" type="flex" align="center">
      <span class="label flex align-center">商城&美肌：</span>
      <el-checkbox-group @change="checkboxChange" v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row class="mt-40" type="flex" align="center" justify="center">
     <el-button @click="save" size="mini" type="primary">保存</el-button>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: 'addTemplate',
  data () {
    return {
      formData: {
        templateName: '',
        permission: null
      },
      checkList: []
    }
  },
  methods: {
    checkboxChange (e) {
      console.log(e)
    },
    save () {

    }
  }
}
</script>

<style lang="scss" scoped>
.flex{
  display:flex;
}
.align-center{
  align-items: center;
}
.mb-25{
  margin-bottom:25px;
}
.input{
  width:30%;
}
.mt-40{
  margin-top:40px;
}
.label{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
