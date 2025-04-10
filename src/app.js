import { DataAnalyser } from "./DataAnalyser";

function setAirportTableHeaders() {
    const trh = document.createElement("tr");
    trh.classList.add("table-header");
	const txtArr = [];

	txtArr.push("Incoming flights");
	txtArr.push("Outgoing Flights");
	txtArr.push("Altitude");
	txtArr.push("City");
	txtArr.push("Country");
	txtArr.push("IATA");
	txtArr.push("ID");
	txtArr.push("Latitude");
	txtArr.push("Longitude");
	txtArr.push("Timezone");

	txtArr.forEach((arrVal) => {
		const cell = document.createElement("td");
		const cellText = document.createTextNode(arrVal);
		cell.appendChild(cellText);
		trh.appendChild(cell);
	});

	table.appendChild(trh);
}

function setAirportTableContent(tableElement, arr) {
	arr.forEach((airport) => {
		tableElement.appendChild(airport.formatAirportHTML());
	});
}

const dataAnalyser = new DataAnalyser();

/* Add values to dropdown */
const dropdownOptions = [
	{
		value: "",
		label: "- Select a search type -",
	},
	{
		value: "city",
		label: "City",
	},
	{
		value: "country",
		label: "Country",
	},
	{
		value: "iata",
		label: "IATA",
	},
	{
		value: "timezone",
		label: "Timezone",
	},
];
const dropdown = document.getElementById("airportProperty");

dropdownOptions.forEach((option) => {
	const opt = document.createElement("option");
	opt.setAttribute("value", option.value);
	opt.innerText = option.label;
	dropdown.appendChild(opt);
});
console.log(dropdown);

/* Mapper function */
dataAnalyser.getAirports()[1].updateFlights(true, true, "city", "Sydney");

/* Display all airports in dataset */
console.log(dataAnalyser.getAirports());

/* Display all flights in dataset */
console.log(dataAnalyser.getFlights());

/* Display by airport criteria */
console.log(dataAnalyser.getByAirportCriteria("city", "Sydney"));
console.log(dataAnalyser.getByAirportCriteria("country", "Australia"));

/* get flight by destination airport */
console.log(dataAnalyser.getByDestinationAirport("BNE"));

/* get flights by source airport */
console.log(dataAnalyser.getBySourceAirport("ROK"));

/* get flights by airline */
console.log(dataAnalyser.getByAirline("SH"));

/* get flight by codeshare */
console.log(dataAnalyser.getByCodeshare(true));
console.log(dataAnalyser.getByCodeshare(false));

/* get by flight aircraft type (array) */
console.log(dataAnalyser.getByAircraftType("Airbus A320-100"));
console.log(dataAnalyser.getByAircraftType("Fokker 100"));

/* get time diff between two airports */
console.log(
	dataAnalyser.getAirportTimeDiff(
		dataAnalyser.getAirports()[331],
		dataAnalyser.getAirports()[311]
	)
);

let table = document.createElement("table");

//#region Header columns

table.setAttribute("id", "airportTable");

setAirportTableHeaders();
//#endregion

dataAnalyser.getAirports().forEach((airport) => {
	table.appendChild(airport.formatAirportHTML());
});

document.body.appendChild(table);

function searchAirports() {
	const searchType = document.getElementById("airportProperty").value;
	const searchVal = document.getElementById("searchVal").value;
	// reset error field
	const errorTxt = document.getElementById("error");
	errorTxt.innerText = "";

	if (!searchType || !searchVal) {
		errorTxt.innerText =
			"You are missing either a search type or search value, please review.";
	} else {
		const searchResults = dataAnalyser.getByAirportCriteria(
			searchType,
			searchVal
		);

		const airportTable = document.getElementById("airportTable");
		airportTable.innerHTML = "";

		if (!!searchResults.length) {
			setAirportTableHeaders();
			setAirportTableContent(airportTable, searchResults);
		} else {
			errorTxt.innerText =
				"No results found, please search another value";
		}
	}
}

function clearAirports() {
    const airportTable = document.getElementById("airportTable");
    airportTable.innerHTML = "";
    setAirportTableHeaders();
    dataAnalyser.getAirports().forEach((airport) => {
        table.appendChild(airport.formatAirportHTML());
    });

    document.getElementById("airportProperty").value = "";
    document.getElementById("searchVal").value = "";
}

document.getElementById("searchButton").onclick = () => searchAirports();
document.getElementById("clearButton").onclick = () => clearAirports();