import airports from "../A2_Airports.json";
import flights from "../A2_Flights.json";
import { Airport } from "./Models/Airport";
import { Airlines } from "./Models/Airlines";

export class DataAnalyser {
	airportsData;
	flightsData;
	airports = []; // holds the array of Airport class objects

	constructor() {
		this.airportsData = airports;
		this.flightsData = flights;

		this.airportsData.forEach((airport) => {
			// first organise the flights into their respective incoming/outgoing flight arrays
			airport.incomingFlights = this.flightsData.filter((flight) => {
				return flight["destination_airport_id"] === airport["id"];
			});

			airport.outgoingFlights = this.flightsData.filter((flight) => {
				return flight["source_airport_id"] === airport["id"];
			});

			//then create the new instance of the class to be added to airports
			this.airports.push(new Airport(airport));
		});

		const temp = [];

		// push unique airline ID values to the temp array for tracking purposes,
		// then add the new (unique) airline to the Airlines collection
		this.flightsData.forEach((fd) => {
			if (!temp.includes(fd.airline)) {
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
		const returnArr = this.getAirports().filter((airport) => {
			return airport[property].toLowerCase() === value.toLowerCase();
		});

		return returnArr;
	}

	//#region Flight search functions
	getByFlightCriteria(property, value) {
		const returnArr = this.getFlights().filter((flight) => {
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
		return this.getByFlightCriteria("codeshare", value);
	}

	getByAircraftType(value) {
		return this.getFlights().filter((flight) => {
			return flight.aircraft.filter((ac) => {
				return ac === value;
			}).length;
		});
	}
	//#endregion

	getAirportTimeDiff(airport_a, airport_b, asStr) {
		const a_longtitude = airport_a.longitude;
		const b_longtitude = airport_b.longitude;

		const decimalTime = Math.abs(a_longtitude - b_longtitude) / 15;
		var dateObj = new Date(0, 0);
		dateObj.setSeconds(+decimalTime * 60 * 60);

		const hrs = dateObj.getHours();
		const mins = dateObj.getMinutes();

        if(asStr) {
            return `Time diff:\n   Hours: ${hrs}\n   Minutes: ${mins}`;
        } else {
            return {
                hrs: hrs,
                mins: mins
            }
        }
	}

    getBusiestRoutes() {
        const flights = this.getFlights();

        const flightPairs = [];
        let existingPair = "";
        flights.forEach((flight) => {
            const exists = !!flightPairs.find(fp => {
                const matchA = fp.id === `${flight.source_airport} ${flight.destination_airport}`;
                const matchB = fp.id === `${flight.destination_airport} ${flight.source_airport}`;

                existingPair = matchA ? `${flight.source_airport} ${flight.destination_airport}` : `${flight.destination_airport} ${flight.source_airport}`;
                return matchA || matchB;
            });

            if(exists) {
                flightPairs.find(fp => fp.id === existingPair).count++;
            } else {
                flightPairs.push({
                    id: `${flight.source_airport} ${flight.destination_airport}`,
                    count: 1
                });
            }
        });

        flightPairs.sort((a, b) => {
            return b.count - a.count;
        });

        return flightPairs.slice(0, 10);
    }
    
    getBiggestTimezoneDiff() {
        const airports = this.getAirports();
        const timezoneDiff = [];

        for(let i = 0; i < airports.length; i++) {
            for(let j = 0; j < airports.length; j++) {
				const apA = airports[i].iata ?? `${airports[i].city}, ${airports[i].country}`;
				const apB = airports[j].iata ?? `${airports[j].city}, ${airports[j].country}`;

                if(i !== j) {
                    timezoneDiff.push({
                        airportA: apA,
                        airportB: apB,
                        timeDiff: this.getAirportTimeDiff(airports[i], airports[j], false)
                    });
                }
            }
        }

        timezoneDiff.sort((a, b) => {
			const mins = b.timeDiff.mins - a.timeDiff.mins;
			return mins;
		});

		timezoneDiff.sort((a, b) => {
			const hrs = b.timeDiff.hrs - a.timeDiff.hrs;
			return hrs;
		});
		
		// we want to get rid of duplicates but also dont need to go through the whole 6 figure size array. 
		// make a new array that will stop adding things at 10, making sure to skip duplicates now that the array has been sorted
		const finalArr = [];
		let index = 0;
		while(finalArr.length < 10) {
			const currentVal = timezoneDiff[index];

			const exists = finalArr.find((ele) => {
				return ele.airportA === currentVal.airportB && ele.airportB === currentVal.airportA;
			});

			if(!exists) {
				finalArr.push(timezoneDiff[index]);
			}
			index++;

		}

		return finalArr;
    }
}
