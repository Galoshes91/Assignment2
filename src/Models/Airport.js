export class Airport {
    incomingFlights;
    outgoingFlights;
    altitude;
    city;
    country;
    iata;
    id;
    latitude;
    longitude;
    timezone;

    constructor(airport) {
        this.incomingFlights = airport.incomingFlights;
        this.outgoingFlights = airport.outgoingFlights;

        this.altitude = airport.altitude;
        this.city = airport.city;
        this.country = airport.country;
        this.iata = airport.iata;
        this.id = airport.id;
        this.latitude = airport.latitude;
        this.longitude = airport.longitude;
        this.timezone = airport.timezone;
    }

    /**
     * Formats the airport object as a useful HTML element that can be rendered on the screen
     * This returns a TR element, and makes the assumption that there is a column for every parameter.
     * This function can be updated later if we wish to exclude or modify the values shown...
     */
    formatAirportHTML() {
        const tr = document.createElement("tr");

        // TODO: fix this utter mess up 
        const txtArr = [];

        // TODO: turn this into a html link, this link will go to another page which will
        // further outline the incoming/outgoing flights in more detail. This is to avoid
        // cluttering up the table cells
        txtArr.push(this.incomingFlights.length ? this.incomingFlights.length : 'N/A');
        txtArr.push(this.outgoingFlights.length ? this.outgoingFlights.length : 'N/A');

        txtArr.push(this.altitude);
        txtArr.push(this.city);
        txtArr.push(this.country);
        txtArr.push(this.iata);
        txtArr.push(this.id);
        txtArr.push(this.latitude);
        txtArr.push(this.longitude);
        txtArr.push(this.timezone);

        txtArr.forEach((arrVal) => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(arrVal);
            cell.appendChild(cellText);
            tr.appendChild(cell);
        });

        return tr;
    }
}