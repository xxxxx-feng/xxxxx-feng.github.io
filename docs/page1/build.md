1. 环境变量是什么?

环境变量（environment variables）一般是指在操作系统中用来指定操作系统运行环境的一些参数，如：临时文件夹位置和系统文件夹位置等。

环境变量是在操作系统中一个具有特定名字的对象，它包含了一个或者多个应用程序所将使用到的信息。

2. 环境变量的作用？

变量在任何程序中的作用都是“被赋值/被取值”！这个全局变量操作系统可以使用，其内的子进程也可以使用！也就是一处配置全局使用。

3. vue运行时，启动 vue-cli 服务。

**vue-cli模式：**

模式是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：

- development 模式用于 vue-cli-service serve
- test 模式用于 vue-cli-service test:unit
- production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e

你可以通过传递 --mode 选项参数为命令行覆写默认的模式。例如，如果你想要在构建命令中使用开发环境变量：

```
vue-cli-service build --mode development
```

当运行 vue-cli-service 命令时，所有的环境变量都从对应的环境文件中载入。如果文件内部不包含 NODE_ENV 变量，它的值将取决于模式，例如，在 production 模式下被设置为 "production"，在 test 模式下被设置为 "test"，默认则是 "development"。

**NODE_ENV **将决定您的应用运行的模式，是开发，生产还是测试，因此也决定了创建哪种 webpack 配置。

**环境变量：**

你可以在你的项目根目录中放置下列文件来指定环境变量：

```sh
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

一个环境文件只包含环境变量的“键=值”对：

请注意，只有 **NODE_ENV，BASE_URL 和以 VUE_APP_** 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中。这是为了避免意外公开机器上可能具有相同名称的私钥。

4. 如何自定义一种环境？

方案一：新增环境文件  .env.[name]，并且新增脚本方式 --mode [name]

```sh
// 示例  .env.test
NODE_ENV=production
VUE_APP_ENV=test
// 新增脚本
vue-cli-service build --mode test
```

方案二：以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。

```sh
// 示例
process.env.VUE_APP_VERSION = require('./package.json').env
```

优缺点： 方案一需要开发人员配置，新增环境就需要新加配置，不需要运维修改

方案二开发人员不关心环境，不需要配置，需要运维提供环境配置

// end

**深入思考： npm run 干了什么事情？原理？**

使用npm run script执行脚本的时候都会创建一个shell，然后在shell中执行指定的脚本。

这个shell会将当前项目的可执行依赖目录（即node_modules/.bin）添加到环境变量path中，当执行之后之后再恢复原样。就是说脚本命令中的依赖名会直接找到node_modules/.bin下面的对应脚本，而不需要加上路径。


```
npm run serve === npm run vue-cli-service serve === ./node_modules/.bin/vue-cli-service serve

serve是传递的参数，便于区分执行什么脚本
```

./node_modules/.bin/  下放了什么？ --- linux 和 windows 的shell 脚本

```sh
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../@vue/cli-service/bin/vue-cli-service.js" "$@"
  ret=$?
else 
  node  "$basedir/../@vue/cli-service/bin/vue-cli-service.js" "$@"
  ret=$?
fi
exit $ret
```

使用node 运行了一个 vue-cli-service.js

```sh
#!/usr/bin/env node

const { semver, error } = require('@vue/cli-shared-utils')
const requiredVersion = require('../package.json').engines.node
// 检测node版本是否符合vue-cli运行的需求。不符合则打印错误并退出。
if (!semver.satisfies(process.version, requiredVersion, { includePrerelease: true })) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}
// cli-service的核心类。
const Service = require('../lib/Service')
// 新建一个service的实例。并将项目路径传入。一般我们在项目根路径下运行该cli命令。所以process.cwd()的结果一般是项目根路径
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

// 参数处理。
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]
// 将我们执行npm run serve 的serve参数传入service这个实例并启动后续工作。(如果我们运行的是npm run build。那么接收的参数即为build)。
service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})

```

上面js 最后调用了../lib/Service 中的run来进行项目的构建 ，那再去看看 Service.js 又做了些什么

```javascript
// 略长.....
const fs = require('fs')
const path = require('path')
const debug = require('debug')
const merge = require('webpack-merge')
const Config = require('webpack-chain')
const PluginAPI = require('./PluginAPI')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const defaultsDeep = require('lodash.defaultsdeep')
const { chalk, warn, error, isPlugin, resolvePluginId, loadModule, resolvePkg } = require('@vue/cli-shared-utils')

