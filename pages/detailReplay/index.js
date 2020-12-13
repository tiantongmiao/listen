const database = require('../../module/controller/BaseConstroller.js')
const MBoard = require('../../module/model/MBoard.js')
const User = require('../../module/model/User.js')
const Replay = require('../../module/model/Replay.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
const utils = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    showPop: false,
    editInput: '',
    triggered: false,
    hiddenEdit: true,
    messageList: [],
    listObj: {},
    oid: '',
    paged: 0,
    loading: false,
    noMore: false,
    loadingFailed: false,
    inputType: '',
    isAdmin: false,
  },
  onLoad(options) {
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
    // options._id ---动态或者留言的_id
    this.setData({
      oid: options._id
    })
    this.getMBoard()
    this.getmList(false, 1)
  },
  //获取动态信息
  getMBoard() {
    let mboard = new MBoard()
    mboard._id = this.data.oid;
    let paged = new pageHelper(1, 1, mboard);
    database.find('mboard', paged).then(res => {
      let _obj = res.data[0]
      _obj.cTime = utils.formatTime(_obj.cTime)
      this.setData({
        listObj: _obj
      })
      this.getUser(_obj._openid).then(_users => {
        this.setData({
          "listObj.uName": _users.uName,
          "listObj.uWxImg": _users.uWxImg
        })
      });
    })
  },
  //获取回复列表
  getmList(refresh, _page) {
    if(refresh) {
      this.setData({
        messageList: [],
        noMore: false,
        loading: true
      })
    }
    this.setData({
      paged: _page
    })
    if(!this.data.noMore){
      let replay = new Replay()
      replay.rTarget = this.data.oid
      replay.status = 1
      replay.rType = 2
      let paged = new pageHelper(_page, 10, replay);
      database.find('replay', paged).then(res => {
        console.log(res)
        let _arr = [...this.data.messageList,...res.data]
        this.setData({
          messageList: _arr
        })
        console.log(_arr)
        _arr.map((item, index) => {
          this.getUser(item._openid).then(_users => {
            item['uName'] = _users.uName;
            item['uWxImg'] = _users.uWxImg;
            var obj = "messageList[" + index + "]";
            this.setData({
              [obj]: item
            })
          });
          return item;
        });
        database.count('replay', replay).then(res => {
          console.log(this.data.messageList.length)
          if (this.data.messageList.length < res.total) {
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
  // 滚动到底部
  onScrollToLower(e) {
    //到底啦，加载下一页
    if (!this.data.noMore) {
      this.setData({
        loading: true,
      })
      let _page = Number(e.currentTarget.dataset.page);
      _page++;
      this.getmList(false, _page);
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
      this.getmList(true);
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
    // 删除动态评论
    let replay = new Replay();
    replay.rTarget = e.currentTarget.dataset.id
    database.del('replay', replay).then(res => {
      // 删除动态
      let mboard = new MBoard()
      mboard._id = e.currentTarget.dataset.id
      database.del('mboard', mboard).then(res => {
        this.getmList(true)
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
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
    // 保存添加
    let replay = new Replay()
    replay.rType = 2
    replay.rContent = this.data.editInput
    replay.rTarget = this.data.listObj._id
    replay.status = 1
    database.add('replay', replay).then(res => {
      // 刷新页面
      this.getmList(true)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    init(refresh) {
      if(refresh) {
        this.setData({
          listData: [],
          noMore: false,
          loading: true
        })
      }
      let mboard = new MBoard();
      mboard.dType = 1;
      mboard.status = 1;
      if(!this.data.noMore){
        let paged = new pageHelper(this.data.paged, 10, mboard);
        database.find('mboard', paged).then(res => {
          // 获取对应用户信息
          let _data = [...res.data, ...this.data.listData];
          
        }).catch(err => {
          console.log(err)
        })
      }
    },
    
    // 获取状态留言
    async getReplay(id) {
      let data = {};
      let replay = new Replay();
      replay.rTarget = id
      replay.status = 1
      replay.rType = 2
      let paged = new pageHelper(1, 1, replay);
      await database.find('replay', paged).then(res => {
        // console.log(res)
        //data = res.data[0]
      }).catch(err => {
        console.log(err)
      })
      //return data;
    }
  }
})
