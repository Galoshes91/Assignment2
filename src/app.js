import {DataAnalyser} from "./DataAnalyser";

const dataAnalyser = new DataAnalyser();

/* Mapper function */
dataAnalyser.getAirports()[1].updateFlights(true, true, "city", "Sydney");

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


let table = document.createElement("table");

//#region Header columns
const trh = document.createElement("tr");
trh.classList.add('table-header');

// TODO: fix this utter mess up 
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
//#endregion

dataAnalyser.getAirports().forEach(airport => {
    table.appendChild(airport.formatAirportHTML());
})

document.body.appendChild(table);