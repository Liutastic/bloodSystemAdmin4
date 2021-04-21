// 状态字典
export const DICT_STATIS_TYPE = [
  { value: 1, label: '直接下级' },
  { value: 2, label: '整个团队' }
]

// 是否字典
export const DICT_YES_NO = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
]

// 状态字典
export const DICT_STATUS = [
  { value: 1, label: '启用' },
  { value: 0, label: '禁用' }
]

const ShortCUTS = [
  {
    text: '今天一晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 1)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天两晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 2)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天三晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天四晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 4)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天一晚',
    onClick (picker) {
      const start = toNooning()
      const end = toNooning()
      addDays(start, 1)
      addDays(end, 2)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天两晚',
    onClick (picker) {
      const start = new Date()
      const end = new Date()
      addDays(start, 1)
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天三晚',
    onClick (picker) {
      const start = new Date()
      const end = new Date()
      addDays(start, 1)
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }
]
