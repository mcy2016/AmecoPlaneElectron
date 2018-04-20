import {BaseUrl} from './config'
import axios from 'axios'

export function getAllRoute (page, listRows) {
  const url = BaseUrl + `route_all?page=${page}&listRows=${listRows}`
  return axios.get(url)
}
