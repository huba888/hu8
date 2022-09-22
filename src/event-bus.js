// 全局事件总线
class EventBus {
    constructor(){
        this.eventbus = {}
    }
    on (eventName,callBack,thisArg) {
        if(typeof eventName !== "string"){
            throw new TypeError("eventName must be string type")
        }
        if(typeof callBack !== "function"){
            throw new TypeError("callBack must be function type")
        }
        let handlers = this.eventbus[eventName]
        if(!handlers){
            handlers = []
            this.eventbus[eventName] = handlers
        }
        handlers.push({
            callBack,
            thisArg
        })
        return this
    }
    emit(eventName,...args){
        if(typeof eventName !== "string"){
            throw new TypeError("eventName must be string type")
        }
        let handlers = this.eventbus[eventName] ?? []
        handlers.forEach((handler)=>{
            handler.callBack.call(handler.thisArg,...args)
        })
        return this
    }
    off(eventName,callBack){
        if(typeof eventName !== "string"){
            throw new TypeError("eventName must be string type")
        }
        if(typeof callBack !== "function"){
            throw new TypeError("callBack must be function type")
        }
        let handlers = this.eventbus[eventName]
        if(handlers && callBack){
            let newHandlers = [...handlers]
            newHandlers.forEach((handler)=>{
                if(handler.callBack == callBack){
                    let index = handlers.indexOf(handler)
                    handlers.splice(index,1)
                }
            })
        }
        if(handlers.length === 0){
            delete this.eventbus[eventName]
        }
    }
    // 只会触发一次
    once(eventName,callBack,thisArg){
        if(typeof eventName !== "string"){
            throw new TypeError("eventName must be string type")
        }
        if(typeof callBack !== "function"){
            throw new TypeError("callBack must be function type")
        }
        const tempFn = (...args) => {
            this.off(eventName,tempFn)
            callBack.call(thisArg,...args)
        }
        return this.on(eventName,tempFn,this.args)
    }
}

module.exports = EventBus