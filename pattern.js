;(function IIFE(){
    'use strict'
/*     const Type = {}

    for(let i = 0, type; type = ['String', 'Array', "Number"][i++];){
        (function(type){
            Type['is' + type] = function(obj){
                return Object.prototype.toString.call(obj) === '[object ' + type + ']'
            }
        })(type)
    }

    console.log(Type.isArray([])) */



/*     const getSingle = function(fn){
        let ret
        return () => ret || (ret = fn.apply(null, arguments))
    }

    const getScript = getSingle(() => document.createElement('script'))


    const script1 = getScript()
    const script2 = getScript()
    console.log(script1)
    console.log(script1 === script2) */


/* ------3.2.3高阶函数实现AOP------- */
/*     Function.prototype.before = function(beforefn){
        const __self = this
        return function(){
            beforefn.apply(this, arguments)
            return __self.apply(this, arguments)
        }
    }

    Function.prototype.after = function(afterfn){
        const __self = this
        return function(){
            let ret = __self.apply(this, arguments)
            afterfn.apply(this, arguments)
            return ret
        }
    }

    let func = () => {
        console.log(2)
    }


    func = func.before(() => {
        console.log(1)
    }).after(() => {
        console.log(3)
    })

    func() */



/* ------3.2.4 高阶函数的其他应用------ */
    /* ------1 currying （柯里化）------ */
/*     let cost = (function(){
        const args = []
        return function(){
            if(arguments.length === 0){
                let money = 0
                for(let i = 0; i < args.length; i++){
                    money += args[i]
                }
                return money
            }else{
                args.push.apply(args, arguments)
            }
        }
    })()

    cost(100)
    cost(200)
    cost(300)
    console.log(cost()) */


    /* ------通用的currying函数------ */
/*     const currying = function(fn){
        let args = []
        return function f(){
            if(arguments.length === 0){
                return fn.apply(this, args)
            }else{
                args.push.apply(args, arguments)
                return f
            }
        }
    }

    let cost = (function(){
        let money = 0
        return function(){
            for(var i = 0; i < arguments.length; i++){
                money += arguments[i]
            }
            return money
        }
    })()

    cost = currying(cost)

    cost(100)
    cost(200)
    cost(300)
    cost(400)
    console.log(cost()) */



    /* uncurrying */
/*     Function.prototype.uncurrying = function(){
        const self = this
        return function(){
            let obj = Array.prototype.shift.call(arguments)
            return self.apply(obj, arguments)
        }
    }

    Function.prototype.uncurrying2 = function(){
        const self = this
        return function(){
            return Function.prototype.call.apply(self, arguments)
        }
    }

    const push = Array.prototype.push.uncurrying()

    ;(function(){
        push(arguments, 4)
        console.log(arguments)
    })(1, 2, 3) */



    /* 函数节流 */
/*     const throttle = function(fn, interval){
        let __self = fn,
            timer,
            firstTime = true

        return function(){
            let __me = this,
                args = arguments

            if(firstTime){
                __self.apply(__me, args)
                return firstTime = false
            }

            if(timer){
                return false
            }

            timer = setTimeout(function() {
                clearTimeout(timer)
                timer = null
                __self.apply(__me, args)
            }, interval || 500);
        }
    }

    window.onresize = throttle((function numI(){
        let i = 0
        return function(){
            console.log(i++)
        }
    })()) */



    /* 分时函数 */
/*     const timeChunk = function(data, fn, count){
        let now = 0
        let len = data.length
        let t

        const start = function(){
            let obj = (now + count) > len ? data.slice(now, len) : data.slice(now, now + count)
            now += count
            fn(obj)
        }

        return function(){
            t = setInterval(function(){
                if(now >= len){
                    return clearInterval(t)
                }
                start()
            }, 1000)
        }
    }

    var data = []

    for(let i = 0; i <= 300; i++){
        data.push(i)
    }

    const render = timeChunk(data, function(n){
        for(let i = 0; i < n.length; i++){
            let div = document.createElement('div')
            div.innerHTML = n[i]
            document.body.appendChild(div)
            console.log(n[i])
        }
    }, 8)

    render(); */



/* ------4 单例模式------ */
/*     let CreateDiv = function(html){
        this.html = html
        this.init()
    }

    CreateDiv.prototype.init = function(){
        var div = document.createElement('div')
        div.innerHTML = this.html
        document.body.appendChild(div)
    }

    let ProxySingletonCreateDiv = (function(){
        let instance

        return function(html){
            if(!instance){
                return instance = new CreateDiv(html)
            }
            return instance
        }
    })()

    var a = new ProxySingletonCreateDiv('sven1')
    var b = new ProxySingletonCreateDiv('sven2')
    console.log(a === b) */



/*     const MyApp = {}
    MyApp.namespace = function(name){
        let parts = name.split('.')
        let current = MyApp
        for(var i in parts){
            if(!current[parts[i]]){
                current[parts[i]] = {}
            }
            current = current[parts[i]]
        }
    }

    MyApp.namespace('event')
    MyApp.namespace('dom.style')

    console.log(MyApp) */



/* ------5 策略模式------ */
/*      const tween = {
        linear: function(t, b, c, d){
            return c * t / d + b
        },
        easeIn: function(t, b, c, d){
            return c * (t /= d) * t + b
        },
        strongEaseIn: function(t, b, c, d){
            return c * (t /= d) * t * t * t * t +b
        },
        strongEaseOut: function(t, b, c, d){
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
        sineaseIn: function(t, b, c, d){
            return c * (t /= d) * t * t + b
        },
        sineaseOut: function(t, b, c, d){
            return c * ((t = t / d -1) * t * t + 1) + b
        }
    }

    const Animate = function(dom){
        this.dom = dom
        this.starTime = 0
        this.startPos = 0
        this.endPos = 0
        this.propertyName = null
        this.esing = null
        this.duration = null
    }

    Animate.prototype.start = function(propertyName, endPos, duration, easing){
        this.startTime = +new Date
        this.startPos = this.dom.getBoundingClientRect()[propertyName]
        this.propertyName = propertyName
        this.endPos = endPos
        this.duration = duration
        this.easing = tween[easing]

        const self = this
        let timeId = setInterval(function(){
            if(self.step() === false){
                clearInterval(timeId)
            }
        }, 19)
    }

    Animate.prototype.step = function(){
        let t = +new Date
        if(t >= this.startTime + this.duration){
            this.update(this.endPos)
            return false
        }
        let pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
        this.update(pos)
    }

    Animate.prototype.update = function(pos){
        this.dom.style[this.propertyName] = pos + 'px'
    }

    const animate = new Animate(document.querySelector("#myDiv"))
    animate.start('top', 300, 500, 'sineaseOut') */



    /* ------5.6.2 策略模式重构表单校验------ */
/*     let strategies = {
        isNonEmpty: function(value, errorMsg){
            if(value === ''){
                return errorMsg
            }
        },
        minLength: function(value, length, errorMsg){
            if(value.length < length){
                return errorMsg
            }
        },
        isMobile: function(value, errorMsg){
            if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
                return errorMsg
            }
        }
    }

    const Validator = function(){
        this.cache = []
    }

    Validator.prototype.add = function(dom, rules){
        let self = this
        for(let i = 0, rule; rule = rules[i++];){
            (function(rule){
                let strategyAry = rule.strategy.split(':')
                let errorMsg = rule.errorMsg
                self.cache.push(function(){
                    let strategy = strategyAry.shift()
                    strategyAry.unshift(dom.value)
                    strategyAry.push(errorMsg)
                    return strategies[strategy].apply(dom, strategyAry)
                })
            })(rule)
        }
    }

    Validator.prototype.start = function(){
        for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];){
            let errorMsg = validatorFunc()
            if(errorMsg){
                return errorMsg
            }
        }
    }

    let registerForm = document.getElementById('registerForm')
    let validataFunc = function(){
        const validator = new Validator()
        
        validator.add(registerForm.userName, [{strategy: 'isNonEmpty', errorMsg: '用户名不能为空'}, {strategy: "minLength:4", errorMsg: '用户名长度不能小于4位'}])
        validator.add(registerForm.password, [{strategy:'minLength:6', errorMsg: '密码长度不能少于6位'}])
        validator.add(registerForm.phoneNumber, [{strategy:'isMobile', errorMsg: '手机号码格式不正确'}])
        let errorMsg = validator.start()
        return errorMsg
    }

    registerForm.onsubmit = function(){
        let errorMsg = validataFunc()
         if(errorMsg){
            console.log(errorMsg)
            return false
        }
    } */



/* ------6 代理模式------ */
/*     const myImage = (function(){
        let imgNode = document.createElement('img')
        document.body.appendChild(imgNode)

        return {
            setSrc: function(src){
                imgNode.src = src
            }
        }
    })()

    const proxyImage = (function(){
        let img = new Image()
        img.onload = function(){
            myImage.setSrc(this.src)
        }

        return {
            setSrc: function(src){
                myImage.setSrc('./loading.gif')
                img.src = src
            }
        }
    })()

    proxyImage.setSrc('http://tse3.mm.bing.net/th?id=OIP.qoNhDnGQOwJxINv6-XpabwEsDh&w=265&h=196&c=7&qlt=90&o=4&pid=1.7') */




/* ------7 迭代器模式------ */
    /* 内部迭代器 */
/*     const each = function(ary, callback){
        for(let i = 0, l = ary.length; i < l; i++){
            callback.call(ary[i], i, ary[i])
        }
    }

    each([1, 2, 3], function(i, n){
        console.log([i, n])
    }) */



    /* 外部迭代器 */
/*     const iterator = function(obj){
        let current = 0

        const next = function(){
            current += 1
        }

        const isDone = function(){
            return current >= obj.length
        }

        const getItem = function(){
            return obj[current]
        }

        return {
            next: next,
            isDone: isDone,
            getItem: getItem
        }
    }

    const compare = function(iterator1, iterator2){
        while(!iterator1.isDone() || !iterator2.isDone()){
            if(iterator1.getItem() !== iterator2.getItem()){
               return console.log('不相等') 
            }
            iterator1.next()
            iterator2.next()
        }
        console.log('相等')
    }

    let iterator1 = iterator([1, 2, 3])
    let iterator2 = iterator([1, 2])

    compare(iterator1, iterator2) */



/* ------8 发布——订阅模式（观察者模式）------ */
/*     const Event = (function(){
        let global = this,
            Event,
            _default = 'default'

        Event = (function(){
            let _listen,
                _trigger,
                _remove,
                _slice = Array.prototype.slice,
                _shift = Array.prototype.shift,
                _unshift = Array.prototype.unshift,
                namespaceCache = {},
                _create,
                find,
                each = function(ary, fn){
                    let ret
                    for(let i = 0, l = ary.length; i < l; i++){
                        let n = ary[i]
                        ret = fn.call(n, i, n)
                    }
                    return ret
                }

            _listen = function(key, fn, cache){
                if(!cache[key]){
                    cache[key] = []
                }
                cache[key].push(fn)
            }

            _remove = function(key, cache, fn){
                if(cache[key]){
                    if(fn){
                        for(let l = cache[key].length - 1; l >= 0; l--){
                            if(cache[key][l] === fn){
                                cache[key].splice(l, 1)
                            }
                        }
                    }else{
                        cache[key] = []
                    }
                }
            }

            _trigger = function(){
                let cache = _shift.call(arguments),
                    key = _shift.call(arguments),
                    args = arguments,
                    _self = this,
                    ret,
                    stack = cache[key]
                
                if(!stack || !stack.length){
                    return
                }

                return each(stack, function(){
                    return this.apply(_self, args)
                })
            }

            _create = function(namespace = _default){
                let cache = {},
                    offlineStack = [],
                    ret = {
                        listen: function(key, fn, last){
                            _listen(key, fn, cache)

                            if(offlineStack.length){
                                last === 'last' ? offlineStack.pop()() : each(offlineStack, function(){
                                    this()
                                })
                            }
                        },
                        one: function(key, fn, last){
                            _remove(key, cache)
                            this.listen(key, fn, last)
                        },
                        remove: function(key, fn){
                            _remove(key, cache, fn)
                        },
                        trigger: function(){
                            let fn,
                                args,
                                _self = this,
                                key = arguments[0]

                            _unshift.call(arguments, cache)
                            args = arguments
                            fn = function(){
                                return _trigger.apply(_self, args)
                            }
                            
                            if(!cache[key] || (cache[key] && !cache[key].length)){
                                return offlineStack.push(fn)
                            }
                            return fn()
                        }
                    }

                    return namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret
            }

            return {
                create: _create,
                one: function(key, fn, last){
                    let event = this.create()
                    event.one(key, fn, last)
                },
                remove: function(key, fn){
                    let event = this.create()
                    event.remove(key, fn)
                },
                listen: function(key, fn, last){
                    let event = this.create()
                    event.listen(key, fn, last)
                },
                trigger: function(){
                    let event = this.create()
                    event.trigger.apply(this, arguments)
                }
            }
        })()

        return Event
    })()

    // Event.trigger('click', 1)

    // Event.listen('click', function(a){
    //     console.log(a)
    // })

    let logA = function(a){
        console.log(a)
    }

    Event.create('space1').listen('click', logA)

    Event.create('space1').remove('click', logA)

    Event.create('space1').trigger('click', 1)

    Event.create('space1').listen('click', logA)
    Event.create('space1').listen('click', logA) */




/* ------9 命令模式------ */
/*     const setCommand = function(button, command){
        button.addEventListener('click', command.execute.bind(button), false)
    }

    const MenuBar = {
        refresh: function(){
            console.log('刷新菜单界面')
        }
    }

    const RefreshMenuBarCommand = function(receiver){
        return {
            execute: function(){
                receiver.refresh()
            }
        }
    }

    let refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
    let button1 = document.querySelector('#button1')
    setCommand(button1, refreshMenuBarCommand) */


    /* ------9.4 撤销命令------ */
    const tween = {
        linear: function(t, b, c, d){
            return c * t / d + b
        },
        easeIn: function(t, b, c, d){
            return c * (t /= d) * t + b
        },
        strongEaseIn: function(t, b, c, d){
            return c * (t /= d) * t * t * t * t +b
        },
        strongEaseOut: function(t, b, c, d){
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
        sineaseIn: function(t, b, c, d){
            return c * (t /= d) * t * t + b
        },
        sineaseOut: function(t, b, c, d){
            return c * ((t = t / d -1) * t * t + 1) + b
        }
    }

    const Animate = function(dom){
        this.dom = dom
        this.starTime = 0
        this.startPos = 0
        this.endPos = 0
        this.propertyName = null
        this.esing = null
        this.duration = null
    }

    Animate.prototype.start = function(propertyName, endPos, duration, easing){
        this.startTime = +new Date
        this.startPos = this.dom.getBoundingClientRect()[propertyName]
        this.propertyName = propertyName
        this.endPos = endPos
        this.duration = duration
        this.easing = tween[easing]

        const self = this
        let timeId = setInterval(function(){
            if(self.step() === false){
                clearInterval(timeId)
            }
        }, 19)
    }
  m , m#ball')
    let pos = document.querySelector('#pos')
    let moveBtn = document.querySelector('#moveBtn')

    const MoveCommand = function(receiver, pos){
        this.receiver = receiver
        this.pos = pos
    }

    MoveCommand.prototype.execute = function(){
        this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
    }

    let moveCommand

    moveBtn.onclick = function(){
        let animate = new Animate(ball)
        moveCommand = new MoveCommand(animate, pos.value)
        moveCommand.execute()
    } 




























})()