const { defaults, validate } = require('./options')

module.exports = class Service {
  constructor (context, { plugins, pkg, inlineOptions, useBuiltIn } = {}) {
    process.VUE_CLI_SERVICE = this
    this.initialized = false
    this.context = context
    this.inlineOptions = inlineOptions
    this.webpackChainFns = []
    this.webpackRawConfigFns = []
    this.devServerConfigFns = []
    this.commands = {}
    // Folder containing the target package.json for plugins
    this.pkgContext = context
    // package.json containing the plugins
    this.pkg = this.resolvePkg(pkg)
    // If there are inline plugins, they will be used instead of those
    // found in package.json.
    // When useBuiltIn === false, built-in plugins are disabled. This is mostly
    // for testing.
    this.plugins = this.resolvePlugins(plugins, useBuiltIn)
    // pluginsToSkip will be populated during run()
    this.pluginsToSkip = new Set()
    // resolve the default mode to use for each command
    // this is provided by plugins as module.exports.defaultModes
    // so we can get the information without actually applying the plugin.
    this.modes = this.plugins.reduce((modes, { apply: { defaultModes }}) => {
      return Object.assign(modes, defaultModes)
    }, {})
  }

  resolvePkg (inlinePkg, context = this.context) {
    if (inlinePkg) {
      return inlinePkg
    }
    const pkg = resolvePkg(context)
    if (pkg.vuePlugins && pkg.vuePlugins.resolveFrom) {
      this.pkgContext = path.resolve(context, pkg.vuePlugins.resolveFrom)
      return this.resolvePkg(null, this.pkgContext)
    }
    return pkg
  }

  init (mode = process.env.VUE_CLI_MODE) {
    if (this.initialized) {
      return
    }
    this.initialized = true
    this.mode = mode

    // load mode .env
    if (mode) {
      this.loadEnv(mode)
    }
    // load base .env
    this.loadEnv()

    // load user config
    const userOptions = this.loadUserOptions()
    this.projectOptions = defaultsDeep(userOptions, defaults())

    debug('vue:project-config')(this.projectOptions)

    // apply plugins.
    this.plugins.forEach(({ id, apply }) => {
      if (this.pluginsToSkip.has(id)) return
      apply(new PluginAPI(id, this), this.projectOptions)
    })

    // apply webpack configs from project config file
    if (this.projectOptions.chainWebpack) {
      this.webpackChainFns.push(this.projectOptions.chainWebpack)
    }
    if (this.projectOptions.configureWebpack) {
      this.webpackRawConfigFns.push(this.projectOptions.configureWebpack)
    }
  }

  loadEnv (mode) {
    const logger = debug('vue:env')
    const basePath = path.resolve(this.context, `.env${mode ? `.${mode}` : ``}`)
    const localPath = `${basePath}.local`

    const load = envPath => {
      try {
        const env = dotenv.config({ path: envPath, debug: process.env.DEBUG })
        dotenvExpand(env)
        logger(envPath, env)
      } catch (err) {
        // only ignore error if file is not found
        if (err.toString().indexOf('ENOENT') < 0) {
          error(err)
        }
      }
    }

    load(localPath)
    load(basePath)

    // by default, NODE_ENV and BABEL_ENV are set to "development" unless mode
    // is production or test. However the value in .env files will take higher
    // priority.
    if (mode) {
      // always set NODE_ENV during tests
      // as that is necessary for tests to not be affected by each other
      const shouldForceDefaultEnv = (
        process.env.VUE_CLI_TEST &&
        !process.env.VUE_CLI_TEST_TESTING_ENV
      )
      const defaultNodeEnv = (mode === 'production' || mode === 'test')
        ? mode
        : 'development'
      if (shouldForceDefaultEnv || process.env.NODE_ENV == null) {
        process.env.NODE_ENV = defaultNodeEnv
      }
      if (shouldForceDefaultEnv || process.env.BABEL_ENV == null) {
        process.env.BABEL_ENV = defaultNodeEnv
      }
    }
  }

  setPluginsToSkip (args) {
    const skipPlugins = args['skip-plugins']
    const pluginsToSkip = skipPlugins
      ? new Set(skipPlugins.split(',').map(id => resolvePluginId(id)))
      : new Set()

    this.pluginsToSkip = pluginsToSkip
  }

  resolvePlugins (inlinePlugins, useBuiltIn) {
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id)
    })

    let plugins

    const builtInPlugins = [
      './commands/serve',
      './commands/build',
      './commands/inspect',
      './commands/help',
      // config plugins are order sensitive
      './config/base',
      './config/css',
      './config/prod',
      './config/app'
    ].map(idToPlugin)

    if (inlinePlugins) {
      plugins = useBuiltIn !== false
        ? builtInPlugins.concat(inlinePlugins)
        : inlinePlugins
    } else {
      const projectPlugins = Object.keys(this.pkg.devDependencies || {})
        .concat(Object.keys(this.pkg.dependencies || {}))
        .filter(isPlugin)
        .map(id => {
          if (
            this.pkg.optionalDependencies &&
            id in this.pkg.optionalDependencies
          ) {
            let apply = () => {}
            try {
              apply = require(id)
            } catch (e) {
              warn(`Optional dependency ${id} is not installed.`)
            }

            return { id, apply }
          } else {
            return idToPlugin(id)
          }
        })
      plugins = builtInPlugins.concat(projectPlugins)
    }

    // Local plugins
    if (this.pkg.vuePlugins && this.pkg.vuePlugins.service) {
      const files = this.pkg.vuePlugins.service
      if (!Array.isArray(files)) {
        throw new Error(`Invalid type for option 'vuePlugins.service', expected 'array' but got ${typeof files}.`)
      }
      plugins = plugins.concat(files.map(file => ({
        id: `local:${file}`,
        apply: loadModule(`./${file}`, this.pkgContext)
      })))
    }

    return plugins
  }

  async run (name, args = {}, rawArgv = []) {
    // resolve mode
    // prioritize inline --mode
    // fallback to resolved default modes from plugins or development if --watch is defined
    const mode = args.mode || (name === 'build' && args.watch ? 'development' : this.modes[name])

    // --skip-plugins arg may have plugins that should be skipped during init()
    this.setPluginsToSkip(args)

    // load env variables, load user config, apply plugins
    this.init(mode)

    args._ = args._ || []
    let command = this.commands[name]
    if (!command && name) {
      error(`command "${name}" does not exist.`)
      process.exit(1)
    }
    if (!command || args.help || args.h) {
      command = this.commands.help
    } else {
      args._.shift() // remove command itself
      rawArgv.shift()
    }
    const { fn } = command
    return fn(args, rawArgv)
  }

  resolveChainableWebpackConfig () {
    const chainableConfig = new Config()
    // apply chains
    this.webpackChainFns.forEach(fn => fn(chainableConfig))
    return chainableConfig
  }

  resolveWebpackConfig (chainableConfig = this.resolveChainableWebpackConfig()) {
    if (!this.initialized) {
      throw new Error('Service must call init() before calling resolveWebpackConfig().')
    }
    // get raw config
    let config = chainableConfig.toConfig()
    const original = config
    // apply raw config fns
    this.webpackRawConfigFns.forEach(fn => {
      if (typeof fn === 'function') {
        // function with optional return value
        const res = fn(config)
        if (res) config = merge(config, res)
      } else if (fn) {
        // merge literal values
        config = merge(config, fn)
      }
    })

    // #2206 If config is merged by merge-webpack, it discards the __ruleNames
    // information injected by webpack-chain. Restore the info so that
    // vue inspect works properly.
    if (config !== original) {
      cloneRuleNames(
        config.module && config.module.rules,
        original.module && original.module.rules
      )
    }

    // check if the user has manually mutated output.publicPath
    const target = process.env.VUE_CLI_BUILD_TARGET
    if (
      !process.env.VUE_CLI_TEST &&
      (target && target !== 'app') &&
      config.output.publicPath !== this.projectOptions.publicPath
    ) {
      throw new Error(
        `Do not modify webpack output.publicPath directly. ` +
        `Use the "publicPath" option in vue.config.js instead.`
      )
    }

    if (
      !process.env.VUE_CLI_ENTRY_FILES &&
      typeof config.entry !== 'function'
    ) {
      let entryFiles
      if (typeof config.entry === 'string') {
        entryFiles = [config.entry]
      } else if (Array.isArray(config.entry)) {
        entryFiles = config.entry
      } else {
        entryFiles = Object.values(config.entry || []).reduce((allEntries, curr) => {
          return allEntries.concat(curr)
        }, [])
      }

      entryFiles = entryFiles.map(file => path.resolve(this.context, file))
      process.env.VUE_CLI_ENTRY_FILES = JSON.stringify(entryFiles)
    }

    return config
  }

  loadUserOptions () {
    // vue.config.c?js
    let fileConfig, pkgConfig, resolved, resolvedFrom
    const esm = this.pkg.type && this.pkg.type === 'module'

    const possibleConfigPaths = [
      process.env.VUE_CLI_SERVICE_CONFIG_PATH,
      './vue.config.js',
      './vue.config.cjs'
    ]

    let fileConfigPath
    for (const p of possibleConfigPaths) {
      const resolvedPath = p && path.resolve(this.context, p)
      if (resolvedPath && fs.existsSync(resolvedPath)) {
        fileConfigPath = resolvedPath
        break
      }
    }

    if (fileConfigPath) {
      if (esm && fileConfigPath === './vue.config.js') {
        throw new Error(`Please rename ${chalk.bold('vue.config.js')} to ${chalk.bold('vue.config.cjs')} when ECMAScript modules is enabled`)
      }

      try {
        fileConfig = loadModule(fileConfigPath, this.context)

        if (typeof fileConfig === 'function') {
          fileConfig = fileConfig()
        }

        if (!fileConfig || typeof fileConfig !== 'object') {
          // TODO: show throw an Error here, to be fixed in v5
          error(
            `Error loading ${chalk.bold(fileConfigPath)}: should export an object or a function that returns object.`
          )
          fileConfig = null
        }
      } catch (e) {
        error(`Error loading ${chalk.bold(fileConfigPath)}:`)
        throw e
      }
    }

    // package.vue
    pkgConfig = this.pkg.vue
    if (pkgConfig && typeof pkgConfig !== 'object') {
      error(
        `Error loading vue-cli config in ${chalk.bold(`package.json`)}: ` +
        `the "vue" field should be an object.`
      )
      pkgConfig = null
    }

    if (fileConfig) {
      if (pkgConfig) {
        warn(
          `"vue" field in package.json ignored ` +
          `due to presence of ${chalk.bold('vue.config.js')}.`
        )
        warn(
          `You should migrate it into ${chalk.bold('vue.config.js')} ` +
          `and remove it from package.json.`
        )
      }
      resolved = fileConfig
      resolvedFrom = 'vue.config.js'
    } else if (pkgConfig) {
      resolved = pkgConfig
      resolvedFrom = '"vue" field in package.json'
    } else {
      resolved = this.inlineOptions || {}
      resolvedFrom = 'inline options'
    }

    if (resolved.css && typeof resolved.css.modules !== 'undefined') {
      if (typeof resolved.css.requireModuleExtension !== 'undefined') {
        warn(
          `You have set both "css.modules" and "css.requireModuleExtension" in ${chalk.bold('vue.config.js')}, ` +
          `"css.modules" will be ignored in favor of "css.requireModuleExtension".`
        )
      } else {
        warn(
          `"css.modules" option in ${chalk.bold('vue.config.js')} ` +
          `is deprecated now, please use "css.requireModuleExtension" instead.`
        )
        resolved.css.requireModuleExtension = !resolved.css.modules
      }
    }

    // normalize some options
    ensureSlash(resolved, 'publicPath')
    if (typeof resolved.publicPath === 'string') {
      resolved.publicPath = resolved.publicPath.replace(/^\.\//, '')
    }
    removeSlash(resolved, 'outputDir')

    // validate options
    validate(resolved, msg => {
      error(
        `Invalid options in ${chalk.bold(resolvedFrom)}: ${msg}`
      )
    })

    return resolved
  }
}

function ensureSlash (config, key) {
  const val = config[key]
  if (typeof val === 'string') {
    config[key] = val.replace(/([^/])$/, '$1/')
  }
}

function removeSlash (config, key) {
  if (typeof config[key] === 'string') {
    config[key] = config[key].replace(/\/$/g, '')
  }
}

function cloneRuleNames (to, from) {
  if (!to || !from) {
    return
  }
  from.forEach((r, i) => {
    if (to[i]) {
      Object.defineProperty(to[i], '__ruleNames', {
        value: r.__ruleNames
      })
      cloneRuleNames(to[i].oneOf, r.oneOf)
    }
  })
}

```

这些文件所有的操作加起来就完成了我们vue项目的构建，直接浏览器输入地址就可以看见效果了
