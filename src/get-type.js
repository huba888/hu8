function getType(value){
    let str = Object.prototype.toString.call(value)
    let reg = /(?<=\s)\w+(?=])/
    return str.match(reg)[0].toLowerCase()
}   

module.exports = getType