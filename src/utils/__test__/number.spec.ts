import { convertMetersToKilometers } from "../number";


describe('convertMetersToKilometers', () => {
  it('should convert meters to kilometers', () => {
    // Test case 1: meters = 1000
    expect(convertMetersToKilometers(1000)).toBe(1);

    // Test case 2: meters = 1500
    expect(convertMetersToKilometers(1500)).toBe(1.5);

    // Test case 3: meters = 200
    expect(convertMetersToKilometers(200)).toBe(0.2);

    // Test case 4: meters = 0
    expect(convertMetersToKilometers(0)).toBe(0);
  });
});
