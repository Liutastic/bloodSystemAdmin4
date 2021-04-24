<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <div slot="header">
      <!-- <crud-search
        ref="search"
        :options="crud.searchOptions"
        @submit="handleSearch"
      /> -->
      <el-button-group>
        <el-button size="small" type="primary" @click="addRow"
          ><i class="el-icon-plus"></i> 新增</el-button
        >
      </el-button-group>
      <!-- <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" /> -->
    </div>
    <d2-crud-x
      :data="data"
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
    >
      <template slot="avatarSlot" slot-scope="scope">
        <!-- {{ scope.row.avatar }} -->
        <el-image
          :src="scope.row.avatar | qiniu"
          fit="contain"
          style="height: 50px; width: 50px"
          :preview-src-list="[convertHttp(scope.row.avatar)]"
        >
          <!-- :preview-src-list="[
            'https://image.v1.vodeshop.com/gysa-default-logo.png',
          ]" -->
          <div
            slot="error"
            style="
              height: 50px;
              width: 50px;
              background-color: #f5f7fa;
              font-size: 11px;
              color: #b5b5b5;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 1px 0 1px;
            "
          >
            加载失败
          </div>
        </el-image>
      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './issuerCrud'
import { d2CrudPlus } from 'd2-crud-plus'
import StatusTag from '@/components/status-tag/status-tag'
import { IMGBASEURL } from '@/api/config'
import util from '@/libs/util'
export default {
  name: 'issuerSetting2',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      query: {},
      data: [],
      imgBaseUrl: IMGBASEURL
    }
  },
  methods: {
    convertHttp (url) {
      return util.convertHttp(url)
    },
    getCrudOptions () {
      return crudOptions(StatusTag, this)
    },
    async pageRequest (query) {
      this.query = query
      const { data, code } = await this.$apis.GetIssuerList(query)
      if (code === 0) {
        this.data = data.data
      }
      return { data }
    },
    addRequest (row) {
      return this.$apis.AddIssuer(row)
    },
    async updateRequest (row) {
      await this.$apis.UpdateIssuer(row)
    },
    delRequest (row) {
      // console.log(row)
      return this.$apis.DeleteIssuer(row.id)
    },
    // 重写对话框打开钩子函数
    doDialogOpened (context) {
      console.log('context', context)
      if (context.mode === 'edit') {
        context.form.is_enable = context.row.is_enable === 1
        context.form.avatar = util.convertHttp(context.form.avatar)
      } else {
        context.form.avatar = ''
      }
    }
  }
}
</script>

<style scoped>
.tool-content {
  margin-top: 20px;
  padding: 0 10px;
}
.error-contain {
  height: 50px;
  width: 50px;
  background-color: #f5f7fa;
  font-size: 12px;
  color: #b5b5b5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
