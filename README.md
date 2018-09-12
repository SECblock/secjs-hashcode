# secjs-hashcode

Encoding for Contract Application Binary Interface (ABI), including function name and input parameter values, based on the rule https://solidity.readthedocs.io/en/develop/abi-spec.html
For further information in detail. Please refer to test cases and introduction in test/test.js.

<a name="MerkleTree"></a>

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard) 

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)]


* [HashCode](#HashCode)
    * [new HashCode(sFnName, aParaValue)](#new_HashCode_new)
    * [.getFnName()](#HashCode+getFnName) ⇒ <code>String</code>
    * [.getParaValue()](#HashCode+getParaValue) ⇒ <code>Array.&lt;Dict&gt;</code>
    * [.setFnName(sFnName)](#HashCode+setFnName)
    * [.setParaValue(aParaValue)](#HashCode+setParaValue)
    * [.runHashCode()](#HashCode+runHashCode)
    * [.getHashCode()](#HashCode+getHashCode) ⇒ <code>String</code>
    * [.getHashCodeFragments()](#HashCode+getHashCodeFragments) ⇒ <code>Array.&lt;String&gt;</code>
    * [.showHashCodeFragments()](#HashCode+runHashCode)


* * *
<a name="new_HashCode_new"></a>

### new HashCode(sFnName, aParaValue)
new HashCode(sFnName, aParaValue)
Constructs an Encoder.

| Param | Type | Description |
| --- | --- | --- |
| sFnName | <code>String</code> | The function name with the parenthesised list of parameter types. Parameter types are split by a single comma - no spaces are used. e.g. "sam(bytes,bool,uint[])"|
| aParaValue | <code>Array.&lt;Dict&gt;</code> | The array of input Parameter Values with its type. e.g. [{value: 'dave', type: 'bytes'}, {value: true, type: 'bool'}, {value: [1, 2, 3], type: 'uint[]'}]|


**Example**
```js
const HashCode = require('../src/index')

const sFnName = 'sam(bytes,bool,uint[])'
const aParaValue = [{value: 'dave', type: 'bytes'}, {value: true, type: 'bool'}, {value: [1, 2, 3], type: 'uint[]'}]
const oHashCode = new HashCode(sFnName, aParaValue)
```

* * *

<a name="HashCode+getFnName"></a>

### HashCode.getFnName() ⇒ <code>String</code>
Returns the current Function Name information.

**Example**
```js
const sFnName = oHashCode.getFnName()
```

* * *

<a name="HashCode+getParaValue"></a>

### HashCode.getParaValue() ⇒ <code>Array.&lt;Dict&gt;</code>
Returns the current input parameter values information.

**Example**
```js
const aParaValue = oHashCode.getParaValue()
```

* * *

<a name="HashCode+setFnName"></a>

### HashCode.setFnName(sFnName)
Set the Function Name.

**Example**
```js
const sFnName = 'sam(bytes,bool,uint[])'
oHashCode.setFnName(sFnName)
```

* * *

<a name="HashCode+setParaValue"></a>

### HashCode.setParaValue(aParaValue)
Set the input parameter values.

**Example**
```js
const aParaValue = [{value: 'dave', type: 'bytes'}, {value: true, type: 'bool'}, {value: [1, 2, 3], type: 'uint[]'}]
oHashCode.setParaValue(aParaValue)
```

* * *

<a name="HashCode+runHashCode"></a>

### HashCode.runHashCode()
Run the encoding based on current function name information and input parameter values

**Example**
```js
oHashCode.runHashCode(aParaValue)
```

* * *

<a name="HashCode+getHashCode"></a>

### HashCode.getHashCode() ⇒ <code>String</code>
Returns the endcoded Bytecode String.

**Example**
```js
const sByteCode = oHashCode1.getHashCode()
/*
An example for the format of result:
"8be6524600000000000000000000000000000000000000000000000000000000000001230000000000000000000000000000000000000000000000000000000000000080313233343536373839300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000004560000000000000000000000000000000000000000000000000000000000000789000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20776f726c642100000000000000000000000000000000000000"
*/
```

* * *

<a name="HashCode+getHashCodeFragments"></a>

### HashCode.getHashCodeFragments() ⇒ <code>Array.&lt;String&gt;</code>
Returns the array of encoded result of each element to have a better look and check.

**Example**
```js
const aHashCodeFragments = oHashCode1.getHashCodeFragments()
/*
An example for the format of result:
["8be65246",
"0000000000000000000000000000000000000000000000000000000000000123",
"0000000000000000000000000000000000000000000000000000000000000080",
"3132333435363738393000000000000000000000000000000000000000000000",
"00000000000000000000000000000000000000000000000000000000000000e0",
"0000000000000000000000000000000000000000000000000000000000000002",
"0000000000000000000000000000000000000000000000000000000000000456",
"0000000000000000000000000000000000000000000000000000000000000789",
"000000000000000000000000000000000000000000000000000000000000000d",
"48656c6c6f2c20776f726c642100000000000000000000000000000000000000"]
*/
```

* * *

<a name="HashCode+getHashCodeFragments"></a>

### HashCode.getHashCodeFragments() ⇒ <code>Array.&lt;String&gt;</code>
Show the encoded result of each element row by row in console to have a better look and check.

**Example**
```js
oHashCode1.showHashCodeFragments()
/*
An example for the console output:
8be65246
0000000000000000000000000000000000000000000000000000000000000123
0000000000000000000000000000000000000000000000000000000000000080
3132333435363738393000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000e0
0000000000000000000000000000000000000000000000000000000000000002
0000000000000000000000000000000000000000000000000000000000000456
0000000000000000000000000000000000000000000000000000000000000789
000000000000000000000000000000000000000000000000000000000000000d
48656c6c6f2c20776f726c642100000000000000000000000000000000000000
*/
```