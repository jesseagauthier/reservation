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

// Function to render tables
function renderTables(tableList) {
	const tablesContainer = document.getElementById('tables')
	tableList.forEach((table) => {
		tablesContainer.insertAdjacentHTML(
			'beforeend',
			`
      <div class="table border p-4 rounded col-span-1 cursor-pointer shadow border-3 hover:bg-green-400 hover:border-gray-500" data-table="${table.table}">
        <span class="font-bold text-xl">Seats ${table.seats}</span>
        <p class="mt-2">Table: ${table.table}</p>
      </div>
    `
		)
	})
}

// Event listener for time dropdown
const timeElement = document.getElementById('time')
timeElement.addEventListener('change', (event) => {
	currentTime = event.target.value
	console.log(currentTime)
})

// This function handles the booking of a table for a given time.
// It toggles the table's visual representation and updates the reservation status.
function bookTable(table, event) {
	let targetElement

	if (!event.target.dataset.table) {
		targetElement = event.target.parentElement
		targetElement.dataset.selected = 'true'
	} else {
		targetElement = event.target
		targetElement.dataset.selected = 'true'
	}
	targetElement.classList.toggle('bg-orange-400')

	const hoursContainer = document.getElementById('time')
	const selectedTime = hoursContainer.value

	const currentTable = targetElement.dataset.table
	const tableIndex = tableList.findIndex((table) => table.table == currentTable)

	if (tableIndex !== -1) {
		// The table was found in the tableList
		console.log(`Table index: ${tableIndex}`)
	} else {
		// The table was not found in the tableList
		console.log(`Table not found: ${currentTable}`)
	}
	localStorage.setItem('tablesList', JSON.stringify(tableList))
}

function restrictSelected() {
	count++
	return count > 1
}

renderReservationHours(openingTime, closingTime, tableList)
renderTables(tableList)

// Event listener for table booking
const tables = document.querySelectorAll('.table')
for (const table of tables) {
	table.addEventListener('click', checkForSelected)
}

function checkForSelected(event) {
	const previouslySelected = document.querySelectorAll("[data-selected='true']")
	const table = event.target.dataset.table

	if (previouslySelected.length === 1) {
		removeSelected(previouslySelected)
		bookTable(table, event)
	} else {
		bookTable(table, event)
	}
}

function removeSelected(previouslySelected) {
	previouslySelected[0].classList.remove('bg-orange-400')
	previouslySelected[0].dataset.selected = 'false'
}

// Todo:
// Prevent the user from adding more than one table per booking

// Uncaught TypeError: tablesList[tableIndex] is undefined

// Notes:

// The user clicks on a table, bookTable() changes the background color.
// I should update restrictSelected() to holds a value that cannot be < 1 - if greater than one, prevent background change, and store reservation information
