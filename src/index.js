const keccak = require('keccak')

/**
* digest
* @desc Returns hash result
* @param {String} sFnName - Invoked Function Name
* @param {Array} aParaValue - Arrays of Input Parameters. [{value: "", type: ""}, {value: "", type: ""}, ...]
* @return {String}
* @example
* const hash = digest('sha256', 'a')
*/

class HashCode {
  constructor (sFnName, aParaValue) {
    this._sFnName = sFnName
    this._aParaValue = aParaValue
    this._sHashCode = ''
  }

  getFnName () {
    return this._sFnName
  }

  getParaValue () {
    return this._aParaValue
  }

  setFnName (sFnName) {
    this._sFnName = sFnName
  }

  setParaValue (aParaValue) {
    this._aParaValue = aParaValue
  }

  runHashCode () {
    let sRegExp = /uint(?![0-9])/g
    this._sFnName = this._sFnName.replace(sRegExp, 'uint256')
    let sFnHash = keccak('keccak256').update(this._sFnName).digest('hex').substring(0, 8)
    this._sHashCode += sFnHash
    let oPara
    for (let index = 0; index < this._aParaValue.length; index++) {
      oPara = this._aParaValue[index]
      if (oPara.dynamic) {
        this._sHashCode = this._sHashCode.substring(0, oPara.offsetIndex * 64 + 8) +
        ((this._sHashCode.length - 8) / 2).toString(16).padStart(64, '0') +
        this._sHashCode.substring((oPara.offsetIndex + 1) * 64 + 8)
      }
      let aReturn = this._getObjectHash(oPara)
      let sHashResult = aReturn[0]
      let bDynamicFlag = aReturn[1]
      this._sHashCode += sHashResult
      if (bDynamicFlag) {
        this._aParaValue.push({ value: oPara.value, type: oPara.type, dynamic: true, offsetIndex: index })
      }
    }
    /*
    this._aParaValue.forEach((oPara, index) => {
      let sHashResult = this._getObjectHash(oPara)[0]
      let bDynamicFlag = this._getObjectHash(oPara)[1]
      this._sHashCode += sHashResult
      if (bDynamicFlag) {
        this._aParaValue.push({ value: oPara.value, type: oPara.type, dynamic: true, offsetIndex: index })
      }
      if (oPara.dynamic) {
        this._sHashCode = this._sHashCode.substring(0, oPara.offsetIndex * 64) +
        (this._sHashCode.length / 2).toString(16) +
        this._sHashCode.substring((oPara.offsetIndex + 1) * 64, -1)
      }
    })
    */
  }

  getHashCode () {
    return this._sHashCode
  }

  showHashCodeFragments () {
    let sHashCode = this._sHashCode
    console.log(sHashCode.substring(0, 8))
    for (let i = 0; i < (sHashCode.length - 8) / 64; i++) {
      console.log(sHashCode.substring(i * 64 + 8, (i + 1) * 64 + 8))
    }
  }

  getHashCodeFragments () {
    let sHashCode = this._sHashCode
    let aFragments = []
    aFragments.push(sHashCode.substring(0, 8))
    for (let i = 0; i < (sHashCode.length - 8) / 64; i++) {
      aFragments.push(sHashCode.substring(i * 64 + 8, (i + 1) * 64 + 8))
    }

    return aFragments
  }

  _checkDynamic (obj) {
    let bDynamicFlag
    let sRegExp = /\[[0-9]*\]/i
    if (obj.dynamic) {
      bDynamicFlag = false
    } else {
      switch (obj.type) {
        case 'string':
          bDynamicFlag = true
          break
        case 'bytes':
          bDynamicFlag = true
          break
        default:
          if (obj.type.match(sRegExp)) {
            if (obj.type.match(sRegExp)[0] === '[]') {
              bDynamicFlag = true
            } else {
              bDynamicFlag = false
            }
          } else {
            bDynamicFlag = false
          }
          break
      }
    }
    return bDynamicFlag
  }

