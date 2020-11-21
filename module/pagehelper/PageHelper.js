class PageHelper {
  constructor(pageNum, pageSize, where) {
    this.pageNum = pageNum
    this.pageIndex = ((pageNum - 1) < 0 ? 0 : (pageNum - 1)) * pageSize
    this.pageSize = pageSize
    this.where = where
  }
}

module.exports = PageHelper