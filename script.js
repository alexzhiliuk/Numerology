function clear() {
	$(`#date`).html('-')
	$(`#addNums`).html('-')
	$(`#fate`).html('-')
	$(`#character`).html('-')
	$(`#daenergyte`).html('-')
	$(`#interest`).html('-')
	$(`#health`).html('-')
	$(`#logic`).html('-')
	$(`#labour`).html('-')
	$(`#luck`).html('-')
	$(`#debt`).html('-')
	$(`#memory`).html('-')
	$(`#temperament`).html('-')
	$(`#life`).html('-')
	$(`#goal`).html('-')
	$(`#goal`).html('-')
	$(`#family`).html('-')
	$(`#habits`).html('-')
}

function firstAdditionalNum(date) {
	let sum = 0;
	for (let num of date) {
		if (num == ".") {
			continue
		}
		else {
			sum += Number(num)
		}
	}
	return sum;
}

function secondAdditionalNum(firstNum) {
	let sum = 0;
	for (let num of firstNum) {
		sum += Number(num)
	}
	if (sum <= 12) {
		return sum;
	}
	return secondAdditionalNum(String(sum));
}

function thirdAdditionalNum(firstNum, date) {
	if (date[0] == "0") {
		var n = Number(date[1])
	} else {
		var n = Number(date[0])
	}
	return firstNum - 2 * n;
}

function getFateNum(firstNum) {
	let sum = 0;
	for (let num of firstNum) {
		sum += Number(num)
	}
	if (sum <= 9 || sum == 11) {
		return sum;
	}
	return getFateNum(String(sum));
}

function getAllNums(num, date, addNums) {
	let result = ""
	for (let n of date) {
		if (n == String(num)) {
			result += n
		}
	}
	for (let i of addNums) {
		for (let j of String(i)) {
			if (j == String(num)) {
				result += j
			}
		}
	}
	return result;
}

$(".submit").click(function(e) {
	e.preventDefault();
	clear()
	const date = $("#date-input").val()
	// Additional nums
	let additionalNums = []
	// First additional num
	additionalNums.push(firstAdditionalNum(date))
	// Second additional num
	additionalNums.push(secondAdditionalNum(String(additionalNums[0])))
	// Third additional num
	additionalNums.push(thirdAdditionalNum(additionalNums[0], date))
	// Fourth additional num
	additionalNums.push(secondAdditionalNum(String(additionalNums[2])))
	// Additional nums to string
	const addNums = additionalNums.join()
 
	const fateNum = getFateNum(String(additionalNums[0]))

	const data = {
		date: date,
		addNums: addNums,
		fate: fateNum,
		character: getAllNums(1, date, additionalNums),
		energy: getAllNums(2, date, additionalNums),
		interest: getAllNums(3, date, additionalNums),
		health: getAllNums(4, date, additionalNums),
		logic: getAllNums(5, date, additionalNums),
		labour: getAllNums(6, date, additionalNums),
		luck: getAllNums(7, date, additionalNums),
		debt: getAllNums(8, date, additionalNums),
		memory: getAllNums(9, date, additionalNums),
		get temperament() {
			return this.interest.length + this.logic.length + this.luck.length;
		},
		get life() {
			return this.health.length + this.logic.length + this.labour.length;
		},
		get goal() {
			return this.character.length + this.health.length + this.luck.length;
		},
		get family() {
			return this.energy.length + this.logic.length + this.debt.length;
		},
		get habits() {
			return this.interest.length + this.labour.length + this.memory.length;
		},
	}

	for (let key of Object.keys(data)) {
		if (data[key]) {
			$(`#${key}`).html(data[key])
		}
	}

})