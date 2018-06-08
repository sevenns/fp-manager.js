const { readdirSync } = require('fs')
const config = require('../../../../config/fpm')

const { paths } = config

module.exports = async () => {
  const dirs = []

  readdirSync(paths.projects).map((name) => {
    dirs.push(name)

    return name
  })

  return dirs
}
