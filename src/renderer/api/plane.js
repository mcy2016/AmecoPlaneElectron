import {BaseUrl} from './config'
import axios from 'axios'

export function getArrFlight (d) {
  const url = BaseUrl + 'plane'
  return axios.get(url, {params: {date: d}})
}

// 获取所有航班
export function getAllFlight (d) {
  const url = BaseUrl + 'all_plane'
  return axios.get(url, {params: {date: d}})
}

// 获取历史航班数据
export function getOldFlight (d) {
  const url = BaseUrl + 'query_plane?XDEBUG_SESSION_START=11075'
  return axios.get(url, {params: {planeDate: d}})
}

export function postAttr (data) {
  const url = BaseUrl + 'update'
  return axios.post(url, data)
}

// 获取已关闭的航班
export function getCloseFlight (d = '') {
  const url = BaseUrl + 'closed/?d=' + d
  return axios.get(url)
}

export function closeFlight (id) {
  const url = BaseUrl + 'close/' + id
  return axios.get(url)
}

// 获取航前
export function getBeforFlight (d) {
  const url = BaseUrl + 'before'
  return axios.get(url, {params: {date: d}})
}

export function postNextime (data) {
  const url = BaseUrl + 'nextTime?XDEBUG_SESSION_START=16804'
  return axios.post(url, data)
}

export function postAcType (data) {
  const url = BaseUrl + 'acType'
  return axios.post(url, data)
}

export function postFltId (data) {
  const url = BaseUrl + 'fltId'
  return axios.post(url, data)
}

export function postAcId (data) {
  const url = BaseUrl + 'acId'
  return axios.post(url, data)
}

export function postAcStopArr (data) {
  const url = BaseUrl + 'acStopArr?XDEBUG_SESSION_START=12421'
  return axios.post(url, data)
}

export function postOffTime (data) {
  const url = BaseUrl + 'offTime?XDEBUG_SESSION_START=12421'
  return axios.post(url, data)
}

export function postStatus (data) {
  const url = BaseUrl + 'acStatus?XDEBUG_SESSION_START=11130'
  return axios.post(url, data)
}

// 恢复关闭
export function recover (data) {
  const url = BaseUrl + 'recover'
  return axios.post(url, data)
}

// 新增航班
export function postNewFlight (data) {
  const url = BaseUrl + 'new'
  return axios.post(url, data)
}
