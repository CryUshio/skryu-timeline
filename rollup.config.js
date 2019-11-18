// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');

export default {
  input: 'src/index.ts',
  plugins: [resolve(), commonjs(), typescript()],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourceMap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourceMap: true,
    },
    {
      file: pkg.browser,
      name: 'timeline',
      format: 'umd',
      globals: true,
    },
  ],
};
