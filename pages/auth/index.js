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
        database.find('user', new pageHelper(1, 1, { _openid: '{openid}' }))
          .then(res => {
            if (res.data && res.data.length == 0) {
              let user = new User();
              user.uName = userInfo.nickName;
              user.uWxImg = userInfo.avatarUrl;
              user.uInfomation = "";
              database.add('user', user).then(res => {
                console.log(res)
              })
            }
          })
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
