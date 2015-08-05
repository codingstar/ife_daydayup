;var Item = {
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

var createItemNode = function(id, obj) {
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
	var str = '<div class="list-item show" id="'+id+'">'+
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

var changeRecord = function(id, type, name, amount) {
	var time = getRecords(id).time;
	var record = new Item.createItem(type, name, amount, time);
	
	var list = JSON.parse(window.localStorage.getItem('lists'));
	list[id] = record;
	window.localStorage.setItem('lists', JSON.stringify(list));
}

var deleteRecord = function(id) {
	var list = JSON.parse(window.localStorage.getItem('lists'));
	list.splice(id, 1);
	window.localStorage.setItem('lists', JSON.stringify(list));
	return true;
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