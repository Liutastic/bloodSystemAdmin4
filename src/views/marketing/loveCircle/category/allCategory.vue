<template>
  <d2-container>
    <el-form inline size="small" @submit.native.prevent>
      <el-form-item>
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate('create')"
          >新增顶层分类</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button
            icon="el-icon-check"
            :disabled="loading"
            @click="changeCategoryStatus(1)"
            >启用</el-button
          >

          <el-button
            icon="el-icon-close"
            :disabled="loading"
            @click="changeCategoryStatus(0)"
            >禁用</el-button
          >
        </el-button-group>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button
            icon="el-icon-delete"
            :disabled="loading"
            @click="deleteCategory"
            >删除</el-button
          >

          <el-button
            icon="el-icon-refresh"
            :disabled="loading"
            @click.stop="getCategoryList"
            >刷新</el-button
          >
        </el-button-group>
      </el-form-item>
      <el-form-item label="过滤">
        <el-input
          v-model="filterText"
          :disabled="loading"
          placeholder="输入关键词进行过滤"
          prefix-icon="el-icon-search"
          style="width: 240px"
          :clearable="true"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-tree
          class="tree-scroll"
          node-key="id"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          ref="tree"
          highlight-current
          show-checkbox
          @node-click="handleNodeClick"
          @check="handleNodeCheck"
        >
          <span class="custom-tree-node action" slot-scope="{ node, data }">
            <span
              class="brother-showing"
              :class="{ 'status-tree': !data.is_enable }"
            >
              <i
                v-if="data.children"
                :class="`el-icon-${node.expanded ? 'folder-opened' : 'folder'}`"
              />
              <i v-else class="el-icon-document" />
              {{ node.label }}</span
            >
            <span class="active">
              <span> {{ data.pink_circle_competence.title }} </span>
              <el-button type="text" size="mini" @click.stop="handleAdd(data)">
                新增
              </el-button>

              <el-button
                type="text"
                size="mini"
                @click.stop="
                  data.is_enable
                    ? changeCategoryStatus(0)
                    : changeCategoryStatus(1)
                "
              >
                {{ data.is_enable ? "禁用" : "启用" }}
              </el-button>

              <el-button
                type="text"
                size="mini"
                @click.stop="deleteACategory(data.id)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card" shadow="never">
          <div slot="header">
            <span>{{ textMap[formStatus] }}</span>
            <el-button
              v-if="formStatus === 'create'"
              type="text"
              :loading="formLoading"
              style="float: right; padding: 3px 0"
              @click="submitAdd"
              >确定</el-button
            >
            <el-button
              v-else-if="formStatus === 'update'"
              type="text"
              :loading="formLoading"
              style="float: right; padding: 3px 0"
              @click="submitUpdate"
              >修改</el-button
            >
          </div>
          <el-form
            :model="formData"
            :rules="formRules"
            ref="form"
            label-width="80px"
          >
            <el-form-item
              v-if="isFatherVisible"
              label="上级分类"
              prop="parent_id"
            >
              <!-- <el-cascader
                v-model="formData.parent_id"
                placeholder="不选择则表示顶层分类"
                :options="treeData"
                :props="cascaderProps"
                style="width: 100%"
                filterable
                clearable
              >
              </el-cascader> -->
              <el-select
                v-model="formData.parent_id"
                placeholder="不选择则表示顶层分类"
              >
                <el-option
                  v-for="item in treeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="name">
              <el-input
                style="width: 217px"
                maxlength="6"
                placeholder="请输入分类名称"
                v-model="formData.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="sort">
              <el-input
                style="width: 217px"
                v-model.number="formData.sort"
                placeholder="数字越小, 排序越前"
              ></el-input>
            </el-form-item>
            <el-form-item label="权限模板" prop="pink_circle_competence_id">
              <el-select v-model="formData.pink_circle_competence_id">
                <el-option
                  v-for="item in templateList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                  :disabled="!item.is_enable"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch
                @change="handleSwitchStatus"
                v-model="switchStatus"
                active-color="#13ce66"
              ></el-switch>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
