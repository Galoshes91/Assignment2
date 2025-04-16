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
		expect(result.length).toBe(142);
	});

	describe("getAirportTimeDiff", () => {
		test("asStr is true, returns a string representation", () => {
			const result = da.getAirportTimeDiff(
				da.getAirports()[331],
				da.getAirports()[311],
				true
			);

			expect(result.includes("Time diff:")).toBe(true);
			expect(result.includes("Hours: 1")).toBe(true);
			expect(result.includes("Minutes: 51")).toBe(true);
		});

		test("asStr is false, returns an object", () => {
			const result = da.getAirportTimeDiff(
				da.getAirports()[331],
				da.getAirports()[311],
				false
			);

			expect(result.hrs).toBe(1);
			expect(result.mins).toBe(51);
		});
	});

	test("getBusiestRoutes", () => {
		const expectedResult = [
			{
				count: 17,
				id: "BNE CNS",
			},
			{
				count: 14,
				id: "MEL SYD",
			},
			{
				count: 12,
				id: "BNE DRW",
			},
			{
				count: 10,
				id: "ADL BNE",
			},
			{
				count: 10,
				id: "ADL SYD",
			},
			{
				count: 10,
				id: "BNE MEL",
			},
			{
				count: 10,
				id: "BNE SYD",
			},
			{
				count: 10,
				id: "MEL PER",
			},
			{
				count: 10,
				id: "PER SYD",
			},
			{
				count: 9,
				id: "MEL ADL",
			},
		];
		const result = da.getBusiestRoutes();

		expect(result).toEqual(expectedResult);
	});

	test("getBiggestTimezoneDiff", () => {
		const expectedResult = [
			{
				airportA: "LDH",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 25,
				},
			},
			{
				airportA: "OOL",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 3,
				},
			},
			{
				airportA: "BNK",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 3,
				},
			},
			{
				airportA: "LSY",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 2,
				},
			},
			{
				airportA: "ACF",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 1,
				},
			},
			{
				airportA: "BNE",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 1,
				},
			},
			{
				airportA: "MCY",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 1,
				},
			},
			{
				airportA: "CFS",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 1,
				},
			},
			{
				airportA: "GFN",
				airportB: "OCN",
				timeDiff: {
					hrs: 18,
					mins: 1,
				},
			},
			{
				airportA: "OCN",
				airportB: "Rothwell, Australia",
				timeDiff: {
					hrs: 18,
					mins: 1,
				},
			},
		];
		const result = da.getBiggestTimezoneDiff();

		expect(result).toEqual(expectedResult);
	});
});
