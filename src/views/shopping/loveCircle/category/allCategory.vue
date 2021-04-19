<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
      <!-- <el-button slot="footer" type="success" @click="addCategory"
        >新增分类</el-button -->
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
    }
  }
}
</script>
