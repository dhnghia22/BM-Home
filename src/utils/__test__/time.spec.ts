import { Time } from "../time";

describe('Time', () => {
  describe('convertTime', () => {
    it('should convert time string to the desired format', () => {
      const timeString = '2023-07-03T05:53:32.275Z';
      const expectedOutput = '03, Jul 05:53';

      const convertedTime = Time.convertTime(timeString);

      expect(convertedTime).toEqual(expectedOutput);
    });

    it('should handle leading zeros in day and hour', () => {
      const timeString = '2023-01-05T07:09:00.000Z';
      const expectedOutput = '05, Jan 07:09';

      const convertedTime = Time.convertTime(timeString);

      expect(convertedTime).toEqual(expectedOutput);
    });

    it('should handle single-digit day and hour', () => {
      const timeString = '2023-11-09T09:05:00.000Z';
      const expectedOutput = '09, Nov 09:05';

      const convertedTime = Time.convertTime(timeString);

      expect(convertedTime).toEqual(expectedOutput);
    });
  });
});
