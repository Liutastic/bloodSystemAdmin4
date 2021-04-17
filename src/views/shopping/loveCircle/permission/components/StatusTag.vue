<template>
  <div style="cursor: pointer">
    <el-tag :type="type" @click.native="handleClick">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
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
    handleClick () {
      console.log(this.value)
      this.$emit('input', !this.value)
    }
  }
}
</script>
