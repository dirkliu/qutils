// 一整天的毫秒数
const DAY_MILLS = 1000 * 3600 * 24

export default {
  // 获取一整天的起止时间戳
  getDayStartEndFromNow (day) {
    // 时区偏移
    let date = new Date()
    let TIME_ZONE_OFFSET = date.getTimezoneOffset() * 60 * 1000
    let start = (Math.floor(date.getTime() / DAY_MILLS) + day) * DAY_MILLS + TIME_ZONE_OFFSET
    return {
      start,
      end: start + DAY_MILLS
    }
  },

  stringify (date) {
    if (date.prototype.toLocaleDateString) {
      return date.toLocaleDateString('zh-CN').replace(/\//g, '-').replace(/\b\d\b/g, '0$&')
    } else {
      function getDateString(date) {
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let dates = date.getDate()
          return year + '-' + (month > 9 ? month : '0' + month) + '-' + (dates > 9 ? dates : '0' + dates)
      }

      function getTimeString(date) {
          let hours = date.getHours()
          let minutes = date.getMinutes()
          let seconds = date.getSeconds()
          return (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds)
      }

      var today = getDateString(new Date())
      var now = getTimeString(new Date())
      return today + ' ' + now
    }
  }
}