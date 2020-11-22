const database = require('../../module/controller/BaseConstroller.js')
const Dynamic = require('../../module/model/Dynamic.js')
const User = require('../../module/model/User.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
Component({
  data: {
    
  },
  ready: function (options) {
    
  },
  methods: {
    bindGetUserInfo(e) {
      var that = this;
      const userInfo= e.detail.userInfo;
      if (userInfo) {
        //用户按了允许授权按钮
        wx.switchTab({
          url: '/pages/group/index',
        })
      } else {
        wx.showModal({
          content: "您已拒绝授权",
          showCancel: false,
          confirmText: '知道了',
          success: function (res) {
          }
        })
      }
    }
  }
})
