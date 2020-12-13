class User {

  constructor(obj) {
    if (typeof obj == 'undefined') {
      this.constructor1()
    } else {
      this.constructor2(obj._id, obj._openid, obj.uName, obj.uLoginName, obj.uPwd, obj.uWxId, obj.uWxName, obj.uWxImg, obj.uMobileNum, obj.UQqNum, obj.uEmail, obj.uInformation, obj.uGender, obj.cTime, obj.uTime, obj.status)
    }
  }

  constructor1(){}

  constructor2(_id, _openid, uName, uLoginName, uPwd, uWxId, uWxName, uWxImg, uMobileNum, UQqNum, uEmail, uInformation, uGender, cTime, uTime, uType, status) {
    this._id = _id
    this._openid = _openid
    this.uName = uName
    this.uLoginName = uLoginName
    this.uPwd = uPwd
    this.uWxId = uWxId
    this.uWxName = uWxName
    this.uWxImg = uWxImg
    this.uMobileNum = uMobileNum
    this.UQqNum = UQqNum
    this.uEmail = uEmail
    this.uInformation = uInformation
    this.uGender = uGender
    this.cTime = cTime
    this.uTime = uTime
    this.uType = uType ? uType : 1
    this.status = status
  }
}

module.exports = User