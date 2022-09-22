function carry(fn,...args) {
    let temp =  [...args]
    function next (...args2) {
        temp = [...temp,...args2]
        if(temp.length < fn.length){
            return next
        }else {
            fn.apply(fn,temp)
        }
    }
    return next
}

module.exports = carry

