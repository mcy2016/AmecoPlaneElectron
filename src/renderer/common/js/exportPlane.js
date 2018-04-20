import {handleDate, convertHMS} from './utils'

export default class ExportHandlePlane {
  constructor (flight) {
    this.id = flight.id
    this.flt_id = flight.flt_id
    this.ac_id = flight.ac_id
    if (flight.std.ac_status === 3) {
      this.ac_status = '航前'
    } else if (flight.std.ac_status === 2) {
      this.ac_status = '过站'
    } else if (flight.std.ac_status === 1) {
      this.ac_status = '航后'
    } else {
      this.ac_status = flight.ac_status === 3 ? '航前' : flight.ac_status === 2 ? '过站' : flight.ac_status === 1 ? '航后' : ''
    }
    this.ac_stop_arr = flight.ac_stop_arr
    this.ac_type = flight.ac_type.ac_type
    this.eta = handleDate(flight.eta, ':', false)
    this.etd = flight.etd
    this.sta = flight.sta
    this.std = flight.std.std
    this.on_time = handleDate(flight.on_time, ':', false)
    this.off_time = handleDate(flight.off_time, ':', false)
    this.order = flight.attr.order ? flight.attr.order : 0
    this.dep_apt = flight.dep_apt.dep_apt_zh ? flight.dep_apt.dep_apt_zh : flight.dep_apt
    this.flight_time = flight.dep_apt.flight_time ? flight.dep_apt.flight_time : 0
    this.flt_date = flight.flt_date
    if (flight.ac_status === 3) {
      this.cancel_flag = '航前'
    } else if (flight.std.ac_status === 2) {
      this.cancel_flag = '过站'
    } else if (flight.std.ac_status === 1) {
      this.cancel_flag = '航后'
    } else {
      this.cancel_flag = flight.ac_status === 3 ? '航前' : flight.ac_status === 1 ? '航后' : flight.cancel_flag
    }
    this.receive_id1 = flight.attr.receive_id1
    this.release_id = flight.attr.release_id
    this.receiveUser1 = flight.attr.receive_id1 ? flight.attr.receive_id1.username : ''

    this.receiveUser2 = flight.attr.receive_id2 ? flight.attr.receive_id2.username : ''
    this.sendUser1 = flight.attr.send_id1 ? flight.attr.send_id1.username : ''
    this.sendUser2 = flight.attr.send_id2 ? flight.attr.send_id2.username : ''

    if (!flight.attr.receive_id1) {
      if (!flight.attr.receive_id2) {
        this.receive = ''
      } else {
        this.receive = flight.attr.receive_id2.username
      }
    } else {
      this.receive = flight.attr.receive_id1.username
      if (flight.attr.receive_id2) {
        this.receive = flight.attr.receive_id2.username + '||' + flight.attr.receive_id1.username
      }
    }
    this.send = ''
    if (!flight.attr.send_id1) {
      if (!flight.attr.send_id2) {
        this.send = ''
      } else {
        this.send = flight.attr.send_id2.username
      }
    } else {
      if (!flight.attr.send_id2) {
        this.send = flight.attr.send_id1.username
      } else {
        this.send = flight.attr.send_id1.username + '||' + flight.attr.send_id2.username
      }
    }
    this.round = ''
    if (!flight.attr.round_id) {
      this.round = ''
    } else {
      this.round = flight.attr.round_id.username
    }
    this.release = ''
    if (!flight.attr.release_id) {
      this.release = ''
    } else {
      this.release = flight.attr.release_id.username
    }
    this.reminder_time = flight.attr.reminder_time
    this.remark = flight.attr.remark
    this.remarkArr = flight.attr.remark ? flight.attr.remark.split(',') : []
    this.off_time_cp = flight.off_time
    if (flight.std.next_time === '航前' || flight.std.next_time === '航后') {
      this.nextTime = flight.std.next_time
    } else if (flight.std.ac_status === 1) {
      // flight.std.next_time
      this.nextTime = '航后'
    } else if (flight.std.ac_status === 3) {
      this.nextTime = '航前'
    } else {
      this.nextTime = flight.std.next_time ? handleDate(flight.std.next_time, ':', false) : handleDate(flight.std.std, ':', false) // handleDate(flight.std.std, ':', false)
    }
    // this.nextTime = handleDate(flight.std.std, ':', false)
    // 计算预达时间
    if (flight.off_time) {
      // 飞机起飞，用起飞时间（off_time_cp）加上飞行时间(转化成毫秒)==预达时间（毫秒数）
      this.predict_time = convertHMS(new Date(this.off_time_cp).getTime() + computedMs(this.flight_time))
    } else {
      this.predict_time = null
    }
    if (this.predict_time) {
      // 剩余时间(毫秒数)==预达时间-现在时间
      this.surplus_time = this.predict_time - currentTime()
    } else {
      this.surplus_time = null
    }
    // 除冰信息
    this.deicing_index = flight.attr.deicing_index
    this.deicing_sta = flight.attr.deicing_sta
    this.deicing_end = flight.attr.deicing_end
  }
}

// 把分钟数转化成毫秒数
function computedMs (time) {
  return time * 60 * 1000
}

// 获取现在时间
function currentTime () {
  return new Date().getTime()
}
