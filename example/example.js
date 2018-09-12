const HashCode = require('../src/index')

// Please refer to the examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#function-selector-and-argument-encoding

const oHashCode1 = new HashCode('f(uint,uint32[],bytes10,bytes)', [{value: 0x123, type: 'uint'}, {value: [0x456, 0x789], type: 'uint32[]'}, {value: '1234567890', type: 'bytes10'}, {value: 'Hello, world!', type: 'bytes'}])

oHashCode1.runHashCode()

const sByteCode1 = oHashCode1.getHashCode()
console.log(sByteCode1)

oHashCode1.showHashCodeFragments()

const oHashCode2 = new HashCode('g(uint[][],string[])', [{value: [[1, 2], [3]], type: 'uint[][]'}, {value: ['one', 'two', 'three'], type: 'string[]'}])

oHashCode2.runHashCode()

const sByteCode2 = oHashCode2.getHashCode()
console.log(sByteCode2)

oHashCode2.showHashCodeFragments()
