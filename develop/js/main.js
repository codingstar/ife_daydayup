/**
 * 简易的鼠标滚轮方向判断方法
 * -1：向上  1：向下
 */
 
var scrollFunc = function(e) {
    var direct=0;
    e=e || window.event;
    //console.log(e.deltaY);
    if(e.wheelDelta){//IE/Opera/Chrome
        return -e.wheelDelta/120; 
    }else if(e.detail){//Firefox
        return e.detail/3;
    }
    return 0;
}

$(function() {
	$('.main').on('click', '.header-left', function() {
		if ($('.sidebar').hasClass('show')==false) {
			$('.sidebar').removeClass('hide');
			$('.sidebar').addClass('show');
		}
		else {
			$('.sidebar').removeClass('show');
			$('.sidebar').addClass('hide');
		}
	});
	$('.main').on('click', '.header-right', function() {
		var now = $('.main');
		var next = $('.new');
		now.addClass('out');
		next.addClass('next').addClass('in');
		// next.removeClass('next');
		// next.addClass('current');
		// now.removeClass('current');
		// now.addClass('next');
  //       next.removeClass('in');
		// now.removeClass('out');
	});
	$('.new').on('click', '.header-left', function() {
		var now = $('.new');
		var next = $('.main');
		next.removeClass('out');
        now.addClass('next').removeClass('in');
		
		// next.addClass('in');
		// now.addClass('out');
  //       next.removeClass('next')
  //           .addClass('current')
  //           .removeClass('in');
  //       now.removeClass('current')
  //           .addClass('next')
  //           .removeClass('out');
	});
})