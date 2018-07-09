export default function refresh(){
  window.onload = function(){
    window.addEventListener('touchstart', touchstart, false);
    window.addEventListener('touchmove', touchMove, false);
    }
    
    var _start = 0; 
    var _end = 0;
    function touchstart(event) {
    var touch = event.targetTouches[0];
    _start = touch.pageY; 
    }
    function touchMove(event){ 
    var touch = event.targetTouches[0]; 
    _end = ( touch.pageY - _start); 
    //下滑才执行操作 
    if(_end > 200){     //200即手机下滑屏幕的距离，超过200则执行刷新动作
    location.reload();
    // console.log(1111)
    } 
    }
}