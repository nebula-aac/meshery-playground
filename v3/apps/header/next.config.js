const NextFederationPlugin = require('@module-federation/nextjs-mf');
const dependencies = require("./package.json").dependencies

const remotes = (isServer) => {
    const location = isServer ? "ssr" : "chunks"
    return {
        dashboard: `dashboard@http://localhost:3000/_next/static/${location}/remoteEntry.js`
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        const { webpack } = options
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'header',
                    remotes: remotes(options.isServer),
                    exposes: {
                        './nav': './src/components/Header'
                    },
                    filename: 'static/chunks/remoteEntry.js',
                    shared: {
                        react: {
                            singleton: true,
                            requiredVersion: dependencies.react
                        },
                        'react-dom': {
                            singleton: true,
                            requiredVersion: dependencies['react-dom'],
                            eager: true,
                        },
                        'react/jsx-runtime': {
                            singleton: true,
                            requiredVersion: '0',
                        }
                    },
                    extraOptions: {
                        exposePages: true,
                        automaticAsyncBoundary: true,
                    },
                })
            )
        }
        return config
    }
}

module.exports = nextConfig
