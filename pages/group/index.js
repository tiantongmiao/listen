const database = require('../../module/controller/BaseConstroller.js')
const Dynamic = require('../../module/model/Dynamic.js')
const User = require('../../module/model/User.js')
const Replay = require('../../module/model/Replay.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
const utils = require('../../utils/util.js')
import Dialog from '../../vant-weapp/dialog/dialog'
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 0
        })
      }
      if(app.globalData.userInfo == null) {
        app.userInfoReadyCallback = () => {
          this.setData({
            isAdmin: app.globalData.userInfo.uType == 2
          })
        }
      } else{
        this.setData({
          isAdmin: app.globalData.userInfo.uType == 2
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
    paged: 0,
    loading: false,
    noMore: false,
    loadingFailed: false,
    inputType: '',
    isAdmin: 1,
  },
  ready: function (options) {
    this.init(false, 1)
  },
  methods: {
    init(refresh, _page) {
      if(refresh) {
        this.setData({
          listData: [],
          noMore: false,
          loading: true
        })
      }
      if (_page) {
        this.setData({
          paged: _page
        })
      }
      let dy = new Dynamic();
      dy.dType = 1;
      dy.status = 1;
      if(!this.data.noMore){
        let paged = new pageHelper(_page, 10, dy);
        database.find('dynamic', paged).then(res => {
          // 获取对应用户信息
          let _data = [ ...this.data.listData, ...res.data];
          _data.map((item, index) => {
            // 格式化时间
            if (typeof (item.cTime)!= 'string'){
              item.cTime = utils.formatTime(item.cTime);
            }
            this.getUser(item._openid).then(_users => {
              item['uName'] = _users.uName;
              item['uWxImg'] = _users.uWxImg;
              let obj = "listData[" + index + "]";
              this.setData({
                [obj]: item
              })
            });
            this.getReplay(item._id).then(_replay => {
              item['messageList'] = _replay
              let mlist = "listData[" + index + "]";
              this.setData({
                [mlist]: item
              })
              _replay.map((_item, uindex) => {
                this.getUser(_item._openid).then(_userd => {
                  item.messageList[uindex]['uName'] = _userd.uName;
                  let ulist = "listData[" + index + "]"
                  this.setData({
                    [ulist]: item
                  })
                })
              })
            })
            let replay = new Replay()
            replay.rTarget = item._id
            replay.status = 1
            replay.rType = 2
            database.count('replay', replay).then(res => {
              if (res.total > 3) {
                item['showMoreReplay'] = true
                let s = "listData[" + index + "]";
                this.setData({
                  [s]: item
                })
              } else {
                item['showMoreReplay'] = false
                let s = "listData[" + index + "]";
                this.setData({
                  [s]: item
                })
              }
            })
            return item;
          });
          database.count('dynamic', dy).then(res => {
            if (_data.length < res.total) {
              this.setData({
                noMore: false,
                loading: false
              })
            } else {
              this.setData({
                noMore: true,
                loading: false
              })
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取用户信息
    async getUser(id) {
      let data = {};
      let user = new User();
      user._openid = id;
      let paged = new pageHelper(1, 1, user);
      await database.find('user', paged).then(res => {
        data = res.data[0]
      }).catch(err => {
        console.log(err)
      })
      return data;
    },
    // 获取回复
    async getReplay(id) {
      let data = {};
      let replay = new Replay();
      replay.rTarget = id
      replay.status = 1
      replay.rType = 2
      let paged = new pageHelper(1, 3, replay);
      await database.find('replay', paged).then(res => {
        data = res.data
      }).catch(err => {
        console.log(err)
      })
      return data;
    },
    // 滚动到底部
    onScrollToLower(e) {
      //到底啦，加载下一页
      if (!this.data.noMore) {
        this.setData({
          loading: true
        })
        let _page = Number(e.currentTarget.dataset.page);
        _page++;
        this.init(false, _page);
      } else {
        setTimeout(() => {
          this.setData({
            loading: false
          })
        }, 2000)
      }
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
        this.init(true);
      }, 3000)
    },
    // 展示评论编辑区
    onShowEdit(e) {
      if (e.currentTarget.dataset.type) {
        const url = '/pages/detail/index?_id=' + e.currentTarget.dataset.id
        wx.redirectTo({ url })
      } else {
        this.setData({
          editInput: '',
          hiddenEdit: !this.data.hiddenEdit
        })
      }
    },
    // 删除功能
    onDel(e) {
      // 删除动态评论
      Dialog.confirm({
        message: '确定删除？',
      }).then(() => {
          // on confirm
          let replay = new Replay();
          replay.rTarget = e.currentTarget.dataset.id
          console.log(replay)
          database.del('replay', replay).then(res => {
            // 删除动态
            let dy = new Dynamic()
            dy._id = e.currentTarget.dataset.id
            database.del('dynamic', dy).then(res => {
              // 重新加载页面数据
              this.init(true)
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        })
    },
    onShowEditChange() {
      this.setData({
        hiddenEdit: !this.data.hiddenEdit
      })
    },
    bindinput(e) {
      // 输入框失去焦点
      this.setData({
        editInput: e.detail.value
      })
    },
    onSaveAdd() {
      // 保存
      let dy = new Dynamic()
      dy.status = 1
      dy.dType = 1
      dy.dContent = this.data.editInput
      database.add('dynamic', dy).then(res => {
        this.setData({
          noMore:false,
          listData: [],
          paged: 1
        })
        this.init()
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
