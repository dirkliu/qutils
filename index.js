import qs from './qs'
import glob2RegExp from './glob2RegExp'
import isDublicate from './isDublicate'
import date from './date'

let todayStartEnd = date.getDayStartEndFromNow(0)

console.log(todayStartEnd)
console.log(new Date(todayStartEnd.start))

export default {
    qs,
    glob2RegExp,
    isDublicate,
    date
}
