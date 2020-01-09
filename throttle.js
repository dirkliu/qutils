// 函数节流，间隔多久才执行一次。
function throttle (func, wait) {
  return () => {
    if (throttle.timer) {
      return
    }
    throttle.timer = setTimeout(() => {
      func()
      throttle.timer = null
    }, wait)
  }
}
