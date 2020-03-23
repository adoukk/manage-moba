const express = require('express')

const app = express()
// 全局设定密钥，正常情况下应该是设置到环境变量里的
app.set('secret', 'i2u34y120i3u4y8')

//跨域
app.use(require('cors')()) 

// json
app.use(express.json()) 

//托管静态资源文件
app.use('/uploads', express.static(__dirname + '/uploads')) 

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000,() => {
    console.log('http://localhost:3000')
})