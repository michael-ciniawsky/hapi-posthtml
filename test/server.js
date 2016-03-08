'use strict'

const Hapi = require('hapi')

let server = new Hapi.Server()

// Create a server with host and port
server.connection({
  host: 'localhost',
  port: 3000
})

server.register(require('vision'), err => {
  if (err) {
    throw err
  }

  server.views({
    path: 'public/views/',
    engines: {
      'html': require('../index.js')
    },
    relativeTo: __dirname,
    compileMode: 'async',
    compileOptions: {
      plugins: [ require('posthtml-bem')() ]
    }
  })
})

// Create route handlers
let handlers = {
  root: function (request, reply) {
    reply.view('index')
  },

  local: function (request, reply) {
    reply.view('index')
  },

  extend: function (request, reply) {
    reply.view('index')
  }
}

// Add the routes
server.route({
  method: 'GET',
  path: '/',
  handler: handlers.root
})

server.route({
  method: 'GET',
  path: '/local',
  handler: handlers.local
})

server.route({
  method: 'GET',
  path: '/extend',
  handler: handlers.extend
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('=> Server:', server.info.uri)
})
