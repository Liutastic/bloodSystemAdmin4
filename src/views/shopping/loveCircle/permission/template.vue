<template>
  <d2-container>
    <template slot="header">权限模块</template>
    <d2-crud-x
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :options="options"
      @row-remove="deleteRow"
      @custom-edit="goEdit"/>
  </d2-container>
</template>

<script>
import StatusTag from './components/StatusTag'
export default {
  name: 'template',
  components: {
    StatusTag
  },
  data () {
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
          key: 'name',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          component: {
            name: StatusTag
          }
        }
      ],
      // 权限列表数据
      data: [
        {
          id: '1',
          name: '所有用户可查看',
          status: true
        },
        {
          id: '2',
          name: '普通用户不可查看',
          status: false
        },
        {
          id: '3',
          name: '所有用户可查看',
          status: true
        },
        {
          id: '4',
          name: '所有用户可查看',
          status: true
        },
        {
          id: '5',
          name: '所有用户可查看',
          status: true
        }
      ],
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
      }
    }
  },
  mounted () {

  },
  methods: {
    // 删除
    deleteRow ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    // 去编辑页面
    goEdit ({ index, row }) {
      console.log(index, row)
    }
  }
}
</script>
