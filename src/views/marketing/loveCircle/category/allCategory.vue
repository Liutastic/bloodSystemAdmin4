<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <div slot="header">
      <crud-search
        ref="search"
        :options="crud.searchOptions"
        @submit="handleSearch"
      />

      <el-button-group>
        <el-button size="small" type="primary" @click="addRow"
          ><i class="el-icon-plus"></i> 新增</el-button
        >
        <el-button size="small" type="danger" @click="batchDelete"
          ><i class="el-icon-delete"></i> 批量删除</el-button
        >
        <!-- <el-button   size="small" type="primary" @click="checkSecond">选中第一、二行</el-button> -->
      </el-button-group>
      <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
    </div>
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
      <el-button slot="footer" type="success" size="mini" @click="jumpAdd"
        >新增分类</el-button
      >
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'allCategory',
  mixins: [d2CrudPlus.crud],
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      this.$apis.GetCategoryList(query).then(res => { console.log(res) })
      return this.$apis.GetCategoryList(query)
    },
    addRequest (data) {
      return this.$apis.CreateCategory(data)
    },
    updateRequest (data) {
      return this.$apis.UpdateCategory(data)
    },
    delRequest (row) {
      return this.$apis.DeleteCategory(row.id)
    },
    jumpAdd () {
      this.$router.push('/marketing/loveCircle/category/addCategory')
    }
  }
}
</script>
