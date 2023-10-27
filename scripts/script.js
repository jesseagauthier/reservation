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
// settings
const timeOpen = 11
const timeClosed = 18
let time = timeOpen + `:00`

const storedTablesList = JSON.parse(localStorage.getItem('tablesList'))

// Check if there's a stored list of tables and render accordingly
if (storedTablesList) {
	tablesList = storedTablesList
	rendersReservationHours(timeOpen, timeClosed, tablesList)
	renderTables(tablesList)
}
if (!storedTablesList) {
	rendersReservationHours(timeOpen, timeClosed, tablesList)
	renderTables(tablesList)
}

// This function generates a list of hours the restaurant is open.
// It also initializes the reservations for each table if there are no stored reservations.
function generatesOpenHours(timeOpen, timeClosed, tablesList) {
	if (timeOpen >= timeClosed) {
		throw new Error('Opening time must be less than closing time.')
	}

	const storedTablesList = JSON.parse(localStorage.getItem('tablesList'))

	let hoursOpen = []
	let count = timeOpen

	while (count < timeClosed) {
		hoursOpen.push(count + `:00`)

		if (!storedTablesList && tablesList) {
			for (let table of tablesList) {
				if (!Array.isArray(table.reservations)) {
					table.reservations = []
				}
				table.reservations.push({ time: count + `:00`, reserved: false })
			}
		}

		if (count !== timeClosed - 1) {
			hoursOpen.push(count + `:30`)

			if (!storedTablesList && tablesList) {
				for (let table of tablesList) {
					if (!Array.isArray(table.reservations)) {
						table.reservations = []
					}
					table.reservations.push({ time: count + `:30`, reserved: false })
				}
			}
		}

		count++
	}

	return hoursOpen
}

// This function renders the dropdown options for reservation hours based on the restaurant's open hours.
function rendersReservationHours(timeOpen, timeClosed, tablesList) {
	const openHours = generatesOpenHours(timeOpen, timeClosed, tablesList)
	const hoursContainer = document.getElementById('time')
	let count = -1
	for (const hour of openHours) {
		count++
		hoursContainer.insertAdjacentHTML(
			'beforeend',
			`<option class="bg-white text-md text-black" data-hour="${count}">${hour}</option>
        `
		)
	}
}
// Event listener to detect clicks on tables for booking.
document.getElementById('tables').addEventListener('click', function (e) {
	if (e.target.className.includes('table')) {
		const table = e.target.parentElement.dataset.table
		if ((e.target.dataset.selected = 'true')) {
			bookTable(table, e)
		}

		e.target.dataset.selected = 'true'
		const restrict = restrictSelected()
		if (!restrict) {
			bookTable(table, e)
			console.log(restrict)
		} else {
			return
		}
	}
})

// Event listener for the time dropdown.
// Updates the global time variable whenever a new time is selected.
const timeElement = document.getElementById('time')
timeElement.addEventListener('change', (event) => {
	time = event.target.value
	console.log(time)
})

// This function renders the tables on the page.
function renderTables(tablesList) {
	const tablesContainer = document.getElementById('tables')
	for (const table of tablesList) {
		tablesContainer.insertAdjacentHTML(
			'beforeend',
			`
            <div class="table border p-4 rounded col-span-1 cursor-pointer shadow border-3 hover:bg-green-400 hover:border-gray-500" data-table="${table.table}">
            <span class="table font-bold text-xl" data-table="${table.table}">Seats ${table.seats}</span>
            <p class="table mt-2" data-table="${table.table}">Table: ${table.table}</p>
        </div>
        `
		)
	}
}

// This function handles the booking of a table for a given time.
// It toggles the table's visual representation and updates the reservation status.
function bookTable(tableNumber, event) {
	if (event.target.tagName == 'span' || event.target.tagName == 'p') {
		event.target.parentElement.classList.toggle('hover:bg-green-400')
		event.target.parentElement.classList.toggle('bg-orange-400')
	}
	if (event.target.tagName == 'DIV') {
		event.target.classList.toggle('hover:bg-green-400')
		event.target.classList.toggle('bg-orange-400')
	}

	const hoursContainer = document.getElementById('time')
	const selectedTime = hoursContainer.value
	const timesOpen = generatesOpenHours(timeOpen, timeClosed, tablesList)
	const selectedTimeIndex = timesOpen.findIndex((time) => time === selectedTime)
	const tableIndex = tablesList.findIndex(
		(currentTable) => currentTable.table == tableNumber
	)
	const twoHourBlock = 4
	let currentIndex = selectedTimeIndex

	for (let i = 0; i < twoHourBlock; i++) {
		if (tablesList[tableIndex].reservations[currentIndex]) {
			tablesList[tableIndex].reservations[currentIndex].reserved = true
			currentIndex++
		}
	}
	localStorage.setItem('tablesList', JSON.stringify(tablesList))
}

let count = 0
function restrictSelected() {
	count++
	if (count > 1) {
		// console.log(true)
		return true
	}
	if (count <= 1) {
		// console.log(false)
		return false
	} else {
		console.error(count)
	}
}

// Todo:
// Prevent the user from adding more than one table per booking

// Notes:

// The user clicks on a table, bookTable() changes the background color.
// I should update restrictSelected() to holds a value that cannot be < 1 - if greater than one, prevent background change, and store reservation information
