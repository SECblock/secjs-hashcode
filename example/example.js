const HashCode = require('../src/index')
/*
// Please refer to the examples in https://solidity.readthedocs.io/en/develop/abi-spec.html#function-selector-and-argument-encoding

const oHashCode1 = new HashCode('f(uint,uint32[],bytes10,bytes)', [{value: 0x123, type: 'uint'}, {value: [0x456, 0x789], type: 'uint32[]'}, {value: '1234567890', type: 'bytes10'}, {value: 'Hello, world!', type: 'bytes'}])

oHashCode1.runHashCode()

const sByteCode1 = oHashCode1.getHashCode()
console.log(sByteCode1)

oHashCode1.showHashCodeFragments()
*/

let string = JSON.stringify({
  Name: '528234650366', // itemId in taobao
  Category: '110502', // categoryId in taobao
  Brand: '26683', // brandId in taobao
  Manufactory: 'DELL China', // Manufactory in taobao
  Seller: '2616970884', // userId in taobao
  Buyer: '18,185,61,169', // default
  SKU: '3717162853949', // skuId in taobao
  EAN: '0012300883436', // ASIN in amazon
  Price: '1349', //  price in taobao
  Currency: 'RMB', // in taobao
  Description: 'Dell/戴尔 U2414H 专业级显示器 23.8英寸电脑屏幕 IPS窄边框面板' // together with skuId
})

// string = escape(string)
// string = string + '0'.repeat((32 - string.length % 32))
const oHashCode2 = new HashCode('rawReturn(bytes)', [{value: string, type: 'bytes'}])

oHashCode2.convertChinenseString() // If there are chinese inside it

oHashCode2.padJsonString() // If the input is a JSON string

oHashCode2.runHashCode()

const sByteCode2 = oHashCode2.getHashCode()
console.log(sByteCode2)

oHashCode2.showHashCodeFragments()
