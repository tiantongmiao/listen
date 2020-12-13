const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection(event.table)
    .where(event.page.where)
    .orderBy('cTime', 'desc')
    .orderBy('uTime', 'desc')
    .skip(event.page.pageIndex)
    .limit(event.page.pageSize)
    .get()
  } catch(e) {
    console.error(e)
  }
}
