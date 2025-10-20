// const blob = new Blob([rawDatas.join('\n')], {
//   type: 'text/csv;charset=utf-8'
// })

export const downloadFileFromBlob = (blob, filename) => {
  const objectURL = URL.createObjectURL(blob)
  // 创建一个 a 标签Tag
  const aTag = document.createElement('a')
  // 设置文件的下载地址
  aTag.href = objectURL
  // 设置保存后的文件名称
  aTag.download = filename
  // 给 a 标签添加点击事件
  aTag.click()
  URL.revokeObjectURL(objectURL)
}