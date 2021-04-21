<template>
  <d2-container>
    <template slot="header">
      <div class="header-content">
        <span style="margin-right: 30px">所有素材</span>
        <div>
          <el-button size="mini" type="primary" @click="toAddMaterial(1)"
            >新增图片素材</el-button
          >
          <el-button size="mini" type="primary" @click="toAddMaterial(2)"
            >新增视频素材</el-button
          >
        </div>
      </div>
    </template>
    <crud-search
      ref="search"
      :options="crud.searchOptions"
      @submit="handleSearch"
    />
    <d2-crud-x
      :data="filterData"
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @edit="handleClick"
    ></d2-crud-x>
    <!-- <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" /> -->
  </d2-container>
</template>

<script>
import { crudOptions } from './materialCrud'
import { d2CrudPlus } from 'd2-crud-plus'
import StatusTag from '@/components/status-tag/status-tag'
import util from '@/libs/util'
export default {
  name: 'allMaterial',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      filterData: []
    }
  },
  methods: {
    // 自定义搜索方法
    async handleSearch (e) {
      const dateObj = this.formatDate(e.created_at)
      delete e.created_at
      if (dateObj && util.dateDiff(dateObj.end_at, dateObj.start_at).days > 30) {
        this.$message({
          type: 'warning',
          message: '选择的日期不可以大于30天'
        })
        return
      }
      const { data, msg, code } = await this.$apis.filterMaterial({
        ...e,
        start_at: dateObj?.start_at,
        end_at: dateObj?.end_at
      })
      if (code === 0) {
        this.filterData = data
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },
    // 格式化选择器时间
    formatDate (arr) {
      const formatArr = arr
      if (Object.prototype.toString.call(formatArr) !== '[object Array]') {
        return
      }
      for (let i = 0; i < formatArr.length; i++) {
        formatArr[i] = util.formatDate(formatArr[i])
      }
      return {
        start_at: formatArr[0],
        end_at: formatArr[1]
      }
    },
    getCrudOptions () {
      return crudOptions(StatusTag, this)
    },
    async pageRequest (query) {
      const { data, code, msg } = await this.$apis.GetMaterialList(query)
      if (code === 0) {
        this.filterData = data.data
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
      return {
        data
      }
    },
    delRequest (row) {
      return this.$apis.DeleteMaterial(row.id)
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

<style lang="scss" scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
