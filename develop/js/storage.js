var Item = {
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