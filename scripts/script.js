let tablesList = [
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
let tableList = JSON.parse(localStorage.getItem('tablesList')) || tablesList

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
			`<option class="bg-white text-md text-black" data-hour="${index}">${hour}</option>`
		)
	})
}

// Event listener for table booking
document.getElementById('tables').addEventListener('click', function (event) {
	const previouslySelected = document.querySelectorAll("[data-selected='true']")
	const table = event.target.dataset.table

	if (previouslySelected.length === 1) {
		removeSelected(previouslySelected)
		bookTable(table, event)
	} else {
		bookTable(table, event)
	}
})

function removeSelected(previouslySelected) {
	previouslySelected[0].classList.remove('bg-orange-400')
	previouslySelected[0].dataset.selected = 'false'
}

// Event listener for time dropdown
const timeElement = document.getElementById('time')
timeElement.addEventListener('change', (event) => {
	currentTime = event.target.value
	console.log(currentTime)
})

// Function to render tables
function renderTables(tableList) {
	const tablesContainer = document.getElementById('tables')
	tableList.forEach((table) => {
		tablesContainer.insertAdjacentHTML(
			'beforeend',
			`
      <div class="table border p-4 rounded col-span-1 cursor-pointer shadow border-3 hover:bg-green-400 hover:border-gray-500" data-table="${table.table}">
        <span class="font-bold text-xl" data-table="${table.table}">Seats ${table.seats}</span>
        <p class="mt-2" data-table="${table.table}">Table: ${table.table}</p>
      </div>
    `
		)
	})
}
// This function handles the booking of a table for a given time.
// It toggles the table's visual representation and updates the reservation status.
function bookTable(table, event) {
	if (
		event.target.parentElement.dataset.selected == 'true' ||
		event.target.dataset.selected == 'true'
	) {
		event.target.classList.toggle('hover:bg-green-400')
		event.target.classList.toggle('bg-orange-400')
	}

	if (event.target.tagName == 'span' || event.target.tagName == 'p') {
		event.target.parentElement.classList.toggle('hover:bg-green-400')
		event.target.parentElement.classList.toggle('bg-orange-400')
		event.parentElement.dataset.selected = 'true'
	}
	if (event.target.tagName == 'DIV') {
		event.target.classList.toggle('hover:bg-green-400')
		event.target.classList.toggle('bg-orange-400')
		event.target.dataset.selected = 'true'
	}

	const hoursContainer = document.getElementById('time')
	const selectedTime = hoursContainer.value

	const timesOpen = generateOpenHours(openingTime, closingTime, tableList)

	const selectedTimeIndex = timesOpen.findIndex((time) => time === selectedTime)
	const tableIndex = tablesList.findIndex(
		(currentTable) => currentTable.table == table
	)
	const twoHourBlock = 4
	let currentIndex = selectedTimeIndex

	for (let i = 0; i < twoHourBlock; i++) {
		if (tableList[tableIndex].reservations[currentIndex]) {
			tableList[tableIndex].reservations[currentIndex].reserved = true
			currentIndex++
		}
	}
	localStorage.setItem('tablesList', JSON.stringify(tableList))
}

function restrictSelected() {
	count++
	return count > 1
}

renderReservationHours(openingTime, closingTime, tableList)
renderTables(tableList)

// Todo:
// Prevent the user from adding more than one table per booking

// Uncaught TypeError: tablesList[tableIndex] is undefined

// Notes:

// The user clicks on a table, bookTable() changes the background color.
// I should update restrictSelected() to holds a value that cannot be < 1 - if greater than one, prevent background change, and store reservation information
