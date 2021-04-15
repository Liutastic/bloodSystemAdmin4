import { assign, map } from 'lodash'
import faker from 'faker/locale/zh_CN'
console.log(33333);
import { service, request, serviceForMock, requestForMock, mock } from './service'
import * as tools from './tools'

import '@/api/mock' // mock数据，实际开发要去掉


const files = require.context('./modules', true, /\.api\.js$/)
const generators = files.keys().map(key => files(key).default)
export default assign({}, ...map(generators, generator => generator({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
})))
