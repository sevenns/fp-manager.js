const paths = require('./paths')

module.exports = {
  host: 'localhost',
  port: 8080,
  static: paths.static,
  jwtsecret: '4>*UX9O3hF|$a+6',

  session: {
    secrets: ['S1];%]7_?n=[vWJ', '[+)^b>6{|BuY7rV'],
    options: {
      key: 'fpm:sess',
      maxAge: 604800000 // 1 week
    }
  }
}
