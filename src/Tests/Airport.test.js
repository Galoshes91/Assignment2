import { Airport } from "../Models/Airport";

describe("Airport", () => {
    let airport;
    const inputVal = {
        altitude: 1003,
        city: "Charlieville",
        country: "Australia",
        iata: "CTL",
        id: 3323,
        incomingFlights: [{ airline: "AB"}],
        latitude: -26.4132995605,
        longitude: 146.261993408,
        name: "Charleville Airport",
        outgoingFlights: [{ airline: "CD"}],
        timezone: 10
    }

    beforeEach(() => {
        airport = new Airport(inputVal);
    });

    test("constructor sets the values", () => {
        expect(airport).toBeDefined();

        expect(airport.incomingFlights).toBeDefined();
        expect(airport.outgoingFlights).toBeDefined();
        expect(airport.altitude).toBeDefined();
        expect(airport.city).toBeDefined();
        expect(airport.country).toBeDefined();
        expect(airport.iata).toBeDefined();
        expect(airport.id).toBeDefined();
        expect(airport.latitude).toBeDefined();
        expect(airport.longitude).toBeDefined();
        expect(airport.timezone).toBeDefined();
    });

    test("formatAirportHTML", () => {
        const result = airport.formatAirportHTML();

        expect(result).toBeDefined();
    });

    describe("updateFlights", () => {
        test("incoming", () => {
            airport.updateFlights(true, false, "airline", "test");
            const flight = airport.incomingFlights[0];
            expect(flight.airline).toBe('test');
            expect(flight.lastUpdated).toBeDefined();
        });

        test("outgoing", () => {
            airport.updateFlights(false, true, "airline", "test2");
            const flight = airport.outgoingFlights[0];
            expect(flight.airline).toBe('test2');
            expect(flight.lastUpdated).toBeDefined();
        });
    });
});