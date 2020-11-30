
module.exports = function override(config, env) {
  config.output.publicPath = './';
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' }
  })
  return config;
}