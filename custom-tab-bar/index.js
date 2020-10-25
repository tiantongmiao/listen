Component({
  data: {
    active: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/group/index",
        icon: "records",
        text: "倾听"
      }, 
      {
        pagePath: "/pages/me/index",
        icon: "user-o",
        text: "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    onChange(e) {
      const url = this.data.list[e.detail].pagePath
      wx.switchTab({url})
      this.setData({
        active: e.detail
      })
    }
  }
})