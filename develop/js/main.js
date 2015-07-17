/**
 * 简易的鼠标滚轮方向判断方法
 * 1：向上  -1：向下
 */
 
var scrollFunc = function(e) {
    var direct=0;
    e=e || window.event;
    console.log(e.deltaY);
    if(e.wheelDelta){//IE/Opera/Chrome
        return e.wheelDelta/120; 
    }else if(e.detail){//Firefox
        return -e.detail/3;
    }
    return 0;
}
