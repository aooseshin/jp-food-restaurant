const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      },
    }
  },
  outputDir: path.resolve(__dirname, '../server/public')
}