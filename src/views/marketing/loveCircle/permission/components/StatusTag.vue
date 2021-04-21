<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="editPermissionStatus">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    type () {
      return this.status ? 'success' : 'danger'
    },
    text () {
      return this.status ? '启用' : '禁用'
    }
  },
  data () {
    return {
      status: this.value.status
    }
  },
  methods: {
    async editPermissionStatus () {
      const { code, msg } = await this.$apis.EditPermissionStatus({ id: this.value.id, status: this.value.status === 1 ? 0 : 1 })
      if (code === 0) {
        this.status = !this.status
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>
