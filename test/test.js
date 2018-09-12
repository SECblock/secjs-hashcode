const HashCode = require('../src/index')
const assert = require('assert')
// create a new VM instance
describe('secjs hashcode test', () => {
  it('should return correct hashed code with function baz(uint32,bool) and values (69, true))', () => {
    // The signature is defined as the canonical expression of the basic prototype
    // i.e. the function name with the parenthesised list of parameter types.
    // Parameter types are split by a single comma - no spaces are used.
    let sInputFnSignature = 'baz(uint32,bool)'
    let aInputParaValue = [
      {value: 69, type: 'uint32'},
      {value: true, type: 'bool'}
    ]
    let oHashCode = new HashCode(sInputFnSignature, aInputParaValue)

    // Retrieved from examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
    let expectedResults = ['cdcd77c0',
      '0000000000000000000000000000000000000000000000000000000000000045',
      '0000000000000000000000000000000000000000000000000000000000000001']
    // Run Encoding
    oHashCode.runHashCode()

    let aHashCodeFragments = oHashCode.getHashCodeFragments()
    assert.strictEqual(aHashCodeFragments.length, expectedResults.length)

    for (let i = 0; i < aHashCodeFragments.length; i++) {
      assert.strictEqual(aHashCodeFragments[i], expectedResults[i])
    }
    // const sByteCode1 = oHashCode.getHashCode()
    // console.log('Final Result is: ', sByteCode1)
    // oHashCode.showHashCodeFragments()
  })

  it('should return correct hashed code with function bar(bytes3[2]) and values (["abc", "def"])', () => {
    // The signature is defined as the canonical expression of the basic prototype
    // i.e. the function name with the parenthesised list of parameter types.
    // Parameter types are split by a single comma - no spaces are used.
    let sInputFnSignature = 'bar(bytes3[2])'
    let aInputParaValue = [
      {value: ['abc', 'def'], type: 'bytes3[2]'}
    ]
    let oHashCode = new HashCode(sInputFnSignature, aInputParaValue)

    // Retrieved from examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
    let expectedResults = ['fce353f6',
      '6162630000000000000000000000000000000000000000000000000000000000',
      '6465660000000000000000000000000000000000000000000000000000000000']
    // Run Encoding
    oHashCode.runHashCode()

    let aHashCodeFragments = oHashCode.getHashCodeFragments()
    assert.strictEqual(aHashCodeFragments.length, expectedResults.length)

    for (let i = 0; i < aHashCodeFragments.length; i++) {
      assert.strictEqual(aHashCodeFragments[i], expectedResults[i])
    }
    // const sByteCode1 = oHashCode.getHashCode()
    // console.log('Final Result is: ', sByteCode1)
    // oHashCode.showHashCodeFragments()
  })

  it('should return correct hashed code with function sam(bytes,bool,uint[]) and values ("dave", true, [1,2,3])', () => {
    // The signature is defined as the canonical expression of the basic prototype
    // i.e. the function name with the parenthesised list of parameter types.
    // Parameter types are split by a single comma - no spaces are used.
    let sInputFnSignature = 'sam(bytes,bool,uint[])'
    let aInputParaValue = [
      {value: 'dave', type: 'bytes'},
      {value: true, type: 'bool'},
      {value: [1, 2, 3], type: 'uint[]'}
    ]
    let oHashCode = new HashCode(sInputFnSignature, aInputParaValue)

    // Retrieved from examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#examples
    let expectedResults = ['a5643bf2',
      '0000000000000000000000000000000000000000000000000000000000000060',
      '0000000000000000000000000000000000000000000000000000000000000001',
      '00000000000000000000000000000000000000000000000000000000000000a0',
      '0000000000000000000000000000000000000000000000000000000000000004',
      '6461766500000000000000000000000000000000000000000000000000000000',
      '0000000000000000000000000000000000000000000000000000000000000003',
      '0000000000000000000000000000000000000000000000000000000000000001',
      '0000000000000000000000000000000000000000000000000000000000000002',
      '0000000000000000000000000000000000000000000000000000000000000003']
    // Run Encoding
    oHashCode.runHashCode()

    let aHashCodeFragments = oHashCode.getHashCodeFragments()
    assert.strictEqual(aHashCodeFragments.length, expectedResults.length)

    for (let i = 0; i < aHashCodeFragments.length; i++) {
      assert.strictEqual(aHashCodeFragments[i], expectedResults[i])
    }
    // const sByteCode1 = oHashCode.getHashCode()
    // console.log('Final Result is: ', sByteCode1)
    // oHashCode.showHashCodeFragments()
  })

  it('should return correct hashed code with function f(uint,uint32[],bytes10,bytes) and values (0x123, [0x456, 0x789], "1234567890", "Hello, world!")', () => {
    // The signature is defined as the canonical expression of the basic prototype
    // i.e. the function name with the parenthesised list of parameter types.
    // Parameter types are split by a single comma - no spaces are used.
    let sInputFnSignature = 'f(uint,uint32[],bytes10,bytes)'
    let aInputParaValue = [
      {value: 0x123, type: 'uint'},
      {value: [0x456, 0x789], type: 'uint32[]'},
      {value: '1234567890', type: 'bytes10'},
      {value: 'Hello, world!', type: 'bytes'}
    ]
    let oHashCode = new HashCode(sInputFnSignature, aInputParaValue)

    // Retrieved from examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#use-of-dynamic-types
    let expectedResults = ['8be65246',
      '0000000000000000000000000000000000000000000000000000000000000123',
      '0000000000000000000000000000000000000000000000000000000000000080',
      '3132333435363738393000000000000000000000000000000000000000000000',
      '00000000000000000000000000000000000000000000000000000000000000e0',
      '0000000000000000000000000000000000000000000000000000000000000002',
      '0000000000000000000000000000000000000000000000000000000000000456',
      '0000000000000000000000000000000000000000000000000000000000000789',
      '000000000000000000000000000000000000000000000000000000000000000d',
      '48656c6c6f2c20776f726c642100000000000000000000000000000000000000']
    // Run Encoding
    oHashCode.runHashCode()

    let aHashCodeFragments = oHashCode.getHashCodeFragments()
    assert.strictEqual(aHashCodeFragments.length, expectedResults.length)

    for (let i = 0; i < aHashCodeFragments.length; i++) {
      assert.strictEqual(aHashCodeFragments[i], expectedResults[i])
    }
    // const sByteCode1 = oHashCode.getHashCode()
    // console.log('Final Result is: ', sByteCode1)
    // oHashCode.showHashCodeFragments()
  })

  it('should return correct hashed code with function g(uint[][],string[]) and values ([[1, 2], [3]], ["one", "two", "three"])', () => {
    // The signature is defined as the canonical expression of the basic prototype
    // i.e. the function name with the parenthesised list of parameter types.
    // Parameter types are split by a single comma - no spaces are used.
    let sInputFnSignature = 'g(uint[][],string[])'
    let aInputParaValue = [
      {value: [[1, 2], [3]], type: 'uint[][]'},
      {value: ['one', 'two', 'three'], type: 'string[]'}
    ]
    let oHashCode = new HashCode(sInputFnSignature, aInputParaValue)

    // Retrieved from examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#use-of-dynamic-types
    let expectedResults = ['2289b18c',
      '0000000000000000000000000000000000000000000000000000000000000040',
      '0000000000000000000000000000000000000000000000000000000000000140',
      '0000000000000000000000000000000000000000000000000000000000000002',
      '0000000000000000000000000000000000000000000000000000000000000040',
      '00000000000000000000000000000000000000000000000000000000000000a0',
      '0000000000000000000000000000000000000000000000000000000000000002',
      '0000000000000000000000000000000000000000000000000000000000000001',
      '0000000000000000000000000000000000000000000000000000000000000002',
      '0000000000000000000000000000000000000000000000000000000000000001',
      '0000000000000000000000000000000000000000000000000000000000000003',
      '0000000000000000000000000000000000000000000000000000000000000003',
      '0000000000000000000000000000000000000000000000000000000000000060',
      '00000000000000000000000000000000000000000000000000000000000000a0',
      '00000000000000000000000000000000000000000000000000000000000000e0',
      '0000000000000000000000000000000000000000000000000000000000000003',
      '6f6e650000000000000000000000000000000000000000000000000000000000',
      '0000000000000000000000000000000000000000000000000000000000000003',
      '74776f0000000000000000000000000000000000000000000000000000000000',
      '0000000000000000000000000000000000000000000000000000000000000005',
      '7468726565000000000000000000000000000000000000000000000000000000']
    // Run Encoding
    oHashCode.runHashCode()

    let aHashCodeFragments = oHashCode.getHashCodeFragments()
    assert.strictEqual(aHashCodeFragments.length, expectedResults.length)

    for (let i = 0; i < aHashCodeFragments.length; i++) {
      assert.strictEqual(aHashCodeFragments[i], expectedResults[i])
    }
    // const sByteCode1 = oHashCode.getHashCode()
    // console.log('Final Result is: ', sByteCode1)
    // oHashCode.showHashCodeFragments()
  })
})
