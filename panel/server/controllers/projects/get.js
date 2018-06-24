const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const router = require('../../helpers/router')
const config = require('../../../config/fpm')

const { projects } = config.paths

module.exports = router('/get', 'get', async () => {
  let dirs = null

  dirs = readdirSync(projects).map((name) => {
    return {
      name,
      path: join(projects, name)
    }
  })

  return dirs.filter(isDirectory)
})

function isDirectory (source) {
  return lstatSync(source.path).isDirectory()
}
