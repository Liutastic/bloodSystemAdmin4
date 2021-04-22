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
      <template slot="permissionTitleFormSlot" slot-scope="scope">
        <el-button type="success" size="small">全选权限</el-button>
        <el-button type="danger" size="small">清空权限</el-button>
      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import api from './api'
import log from '@/libs/util.log'
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
      return api.getActivityList(query)
    },

    /**
     * 新增数据
     */
    addRequest (data) {
      const {
        title,
        release_type,
        category_id,
        statistics_type,
        sign_start_at,
        sign_end_at,
        activity_start_at,
        activity_end_at,
        is_enable,
        is_toll,
        toll_amount,
        is_public,
        header_image,
        share_image,
        permissions,
        content
      } = data
      return api.addActivityStore({
        title,
        release_type,
        category_id,
        statistics_type,
        sign_start_at,
        sign_end_at,
        activity_start_at,
        activity_end_at,
        is_enable,
        is_toll,
        toll_amount,
        is_public,
        header_image,
        share_image,
        permissions,
        content
      })
    },
    /**
     * 编辑数据
     */
    updateRequest (data) {
      console.log('2132:', data)

      const {
        id,
        title,
        release_type,
        category_id,
        statistics_type,
        sign_start_at,
        sign_end_at,
        activity_start_at,
        activity_end_at,
        is_enable,
        is_toll,
        toll_amount,
        is_public,
        header_image,
        share_image,
        permissions,
        content
      } = data
      return api.putActivity({
        id,
        title,
        release_type,
        category_id,
        statistics_type,
        sign_start_at,
        sign_end_at,
        activity_start_at,
        activity_end_at,
        is_enable,
        is_toll,
        toll_amount,
        is_public,
        header_image,
        share_image,
        permissions,
        content
      })
    },
    /**
     * 删除数据
     */
    async delRequest (row) {
      await api.deleteActivity({ id: row.id })
    }
  }
}
</script>
