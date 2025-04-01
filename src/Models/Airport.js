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
}