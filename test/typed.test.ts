import { describe, it, expect } from "vitest";
import {
  isArray,
  isFunction,
  isPrimitive,
  isSymbol,
  isString,
  isInt,
  isFloat,
  isNumber,
  isDate,
  isPromise,
  isEmpty,
  isEqual
} from './typed'


describe('类型工具测试', () => {

  it('symbol test', () => {
    expect(isSymbol(Symbol(42))).toBe(true)
    expect(isSymbol(42)).toBe(false)
  })

  it('array text', () => {
    const a = [1,2,3]
    expect(isArray(a)).toEqual(true)
    expect(isArray(1)).toEqual(false)
    expect(isArray('3')).toEqual(false)
  })


  it('primivate test', () => {
    const a = [1,2,3]
    expect(isPrimitive(a)).toEqual(false)
    expect(isPrimitive(1)).toEqual(true)
    expect(isPrimitive('3')).toEqual(true)
    expect(isPrimitive(undefined)).toEqual(true)
    expect(isPrimitive(null)).toEqual(true)
    expect(isPrimitive(Symbol(22))).toEqual(true)
    expect(isPrimitive(10n)).toEqual(true)
  })

  it('function test', () => {
    const a = () => {}
    function b() {}
    expect(isFunction(a)).toBe(true)
    expect(isFunction(b)).toBe(true)
  })

  it('string test', () => {
    const s = '1232';
    expect(isString(s)).toBe(true)
    expect(isString(2)).toBe(false)
    expect(isString(new String('sdsds'))).toBe(true)
  })


  it('number test', () => {
    expect(isNumber(1.2)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(NaN)).toBe(false)
  })

  it('isInt test', () => {
    expect(isInt(1.2)).toBe(false)
    expect(isInt(1)).toBe(true)
    expect(isInt(NaN)).toBe(false)
  })

  it('isFloat test', () => {
    expect(isFloat(1.2)).toBe(true)
    expect(isFloat(1)).toBe(false)
    expect(isFloat(NaN)).toBe(false)
  })

  it('isData test', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date().getDay())).toBe(false)
    expect(isDate(new Date().getTime())).toBe(false)
    expect(isDate(Date.now())).toBe(false)
  })
  
  it('promise test', () => {
    expect(
      isPromise(Promise.resolve())
    ).toBe(true)

    expect(
      isPromise(Promise.resolve().then(() => 'then'))
    ).toBe(true)


    expect(
      isPromise(new Promise((resolve, reject) => {
        resolve(1)
      }))
    ).toBe(true)
  })

  it('isEmpty test', () => {
    expect(isEmpty(0)).toEqual(true)
    expect(isEmpty(false)).toEqual(true)
    expect(isEmpty(true)).toEqual(true)
    expect(isEmpty(null)).toEqual(true)
    expect(isEmpty(undefined)).toEqual(true)
    expect(isEmpty(function(){})).toEqual(false)
    expect(isEmpty('')).toEqual(true)
    expect(isEmpty([])).toEqual(true)
    expect(isEmpty({})).toEqual(true)
  })


  it('isEqual test', () => {
    const a = {
      name: 'cc'
    }
    const b = a
    const obj = {};
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual([], [])).toBe(true);
    expect(isEqual(obj, {})).toBe(true);
    expect(isEqual(a, b)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);


  })

})