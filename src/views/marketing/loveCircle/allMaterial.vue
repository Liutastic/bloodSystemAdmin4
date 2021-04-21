<template>
  <d2-container>
    <template slot="header">
      <span style="margin-right: 30px">所有素材</span>
      <el-button type="mini" @click="toAddMaterial(1)">新增图片素材</el-button>
      <el-button type="mini" @click="toAddMaterial(2)">新增视频素材</el-button>
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
      @edit="handleClick"
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
    },
    // 路由跳转
    toAddMaterial (type) {
      if (type === 1) {
        this.$router.push('/marketing/loveCircle/material/imageMaterial')
      } else if (type === 2) {
        this.$router.push('/marketing/loveCircle/material/videoMaterial')
      }
    },
    handleClick ($event) {
      // 带参数传值，从行内获得值
      const type = $event.row.type
      const id = $event.row.id
      if (type === 1) {
        // 图文素材
        this.$router.push({
          path: '/marketing/loveCircle/material/imageMaterial',
          query: {
            id
          }
        })
      } else if (type === 2) {
        // 视频素材
        this.$router.push({
          path: '/marketing/loveCircle/material/videoMaterial',
          query: {
            id
          }
        })
      }
    }
  }
}
</script>
