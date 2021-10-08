const qs = {
  parse (str) {
    let params ={}
    str.replace('?', '').split('&').forEach(item => {
      let keyValues = item.split('=')
      params[keyValues[0]] = keyValues[1]
    })
    return params
  },

  getQuery (name, str) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let r = str.match(reg)
    if (r != null) return unescape(r[2])
    return null
  },

  stringify (params) {
    return JSON.stringify(params).replace(/[{}"']/g, '').replace(/:/g, '=').replace(/\,/g, '&');
  }
}

export {
  qs
}
