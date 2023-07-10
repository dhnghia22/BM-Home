import { Time } from "../time";

describe('Time', () => {
  describe('convertTime', () => {
    it('should return formatted time string', () => {
      const timeString = '2023-07-10T07:10:19.755Z';
      const formattedTime = Time.convertTime(timeString);
      expect(formattedTime).toEqual('10, Jul 14:10');
    });

    it('should return empty string for invalid time string', () => {
      const invalidTimeString = 'invalid-time';
      const formattedTime = Time.convertTime(invalidTimeString);
      expect(formattedTime).toEqual('');
    });
  });

  describe('convertMinutesToDate', () => {
    it('should return formatted date string', () => {
      const minutes = 1080;
      const formattedDate = Time.convertMinutesToDate(minutes);
      expect(formattedDate).toEqual('2023-07-10T11:00:00.000Z');
    });
  });
});
