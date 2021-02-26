const devConfig = require('./dev');
const ciConfig = require('./test');
const prodConfig = require('./prod');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodConfig;
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = ciConfig;
} else {
  module.exports = devConfig;
}