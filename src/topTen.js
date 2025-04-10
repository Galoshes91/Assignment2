import { DataAnalyser } from "./DataAnalyser";

const dataAnalyser = new DataAnalyser();

function setAirportTableHeaders(tableElement) {
	const trh = document.createElement("tr");
	trh.classList.add("table-header");
	const txtArr = [];

	txtArr.push("Airport 1");
	txtArr.push("Airport 2");
	txtArr.push("Number of flights");

	txtArr.forEach((arrVal) => {
		const cell = document.createElement("td");
		const cellText = document.createTextNode(arrVal);
		cell.appendChild(cellText);
		trh.appendChild(cell);
	});

	tableElement.appendChild(trh);
}

function setFlightTableHeaders(tableElement) {
	const trh = document.createElement("tr");
	trh.classList.add("table-header");
	const txtArr = [];

	txtArr.push("Airport 1");
	txtArr.push("Airport 2");
	txtArr.push("Distance");

	txtArr.forEach((arrVal) => {
		const cell = document.createElement("td");
		const cellText = document.createTextNode(arrVal);
		cell.appendChild(cellText);
		trh.appendChild(cell);
	});

	tableElement.appendChild(trh);
}

function createAirportTable(arr) {
	const divElement = document.getElementById("tableContainer");
	divElement.innerHTML = "";
	let table = document.createElement("table");

	//#region Header columns

	table.setAttribute("id", "airportTable");

	setAirportTableHeaders(table);
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

function createFlightTable(arr) {
	const divElement = document.getElementById("tableContainer");
	divElement.innerHTML = "";
	let table = document.createElement("table");

	//#region Header columns

	table.setAttribute("id", "airportTable");

	setFlightTableHeaders(table);
	//#endregion

	arr.forEach((airport) => {
		const tr = document.createElement("tr");
		const txtArr = [];
		txtArr.push(airport.airportA);
		txtArr.push(airport.airportB);
		txtArr.push(airport.timeDiff);

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

	createAirportTable(airportArr);
}

function getTopTimeDiff() {
    const airports = dataAnalyser.getBiggestTimezoneDiff();

	airports.forEach(ap => {
		ap.timeDiff = `${ap.timeDiff.hrs} Hours, ${ap.timeDiff.mins} Minutes`
	});

	createFlightTable(airports);
}

document.getElementById("flightNum").onclick = () => getTopFlightNum();
document.getElementById("timeDiff").onclick = () => getTopTimeDiff();
