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

//记账本每一项的动态效果
var bindShowBtns = function() {
    //给记账本每一项添加滑动效果
    Hammer.each($('.main .list-item'), function(item, index, src) {
        var mc = new Hammer(item);
        //var mc = new Hammer(items[i]);
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
    });
    //修改按钮事件
    Hammer.each($('.main .content .btns .edit'), function(item, index, src) {
        var mit = new Hammer(item);
        mit.on('tap', function(ev) {
            var obj = $($(ev.target).parents('.btns')[0]).prev();
            var id = $(obj).attr('id');
            var record = getRecords(id);
            var now = $('.main');
            var next = $('.new');
            now.addClass('out');
            next.addClass('next').addClass('in');
            next.data('action', 'edit');
            next.data('id', id);
            var icon = $(obj).find('.list-icon').clone();
            $('.numberinput .usage .list-icon').remove();
            $('.numberinput .usage:eq(0)').prepend(icon);
            $('.numberinput .money').text(record.amount);
            $('.numberinput .usage .text').text(record.name);
            $('.numberinput').addClass('in');
        });
    });
    //删除按钮事件
    Hammer.each($('.main .content .btns .delete'), function(item, index, src) {
        var mit = new Hammer(item);
        mit.on('tap', function(ev) {
            var obj = $($(ev.target).parents('.btns')[0]).prev();
            var id = $(obj).attr('id');
            var con = confirm("确认删除吗？");
            if (con == false)
                return;
            var result = deleteRecord(id);
            if (result == true)
                alert("删除成功！");
            else
                alert("删除失败！");
            loadAccount();
        });
    });
}

var showView = function(selector) {
    var obj = $(selector);
    $('.view').removeClass('current');
    obj.addClass('current in');
    obj.removeClass('in');
    $('.sidebar').removeClass('show').addClass('hide');
    $('header').addClass('show').removeClass('hide');
    $('.sidebar').removeClass('hide');
}

$(function() {
    //菜单按钮效果
	//$('#wrapper').on('click', '.menu', function() {
    Hammer($('#wrapper .menu')[0]).on('tap', function(ev) {
		if ($('.sidebar').hasClass('show')==false) {
			$('.sidebar').removeClass('hide').addClass('show');
            $('header').removeClass('show').addClass('hide');
		}
		else {
            $('.sidebar').removeClass('show').addClass('hide');
            $('header').addClass('show').removeClass('hide');
            
            $('.sidebar').removeClass('hide');
		}
	});
    //打开+ 记一笔页面 按钮效果
	$('#wrapper').on('click', '.create', function() {
		var now = $('.main');
		var next = $('.new');
		now.addClass('out');
		next.addClass('next').addClass('in');
        $('#wrapper header:eq(0)').addClass('hidden');
        next.data('action', 'new');
        next.data('id', '');
        $('.numberinput .money').text("0");
        $('.numberinput').addClass('in');
	});
    //关闭× 记一笔页面 按钮效果
	//$('#wrapper').on('click', '.close', function() {
	Hammer($('.new .close')[0]).on('tap', function(ev) {
    	var now = $('.new');
		var next = $('.main');
        now.addClass('next')
        now.removeClass('in');
		next.removeClass('out');
        $('#wrapper header:eq(0)').removeClass('hidden');
        
	});
    
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
})