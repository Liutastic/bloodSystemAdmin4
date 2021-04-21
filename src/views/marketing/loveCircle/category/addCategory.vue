<template>
  <d2-container>
    <el-form
      label-position="left"
      :rules="formRules"
      :model="formData"
      label-width="110px"
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
          type="text"
          v-model.number="formData.categorySort"
          placeholder="数字越大，排序越前"
        ></el-input>
      </el-form-item>
      <el-form-item label="子分类">
        <el-switch
          v-model="formData.isChildCategory"
          @change="removeAllChildren"
          style="margin-right: 10px"
          active-color="#13ce66"
        ></el-switch>
        <el-button
          v-if="formData.isChildCategory"
          type="primary"
          size="mini"
          @click="addChild"
          >添加子分类项</el-button
        >
      </el-form-item>
      <div v-for="(item, index) in formData.dynamicChildren" :key="index">
        <el-form-item
          :label="'子类' + (index + 1) + '名称'"
          :prop="'dynamicChildren.' + index + '.childName'"
          :rules="[
            {
              required: true,
              message: '子类名称不能为空',
              trigger: 'blur',
            },
            { min: 1, max: 6, message: '名称长度在6个字符内', trigger: 'blur' },
          ]"
        >
          <el-input
            type="text"
            v-model="item.childName"
            placeholder="请输入子类名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="'子分类' + (index + 1) + '排序'"
          :prop="'dynamicChildren.' + index + '.childSort'"
          :rules="[
            { required: true, message: '子类排序不能为空', trigger: 'blur' },
            { type: 'number', message: '子类排序只能为数字', trigger: 'blur' },
          ]"
        >
          <el-input
            type="text"
            v-model.number="item.childSort"
            placeholder="数字越大，排序越前"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="mini" @click="removeChild(item, index)"
            >删除该子类</el-button
          >
        </el-form-item>
      </div>
      <el-form-item label="权限模板" prop="categorySort">
        <el-select v-model="formData.authTemplate" placeholder="请选择权限模板">
          <el-option
            v-for="item in authList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
            :disabled="item.status === 0 ? false : true"
          ></el-option>
        </el-select>
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
      <el-button type="success" size="mini" @click="submit">保存</el-button>
    </template>
  </d2-container>
</template>

<script>
export default {
  name: 'loveCircle',
  data () {
    return {
      // 权限模板列表
      authList: [],
      // 已经添加的子分类菜单
      histroyDynamicChildren: [],
      // 表单model
      formData: {
        categoryName: '',
        categorySort: 0,
        isChildCategory: false,
        is_enable: true,
        dynamicChildren: [],
        authTemplate: null
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
        ],
        authTemplate: [
          { required: true, message: '请选择权限模板', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    await this.GetAuthTemplateList()
  },
  methods: {
    async GetAuthTemplateList (params) {
      const { data, msg, code } = await this.$apis.GetAuthTemplateList(params)
      if (code === 0) {
        this.authList = data.data
        console.log(this.authList)
      } else {
        this.$message(msg)
      }
    },
    addChild () {
      this.formData.dynamicChildren.push({
        childName: '',
        childSort: 0
      })
    },
    removeChild (item, index) {
      this.formData.dynamicChildren.splice(index, 1)
    },
    removeAllChildren () {
      // switch === false
      if (!this.formData.isChildCategory) {
        this.histroyDynamicChildren = this.formData.dynamicChildren
        this.formData.dynamicChildren = []
      } else {
        // switch === true
        this.formData.dynamicChildren = this.histroyDynamicChildren
        this.histroyDynamicChildren = []
      }
    },
    submit () {
      console.log(this.formData)
    }
  }
}
</script>
