import { random, isEmpty } from 'lodash'

export const getRamdomObject = <T>(arr: Array<T>): T | null => {
  if (isEmpty(arr)) {
    return null
  }
  return arr[random(arr.length - 1)]
}

export const getRandomArray = <T>(arr: Array<T>, length: number): Array<T> => {
  if (isEmpty(arr) || length <= 0) {
    return []
  }
  const result: Array<T> = []
  for (let i = 0; i < length; i++) {
    result.push(arr[random(arr.length)])
  }
  return result
}