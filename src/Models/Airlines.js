import { Airline } from "./Airline";

export class Airlines {
	static AirlineCollection = [];

	static GetAllAirlines() {
		return this.AirlineCollection;
	}

	static AddAirline(airline) {
		const al = new Airline(airline);
		this.AirlineCollection.push(al);
	}
}
