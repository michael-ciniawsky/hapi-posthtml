<img width="200" height="150" title="HapiJS" src="https://worldvectorlogo.com/logos/hapi.svg" /> <img align="right" width="220" height="150" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

## Install

```bash
(sudo) npm i -S hapi-posthtml
```

## Usage

```js
'use strict'

const Hapi = require('hapi')

let server = new Hapi.Server()

// Create a server with host and port
server.connection({
  host: 'localhost',
  port: 3000
})

// Register vision for view support
server.register(require('vision'), err => {
  if (err) {
    throw err
  }
  // Set up views with PostHTML
  server.views({
    path: 'public/views/',
    engines: {
      'html': require('hapi-posthtml')
    },
    relativeTo: __dirname,
    compileMode: 'async'
    compileOptions: {
      // Set PostHTML Plugins
      plugins: [/* Plugins */]
    }
  })
})

// Create route handlers
let handlers = {
  root: function (request, reply) {
    reply.view('index')
  },
  local: function (request, reply) {
    reply.view('index', {plugins: [/* Plugins */]})
  },
  extend: function (request, reply) {
    reply.view('index', {plugins: [/* Plugins */], extend: true})
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
```
