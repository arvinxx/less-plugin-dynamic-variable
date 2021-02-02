# less-plugin-css-variable-theme

Make css variables work with function

## lessc usage

```shell
npm i -D less-plugin-css-variable-theme
```

or

```shell
yarn add less-plugin-css-variable-theme -D
```

and then on the command line,

```
lessc file.less --advanced-color-functions
```

## Programmatic usage

```typescript
const LessPluginCssVariablesWithFunctions = require("less-plugin-css-variable-theme"),
  CssVariablesWithFunctions = new LessPluginCssVariablesWithFunctions();
less
  .render(lessString, { plugins: [CssVariablesWithFunctions] })
  .then(({ css }) => {
    console.log(css);
  });
```

## Browser usage

Browser usage is not supported at this time.

## Example

```less
// multiplyTwo is a function to multiply number by 2
@base-number: 10;

:root {
  --base-number: @base-number;
  --multiply-number: multiplyTwo(@base-number);
}

:root[scope="k"] {
  @base-number: 2;

  --base-number: @base-number;
  --multiply-number: multiplyTwo(@base-number);
}

.use {
  color: @base-number;
}
```

outputs:

```css
:root {
  --base-number: 10;
  --multiply-number: 20;
}

:root[scope="k"] {
  --base-number: 2;
  --multiply-number: 4;
}

.use {
  color: var(--base-number);
}
```
