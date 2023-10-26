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
	// console.log(`Hours Open ${openHours}`)
	for (const hour of openHours) {
		// console.log(hour)
		hoursContainer.insertAdjacentHTML(
			'beforeend',
			`<option class="bg-gray-200 text-black" data-hour="${hour}">${hour}</option>
        `
		)
	}
}

const tablesContainer = document
	.getElementById('tables')
	.addEventListener('click', function (e) {
		if (e.target.className.includes('table')) {
			const table = e.target.dataset.table
			bookTable(table)
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

function bookTable(table) {
	console.log(table)
	console.log(time)
}
