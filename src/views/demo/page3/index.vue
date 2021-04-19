<template>
  <d2-container>
    <template slot="header">Page 3 header</template>
    <el-upload
      :action="QINIUURL"
      :multiple="true"
      :data="dataToken"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </d2-container>
</template>

<script>
import { QINIUURL } from '@/api/config'

export default {
  name: 'page3',
  data () {
    return {
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
    }
  }
}
</script>
