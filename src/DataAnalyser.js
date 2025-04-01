import airports from '../A2_Airports.json';
import flights from '../A2_Flights.json';
import {Airport} from "./Models/Airport";

export class DataAnalyser {
    airportsData;
    flightsData;
    airports = []; // holds the array of Airport class objects

    constructor() {
        this.airportsData = airports;
        this.flightsData = flights;

        this.airportsData.forEach(airport => {
            // first organise the flights into their respective incoming/outgoing flight arrays
            airport.incomingFlights = this.flightsData.filter(flight => {
                return flight['destination_airport_id'] === airport['id'];
            });

            airport.outgoingFlights = this.flightsData.filter(flight => {
                return flight['source_airport_id'] === airport['id'];
            });

            //then create the new instance of the class to be added to airports
            this.airports.push(new Airport(airport));
        });
    }

    getFlights() {
        return this.flightsData;
    }

    getAirports() {
        return this.airports;
    }
}