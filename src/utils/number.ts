export const convertMetersToKilometers = (meters: number) => {
  const kilometers = meters / 1000
  const roundedKilometers = Math.round(kilometers * 10) / 10
  return roundedKilometers
}
