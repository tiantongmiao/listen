Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 0
        })
      }
    }
  },
  data: {
    triggered: false,
    avatarUrl: '',
    nickName: '',
    hiddenEdit: true,
    listData: [
      {
        avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erficCx5mDicEFc4Unia7NJr33I20iaXwc4pBdAotcMLqyAjwibBuXYNTIk3TBhr9Vjfy0784Dh90Z8fYg/132",
        nickName: '小姐姐',
        content: '今天天气很好',
        // showMessage: false,
        messageList: [
          {
            name: '小A',
            message: '是啊，我也觉得'
          },
          {
            name: '小B',
            message: '我这边下雨哎'
          }
        ]
      },
      {
        avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erficCx5mDicEFc4Unia7NJr33I20iaXwc4pBdAotcMLqyAjwibBuXYNTIk3TBhr9Vjfy0784Dh90Z8fYg/132",
        nickName: '小姐姐',
        content: '今天天气很好',
        // showMessage: false,
        messageList: [
          {
            name: '小A',
            message: '是啊，我也觉得'
          },
          {
            name: '小B',
            message: '我这边下雨哎'
          }
        ]
      }
    ]
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
    // 滚动到底部
    onScrollToLower() {
      console.log('到底啦，加载下一页')
    },
    // 刷新
    onRefresh(){
      // this._freshing为刷新的状态值
      if (this._freshing) return
      this._freshing = true
      setTimeout(() => {
        this.setData({
          triggered: false,
        })
        this._freshing = false
      }, 3000)
    },
    // 展示留言区域
    // onShowMessage(e) {
    //   const index = e.currentTarget.dataset.index;
    //   let listData = this.data.listData;
    //   listData[index].showMessage = !e.currentTarget.dataset.showmessage;
    //   this.setData({
    //     listData
    //   })
    // },
    // 展示评论编辑区
    onShowEdit(e) {
      console.log(e)
      this.setData({
        hiddenEdit: !this.data.hiddenEdit
      })
    },
    // 删除功能
    onDel() {
      
    },
    onShowEditChange() {
      this.setData({
        hiddenEdit: !this.data.hiddenEdit
      })
    },
    obtainInput() {
      console.log('确认')
    }
  }
})
