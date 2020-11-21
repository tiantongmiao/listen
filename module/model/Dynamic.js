class Dynamic {

  constructor(obj) {
    if (typeof obj == 'undefined') {
      this.constructor1()
    } else {
      this.constructor2(obj._id, obj._openid, obj.dOwnerId, obj.dContent, obj.dType, obj.cTime, obj.uTime, obj.status)
    }
  }

  constructor1() {}

  constructor2(_id, _openid, dOwnerId, dContent, dType, cTime, uTime, status) {
    this._id = _id
    this._openid = _openid
    this.dOwnerId = dOwnerId
    this.dContent = dContent
    this.dType = dType
    this.cTime = cTime
    this.uTime = uTime
    this.status = status
  }
}

module.exports = Dynamic