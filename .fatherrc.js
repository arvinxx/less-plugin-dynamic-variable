module.exports = {
  entry: 'src/index.ts',
  cjs: 'babel',
  target: 'node',
  injectCSS: false,
  extraBabelPlugins: ['add-module-exports'],
  disableTypeCheck: true,
};
