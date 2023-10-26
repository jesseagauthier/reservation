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
]

// settings
const timeOpen = 11
const timeClosed = 18
let time = timeOpen + `:00`

window.onload = function app() {
	renderTables(tablesList)
	rendersReservationHours(timeOpen, timeClosed, tablesList)
}

// This function populates the hourOpen array with each hour the restaurant is open
function generatesOpenHours(timeOpen, timeClosed, tablesList) {
	if (timeOpen >= timeClosed) {
		throw new Error('Opening time must be less than closing time.')
	}

	let hoursOpen = []
	let count = timeOpen

	while (count < timeClosed) {
		hoursOpen.push(count + `:00`)
		for (let table of tablesList) {
			if (!Array.isArray(table.reservations)) {
				table.reservations = []
			}
			table.reservations.push({ time: count + `:00`, reserved: false })
		}

		if (count !== timeClosed - 1) {
			hoursOpen.push(count + `:30`)
			for (let table of tablesList) {
				if (!Array.isArray(table.reservations)) {
					table.reservations = []
				}
				table.reservations.push({ time: count + `:30`, reserved: false })
			}
		}

		count++
	}

	return hoursOpen
}

// This function renders the options for table times
function rendersReservationHours(timeOpen, timeClosed, tablesList) {
	const openHours = generatesOpenHours(timeOpen, timeClosed, tablesList)
	const hoursContainer = document.getElementById('time')
	let count = -1
	for (const hour of openHours) {
		count++
		hoursContainer.insertAdjacentHTML(
			'beforeend',
			`<option class="bg-gray-200 text-black" data-hour="${count}">${hour}</option>
        `
		)
	}
}

const tablesContainer = document
	.getElementById('tables')
	.addEventListener('click', function (e) {
		if (e.target.className.includes('table')) {
			const table = e.target.dataset.table

			bookTable(table, e)
		}
	})

const timeElement = document.getElementById('time')
timeElement.addEventListener('change', (event) => {
	time = event.target.value
	console.log(time)
})

// This function renders each table
function renderTables(tablesList) {
	const tablesContainer = document.getElementById('tables')
	for (const table of tablesList) {
		tablesContainer.insertAdjacentHTML(
			'beforeend',
			`
            <div class="table border p-4 rounded col-span-1 hover:bg-green-400 cursor-pointer" data-table="${table.table}">
            <span class=" table font-bold text-xl" data-table="${table.table}">${table.table}</span>
            <p class=" table mt-2" data-table="${table.table}">Seats ${table.seats}</p>
        </div>
        `
		)
	}
}

function bookTable(tableNumber, event) {
	event.target.classList.toggle('hover:bg-green-400')
	event.target.classList.toggle('bg-red-400')
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
		console.log(tablesList)
	}
}
