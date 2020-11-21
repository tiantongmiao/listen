class Replay {

  constructor(obj) {
    if (typeof obj == 'undefined') {
      this.constructor1()
    } else {
      this.constructor2(obj._id, obj._openid, obj.rTarget, obj.rTargetUser, obj.rSource, obj.rSourceUser, obj.rContent, obj.rType, obj.cTime, obj.uTime, obj.status)
    }
  }

  constructor1() {}

  constructor2(_id, _openid, rTarget, rTargetUser, rSource, rSourceUser, rContent, rType, cTime, uTime, status) {
    this._id = _id
    this._openid = _openid
    this.rTarget = rTarget
    this.rTargetUser = rTargetUser
    this.rSource = rSource
    this.rSourceUser = rSourceUser
    this.rContent = rContent
    this.rType = rType
    this.cTime = cTime
    this.uTime = uTime
    this.status = status
  }
}

module.exports = Replay