# 基于Express 与 Gulp的web前端框架
### 用于前后端分离实践

<img width="320" src="http://s8.51cto.com/wyfs02/M02/24/7D/wKiom1NQiaHwf0xWAACMPoN-wc0497.jpg">


## 目录结构
#### express (VIEWS视图层 [nginx反向代理])
>> #### lib ------------- 组件
>>>>  MDJS.js ------ 公共方法  
>> #### routes -------- 路由  
>>>>  404.js ---------- 404错误处理  
>>>>  500.js ---------- 500错误处理  
>>>>  about.js -------- 关于我们  
>>>>  index.js -------- 首页
>> #### md_config.js -------- 路由相关全局配置文件
>> #### views -------- 视图 (基于 handlebars)
>>>>  layouts -------- 视图层主结构
>>>>>> layout.hbs -------- 视图层(可以存在多个)
>>>> ##### partials -------- 模块 (例: 公共头尾 | 地图 | 日历 | 等)
>>>>>> *.hbs: 公共头尾 | 地图 | 日历 | 等
>>>> ##### user -------- 用户相关
>>>> ##### cart -------- 购物车相关
>>>> ##### ......等等相关页面


### public (静态资源 [nginx]) {es6, coffee, less 会通过gulp自动编译到 js/css 目录}
>> #### coffee ---- coffee-script(*.coffee)
>> #### css -------- 样式文件(包括插件css)
>> #### es6 -------- ES2015(*.js)
>> #### font ------- 字体文件
>> #### img ------- 图片
>> #### js ---------- 脚本文件(包括扩展库等)
>> #### less ------- LESS(*.less)
>> #### qa --------- 自动化测试脚本
>> #### vendor --- mocha

<p align="center">
	<a href="http://www.expressjs.com.cn">
		<img width="320" src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png">
	</a>
	<br>
	基于 <a href="http://nodejs.org"><b>Node.js</b></a> 平台，快速、开放、极简的 web 开发框架。
	<br>
	<br>
	<a href="http://www.gulpjs.com.cn">
		<img width="80" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
	</a>
	<br><br>
	<a href="http://www.gulpjs.com.cn/"><b>Gulp</b></a>，用自动化构建工具增强你的工作流程！。
</p>

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

```js
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## Installation

```bash
$ npm install express
```

## Features

  * Robust routing
  * Focus on high performance
  * Super-high test coverage
  * HTTP helpers (redirection, caching, etc)
  * View system supporting 14+ template engines
  * Content negotiation
  * Executable for generating applications quickly

## Docs & Community

  * [Website and Documentation](http://expressjs.com/) - [[website repo](https://github.com/strongloop/expressjs.com)]
  * [#express](https://webchat.freenode.net/?channels=express) on freenode IRC
  * [Github Organization](https://github.com/expressjs) for Official Middleware & Modules
  * Visit the [Wiki](https://github.com/expressjs/express/wiki)
  * [Google Group](https://groups.google.com/group/express-js) for discussion
  * [Gitter](https://gitter.im/expressjs/express) for support and discussion
  * [Русскоязычная документация](http://jsman.ru/express/)

**PROTIP** Be sure to read [Migrating from 3.x to 4.x](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x) as well as [New features in 4.x](https://github.com/expressjs/express/wiki/New-features-in-4.x).

###Security Issues

If you discover a security vulnerability in Express, please see [Security Policies and Procedures](Security.md).

## Quick Start

  The quickest way to get started with express is to utilize the executable [`express(1)`](https://github.com/expressjs/generator) to generate an application as shown below:

  Install the executable. The executable's major version will match Express's:

```bash
$ npm install -g express-generator@4
```

  Create the app:

```bash
$ express /tmp/foo && cd /tmp/foo
```

  Install dependencies:

```bash
$ npm install
```

  Start the server:

```bash
$ npm start
```

## Philosophy

  The Express philosophy is to provide small, robust tooling for HTTP servers, making
  it a great solution for single page applications, web sites, hybrids, or public
  HTTP APIs.

  Express does not force you to use any specific ORM or template engine. With support for over
  14 template engines via [Consolidate.js](https://github.com/tj/consolidate.js),
  you can quickly craft your perfect framework.

## Examples

  To view the examples, clone the Express repo and install the dependencies:

```bash
$ git clone git://github.com/expressjs/express.git --depth 1
$ cd express
$ npm install
```

  Then run whichever example you want:

```bash
$ node examples/content-negotiation
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## People

The original author of Express is [TJ Holowaychuk](https://github.com/tj) [![TJ's Gratipay][gratipay-image-visionmedia]][gratipay-url-visionmedia]

The current lead maintainer is [Douglas Christopher Wilson](https://github.com/dougwilson) [![Doug's Gratipay][gratipay-image-dougwilson]][gratipay-url-dougwilson]

[List of all contributors](https://github.com/expressjs/express/graphs/contributors)

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express.svg
[npm-url]: https://npmjs.org/package/express
[downloads-image]: https://img.shields.io/npm/dm/express.svg
[downloads-url]: https://npmjs.org/package/express
[travis-image]: https://img.shields.io/travis/expressjs/express/master.svg?label=linux
[travis-url]: https://travis-ci.org/expressjs/express
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/express/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/express
[coveralls-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[coveralls-url]: https://coveralls.io/r/expressjs/express?branch=master
[gratipay-image-visionmedia]: https://img.shields.io/gratipay/visionmedia.svg
[gratipay-url-visionmedia]: https://gratipay.com/visionmedia/
[gratipay-image-dougwilson]: https://img.shields.io/gratipay/dougwilson.svg
[gratipay-url-dougwilson]: https://gratipay.com/dougwilson/