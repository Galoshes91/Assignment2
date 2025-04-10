import { DataAnalyser } from "./DataAnalyser";

const dataAnalyser = new DataAnalyser();

function setTableHeaders(tableElement, thirdHeader) {
	const trh = document.createElement("tr");
	trh.classList.add("table-header");
	const txtArr = [];

	txtArr.push("Airport 1");
	txtArr.push("Airport 2");
	txtArr.push(thirdHeader);

	txtArr.forEach((arrVal) => {
		const cell = document.createElement("td");
		const cellText = document.createTextNode(arrVal);
		cell.appendChild(cellText);
		trh.appendChild(cell);
	});

	tableElement.appendChild(trh);
}

function createTable(arr, thirdHeader) {
	const divElement = document.getElementById("tableContainer");
	divElement.innerHTML = "";
	let table = document.createElement("table");

	//#region Header columns

	table.setAttribute("id", "airportTable");

	setTableHeaders(table, thirdHeader);
	//#endregion

	arr.forEach((airport) => {
		const tr = document.createElement("tr");
		const txtArr = [];
		txtArr.push(airport.airportA);
		txtArr.push(airport.airportB);
		txtArr.push(airport.count);

		txtArr.forEach((arrVal) => {
			const cell = document.createElement("td");
			const cellText = document.createTextNode(arrVal);
			cell.appendChild(cellText);
			tr.appendChild(cell);
		});

		table.appendChild(tr);
	});

	divElement.appendChild(table);
}

function getTopFlightNum() {
	const airports = dataAnalyser.getBusiestRoutes();
	const airportArr = [];

	airports.forEach((ap) => {
		const apArr = ap.id.split(" ");
		airportArr.push({
			airportA: apArr[0],
			airportB: apArr[1],
			count: ap.count,
		});
	});

	createTable(airportArr, "Number of flights");
}

function getTopTimeDiff() {
    const airports = dataAnalyser.getBiggestTimezoneDiff();

	airports.forEach(ap => {
		ap.count = `${ap.timeDiff.hrs} Hours, ${ap.timeDiff.mins} Minutes`
	});

	createTable(airports, "Distance");
}

document.getElementById("flightNum").onclick = () => getTopFlightNum();
document.getElementById("timeDiff").onclick = () => getTopTimeDiff();
