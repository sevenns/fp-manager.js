const { lstatSync, readdirSync } = require('fs')
const config = require('../../../../config/fpm')
const { join } = require('path')

const { paths } = config

module.exports = async (context) => {
  const dirs = readdirSync(paths.projects).map((name) => {
    return {
      name,
      path: join(paths.projects, name)
    }
  })

  return dirs.filter(isDirectory)
}

function isDirectory (source) {
  return lstatSync(source.path).isDirectory()
}
