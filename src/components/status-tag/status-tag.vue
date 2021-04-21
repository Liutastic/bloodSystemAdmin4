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
  watch: {
    value (newData) {
      console.log(newData)
    }
  },
  methods: {
    async editPermissionStatus () {
      this.$emit('input')
    }
  }
}
</script>
