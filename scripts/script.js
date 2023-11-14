const tablesList = [
	{
		table: 1,
		seats: 4,
		reservations: [],
	},
	{
		table: 2,
		seats: 4,
		reservations: [],
	},
	{
		table: 3,
		seats: 4,
		reservations: [],
	},
	{
		table: 4,
		seats: 4,
		reservations: [],
	},
	{
		table: 5,
		seats: 4,
		reservations: [],
	},
	{
		table: 6,
		seats: 3,
		reservations: [],
	},
	{
		table: 7,
		seats: 2,
		reservations: [],
	},
	{
		table: 8,
		seats: 2,
		reservations: [],
	},
	{
		table: 9,
		seats: 2,
		reservations: [],
	},
	{
		table: 10,
		seats: 6,
		reservations: [],
	},

	{
		table: 11,
		seats: 4,
		reservations: [],
	},
	{
		table: 12,
		seats: 2,
		reservations: [],
	},
]
const openingTime = 11
const closingTime = 18
let currentTime = openingTime + ':00'
let count = 0

// Load tables from local storage or create an empty list
const tableList = JSON.parse(localStorage.getItem('tablesList')) || tablesList

// Function to generate open hours
function generateOpenHours(openingTime, closingTime, tableList) {
	if (openingTime >= closingTime) {
		throw new Error('Opening time must be less than closing time.')
	}
	let hoursOpen = []
	for (let count = openingTime; count < closingTime; count++) {
		hoursOpen.push(count + ':00')
		hoursOpen.push(count + ':30')
		for (let table of tableList) {
			if (!Array.isArray(table.reservations)) {
				table.reservations = []
			}
			table.reservations.push({ time: count + ':00', reserved: false })
			table.reservations.push({ time: count + ':30', reserved: false })
		}
	}
	return hoursOpen
}

// Function to render reservation hours in dropdown
function renderReservationHours(openingTime, closingTime, tableList) {
	const hoursContainer = document.getElementById('time')
	const openHours = generateOpenHours(openingTime, closingTime, tableList)
	openHours.forEach((hour, index) => {
		hoursContainer.insertAdjacentHTML(
			'beforeend',
			`<option class=" text-md text-black" data-hour="${index}">${hour}</option>`
		)
	})
	return openHours
}
let selectedTimeIndex
// Function to render tables
function renderTables(tableList) {
	const tablesContainer = document.getElementById('tables')
	tablesContainer.innerHTML = ''
	tableList.forEach((table) => {
		const selectedTime = document.getElementById('time').value
		selectedTimeIndex = table.reservations.findIndex(
			(reservation) => reservation.time == selectedTime
		)
		if (table.reservations[selectedTimeIndex].reserved == true) {
			console.log(`table ${table.table} booked`)
			tablesContainer.insertAdjacentHTML(
				'beforeend',
				`<div class="border p-4 rounded col-span-1 cursor-not-allowed shadow border-3 bg-red-400 hover:border-gray-500" data-table="${table.table}">
			<span class="font-bold text-xl">Seats ${table.seats}</span>
			<p class="mt-2">Table: ${table.table}</p>
		  </div>
		`
			)
		} else {
			tablesContainer.insertAdjacentHTML(
				'beforeend',
				`
		  <div class="table border p-4 rounded col-span-1 cursor-pointer shadow border-3 hover:bg-green-400 hover:border-gray-500" data-table="${table.table}">
			<span class="font-bold text-xl">Seats ${table.seats}</span>
			<p class="mt-2">Table: ${table.table}</p>
		  </div>
		`
			)
		}
	})
	// Event listener for table booking
	const tables = document.querySelectorAll('.table')
	for (const table of tables) {
		table.addEventListener('click', (event) => {
			selectedTableIndex = tableSelected(event)
		})
	}
}

// Event listener for time dropdown
const timeElement = document.getElementById('time')
timeElement.addEventListener('change', (event) => {
	currentTime = event.target.value
	console.log(currentTime)
	renderTables(tableList)
})

renderReservationHours(openingTime, closingTime, tableList)
renderTables(tableList)

// This function handles the booking of a table for a given time.
// It toggles the table's visual representation and updates the reservation status.
function returnsTableIndex() {
	let targetElement
	if (!event.target.dataset.table) {
		targetElement = event.target.parentElement
		targetElement.dataset.selected = 'true'
	} else {
		targetElement = event.target
		targetElement.dataset.selected = 'true'
	}

	targetElement.classList.toggle('bg-orange-400')
	const currentTable = targetElement.dataset.table
	const tableIndex = tableList.findIndex((table) => table.table == currentTable)
	return tableIndex
}

function restrictSelected() {
	count++
	return count > 1
}

function returnsTimeIndex(tableIndex) {
	const selectedTime = document.getElementById('time').value
	let timeIndex = tableList[tableIndex].reservations
	timeIndex = timeIndex.findIndex((time) => time.time == selectedTime)
	return timeIndex
}

function checkForSelected() {
	const previouslySelectedTables = document.querySelectorAll(
		"[data-selected='true']"
	)
	return previouslySelectedTables
}

function removeSelected(previouslySelected) {
	if (previouslySelected.length > 0) {
		previouslySelected[0].classList.remove('bg-orange-400')
		previouslySelected[0].dataset.selected = 'false'
		return true
	} else {
		return false
	}
}
let selectedTableIndex = tableSelected()

function tableSelected(event) {
	if (event) {
		removeSelected(checkForSelected())
		const tableIndex = returnsTableIndex(event)
		console.log(tableIndex)
		return tableIndex
	}
	// Handle the initial case where event is not defined
	return undefined
}

document
	.getElementById('bookBtn')
	.addEventListener('click', (event) => bookTable())

function bookTable() {
	if (typeof selectedTableIndex !== 'undefined') {
		let timeIndex = returnsTimeIndex(selectedTableIndex)
		tableList[selectedTableIndex].reservations[timeIndex].reserved = true
		for (let i = 0; i <= 2; i++) {
			timeIndex++
			tableList[selectedTableIndex].reservations[timeIndex].reserved = true
		}
		saveTableToStorage(tableList)
	} else {
		console.error('No table selected')
		alert('No Table Selected')
	}
}

function saveTableToStorage(tableList) {
	const string = JSON.stringify(tableList)
	localStorage.setItem('tablesList', string)
	renderTables(tableList)
	alert('table booked')
}
