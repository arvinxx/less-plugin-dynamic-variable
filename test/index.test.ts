import plugin from '../src';

import {
  cssVariableInUsage,
  generateCssVariable,
  generateCssVariableWithFunc,
  lessRender,
} from './utils';

// test('keep css variables in usage', async () => {
//   const css = await lessRender(cssVariableInUsage.less, [plugin]);
//   expect(css).toEqual(cssVariableInUsage.css);
// });

test('transform less variable to css variable', async () => {
  const css = await lessRender(generateCssVariable.less, [plugin]);

  expect(css).toEqual(generateCssVariable.css);
});

test('transform less variable to css variable with function', async () => {
  const css = await lessRender(generateCssVariableWithFunc.less, [plugin]);

  expect(css).toEqual(generateCssVariableWithFunc.css);
});
