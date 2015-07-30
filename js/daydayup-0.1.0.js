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
    //菜单按钮效果
	$('.main').on('click', '.header-right', function() {
		var now = $('.main');
		var next = $('.new');
		now.addClass('out');
		next.addClass('next').addClass('in');
	});
    //关闭 记一笔页面 按钮效果
	$('.new').on('click', '.header-left', function() {
		var now = $('.new');
		var next = $('.main');
		next.removeClass('out');
        now.addClass('next').removeClass('in');
	});
    //给记账本每一项添加滑动效果
    //var items = document.getElementsByClassName('list-item');
    var items = $('.main .list-item');
    for (var i = 0; i < items.length; i++) {
        var mc = new Hammer(items[i]);
        mc.on("panleft panright tap", function(ev) {
            var item = $(ev.target);
            if (ev.type == "panleft") {
                item.removeClass('show');
                item.addClass('hide');
            }
            else {
                item.removeClass('hide');
                item.addClass('show');
            }
        });
    } 
    //计算器输入框效果
    $('.numberinput').on('touchstart', 'span', function() {
        $(this).addClass('focus');
    });
    $('.numberinput').on('touchend', 'span', function() {
        $(this).removeClass('focus');
    });
    // var sp = new Hammer($('.numberinput .usage .text'));
    // sp.on('tap', function(ev) {
    //     $(this).next().val($(this).text());
    //     $(this).next().removeClass('hidden');
    // });
    $('.numberinput .usage .usagename').blur(function() {
        $(this).prev().text($(this).val());
        $(this).addClass('hidden');
    });
    $('.new').on('click', '.numberinput .usage .text', function() {
        $(this).next().val($(this).text());
        $(this).next().removeClass('hidden');
        $(this).next().focus();
    });
    items = $('.numberinput .inputpanel span');
    for (var i = 0; i < items.length; i++) {
        var mc = new Hammer(items[i]);
        mc.on("tap", function(ev) {
            var item = $(ev.target);
            if (item.hasClass('num')) {
                var number = item.text();
                var tax = number;
                if ($('.numberinput .money').text() != "0")
                    tax = $('.numberinput .money').text() + number;
                $('.numberinput .money').text(tax);
            }
            else if (item.hasClass('opt')) {
                var opt = item.text();
                if (opt == "C") {
                    $('.numberinput .money').text(0);
                }
                else if (opt == ".") {
                    var tax = $('.numberinput .money').text();
                    if (tax.indexOf(opt) == -1)
                        tax += opt;
                    $('.numberinput .money').text(tax);
                }
                else if (opt.length == 0) { //退格
                    var tax = $('.numberinput .money').text();
                    tax = tax.substr(0, tax.length-1);
                    if (tax == "")
                        tax = "0";
                    $('.numberinput .money').text(tax);
                }
                else if (opt == '=') {
                    var tax = $('.numberinput .money').text();
                    if (tax[tax.length-1] == "+" || tax[tax.length-1] == "-")
                        tax = tax.substr(0, tax.length-1);
                    $('.numberinput .money').text(eval(tax));
                }
                else {  //+ 或 -
                    var tax = $('.numberinput .money').text();
                    if (tax[tax.length-1]<"0" || tax[tax.length-1]>"9")
                        tax = tax.substr(0, tax.length-1);
                    tax = tax + opt;
                    $('.numberinput .money').text(tax);
                }
            }
            else { //退格
                var tax = $('.numberinput .money').text();
                tax = tax.substr(0, tax.length-1);
                if (tax == "")
                    tax = "0";
                $('.numberinput .money').text(tax);
            }
        });
    }  
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