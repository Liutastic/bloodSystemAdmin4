import { assign, map } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, request, serviceForMock, requestForMock, mock } from './service'
import * as tools from './tools'
import { BASEURL, WEb_BASEURL, imgBaseUrl } from './config'

import '@/api/mock'

const files = require.context('./modules', true, /\.js$/)
const generators = files.keys().map(key => files(key).default)
export default assign({
  BASEURL,
  WEb_BASEURL,
  imgBaseUrl
}, ...map(generators, generator => generator({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
})))
