<p align="center">
	<a href="https://github.com/sevenns/fp-manager.js" title="Weery"><img src="./fpm-logo.png" width="128px"></a>
	<h3 align="center">fp-manager.js</h3>
</p>

<p align="center">Manager for your frontend work.</p>

### - Structure

- **logs** (logs all projects)
- **panel** (system panel for controlling all projects)
- **projects** (builds of all projects)

###### Structure example
- **logs**
	- test.log
	- awesome-site.log
- **panel**
- **projects**
	- test
		- ...
		- package.json
	- awesome-site
		- ...
		- package.json

### - Requirements

You need [nodejs](https://nodejs.org/en/) with npm (LTS version recommended)

### - Build Setup

``` bash
# go to panel/
$ cd ./panel

# install dependencies
$ npm install

# start mongodb service/daemon
# Note: Windows users must run from the administrator!
$ npm run db:start

# stop mongodb service/daemon
# Note: Windows users must run from the administrator!
#       Windows service will be deleted.
$ npm run db:stop

# serve with hot reload at localhost:8080
$ npm run dev

# craft svg icons (run once before npm run dev)
$ npm run icons

# build for production and launch server
$ npm run build
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://nuxtjs.org/guide) and [MongoDB docs](https://docs.mongodb.com/).
