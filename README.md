[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][build]][build-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]
[![Chat][chat]][chat-badge]

# Hapi PostHTML <img align="right" width="200" height="220" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">

## Install

```bash
npm i -S hapi-posthtml
```

## Usage

```js
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

## Maintainers

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150 height="150"
      src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
      <br />
      <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
    </td>
   </tr>
  <tbody>
</table>

## Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

## LICENSE

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/hapi-posthtml.svg
[npm-url]: https://npmjs.com/package/hapi-posthtml

[deps]: https://david-dm.org/posthtml/hapi-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/hapi-posthtml

[build]: http://img.shields.io/travis/posthtml/hapi-posthtml.svg
[build-url]: https://travis-ci.org/posthtml/hapi-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/hapi-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/hapi-posthtml?branch=master

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-badge]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
