
export const Calculate = (queue) => {
	console.log('0', queue)
	let result = ''
	result = commasToDots(queue)
	console.log('1', result)
	result = calculatePercents(result)
	console.log('2', result)
	result = calculateRoots(result)
	console.log('3', result)
	result = calculateMultDevide(result)
	console.log('4', result)
	result = calculatePlusMinus(result)
	console.log('5', result)
	result = round(result)
	console.log('6', result)
	return result
}

const commasToDots = (queue) => {

	let result = queue

	while (result.indexOf(',') !== -1) {
		result = result.replace(',', '.')
	}
	while (result.indexOf('(') !== -1) {
		result = result.replace('(', '')
	}
	while (result.indexOf(')') !== -1) {
		result = result.replace(')', '')
	}

	return result
}

const calculatePercents = (queue) => {

	//let subArr1,subArr2,subStr,go1:boolean,go2:boolean,percentRes, result = queue
	let percentRes, index, result = queue
	while (result.indexOf('%') !== -1) {
		index = result.indexOf('%')

		const [subStr, subArr1, subArr2] = replaceSubStr(result, index, 2)

		percentRes = Number(subArr1) / 100 * Number(subArr2)
		result = result.replace(subStr, percentRes.toString())
	}

	return result
}

const calculateRoots = (queue) => {

	let subArr1, subStr, go1, rootRes, result = queue

	while (result.indexOf('√') !== -1) {
		let index = result.indexOf('√')

		const [subStr, subArr1] = replaceSubStr(result, index, 1)

		rootRes = Math.sqrt(Number(subArr1))
		result = result.replace(subStr, rootRes.toString())
	}

	return result
}

const calculateMultDevide = (queue) => {

	let MultDevideRes, index, result = queue

	while (result.search(/[×/]/) !== -1) {
		index = result.search(/[×/]/)

		const [subStr, subArr1, subArr2] = replaceSubStr(result, index, 2)

		if (result[index] === '×') {
			MultDevideRes = Number(subArr1) * Number(subArr2)
		} else {
			MultDevideRes = Number(subArr1) / Number(subArr2)
		}

		result = result.replace(subStr, MultDevideRes.toString())
	}

	return result
}

const calculatePlusMinus = (queue) => {

	let subArr, num, result = queue.split('')

	subArr = []

	for (let i = 0; i < result.length;) {

		num = findNumber(i, '', result)//рекурсия
		subArr.push(num)

		i = i + (num[0] === '-' ? num.length : num.length + 1)//если есть спереди минус, то 1 прибавлять не нужно. Минус и так уже увеличил эту длину на 1.
	}

	return subArr.map((el) => Number(el)).reduce((a, b) => a + b).toFixed(3).toString().replace('.', ',')
}

export const round = (queue) => {

	let result = queue

	if (result.at(-1) === '0') {
		result = result.slice(0, result.length - 1)
	}
	if (result.at(-1) === '0') {
		result = result.slice(0, result.length - 1)
	}
	if (result.at(-1) === '0') {
		result = result.slice(0, result.length - 1)
	}
	if (result.at(-1) === ',') {
		result = result.slice(0, result.length - 1)
	}

	return result
}
///////////////////
const replaceSubStr = (result, index, mode = 2) => {
	let subArr1, subArr2, go1, go2, subStr

	if (mode === 2) {
		subArr1 = result.slice(0, index).split('').reverse()
		subArr2 = result.slice(index + 1, result.length).split('')

		go1 = true
		go2 = true
		subArr1 = subArr1.map((el) => {
			if (/[\d.]/.test(el) && go1) {
				return el
			} else {
				go1 = false
			}
		}).reverse().join('')
		subArr2 = subArr2.map((el) => {
			if (/[\d.]/.test(el) && go2) {
				return el
			} else {
				go2 = false
			}
		}).join('')
		subStr = subArr1 + result[index] + subArr2
		return [subStr, subArr1, subArr2]
	} else {
		subArr1 = result.slice(index + 1, result.length).split('')

		go1 = true
		subArr1 = subArr1.map((el) => {
			if (/[\d.]/.test(el) && go1) {
				return el
			} else {
				go1 = false
			}
		}).join('')
		subStr = result[index] + subArr1
		return [subStr, subArr1]
	}
}

function findNumber(index, num, arr) {
	if (/[+-]/.test(arr[index]) || index === arr.length) {
		return num
	}
	if (/[\d.]/.test(arr[index])) {
		if (arr[index - 1] === '-') {
			num = '-' + num
		}
		num += arr[index]
		return findNumber(index + 1, num, arr)
	}
}