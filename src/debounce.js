function debounce (fn,delay,immediate = false) {
    let timer = null   
    let invock = false
    function _debounce(...args){
        if(immediate && !invock){
            fn.apply(this,args)
            invock = true
        }
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args)
            invock = false
            timer = null
        },delay)
    }
    return _debounce
}