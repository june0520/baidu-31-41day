//把用户的一些交互状态通过某种方式记录在URL中

function createState(reg,pro){
var urlQuery = encodeURI(reg.join(''))+'-'+encodeURI(pro.join(''))
var text = {
    'reg':reg,
    'pro':pro
}

history.replaceState(text,null,'?reg&pro='+urlQuery)
}


//浏览器点击返回箭头的事件处理程序
function getState(){
    var currentState = history.state
    var checkreg = decodeURI(currentState.reg)
    var checkpro = decodeURI(currentState.pro)
    return checkreg,checkpro

}