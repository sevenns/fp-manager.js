const LocalStrategy = require('passport-local').Strategy

module.exports = async (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await fetchUser()
      done(null, user)
    } catch (error) {
      done(error)
    }
  })

  passport.use(new LocalStrategy(async (username, password, done) => {
    await fetchUser().then((user) => {
      if (username === user.username && password === user.password) {
        done(null, user)
      } else {
        done(null, false)
      }
    }).catch(error => done(error))
  }))
}

async function fetchUser () {
  // const userFromDb = await db.collection('users').findOne({ username, password })
  const user = { id: 827584375893, username: 'test', password: 'test' }

  // console.log(userFromDb)

  return user
}
