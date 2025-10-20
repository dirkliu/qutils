/**
**在网页端保存json至文件中，并上传至服务器 
**/
export const postJSON2File = (json, filename) => {
  var blob = new Blob([JSON.stringify(json)], { type: 'text/plain;charset=utf-8' }) // 把数据转化成blob对象
  const file = new File([blob], 'gwconfig.json', { lastModified: Date.now() })
  const formData = new FormData()
  formData.append('file', file)
  // 使用ajax上传文件
  /**ajax({
    method: 'post',
    url: 'uploadurl',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    params: {
     //
    },
    data: formData
  })**/
}