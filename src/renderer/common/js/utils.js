export function handleDate (time, separator, flag = true) {
  // eslint-disable-next-line
  let DateTime = time ? new Date(time) : new Date()
  // 格式化
  var year = DateTime.getFullYear()
  var month = p(DateTime.getMonth() + 1)
  var date = p(DateTime.getDate())
  // eslint-disable-next-line
  var hours = p(DateTime.getHours())
  // eslint-disable-next-line
  var minutes = p(DateTime.getMinutes())
  // eslint-disable-next-line
  var seconds = p(DateTime.getSeconds())
  var resultDate = ''
  if (!flag) {
    if (!time) {
      resultDate = ''
    } else {
      resultDate = [hours, minutes].join(separator)
    }
  } else {
    resultDate = [year, month, date].join(separator)
  }
  return resultDate
}

export function convertHMS (ms) {
  if (!ms) {
    return ''
  } else {
    let HMS = new Date(ms)// 毫秒数
    HMS = handleDate(HMS, ':', false)
    return HMS
  }
}

// 补足日期时间的两位显示
function p (n) {
  return n < 10 ? '0' + n : n
}
