import mockUtil from '@/api/mock/base'

const options = {
  name: 'icon',
  idGenerator: 0
}
const list = [
  {
    name: '张三',
    province: 'gz',
    iconSelect: 'check',
    iconSelect2: 'check'
  },
  {
    name: '李四',
    province: 'sh',
    iconSelect: 'check',
    iconSelect2: 'check'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
