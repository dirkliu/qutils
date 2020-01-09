// 函数防抖动，wait ms后只执行一次
function debounce (func, wait) => {
  return () => {
    clearTimeout(debounce.timer)
    debounce.timer = setTimeout(func, wait)
  }
}