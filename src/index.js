const displayElement = document.getElementById('display')
const clearButton = document.getElementById('clear')
const backspaceButton = document.getElementById('backspace')
const sevenButton = document.getElementById('seven')
const eightButton = document.getElementById('eight')
const nineButton = document.getElementById('nine')
const divideButton = document.getElementById('divide')
const fourButton = document.getElementById('four')
const fiveButton = document.getElementById('five')
const sixButton = document.getElementById('six')
const multiplyButton = document.getElementById('multiply')
const oneButton = document.getElementById('one')
const twoButton = document.getElementById('two')
const threeButton = document.getElementById('three')
const addButton = document.getElementById('add')
const zeroButton = document.getElementById('zero')
const decimalButton = document.getElementById('decimal')
const subtractButton = document.getElementById('subtract')
const equalsButton = document.getElementById('equals')
let displayValue = '0'
let firstValue = null
let operator = null
let waitingForSecondValue = false

clearButton.addEventListener('click', () => clearDisplay())
sevenButton.addEventListener('click', () => inputDigit('7'))
eightButton.addEventListener('click', () => inputDigit('8'))
nineButton.addEventListener('click', () => inputDigit('9'))
fourButton.addEventListener('click', () => inputDigit('4'))
fiveButton.addEventListener('click', () => inputDigit('5'))
sixButton.addEventListener('click', () => inputDigit('6'))
oneButton.addEventListener('click', () => inputDigit('1'))
twoButton.addEventListener('click', () => inputDigit('2'))
threeButton.addEventListener('click', () => inputDigit('3'))
zeroButton.addEventListener('click', () => inputDigit('0'))
decimalButton.addEventListener('click', () => inputDecimal('.'))
divideButton.addEventListener('click', () => performOperation('/'))
multiplyButton.addEventListener('click', () => performOperation('*'))
addButton.addEventListener('click', () => performOperation('+'))
subtractButton.addEventListener('click', () => performOperation('-'))
equalsButton.addEventListener('click', () => handleEqualButton())
backspaceButton.addEventListener('click', () => removeLastDigit())

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
	if (displayValue === '0') {
		displayValue = digit
	} else {
		displayValue += digit
	}
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
		const result = calculate(firstValue, inputValue, operator)

		displayValue = String(result)
		firstValue = result
	}

	waitingForSecondValue = true
	operator = nextOperator
}

const calculate = (first, second, operator) => {
	if (operator === '+') {
		return first + second
	} else if (operator === '-') {
		return first - second
	} else if (operator === '*') {
		return first * second
	} else if (operator === '/') {
		return first / second
	}

	return second
}

const removeLastDigit = () => {
	displayValue = displayValue.substring(0, displayValue.length - 1)

	if (displayValue === '') {
		displayValue = '0'
	}

	updateDisplay()
}

const handleEqualButton = () => {
	if (waitingForSecondValue) {
		const inputValue = parseFloat(displayValue)
		displayValue = calculate(firstValue, inputValue, operator)
		firstValue = null
		waitingForSecondValue = false
	}

	updateDisplay()
}
