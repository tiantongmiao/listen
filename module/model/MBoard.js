class MBoard {

  constructor(obj) {
    if (typeof obj == 'undefined') {
      this.constructor1()
    } else {
      this.constructor2(obj._id, obj._openid, obj.mTargetId, obj.mSourceId, obj.mContent, obj.cTime, obj.uTime, obj.status)
    }
  }

  constructor1() {}

  constructor2(_id, _openid, mTargetId, mSourceId, mContent, cTime, uTime, status) {
    this._id = _id
    this._openid = _openid
    this.mTargetId = mTargetId
    this.mSourceId = mSourceId
    this.mContent = mContent
    this.cTime = cTime
    this.uTime = uTime
    this.status = status
  }
}

module.exports = MBoard