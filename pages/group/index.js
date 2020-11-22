const database = require('../../module/controller/BaseConstroller.js')
const Dynamic = require('../../module/model/Dynamic.js')
const User = require('../../module/model/User.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
const utils = require('../../utils/util.js')
var app = getApp();
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
    showPop: false,
    editInput: '',
    triggered: false,
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
      }
    ]
  },
  ready: function (options) {
    this.init()
    // let page = new pageHelper(1, 10, {_openid: '{openid}'});
    // database.find('user', page).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    init() {
      let dy = new Dynamic();
      dy.dType = 1;
      dy.status = 1;
      let page = new pageHelper(1, 10, dy);
      database.find('dynamic', page).then(res => {
        console.log(res.data)
        // 获取对应用户信息
        res.data.map(item => {
          // 格式化时间
          item.cTime = utils.formatTime(item.cTime);
          this.getUser(item._openid)
          return item;
        })
        this.setData({
          listData: res.data
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getUser(id) {
      let user = new User();
      user._openid = id;
      let page = new pageHelper(1, 1, user);
      database.find('user', page).then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err)
      })
    },
    // 滚动到底部
    onScrollToLower() {
      console.log('到底啦，加载下一页')
    },
    // 刷新
    onRefresh(){
      // this._freshing为刷新的状态值
      if (this._freshing) return
      this._freshing = true
      this.init()
      setTimeout(() => {
        this.setData({
          triggered: false,
        })
        this._freshing = false
      }, 3000)
    },
    // 展示评论编辑区
    onShowEdit(e) {
      this.setData({
        hiddenEdit: !this.data.hiddenEdit
      })
    },
    // 删除功能
    onDel(e) {
      let dy = new Dynamic()
      dy._id = e.currentTarget.dataset.id
      database.del('dynamic', dy).then(res => {
        // console.log(res)
        this.init()
      }).catch(err => {
        console.log(err)
      })
    },
    onShowEditChange() {
      this.setData({
        hiddenEdit: !this.data.hiddenEdit
      })
    },
    obtainInput() {
      // 点击完成时， 触发 confirm 事件
      console.log('确认')
    },
    bindinput(e) {
      // 输入框失去焦点
      this.setData({
        editInput: e.detail.value
      })
    },
    onSaveAdd() {
      // 保存添加
      let dy = new Dynamic()
      dy.status = 1
      dy.dType = 1
      dy.dContent = this.data.editInput
      database.add('dynamic', dy).then(res => {
        // console.log(res)
        this.init()
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
