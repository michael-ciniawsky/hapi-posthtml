// ------------------------------------
// #POSTHTML - HAPI
// ------------------------------------

'use strict'

const posthtml = require('posthtml')

module.exports = {
  compile: (template, options) => {
    console.log(options)
    let plugins

    if (!options.plugins) {
      plugins = []
    } else {
      plugins = options.plugins
    }

    return (context, options) => {
      return posthtml(plugins)
        .process(template, {sync: true})
        .html
    }
  }
}
