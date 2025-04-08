import airports from '../A2_Airports.json';
import flights from '../A2_Flights.json';
import {Airport} from "./Models/Airport";
import { Airlines } from './Models/Airlines';

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

        const temp = [];

        // push unique airline ID values to the temp array for tracking purposes,
        // then add the new (unique) airline to the Airlines collection
        this.flightsData.forEach(fd => {
            if(!temp.includes(fd.airline)) {
                temp.push(fd.airline);
                Airlines.AddAirline(fd);
            }
        });
    }

    getFlights() {
        return this.flightsData;
    }

    getAirports() {
        return this.airports;
    }
    
    getByAirportCriteria(property, value) {
        const returnArr = this.getAirports().filter(airport => {
            return airport[property] === value;
        });

        return returnArr;
    }

    //#region Flight search functions
    getByFlightCriteria(property, value) {
        const returnArr = this.getFlights().filter(flight => {
            return flight[property] === value;
        });

        return returnArr;
    }

    getByDestinationAirport(value) {
        return this.getByFlightCriteria("destination_airport", value);
    }

    getBySourceAirport(value) {
        return this.getByFlightCriteria("source_airport", value);
    }

    getByAirline(value) {
        return this.getByFlightCriteria("airline", value);
    }

    getByCodeshare(value) {
        return this.getByFlightCriteria("codeshare", value)
    }
    
    getByAircraftType(value) {
        return this.getFlights().filter(flight => {
            return flight.aircraft.filter(ac => {
                return ac === value;
            }).length;
        });
    }
    //#endregion
}