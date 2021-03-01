export default function (date) {
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
