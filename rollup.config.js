import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { version, browser, main, module } from './package.json'
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'

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
    input: 'src/utils.ts',
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
      typescript({ useTsconfigDeclarationDir: true }),
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
  {
    input: 'src/utils.ts',
    external: ['ms', 'JSSDK', 'ShareH5'],
    output: [
      { file: main, format: 'cjs', globals: { JSSDK: 'JSSDK', ShareH5: 'share' } },
      { file: module, format: 'es', globals: { JSSDK: 'JSSDK', ShareH5: 'share' } }
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true })
    ]
  }
]
