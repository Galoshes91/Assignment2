import {DataAnalyser} from "./DataAnalyser";

const dataAnalyser = new DataAnalyser();

//console.log(dataAnalyser.getFlights());
console.log(dataAnalyser.getAirports());

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