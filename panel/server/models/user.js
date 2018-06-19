const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  salt: String,
}, {
  timestamps: true
})

schema.virtual('password').set((password) => {
  this._plainPassword = password

  if (password) {
    this.salt = crypto.randomBytes(128).toString('base64')
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
  } else {
    this.salt = undefined
    this.passwordHash = undefined
  }
}).get(() => {
  return this._plainPassword
})

schema.methods.checkPassword = (password) => {
  console.log(this.passwordHash)
  if (!password || !this.passwordHash) return false

  const passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')

  console.log(passwordHash)
  console.log(this.passwordHash)
  console.log(passwordHash === this.passwordHash)

  return passwordHash === this.passwordHash
}

module.exports = mongoose.model('User', schema)
