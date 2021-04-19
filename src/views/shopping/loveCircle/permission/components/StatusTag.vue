<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="editPermissionStatus">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    type () {
      return this.value ? 'success' : 'danger'
    },
    text () {
      return this.value ? '启用' : '禁用'
    }
  },
  methods: {
    async editPermissionStatus () {
      console.log(this.value)
      // const { code, msg, data } = await this.$apis.EditPermissionStatus(data)
      // console.log(code, msg, data)
      // if (code === 0) {
      // }
      this.$emit('input', !this.value)
    }
  }
}
</script>
