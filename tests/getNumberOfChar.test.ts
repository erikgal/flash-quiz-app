import { describe, expect, test } from '@jest/globals'
import { getNumberOfChars } from '../utils/functions/getNumberOfChars'

describe('test  get number of char function', () => {
  test('basic example', () => {
    const index = 0
    const question = { answer: [['Dopamine']], question: 'xxx is a neurotransmitter and hormone which regulates motivation.' }
    const numberOfChars = getNumberOfChars(index, question)
    expect(numberOfChars).toBe(8)
  })
  test('last element', () => {
    const index = 8
    const question = { answer: [['motivation']], question: 'Dopamine is a neurotransmitter and hormone which regulates xxx.' }
    const numberOfChars = getNumberOfChars(index, question)
    expect(numberOfChars).toBe(10)
  })
  test('basic example with multiple forms', () => {
    const index = 4
    const question = { answer: [['Roman'], ['trading', 'banking'], ['trade', 'finance']], question: 'Florence originated as a xxx city, and was a center of medieval European xxx and xxx.' }
    const numberOfChars = getNumberOfChars(index, question)
    expect(numberOfChars).toBe(5)
  })
  test('basic example with multiple forms and multiple answers', () => {
    const index = 13
    const question = { answer: [['Roman'], ['trading', 'banking'], ['trade', 'finance']], question: 'Florence originated as a xxx city, and was a center of medieval European xxx and xxx.' }
    const numberOfChars = getNumberOfChars(index, question)
    expect(numberOfChars).toBe(7)
  })
})