export default {
  data () {
    return {
      loading: false,
      formLoading: false,
      filterText: '',
      treeData: [],
      templateList: [],
      treeProps: {
        label: 'name',
        children: 'children'
      },
      cascaderProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        checkStrictly: true,
        emitPath: false
      },
      textMap: { update: '编辑分类', create: '新增分类' },
      switchStatus: true,
      formData: {
        pink_circle_competence_id: null,
        parent_id: '',
        name: '',
        is_enable: 1,
        sort: 0,
        id: 1
      },
      formRules: {
        pink_circle_competence_id: [
          { required: true, message: '请选择权限模板', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 6, message: '分类名称最多6个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序列表', trigger: 'blur' },
          { type: 'number', message: '排序类型应为大于等于0的数字', trigger: 'blur' }
        ]
      },
      formStatus: 'create',
      // 树中选中的节点
      selectedList: [],
      // 控制选择父分类组件的出现与否
      isFatherVisible: true
    }
  },
  async mounted () {
    await this.getCategoryList()
    await this.getTemplateList()
  },
  methods: {
    initialForm () {
      this.formData = {
        pink_circle_competence_id: null,
        parent_id: '',
        name: '',
        is_enable: 1,
        sort: 0,
        id: 1
      }
    },
    handleCreate (params) {
      // this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.isFatherVisible = false
      this.formData = {
        pink_circle_competence_id: null,
        parent_id: '',
        name: '',
        is_enable: 1,
        sort: 0,
        id: 1
      }
      if (params === 'create') {
        this.formStatus = 'create'
      } else if (params === 'update') {
        this.formStatus = 'update'
      }
    },
    // 过滤分类
    filterNode (value, data) {
      if (!value) { return true }
      return data.name.indexOf(value) !== -1
    },
    // 获取权限模板列表, 选择器使用
    async getTemplateList () {
      const { data, code } = await this.$apis.GetPermissionList({ page: 1, per_page: 9999 })
      if (code === 0) {
        const list = []
        data.data.forEach(ele => {
          if (ele.status === 1) {
            list.push({
              ...ele,
              is_enable: true
            })
          } else {
            list.push({
              ...ele,
              is_enable: false
            })
          }
        })
        console.log(list)
        this.templateList = list
      }
    },
    // 获取分类列表
    async getCategoryList () {
      const { data, code } = await this.$apis.GetCategoryList()
      if (code === 0) {
        this.treeData = util.formatDataToTree(data, 'id')
        // console.log('this.treeData', this.treeData)
      }
    },
    // 点击树节点
    handleNodeClick (data) {
      this.formStatus = 'update'
      this.isFatherVisible = true
      if (data.children) {
        // 点击的是父节点
        this.isFatherVisible = false
      }
      this.formData = {
        id: data.id,
        pink_circle_competence_id: data.pink_circle_competence_id,
        parent_id: data.parent_id === 0 ? '' : data.parent_id,
        name: data.name,
        is_enable: data.is_enable,
        sort: data.sort
      }
      console.log(this.formData)
    },
    // 复选树节点
    handleNodeCheck (data, node) {
      this.selectedList = node.checkedKeys
    },
    // 处理数据，传到后台
    handleSwitchStatus () {
      if (this.switchStatus) {
        this.formData.is_enable = 1
      } else {
        this.formData.is_enable = 0
      }
    },
    // 改变分类状态
    async changeCategoryStatus (is_enable) {
      this.loading = true
      if (this.selectedList.length === 0) {
        this.$message({
          type: 'warning',
          message: '请先选择要操作的分类'
        })
        this.loading = false
        return
      }
      const obj = {
        id: this.selectedList,
        is_enable
      }
      if (this.selectedList.length !== 0) {
        const { code } = await this.$apis.UpdateCategoryStatus(obj)
        if (code === 0) {
          this.$message({
            type: 'success',
            message: is_enable === 1 ? '启用成功' : '禁用成功'
          })
          this.selectedList = []
          this.$refs.tree.setCheckedNodes([])
          await this.getCategoryList()
        }
      }
      this.loading = false
    },
    // 树节点新建btn
    handleAdd (data) {
      console.log('data', data)
      this.formStatus = 'create'
      if (data.children) {
        // 在父节点点击新增则新增该父节点下的子节点
        this.formData.parent_id = data.id
      } else {
        this.isFatherVisible = true
        // 在子节点点击新增则新增和该子节点同级的分类
        this.formData.parent_id = data.parent_id
      }
      this.$refs.tree.setCurrentKey(data.id)
      // this.formData.id = key
    },
    // 提交新建
    submitAdd () {
      this.formLoading = true
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { code, msg } = await this.$apis.CreateCategory(this.formData.parent_id === '' ? { ...this.formData, parent_id: 0 } : this.formData)
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '添加分类成功'
            })
            this.$refs.form.resetFields()
            this.$refs.form.clearValidate()
            await this.getCategoryList()
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
            this.initialForm()
          }
        }
      })
      this.formLoading = false
      this.isFatherVisible = true
    },
    // 提交编辑
    submitUpdate () {
      this.formLoading = true
      // console.log(this.formData)
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { msg, code } = await this.$apis.UpdateCategory(this.formData.parent_id === '' ? { ...this.formData, parent_id: 0 } : this.formData)
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '修改分类成功'
            })
            await this.getCategoryList()
            this.$refs.form.resetFields()
            this.$refs.form.clearValidate()
            this.formStatus = 'create'
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
        }
      })
      this.isFatherVisible = true
      this.formLoading = false
    },
    // 删除一个分类
    deleteACategory (id) {
      console.log(id)
      this.$confirm('确认删除该分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // let params = JSON.parse(this.deleteList)
        const { code } = await this.$apis.DeleteCategory({ id })
        if (code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getCategoryList()
        }
      })
    },
    // 删除多个分类
    deleteCategory () {
      this.loading = true
      console.log(this.selectedList)
      if (this.selectedList.length !== 0) {
        this.$confirm('确认删除该分类吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // let params = JSON.parse(this.deleteList)
          const { code, msg } = await this.$apis.DeleteCategory({ id: this.selectedList })
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getCategoryList()
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择要操作的分类'
        })
      }
      this.loading = false
      this.loading = false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-scroll {
  max-height: 615px;
  overflow: auto;
  padding-bottom: 1px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.brother-showing i {
  width: 16px;
}

.active {
  display: none;
}

.action:hover .active {
  display: block;
}

.move-tree {
  color: $color-text-placehoder;
  cursor: move;
}

.status-tree {
  color: $color-text-placehoder;
  text-decoration: line-through;
}

.box-card {
  border-radius: 0;
  border: 1px solid $color-border-1;
}

.popover-image {
  text-align: center;
  line-height: 0;
}

// .popover-image /deep/ img {
//   vertical-align: middle;
//   cursor: pointer;
// }

// .el-image /deep/ .el-image__error {
//   line-height: 1.4;
// }
</style>
