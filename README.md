[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]

<div align="center">
  <img width="200" height="150" title="Hapi" src="https://worldvectorlogo.com/logos/hapi.svg" />
  <img width="220" height="150" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  <h1>Hapi PostHTML</h1>
</div>

## Install

```bash
npm i -S hapi-posthtml
```

## Usage

```js
'use strict'

import Hapi from 'hapi'

import vision from 'vision'
import posthtml from 'hapi-posthtml'

const server = new Hapi.Server()

// Create server
server.connection({
  host: 'localhost',
  port: 3000
})

// Vision for view support
server.register(vision, err => {
  if (err) {
    throw err
  }
  // PostHTML
  server.views({
    path: 'public/views/',
    engines: {
      'html': posthtml
    },
    relativeTo: __dirname,
    compileMode: 'async'
    compileOptions: {
      // PostHTML Plugins
      plugins: [/* Plugins */]
    }
  })
})

// Create route handlers
const handlers = {
  root: function (request, reply) {
    reply.view('index')
  },
  local: function (request, reply) {
    reply.view('index', { plugins: [/* Plugins */] })
  },
  extend: function (request, reply) {
    reply.view('index', { plugins: [/* Plugins */], extend: true})
  }
}

// Create routes
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

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('=> Server:', server.info.uri)
})
```

## LICENSE

> MIT License (MIT)

> Copyright (c) 2016 Michael Ciniawsky

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/hapi-posthtml.svg
[npm-url]: https://npmjs.com/package/hapi-posthtml

[deps]: https://david-dm.org/posthtml/hapi-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/hapi-posthtml

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/posthtml/hapi-posthtml.svg
[travis-url]: https://travis-ci.org/posthtml/hapi-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/hapi-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/hapi-posthtml?branch=master
