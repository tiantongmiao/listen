const database = require('../../module/controller/BaseConstroller.js')
const pageHelper = require('../../module/pagehelper/PageHelper.js')
const User = require('../../module/model/User.js')
Component({
  data: {
    uName: '',
    uInfomation: '',
    _openid: ''
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
          uInfomation: res.data[0].uInfomation,
          _openid: res.data[0]._openid
        })
      })
  },
  methods: {
    onSave() {
      // 保存
      let _user = new User();
      _user._openid = this.data._openid;
      _user.uName = this.data.uName;
      _user.uInfomation = this.data.uInfomation;
      database.edit('user', _user).then(res => {
        console.log(res)
      })
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