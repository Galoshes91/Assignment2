import { DataAnalyser } from "../DataAnalyser";

describe("DataAnalyser", () => {
    let da;
    beforeEach(() => {
        da = new DataAnalyser();
    });

    test("constructor populates airportsData, flightsData and airports array", () => {
        expect(da.airportsData.length).toBe(334);
        expect(da.flightsData.length).toBe(776);
        // the combined arrays should still be the same length as the airportsData array
        expect(da.airports.length).toBe(da.airportsData.length);
    });

    test("getFlights returns flightsData", () => {
        expect(da.getFlights()).toBe(da.flightsData);
    });

    test("getAirports returns airports", () => {
        expect(da.getAirports()).toBe(da.airports);
    });

    test("getByAirportCriteria returns an array of airports based on property value", () => {
        const results = da.getByAirportCriteria("city", "brisbane");
        expect(results.length).toBe(2);
    });
    
    test("getByFlightCriteria returns an array of flights based on property value", () => {
        const results = da.getByFlightCriteria("destination_airport", "BNE");
        expect(results.length).toBe(83);
    });

    test("getByDestinationAirport", () => {
        const result = da.getByDestinationAirport("SYD");
        expect(result.length).toBe(94);
    });

    test("getBySourceAirport", () => {
        const result = da.getBySourceAirport("LST");
        expect(result.length).toBe(8);
    });

    test("getByAirline", () => {
        const result = da.getByAirline("JQ");
        expect(result.length).toBe(94);
    });

    test("getByCodeshare", () => {
        const result = da.getByCodeshare(false);
        expect(result.length).toBe(477);
    });

    test("getByAircraftType", () => {
        const result = da.getByAircraftType("Airbus A320-100");
        expect(result.length).toBe(142)
    });

    // TODO: still needs fixing up
    /*describe("getAirportTimeDiff", () => {
        test("asStr = true, returns the result as a printable string", () => {
            const result = da.getAirportTimeDiff(
                da.getAirports()[331],
                da.getAirports()[311],
                true
            );

            expect(result).toBe(
                `Time diff:
                             Hours: 1
                             Minutes: 51`
            )
        });
    });*/
});