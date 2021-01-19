module.exports = {
    publicPath: "./",//打包后的位置(如果不设置这个静态资源会报404)
    outputDir: 'project-template',//打包后的目录名称
    devServer: {
        proxy: {
            '/var': {
                target: 'http://ip:port',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/var': ''
                }
            },
        },
        port: 8080
    },
}