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
    //菜单按钮效果
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
    //打开+ 记一笔页面 按钮效果
	$('.main').on('click', '.header-right', function() {
		var now = $('.main');
		var next = $('.new');
		now.addClass('out');
		next.addClass('next').addClass('in');
        $('.numberinput .money').text("0");
        $('.numberinput').removeClass('in');
	});
    //关闭× 记一笔页面 按钮效果
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
    Hammer.each($('.numberinput .inputpanel span'), function(item, index, src) {
        var mc = new Hammer(item);
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
                    $('.numberinput .money').text(eval(tax).toFixed(2));
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
    });  
});;var Item = {
	name: "",
	type: "",
	time: "",
	amount: 0,
	dir: -1,
	createItem: function(type, name, amount, time) {
		var item = {};
		item.name = name;
		item.type = type;
		item.amount = amount;
		item.time = time;
		if (type=="income") //收入类型
			item.dir = 1;
		else
			item.dir = -1;
		changeTotal(item.dir*amount);
		if (item.dir == -1)
			changeTotalOutcome(amount);
		else
			changeTotalIncome(amount);
		return item;
	}
};

var createItemNode = function(obj) {
	var icon, money, dir;
	if (obj.type == "dinner")
		icon = "coffee";
	else if (obj.type == "traffic")
		icon = "plane";
	else if (obj.type == "home")
		icon = "home";
	else if (obj.type == "income")
		icon = "money";
	if (obj.dir == -1) {
		dir = "out";
		money = -1*obj.amount;
	}
	else {
		dir = "in";
		money = obj.amount;
	}
	var str = '<div class="list-item show">'+
				'<span class="list-icon '+obj.type+'" data-type="'+obj.type+'">'+
					'<i class="fa fa-'+icon+'"></i>'+
				'</span> '+
				'<span class="usage">'+obj.name+'</span>'+
				'<span class="money '+dir+'">'+money+'</span>'+
				'<span class="time right">'+obj.time+'</span>'+
			  '</div>'+
			  '<div class="btns">'+
			  	'<span class="btn edit"><i class="fa fa-pencil-square-o"></i></span>'+
			  	'<span class="btn delete right"><i class="fa fa-trash-o"></i></span>'+
			  '</div>';
	return $(str).clone();
}

var createNewRecord = function(type, name, amount) {
	var time = new Date().toLocaleDateString();
	var record = new Item.createItem(type, name, amount, time);
	
	var list = JSON.parse(window.localStorage.getItem('lists'));
	list.push(record);
	window.localStorage.setItem('lists', JSON.stringify(list));
}

var getRecords = function(index) {
	var list = JSON.parse(window.localStorage.getItem('lists'));
	if (typeof index == "undefined") 
		return list;
	return list[index];
}


var changeTotal = function(delta) {
	var fee = window.localStorage.getItem('totalFee');
	window.localStorage.setItem('totalFee', fee + delta);
}

var changeTotalIncome = function(delta) {
	var fee = window.localStorage.getItem('totalIncome');
	window.localStorage.setItem('totalIncome', fee + delta);
}

var changeTotalOutcome = function(delta) {
	var fee = window.localStorage.getItem('totalOutcome');
	window.localStorage.setItem('totalOutcome', fee + delta);
}

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