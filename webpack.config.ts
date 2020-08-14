const path = require('path')
const webpack = require('webpack')

interface NodeEnv {
    NODE_ENV: string
}

module.exports = (env: NodeEnv) => {
    const src = 'src'
    const dist = 'dist'
    const devMode = 'development'
    const isDevelopment = env.NODE_ENV === devMode

    // const plugins = []
    // if (isDevelopment) {
    //     plugins.push(new webpack.NamedModulesPlugin())
    //     plugins.push(new webpack.HotModuleReplacementPlugin())
    // }

    const sourcePath = path.resolve(__dirname, src)

    const module = {
        rules: [
            {
                test: /\.(js|ts)$/,
                //exclude: /(node_modules)/,
                include: sourcePath,
                loader: 'babel-loader',
            },
        ],
    }

    return {
        entry: `./${src}/index.ts`,
        devtool: 'cheap-module-eval-source-map',
        output: {
            path: path.resolve(__dirname, `${dist}/`),
            filename: 'index.js',
            publicPath: `/${dist}/`,
        },
        mode: isDevelopment ? devMode : 'production',
        resolve: {
            extensions: ['.js', '.ts', '.json'],
            alias: {
                Utils: path.resolve(__dirname, `${src}/utils`),
            },
        },
        devServer: {
            contentBase: sourcePath,
            publicPath: `/${dist}/`,
            watchContentBase: true,
            // hotOnly: true,
        },
        module,
    }
}
