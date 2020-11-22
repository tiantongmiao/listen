Component({
  data: {
    name: '小姐姐',
    signature: '个性签名啊啊啊啊啊啊啊'
  },
  ready: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
  },
  methods: {
    onSave() {
      // 保存
      console.log(this.data.name)
      console.log(this.data.signature)
    },
    changeName(value) {
      this.setData({
        name: value.detail
      })
    },
    changeSignature(value) {
      this.setData({
        signature: value.detail
      })
    }
  }
})