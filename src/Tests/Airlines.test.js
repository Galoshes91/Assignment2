import { Airlines } from "../Models/Airlines";
import { Airline } from "../Models/Airline";

describe("Airlines", () => {
    beforeEach(() => {
        Airlines.AirlineCollection = [
            new Airline({
                airline_name: "al1"
            }),
            new Airline({
                airline_name: "al2"
            })
        ];
    });

    test("GetAllAirlines returns all airlines in the collection", () => {
        const result = Airlines.GetAllAirlines();
        expect(result.length).toBe(2);
        expect(result[0].airline_name).toBe("al1");
        expect(result[1].airline_name).toBe("al2");
    });

    test("AddAirline adds a new airline", () => {
        Airlines.AddAirline(new Airline({
            airline_name: "al3"
        }));
        const result = Airlines.GetAllAirlines();

        expect(result.length).toBe(3);
        expect(result[2].airline_name).toBe("al3");
    });
});