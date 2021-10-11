// 客户端类型判断
var u = navigator.userAgent
// 是否android
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 
// 是否ios
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
// 是否微信
var isWx = ((u.match(/MicroMessenger/i)) && (u.match(/MicroMessenger/i).toString().toLowerCase() == 'micromessenger'))

export default {
  isAndroid,
  isiOS,
  isWx
}
