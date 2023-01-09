import { describe, expect, test } from '@jest/globals'
import durstenfeldShuffle from '../utils/functions/durstenfeldShuffle'

// function to calculate Hamming distance
const hammingDist = (str1: string, str2: string): number => {
  let i = 0; let count = 0
  while (i < str1.length) {
    if (str1[i] !== str2[i]) { count++ }
    i++
  }
  return count
}

describe('Check pseudo-randomness of shuffle', () => {
  test('90% shuffle', () => {
    const inputString = '7as98fd79asd7f9a78asd98asD9Uas9cu9aS8DU9a9c8ua9SC97g9s'
    const shuffledString = durstenfeldShuffle(inputString.split('')).join()
    const hammingDistance = hammingDist(inputString, shuffledString)
    const valid = hammingDistance > inputString.length * 0.80
    expect(valid).toBe(true)
  })
})
