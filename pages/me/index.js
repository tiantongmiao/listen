const database = require('../../module/controller/BaseConstroller.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
const User = require('../../module/model/User.js')
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 1
        })
      }
    }
  },
  data: {
    uName: '',
    uWxImg: '',
    uInfomation: '',
    isAdmin: false,
  },
  ready: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    database.find('user', new pageHelper(1, 1, { _openid: '{openid}' }))
      .then(res => {
        this.setData({
          uName: res.data[0].uName,
          uWxImg: res.data[0].uWxImg,
          uInfomation: res.data[0].uInfomation,
        })
      })
    this.setData({
      isAdmin: app.globalData.userInfo.uType == 2
    })
  },
  methods: {
    toEdit() {
      const url = '/pages/meedit/index'
      wx.redirectTo({ url })
    },
    toNote(){
      const url = '/pages/note/index'
      wx.redirectTo({ url })
    }
  }
})