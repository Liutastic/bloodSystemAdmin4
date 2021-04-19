<template>
  <d2-container>
    <template slot="header">发布人身份设置</template>
    <el-form
      :model="formData"
      :rules="formRules"
      ref="issuerForm"
      label-width="77px"
      size="mini"
      label-position="left"
    >
      <el-form-item prop="name" label="名称">
        <el-input
          v-model="formData.name"
          placeholder="输入用户名称，限10个字符"
        ></el-input>
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <el-upload
          :action="QINIUURL"
          :multiple="false"
          :data="dataToken"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          list-type="picture-card"
          ><i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="is_enable" label="启用状态">
        <el-switch
          v-model="formData.is_enable"
          active-color="#13ce66"
        ></el-switch>
      </el-form-item>
      <el-button type="success" size="mini" @click="submit">保存</el-button>
    </el-form>
  </d2-container>
</template>

<script>
import { QINIUURL } from '@/api/config'
export default {
  name: 'loveCircle',
  data () {
    return {
      formData: {
        name: '',
        is_enable: false,
        avatar: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入发布人名称', trigger: 'blur' },
          { min: 1, max: 10, message: '发布者名称小于10个字符', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ]
      },
      QINIUURL,
      dataToken: { token: '' } // 上传的token
    }
  },
  methods: {
    handleSuccess (file) {
      console.log('handleSuccess', file)
    },
    handleRemove (file) {
      console.log('handleRemove', file)
    },
    async beforeUpload () {
      this.$loading()
      const { uptoken } = await this.$apis.qiniuToken()
      this.dataToken.token = uptoken
      this.$loading().close()
    },
    submit () {
      console.log('formData', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-content {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
</style>
