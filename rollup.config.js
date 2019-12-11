import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { version, browser, main, module } from './package.json'
import replace from 'rollup-plugin-replace'

const isDev = process.env.NODE_ENV !== 'production'
const VERSION = process.env.VERSION || version
const copyright = new Date().getFullYear() > 2019 ? '2019-' + new Date().getFullYear() : 2019
const banner =
  '/*!\n' +
  ' * utils v' + VERSION + '\n' +
  ' * (c) ' + copyright + ' YolkPie\n' +
  ' * Released under the MIT License.\n' +
  ' */'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    external: ['JSSDK', 'ShareH5'],
    output: {
      banner,
      name: 'timeout',
      file: browser,
      format: 'umd',
      globals: {
        JSSDK: 'JSSDK',
        ShareH5: 'share'
      }
    },
    plugins: [
      replace({
        __VERSION__: VERSION
      }),
      json(),
      resolve(), // 这样 Rollup 能找到 `ms`
      commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
      babel({
        exclude: 'node_modules/**',
        // 使plugin-transform-runtime生效
        runtimeHelpers: true
      }),
      !isDev && terser()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['ms', 'JSSDK', 'ShareH5'],
    output: [
      { file: main, format: 'cjs', globals: { JSSDK: 'JSSDK', ShareH5: 'share' } },
      { file: module, format: 'es', globals: { JSSDK: 'JSSDK', ShareH5: 'share' } }
    ]
  }
]
