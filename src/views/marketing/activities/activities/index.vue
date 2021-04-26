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
      <template slot="permissionTitleFormSlot">
        <el-button type="success" size="small" @click="checkAll(1)"
          >全选权限</el-button
        >
        <el-button type="danger" size="small" @click="checkAll(0)"
          >清空权限</el-button
        >
      </template>
      <template slot="sign_countSlot" slot-scope="scope">
         <el-button type="text" size="mini" @click="showDetail(scope.row.id)">{{scope.row.sign_count}}</el-button>

      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import api from './api'
export default {
  mixins: [d2CrudPlus.crud],
  methods: {
    async checkAll (type) {
      // 清空权限
      if (!type) {
        this.getEditForm().permissions = []

        return
      }
      // 全选权限
      const dictData = this.getEditFormTemplate('permissions').component.props
        .dict.dict
      this.getEditForm().permissions = dictData.map(item => item.value)
    },
    getCrudOptions () {
      return crudOptions(this)
    },

    getParams (data) {
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

      return {
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
      }
    },
    /**
     * 请求数据
     */
    pageRequest (query) {
      const params = {
        ...this.getParams(query),
        page: query.page,
        per_page: query.per_page
      }

      return api.getActivityList(params)
    },

    /**
     * 新增数据
     */
    async addRequest (data) {
      await api.addActivityStore(this.getParams(data))
      return null
    },
    /**
     * 编辑数据addRequest
     */
    updateRequest (data) {
      const params = { ...this.getParams(data), id: data.id }
      return api.putActivity(params)
    },
    /**
     * 删除数据
     */
    async delRequest (row) {
      await api.deleteActivity({ id: row.id })
    },

    /**
   * 跳转参与人记录
   */
    async showDetail (id) {
      this.$router.push({
        name: 'activitiesParticipant',
        params: { marketing_activity_id: id }
      })
    }
  }
}
</script>
