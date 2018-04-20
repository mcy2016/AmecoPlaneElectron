import {BaseUrl} from './config'
import axios from 'axios'

export function getDutyUsers () {
  const url = BaseUrl + 'user'
  return axios.get(url)
}

export function getAllUsers () {
  const url = BaseUrl + 'all_user'
  return axios.get(url)
}

export function userCard (data) {
  let url = BaseUrl + 'handCard'
  return axios.post(url, data)
}

export function userCardMov (data) {
  let url = BaseUrl + 'delete'
  return axios.post(url, data)
}

export function nextDuty () {
  let url = BaseUrl + 'next'
  return axios.post(url)
}

export function userUpdate (data) {
  let url = BaseUrl + 'updateUser?XDEBUG_SESSION_START=14823'
  return axios.post(url, data)
}

export function dutyUserUpdate (data) {
  let url = BaseUrl + 'updateDuty'
  return axios.post(url, data)
}

export function login (data) {
  let url = BaseUrl + 'login?XDEBUG_SESSION_START=17106'
  return axios.post(url, data)
}
