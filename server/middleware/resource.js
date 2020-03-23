module.exports = () => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource) // inflection:将小写复数名称转为类名categories => Category
        req.Model = require(`../models/${modelName}`)
        await next()
    }
} 