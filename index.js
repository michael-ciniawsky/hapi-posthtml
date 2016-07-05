// ------------------------------------
// #HAPI - POSTHTML
// ------------------------------------

'use strict'

const posthtml = require('posthtml')

module.exports = {
  compile: (html, options, next) => {
    let plugins

    if (!options.plugins) {
      plugins = []
    } else {
      plugins = options.plugins
    }

    let async = (typeof next === 'function')

    if (async) {
      if (options.plugins) {
        plugins.concat(options.plugins)
      }

      return next(null, (context, options, next) => {
        posthtml(plugins)
          .process(html)
          .then(result => next(null, result.html))
      })
    }

    return (context, options) => {
      if (options.plugins) {
        plugins.concat(options.plugins)
      }

      return posthtml(plugins)
        .process(html, {sync: true})
        .html
    }
  }
}
