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
    listData: [],
    page: 1,
    showMore: false
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
      let page = new pageHelper(this.data.page, 10, dy);
      database.find('dynamic', page).then(res => {
        console.log(res)
        // 获取对应用户信息
        let _data = [...res.data, ...this.data.listData];
        _data.map((item, index) => {
          // 格式化时间
          if (typeof (item.cTime)!= 'string'){
            item.cTime = utils.formatTime(item.cTime);
          }
          this.getUser(item._openid).then(_users => {
            item['uName'] = _users.uName;
            item['uWxImg'] = _users.uWxImg;
            item['_openid'] = _users._openid;
            item['_id'] = _users._id;
            var obj = "listData[" + index + "]";
            this.setData({
              [obj]: item
            })
          });
          return item;
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async getUser(id) {
      let data = {};
      let user = new User();
      user._openid = id;
      let page = new pageHelper(1, 1, user);
      await database.find('user', page).then(res => {
        data = res.data[0]
      }).catch(err => {
        console.log(err)
      })
      return data;
    },
    // 滚动到底部
    onScrollToLower() {
      // console.log('到底啦，加载下一页')
      this.setData({
        showMore: true
      })
      setTimeout(() => {
        this.setData({
          showMore: true,
        })
        this.setData({
          page: this.data.page++
        });
        this.init();
      }, 3000)
      
    },
    // 刷新
    onRefresh(){
      // this._freshing为刷新的状态值
      if (this._freshing) return
      this._freshing = true
      this.init();
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
        editInput: '',
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
      this.onSaveAdd();
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
