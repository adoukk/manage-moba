const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: { 
        type: String,
        select: false, // 返回不会查询密码。
        set(val){
        return require('bcrypt').hashSync(val, 10) // 第二个参数值设定在10-12之间即可，表示安全级别，过高消耗性能
    } } // set: 设定为散列密码 npm i bcrypt
})

module.exports = mongoose.model('AdminUser', schema)