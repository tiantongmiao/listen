class PageHelper {
  constructor(pageNum, pageSize, where) {
    this.pageNum = pageNum ? pageNum : 1
    this.pageSize = pageSize ? pageSize : 10
    this.pageIndex = ((pageNum - 1) < 0 ? 0 : (pageNum - 1)) * pageSize
    this.where = where
  }
}

module.exports = PageHelper