  _getObjectHash (obj, index) {
    let sHashCode
    let bDynamicFlag = this._checkDynamic(obj)
    if (bDynamicFlag) {
      sHashCode = '0'.padEnd(64, '0')
    } else {
      switch (typeof obj.value) {
        case 'number':
          sHashCode = this._getNumHash(obj)
          break
        case 'string':
          sHashCode = this._getStringHash(obj, bDynamicFlag)
          break
        case 'boolean':
          sHashCode = this._getBoolHash(obj)
          break

        default:
          if (Array.isArray(obj.value)) {
            sHashCode = this._getArrayHash(obj, bDynamicFlag)
          } else {
            throw TypeError('Please check the type of input parameters. (Accept only Number, String, Boolean and Array)')
          }
          break
      }
    }
    return [sHashCode, bDynamicFlag]
  }

  convertChinenseString () {
    let aParaValue = this._aParaValue
    for (var i = 0; i < aParaValue.length; i++) {
      this._aParaValue[i].value = escape(aParaValue[i].value)
    }
  }

  padJsonString () {
    let aParaValue = this._aParaValue
    for (var i = 0; i < aParaValue.length; i++) {
      this._aParaValue[i].value = aParaValue[i].value + '0'.repeat((32 - aParaValue[i].value.length % 32))
    }
  }

  _getStringHash (obj, bStringDynamicFlag) {
    let sResult = ''
    if (obj.dynamic) {
      sResult = this._getNumHash({value: obj.value.length, type: 'uint256'})
    }
    sResult += Buffer.from(obj.value, 'utf8').toString('hex').padEnd(64, '0')
    return sResult
  }

  _getNumHash (obj) {
    let sResult
    if (Number.isInteger(obj.value)) {
      sResult = obj.value.toString(16).padStart(64, '0')
    } else {
      let sIntPart = obj.value.toString().split('.')[0]
      let sDecimalPart = '0.' + obj.value.toString().split('.')[1]
      let sHashedIntPart = parseInt(sIntPart).toString(16).padStart(32, '0')
      let sHashedDecimalPart = parseFloat(sDecimalPart).toString(16).split('.')[1].padEnd(32, '0')
      sResult = sHashedIntPart + sHashedDecimalPart
    }

    return sResult
  }

  _getBoolHash (obj) {
    return obj.value.toString ? '1'.padStart(64, '0') : '0'.padStart(64, '0')
  }

  _getArrayHash (obj, bArrayDynamicFlag) {
    // let sResult = this._getNumHash(obj.length)
    let sResult = ''
    let sDynamicLength = ''
    if (obj.dynamic) {
      sDynamicLength = this._getNumHash({value: obj.value.length, type: 'uint256'})
    }

    // let aParaValue = JSON.parse(obj.value)
    let aParaValue = []
    let sRegExp = /\[[0-9]*\](.*)/i
    // console.log(obj)
    // console.log(sResult)
    // let sRegExpResult = obj.type.match(sRegExp)
    let sParaType = obj.type.split(sRegExp).join('')
    let oPara

    for (let i = 0; i < obj.value.length; i++) {
      aParaValue.push({value: obj.value[i], type: sParaType})
    }

    for (let index = 0; index < aParaValue.length; index++) {
      oPara = aParaValue[index]
      if (oPara.dynamic) {
        sResult = sResult.substring(0, oPara.offsetIndex * 64) +
        ((sResult.length) / 2).toString(16).padStart(64, '0') +
        sResult.substring((oPara.offsetIndex + 1) * 64)
      }
      let aReturn = this._getObjectHash(oPara)
      let sHashResult = aReturn[0]
      let bDynamicFlag = aReturn[1]
      sResult += sHashResult
      if (bDynamicFlag) {
        aParaValue.push({ value: oPara.value, type: oPara.type, dynamic: true, offsetIndex: index })
      }
    }

    return sDynamicLength + sResult
  }
}

module.exports = HashCode
