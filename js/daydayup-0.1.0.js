/*! Daydayup - v0.1 */var scrollFunc = function(e) {
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
		next.addClass('in')
			.removeClass('next')
			.addClass('current')
			.removeClass('in');
		now.removeClass('current')
			.removeClass('out')
			.addClass('next');
	});
	$('.new').on('click', '.header-left', function() {
		var now = $('.new');
		var next = $('.main');
		next.removeClass('out');
		now.removeClass('in');
		next.addClass('in');
		now.addClass('out');
	});
});var Item = {
	name: "",
	type: "",
	time: "",
	amount: 0
	// setName: function(value) {
	// 	name = value;
	// },
	// setTime: function(value) {
	// 	time = value;
	// },
	// setAmount: function(value) {
	// 	amount = value;
	// },
	// getName: function() {
	// 	return name;
	// },
	// getTime: function() {
	// 	return time;
	// },
	// getAmount: function() {
	// 	return amount;
	// }
};

$(function() {
	var storage = window.localStorage;
	if (!storage.getItem('totalFee'))	//总金额
		storage.setItem('totalFee', 0);
	if (!storage.getItem('totalIncome'))	//总收入
		storage.setItem('totalIncome', 0);
	if (!storage.getItem('totalOutcome'))	//总支出
		storage.setItem('totalOutcome', 0);
	if (!storage.getItem('lists')) {
		var list = new Array();
		storage.setItem('lists', JSON.stringify(list));
	}
});