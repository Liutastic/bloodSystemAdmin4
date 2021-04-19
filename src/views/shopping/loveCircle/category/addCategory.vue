<template>
  <d2-container>
    <el-form
      label-position="left"
      :rules="formData"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input
          type="text"
          v-model="formData.categoryName"
          placeholder="请输入6个字符以内的分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类排序" prop="categorySort">
        <el-input
          type="number"
          v-model.number="formData.categorySort"
          placeholder="数字越大，排序越前"
        ></el-input>
      </el-form-item>
      <el-form-item label="子分类">
        <el-switch
          v-model="formData.ifChildCategory"
          style="margin-right: 10px"
          active-color="#13ce66"
        ></el-switch>
        <el-button
          v-if="formData.ifChildCategory"
          type="primary"
          size="mini"
          @click="addDomain"
          >添加子分类项</el-button
        >
      </el-form-item>

      <el-form-item label="权限模板" prop="categorySort">
        <el-select placeholder="请选择权限模板"></el-select>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-switch
          v-model="formData.is_enable"
          style="margin-right: 10px"
          active-color="#13ce66"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="success" size="mini">保存</el-button>
    </template>
  </d2-container>
</template>

<script>
import template from '../permission/template.vue'
export default {
  components: { template },
  name: 'loveCircle',
  data () {
    return {
      // 权限模板列表
      authList: [],
      // 表单model
      formData: {
        categoryName: '',
        categorySort: 0,
        ifChildCategory: false,
        is_enable: false,
      },
      // 表单validation
      formRules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        categorySort: [
          { required: true, message: '请输入分类排序', trigger: 'blur' },
          { type: 'number', message: '请输入数字, 分类从大到小排序', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.GetAuthTemplateList()
  },
  methods: {
    GetAuthTemplateList (params) {
      const { data, msg, code } = this.$apis.GetAuthTemplateList(params)
      if (code === 0) {
        this.authList = data.data
      } else {
        // 提示错误信息 
        // this.$message(msg)
      }
    },
    addDomain () {
      this.formData.childCategory.push({
        childName: '',
        key: Date.now()
      });
    }
  }
}
</script>
