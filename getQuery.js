export default function (name, str) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = str.match(reg)
  if (r != null) return unescape(r[2])
  return null
}
