//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.cloud) {
      console.error("云不存在")
    } else {
      wx.cloud.init({
        env: 'listen-2gskorawde4c93ea',
        traceUser: true,
      })
      this.globalData.db = wx.cloud.database()
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // console.log("已授权");
          wx.getUserInfo({
            success: res => {
              wx.switchTab({
                url: '/pages/group/index',
              })
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = { ...this.globalData.userInfo,...res.userInfo}

              this.globalData.db.collection('user')
                .where({_openid: '{openid}'})
                .get().then(res => {
                  console.log(res)
                  if(res.data && res.data.length > 0) {
                    let _user = res.data[0]
                    this.globalData.userInfo = { ...this.globalData.userInfo,...res.data[0]}
                  }
                })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("未授权");
          wx.redirectTo({
            url: '/pages/auth/index',
          })
        }
      }
    })
  },
  globalData: {
    db: null,
    userInfo: null,
  }
})