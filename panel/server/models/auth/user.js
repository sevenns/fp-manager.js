const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  salt: String,
}, {
  timestamps: true
})

schema.virtual('password').set(function (password) {
  this._plainPassword = password

  if (password) {
    this.salt = crypto.randomBytes(16).toString('base64')
    this.passwordHash = crypto.pbkdf2Sync(
      password,
      this.salt,
      872791,
      32,
      'sha1'
    ).toString('base64')
  } else {
    this.salt = undefined
    this.passwordHash = undefined
  }
}).get(function () {
  return this._plainPassword
})

schema.methods.checkPassword = function (password) {
  if (!password || !this.passwordHash) return false

  const passwordHash = crypto.pbkdf2Sync(
    password,
    this.salt,
    872791,
    32,
    'sha1'
  ).toString('base64')

  return passwordHash === this.passwordHash
}

module.exports = mongoose.model('User', schema)
