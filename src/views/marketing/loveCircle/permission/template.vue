<template>
  <d2-container>
    <template slot="header">
      <div class="header-box">
        <div>权限模板</div>
        <el-button type="primary" size="mini" @click="toAdd">新增<i class="el-icon-plus"></i></el-button>
      </div>
      <!-- <el-row type="flex" justify="space-between">
        <el-col :span="4"><div>权限模块</div></el-col>
        <el-col :span="2" ><el-button type="primary" size="mini">新增<i class="el-icon-plus"></i></el-button></el-col>
      </el-row> -->
    </template>
    <d2-crud-x
      :columns="columns"
      :data="permissionData"
      :rowHandle="rowHandle"
      :pagination="pagination"
      :options="options"
      :loading="loading"
      @pagination-current-change="paginationCurrentChange"
      @row-remove="deleteRow"
      @custom-edit="goEdit"/>
  </d2-container>
</template>

<script>
import StatusTag from '@/components/status-tag/status-tag'
export default {
  name: 'Template',
  data () {
    const that = this
    return {
      // 表头配置
      columns: [
        {
          title: 'ID',
          key: 'id',
          align: 'center',
          width: '150'
        },
        {
          title: '模板名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          component: {
            name: StatusTag,
            on: {
              async input (e) {
                const { code } = await that.$apis.EditPermissionStatus({ id: e.props.scope.row.id, status: e.props.scope.row.status === 1 ? 0 : 1 })
                if (code === 0) {
                  const arr = JSON.parse(JSON.stringify(that.permissionData))
                  arr[e.props.scope.index].status = arr[e.props.scope.index].status === 0 ? 1 : 0
                  that.permissionData = arr
                }
              }
            }
          }
        }
      ],
      // 权限列表数据
      permissionData: [],
      // 固定表头
      options: {
        height: '100%'
      },
      // 自定义操作列
      rowHandle: {
        align: 'center',
        custom: [
          {
            text: '编辑',
            type: 'primary',
            size: 'mini',
            emit: 'custom-edit',
            order: 1
          }
        ],
        remove: {
          size: 'mini',
          confirmText: '确定删除此权限模板吗？',
          confirm: true,
          order: 2
        }
      },
      pagination: {
        page: 1,
        pageSize: 15,
        total: 0
      },
      loading: false
    }
  },
  mounted () {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表
    async getPermissionList () {
      const { code, data } = await this.$apis.GetPermissionList({ page: this.pagination.page, per_page: this.pagination.pageSize })
      // console.log(code, msg, data)
      if (code === 0) {
        // this.permissionData = data.data.map(item => {
        //   return {
        //     ...item,
        //     status: {
        //       id: item.id,
        //       status: item.status
        //     }
        //   }
        // })
        this.permissionData = data.data
        this.pagination.total = data.total
        // console.log('this.permissionData', this.permissionData)
        this.loading = false
      }
    },
    // 删除
    async deleteRow ({ index, row }, done) {
      const { code, msg, data } = await this.$apis.DeletePermission({ id: row.id })
      console.log(code, msg, data)
      if (code === 0) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }
    },
    // 去编辑页面
    goEdit ({ index, row }) {
      // console.log(index, row)
      this.$router.push({
        path: '/marketing/loveCircle/permission/addTemplate',
        query: { id: row.id }
      })
    },
    // 去新增页面
    toAdd () {
      this.$router.push({
        path: '/marketing/loveCircle/permission/addTemplate'
      })
    },
    paginationCurrentChange (currentPage) {
      this.pagination.page = currentPage
      this.getPermissionList()
    }
  }
}
</script>

<style scoped lang="scss">
.header-box{
  display:flex;
  justify-content: space-between;
  align-items: center;
}
</style>
