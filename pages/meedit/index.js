const database = require('../../module/controller/BaseConstroller.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
const User = require('../../module/model/User.js')
const app = getApp()
Component({
  data: {
    uName: '',
    uInfomation: '',
    _openid: '',
    _id: ''
  },
  ready: function (options) {
    var that = this;
    this.setData({
      uName: app.globalData.userInfo.uName,
      uInfomation: app.globalData.userInfo.uInfomation,
      _id: app.globalData.userInfo._id
    })
  },
  methods: {
    onSave() {
      // 保存
      let _user = new User();
      _user._id = this.data._id;
      _user.uName = this.data.uName;
      _user.uInfomation = this.data.uInfomation;
      console.log(this.data.uInfomation)
      database.edit('user', _user).then(res => {
        app.globalData.userInfo = {...app.globalData.userInfo,...this.data}
      })
    },
    changeName(value) {
      this.setData({
        uName: value.detail
      })
    },
    changeSignature(value) {
      this.setData({
        uInfomation: value.detail
      })
    }
  }
})