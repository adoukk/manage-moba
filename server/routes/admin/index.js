module.exports = app => {
    const express = require('express')
    const path = require('path');
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams: true   //合并参数
    })
    
    // const Category = require('../../models/Category')
    
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })
    // 资源列表
    router.get('/', async (req, res) => {
        
        const queryOption = {}
        if (req.Model.modelName === 'Category') {
            queryOption.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOption).limit(100) // populate('parent'):关联数据库对象
        res.send(items)
    })
    
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    // 通用crud接口
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware() ,router)  


    // 上传图片接口
    // npm i multer 专门处理上传数据的中间件
    const multer = require('multer')
    //dest:目标地址
    const upload = multer({ dest: path.join(__dirname, '/../../uploads')}) 

    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        // 中间件将file加到了req上
        const file = req.file 
        // 不需要加属性url 直接可以使用 path 相关vue页面，将res.url改成res.path
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户
        
        // const user = await AdminUser.findOne({
        //     username: username
        // })
        // 简写
        // .select('+password') 查询密码
        const user = await AdminUser.findOne({username}).select('+password')
        // 抛出异常
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        // 2.校验用户密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 3.返回token
        
        // 生成token
        const token = jwt.sign({
            id: user._id,
            // _id: user._id,
            // username: user.username
            // 第二个参数：密钥 index.js中全局设定了
        },app.get('secret')) //根据参数名判断是获取配置还是请求，一个参数表示配置
        
        res.send({token})
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}