const displayElement = document.getElementById('display')
const buttonIds = [
	{ key: 'clear', value: 'clear' },
	{ key: 'backspace', value: 'backspace' },
	{ key: 'seven', value: '7' },
	{ key: 'eight', value: '8' },
	{ key: 'nine', value: '9' },
	{ key: 'divide', value: '/' },
	{ key: 'four', value: '4' },
	{ key: 'five', value: '5' },
	{ key: 'six', value: '6' },
	{ key: 'multiply', value: '*' },
	{ key: 'one', value: '1' },
	{ key: 'two', value: '2' },
	{ key: 'three', value: '3' },
	{ key: 'add', value: '+' },
	{ key: 'zero', value: '0' },
	{ key: 'decimal', value: '.' },
	{ key: 'subtract', value: '-' },
	{ key: 'equals', value: '=' },
]
const operations = ['+', '-', '*', '/']
let displayValue = '0'
let firstValue = null
let operator = null
let waitingForSecondValue = false

buttonIds.forEach(({ key, value }) => {
	const button = document.getElementById(key)

	if (operations.includes(value)) {
		button.addEventListener('click', () => performOperation(value))
	} else if (key === 'clear') {
		button.addEventListener('click', () => clearDisplay())
	} else if (key === 'backspace') {
		button.addEventListener('click', () => removeLastDigit())
	} else if (key === 'equals') {
		button.addEventListener('click', () => handleEqualButton())
	} else if (key === 'decimal') {
		button.addEventListener('click', () => inputDecimal(value))
	} else {
		button.addEventListener('click', () => inputDigit(value))
	}
})

const updateDisplay = () => {
	displayElement.value = displayValue
}

const clearDisplay = () => {
	displayValue = '0'
	firstValue = null
	operator = null
	waitingForSecondValue = false
	updateDisplay()
}

const inputDigit = (digit) => {
	displayValue = displayValue === '0' ? digit : displayValue + digit

	updateDisplay()
}

const inputDecimal = (dot) => {
	if (!displayValue.includes(dot)) {
		displayValue += dot
	}

	updateDisplay()
}

const performOperation = (nextOperator) => {
	const inputValue = parseFloat(displayValue)

	if (firstValue === null) {
		firstValue = inputValue
		displayValue = '0'
	} else if (operator) {
		const result = String(calculate(firstValue, inputValue, operator))

		displayValue = result
		firstValue = result
	}

	waitingForSecondValue = true
	operator = nextOperator
}

const calculate = (first, second, operator) => {
	const operations = {
		'/': first / second,
		'*': first * second,
		'+': first + second,
		'-': first - second,
	}

	return operations[operator] || second
}

const removeLastDigit = () => {
	displayValue = displayValue.substring(0, displayValue.length - 1) || '0'

	updateDisplay()
}

const handleEqualButton = () => {
	if (waitingForSecondValue) {
		const inputValue = parseFloat(displayValue)
		displayValue = String(calculate(firstValue, inputValue, operator))
		firstValue = null
		waitingForSecondValue = false
	}

	updateDisplay()
}
