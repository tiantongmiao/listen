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
    userImg: '',
    name: ''
  },
  ready: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          'userImg': res.userInfo.avatarUrl,
          'name': res.userInfo.nickName,
        })
      }
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