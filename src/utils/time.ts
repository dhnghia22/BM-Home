export class Time {
  static convertTime(time: string): string {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return '';
    }
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day}, ${month} ${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }

  static convertMinutesToDate(minutes: number): string {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, minutes);
    const formattedDate = targetDate.toISOString();
    return formattedDate;
  }
}