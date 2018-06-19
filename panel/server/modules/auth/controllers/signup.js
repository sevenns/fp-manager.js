const User = require('../../../models/user')

module.exports = async (context) => {
  const data = context.request.body

  await User.create(data)

  return true
}
