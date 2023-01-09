import { describe, expect, test } from '@jest/globals'
import { generateDropdownData } from '../utils/functions/generateDropdownData'

describe('test generate dropdown data function', () => {
  test('1 quiz', () => {
    const dropDownData = generateDropdownData(1)
    const expectedDropDownData = [
      { key: '1', label: '1 Questions', value: 1 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('3 quizzes', () => {
    const dropDownData = generateDropdownData(3)
    const expectedDropDownData = [
      { key: '3', label: '3 Questions', value: 3 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('5 quizzes', () => {
    const dropDownData = generateDropdownData(5)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('8 quizzes', () => {
    const dropDownData = generateDropdownData(8)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '8', label: '8 Questions', value: 8 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('10 quizzes', () => {
    const dropDownData = generateDropdownData(10)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('13 quizzes', () => {
    const dropDownData = generateDropdownData(13)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '13', label: '13 Questions', value: 13 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('15 quizzes', () => {
    const dropDownData = generateDropdownData(15)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('16 quizzes', () => {
    const dropDownData = generateDropdownData(16)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '16', label: '16 Questions', value: 16 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('25 quizzes', () => {
    const dropDownData = generateDropdownData(25)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('49 quizzes', () => {
    const dropDownData = generateDropdownData(49)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '49', label: '49 Questions', value: 49 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('50 quizzes', () => {
    const dropDownData = generateDropdownData(50)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('69 quizzes', () => {
    const dropDownData = generateDropdownData(69)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '69', label: '69 Questions', value: 69 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('75 quizzes', () => {
    const dropDownData = generateDropdownData(75)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('99 quizzes', () => {
    const dropDownData = generateDropdownData(99)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 },
      { key: '99', label: '99 Questions', value: 99 }

    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('100 quizzes', () => {
    const dropDownData = generateDropdownData(100)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 },
      { key: '100', label: '100 Questions', value: 100 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('149 quizzes', () => {
    const dropDownData = generateDropdownData(149)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 },
      { key: '100', label: '100 Questions', value: 100 },
      { key: '149', label: '149 Questions', value: 149 }

    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('150 quizzes', () => {
    const dropDownData = generateDropdownData(150)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 },
      { key: '100', label: '100 Questions', value: 100 },
      { key: '150', label: '150 Questions', value: 150 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('151 quizzes', () => {
    const dropDownData = generateDropdownData(151)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 },
      { key: '100', label: '100 Questions', value: 100 },
      { key: '150', label: '150 Questions', value: 150 },
      { key: '151', label: '151 Questions', value: 151 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
  test('300 quizzes', () => {
    const dropDownData = generateDropdownData(300)
    const expectedDropDownData = [
      { key: '5', label: '5 Questions', value: 5 },
      { key: '10', label: '10 Questions', value: 10 },
      { key: '15', label: '15 Questions', value: 15 },
      { key: '25', label: '25 Questions', value: 25 },
      { key: '50', label: '50 Questions', value: 50 },
      { key: '75', label: '75 Questions', value: 75 },
      { key: '100', label: '100 Questions', value: 100 },
      { key: '150', label: '150 Questions', value: 150 },
      { key: '200', label: '200 Questions', value: 200 },
      { key: '250', label: '250 Questions', value: 250 },
      { key: '300', label: '300 Questions', value: 300 }
    ]
    expect(dropDownData).toStrictEqual(expectedDropDownData)
  })
})
