const NextFederationPlugin = require('@module-federation/nextjs-mf');

const remotes = (isServer) => {
    const location = isServer ? "ssr" : "chunks"
    return {
        header: `header@http://localhost:3001/_next/static/${location}/remoteEntry.js`
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        const { webpack } = options
        if(!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'dashboard',
                    remotes: remotes(options.isServer),
                    exposes: {},
                    filename: 'static/chunks/remoteEntry.js',
                    shared: {},
                    extraOptions: {
                        exposePages: true,
                        automaticAsyncBoundary: true,
                    }
                })
            )
        }
        return config
    }
}

module.exports = nextConfig
