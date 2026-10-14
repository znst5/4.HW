const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.dev.cjs');

const compiler = webpack(config);

const serverOptions = {
  port: 8080,
  host: 'localhost',
  ...config.devServer
};

const server = new WebpackDevServer(serverOptions, compiler);

const runServer = async () => {
  try {
    await server.start();
    if (process.send) {
      process.send('ok');
    }
  } catch (err) {
    console.error('Ошибка при запуске Е2Е сервера:', err);
    process.exit(1);
  }
};

runServer();
