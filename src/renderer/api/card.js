import {BaseUrl} from './config'
import axios from 'axios'

export function card (cardId) {
  let url = BaseUrl + 'card?XDEBUG_SESSION_START=10423'
  return axios.post(url, cardId)
}
