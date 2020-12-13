class PageHelper {
  constructor(pageNum, pageSize, where) {
    this.pageNum = pageNum ? pageNum : 1
    this.pageSize = pageSize ? pageSize : 10
    this.pageIndex = ((this.pageNum - 1) < 0 ? 0 : (this.pageNum - 1)) * this.pageSize
    this.where = where
  }
}

module.exports = PageHelper