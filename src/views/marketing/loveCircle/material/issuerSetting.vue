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
          class="avatar-uploader"
          :action="QINIUURL"
          :data="dataToken"
          :show-file-list="false"
          :on-remove="handleRemove"
          :on-progress="progressing"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          list-type="picture-card"
        >
          <i class="el-icon-loading" v-if="showLoading"></i>
          <img
            v-if="formData.avatar"
            :src="formData.avatar | qiniu"
            class="avatar"
          />
          <i
            v-else-if="!formData.avatar && !showLoading"
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="is_enable" label="启用状态">
        <el-switch v-model="status" active-color="#13ce66"></el-switch>
      </el-form-item>
      <el-button type="success" size="mini" @click="submit">保存</el-button>
    </el-form>
    <div class="title">发布人列表</div>
    <div>
      <el-table :data="issuerList" style="width: 60%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="发布人名称"></el-table-column>
        <el-table-column prop="created_at" label="日期"></el-table-column>
        <el-table-column prop="is_enable" label="状态">
          <template slot-scope="scope">
            <el-tag
              style="cursor: pointer"
              v-if="scope.row.is_enable === 1"
              type="success"
              @click="changeIssuerStatus(scope.row)"
              >启用</el-tag
            >
            <el-tag
              style="cursor: pointer"
              v-else-if="scope.row.is_enable === 0"
              @click="changeIssuerStatus(scope.row)"
              type="danger"
            >
              禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="removeIssuer(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="params.page"
        :page-size="params.per_page"
        @current-change="handlePangeChange"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </d2-container>
</template>

<script>
import { QINIUURL } from '@/api/config'
export default {
  name: 'loveCircle',
  data () {
    return {
      status: true,
      // 分页参数
      params: {
        page: 1,
        per_page: 15
      },
      total: 0,
      // 表单提交数据
      formData: {
        name: '',
        is_enable: true,
        avatar: null
      },
      // 表单校验规则
      formRules: {
        name: [
          { required: true, message: '请输入发布人名称', trigger: 'blur' },
          { min: 1, max: 10, message: '发布者名称小于10个字符', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ]
      },
      // 七牛token
      QINIUURL,
      dataToken: { token: '' }, // 上传的token
      // 发布人列表
      issuerList: [],
      isShowUpload: true,
      showLoading: false
    }
  },
  async mounted () {
    await this.getIssuerList(this.params)
  },
  methods: {
    initialForm () {
      this.formData = {
        name: '',
        is_enable: true,
        avatar: null
      }
    },
    // 上传时钩子
    progressing () {
      this.showLoading = true
    },
    // 上传成功的钩子
    handleSuccess (res, file) {
      this.showLoading = false
      console.log(res)
      this.formData.avatar = res.hash
    },
    handleRemove (file) {

    },
    async handlePangeChange (cur) {
      await this.getIssuerList({
        page: cur,
        per_page: 15
      })
    },
    async beforeUpload (file) {
      if (this.formData.avatar) {
        this.formData.avatar = ''
      }
      // this.$loading()
      const { uptoken } = await this.$apis.qiniuToken()
      this.dataToken.token = uptoken
      // this.$loading().close()
      return new Promise((resolve, reject) => {
        const isJpegPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpegPng) {
          this.$message.warning('上传的图片格式需为jpg或png')
          return reject(new Error('图片格式有误'))
        } else {
          this.isShowUpload = false
          return resolve(true)
        }
      })
    },
    // 获取发布人分页
    async getIssuerList (params) {
      const { data, code, msg } = await this.$apis.GetIssuerList(params)
      if (code === 0) {
        this.issuerList = data.data
        this.total = data.total
      } else {
        this.$message(msg)
      }
    },
    // 更改发布人状态
    async changeIssuerStatus (row) {
      let data = {}
      if (row.is_enable === 1) {
        data = { id: row.id, is_enable: 0 }
      } else {
        data = { id: row.id, is_enable: 1 }
      }
      const { code, msg } = await this.$apis.UpdateIssuerStatus(data)
      if (code === 0) {
        this.$message({
          message: '更改发布人状态成功',
          type: 'success'
        })
        await this.getIssuerList(this.params)
      } else {
        this.$message(msg)
      }
    },
    // 删除一个发布人
    removeIssuer (row) {
      this.$confirm('此操作将永久删除该发布人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code, msg } = await this.$apis.DeleteIssuer(row)
        if (code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          await this.getIssuerList(this.params)
        } else {
          this.$message(msg)
        }
      })
    },
    async submit () {
      console.log('formData', this.formData)
      if (this.status) {
        this.formData.is_enable = 1
      } else {
        this.formData.is_enable = 0
      }
      this.$refs.issuerForm.validate(async valid => {
        if (valid) {
          const { code, msg } = await this.$apis.AddIssuer(this.formData)
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            await this.getIssuerList(this.params)
            this.initialForm()
          } else {
            this.$message(msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
.avatar-placeholder {
  width: 145px;
  height: 145px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.title {
  margin-top: 20px;
  font-weight: 500;
  font-size: 16px;
}
</style>
