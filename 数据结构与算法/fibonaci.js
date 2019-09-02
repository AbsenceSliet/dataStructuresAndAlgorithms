// 实现斐波那契数列


//测试使用时长
function testTime(n,func){
    let startTime = new Date().getTime(),endTime =''
    console.log('%c ' + 'test time start ','background: pink; color: #333333;padding:4px 2px;')
    console.log('startTime',startTime )
    func(n)
    endTime = new Date().getTime()
    console.log('endTime---',endTime,'ToastTime---',endTime - startTime )
    console.log('%c ' + 'test time end ','background: pink; color: #d9d9d9;padding:4px 2px;')
}

`使用递归方法实现`

function finbonaci1 (n){
    return (n===0 || n===1) ? n : finbonaci1(n-1) + finbonaci1(n-2)
}

// ` 数据缓存 递归方法`
// let finbonaci2 = (function(){
//     let memory = []
//     return function(n){
//         if(memory[n]!==undefined){
//             return memory[n]
//         }
//         return  memory[n] = (n===1|| n===0) ? n : finbonaci2(n-1) + finbonaci2(n-2)
//     }
// })()


` 使用递推方法（动态规划）`
function finbonaci3(n){
    let current = 0,next =1;
    for(let i=0;i<n;i++){
        [current,next] = [next,next+current]
    }
    return current
}
// 使用while
function finbonaci4(n){
    let current = 0,next =1;
    while(n>0){
        n--;
        [current,next] = [next,next+current]
    }
    return current
}


`尾部调用`
function finbonaci5(n,current = 0, next= 1) {
    if(n ===0 ) return 0;
    if(n ==1 ) return next
    return finbonaci5(n-1,next,current+next)
}


testTime(8,finbonaci1)
// testTime(8,finbonaci2) ddddd
testTime(8,finbonaci3)
testTime(8,finbonaci4)
testTime(8,finbonaci5)