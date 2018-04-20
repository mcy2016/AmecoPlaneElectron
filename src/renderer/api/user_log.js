import {BaseUrl} from './config'
import axios from 'axios'

export function getDutyLog (d) {
  const url = BaseUrl + 'work_hours?XDEBUG_SESSION_START=12462'
  return axios.get(url, {params: {date: d}})
}
