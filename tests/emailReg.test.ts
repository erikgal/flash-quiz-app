import { describe, expect, test } from '@jest/globals'
import { emailReg } from '../utils/consts/emailReg'

describe('test email regulare expression', () => {
  test('basic email', () => {
    const email = 'erikgaller@gmail.com'
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(true)
  })
  test('empty email', () => {
    const email = ''
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(false)
  })
  test('email without name', () => {
    const email = '@gmail.com'
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(false)
  })
  test('email without @', () => {
    const email = 'erikgallergmail.com'
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(false)
  })
  test('email without mail', () => {
    const email = 'erikgaller@.com'
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(false)
  })
  test('email without .', () => {
    const email = 'erikgaller@gmailcom'
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(false)
  })
  test('email without domain', () => {
    const email = 'erikgaller@gmail.'
    const emailIsVaild = emailReg.test(email)
    expect(emailIsVaild).toBe(false)
  })
})
