const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: false,
  },
}

module.exports = withBundleAnalyzer(config)
