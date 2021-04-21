<template>
  <d2-container>
    <template slot="header">
      <span style="margin-right: 30px">所有素材</span>
      <el-button type="mini">新增图片素材</el-button>
      <el-button type="mini">新增视频素材</el-button>
    </template>
    <crud-search
      ref="search"
      :options="crud.searchOptions"
      @submit="handleSearch"
    />
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
    ></d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './materialCrud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'allMaterial',
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return this.$apis.GetMaterialList(query)
    }
  }
}
</script>
