const router = require('../../helpers/router')
const User = require('../../models/auth/user')

module.exports = router('/signup', 'post', async ({ context }) => {
  const data = context.request.body

  await User.create(data)
})
