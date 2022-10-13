function throttle(fn, interval = 200, leading = true, trailing = false, callback) {
    let startTime = 0
    let timer = null
  
    function _throttle(...args) {
      return new Promise((resolve, reject) => {
        let nowTime = new Date().getTime()
        if (!startTime && !leading) startTime = nowTime
        let remianTime = interval - (nowTime - startTime)
  
        if (remianTime <= 0) {
          if (timer) clearTimeout(timer)
          const result = fn.apply(this, args)
          if (callback) callback(result)
          resolve(result)
          startTime = nowTime
          return
        }
  
        if (trailing && !timer) {
          timer = setTimeout(() => {
            const result = fn.apply(this, args)
            if (callback) callback(result)
            resolve(result)
            startTime = leading ? new Date().getTime() : 0
            timer = null
          }, remianTime)
        }
      })
    }
  
    _throttle.cancel = function () {
      if (timer) clearTimeout(timer)
      startTime = 0
      timer = null
    }
  
    return _throttle
  }
  

module.exports  = {
    throttle
}