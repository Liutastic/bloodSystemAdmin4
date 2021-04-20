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
      </el-button-group>
      <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
    </div>
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },

    /**
     * 请求数据
     */
    pageRequest (query) {
      return this.$apis.getActivityList(query)
    },

    /**
     * 新增数据
     */
    addRequest (data) {
      console.log('data:', data)

      // return this.$apis.CreateCategory(data)
    }
  }
}
</script>
