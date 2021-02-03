(⚠️WIP) still unavailable

# less-plugin-dynamic-variable

Make less variable dynamic by css variable, compatible with less function

```shell
npm i -D less-plugin-dynamic-variable
```

or

```shell
yarn add -D less-plugin-dynamic-variable
```

## lessc usage

and then on the command line,

```
lessc file.less --dynamic-variable
```

## Programmatic usage

```js
const LessPluginCssDynamicVariable = require('less-plugin-dynamic-variable');

less
  .render(lessString, { plugins: [LessPluginCssDynamicVariable] })
  .then(({ css }) => {
    console.log(css);
  });
```

## Example

configuration variable to be dynamic
```js
// dynamtic-variable.config.js
module.exports = {
  variable: ['base-number', 'multiply-number'],
};
```

input:
```less
// multiplyTwo is a function to multiply number by 2, just for example
@base-number: 10;
@multiply-number: multiplyTwo(@base-number);

[scope='local'] {
  @base-number: 2;
}

.use {
  base: @base-number;
  multiply: @multiply-number;
}
```

outputs:

```css
:root {
  --base-number: 10;
  --multiply-number: 20;
}

:root[scope='local'] {
  --base-number: 2;
  --multiply-number: 4;
}

.use {
  color: var(--base-number);
  multiply: var(--multiply-number);
}
```
