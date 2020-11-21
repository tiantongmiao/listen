const app = getApp()
const db = app.globalData.db

const insert = (table, data) => {
  data.cTime = new Date()
  return db.collection(table)
  .add({
    data: data
  })
}

const update = (table, data, where) => {
  data.uTime = new data()
  const _id = data._id
  where = where ? where : {_id}
  delete data._id
  delete data._openid
  return db.collection(table)
  .where(where)
  .update({
    data: data
  })
}

const search =  (table, page) => {
  return db.collection(table)
  .where(page.where)
  .orderBy('cTime', 'desc')
  .orderBy('uTime', 'desc')
  .skip(page.pageIndex)
  .limit(page.pageSize)
  .get()
}

const remove = (table, data) => {
  return db.collection(table)
  .where(data)
  .remove()
}

const count = (table, where) => {
  return db.collection(table)
  .where(where)
  .count()
}

module.exports = {
  add: insert,
  del: remove,
  edit: update,
  find: search,
  count: count
}