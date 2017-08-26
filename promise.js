/*var p = new Promise(function(resolve, reject){


	setTimeout(function(){
		console.log("finish");
		resolve("i am penguin");
	}, 2000);
});*/



/*console.log('golb1');

setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

process.nextTick(function() {
    console.log('glob1_nextTick');
})
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

process.nextTick(function() {
    console.log('glob2_nextTick');
})
new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})*/

/* ----Node.js---- */
/*var http = require('http');
http.createServer(function (request, response) { 
    response.writeHead(200, {'Content-Type': 'text/plain'}); 
    response.end('Hello World\n'); 
}).listen(8887);
console.log('Server running at http://127.0.0.1:8887/');*/


/*function runAsync(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log("执行完成");
			// resolve("成功");
			reject("失败");
		}, 1000);
	});

	return p;
}

runAsync().then(
	function(data){
		console.log(data);
		return "成功数据";
	}, 
	function(reason, data){
		console.log(reason);
		return "失败数据"
	}
).then(
	function(data){
		console.log(data);
		console.log("resolve");
	},
	function(reason, data){
		console.log(reason);
		console.log("reject");
	}
);*/