import less from 'less';
import { readFileSync } from 'fs';
import { join } from 'path';
import MultiplyTwoPlugin from './multiplyTwo';

const loadStyleFiles = (name: string) => ({
  less: readFileSync(join(__dirname, 'cases', `${name}.less`), 'utf-8'),
  css: readFileSync(join(__dirname, 'cases', `${name}.css`), 'utf-8'),
});

export const cssVariableInUsage = loadStyleFiles('keep-css-variable-in-usage');
export const generateCssVariable = loadStyleFiles('generate-css-variable');
export const generateCssVariableWithFunc = loadStyleFiles(
  'generate-css-variable-with-function',
);

export const lessRender = async (lessStr: string, extraPlugins = []) => {
  const { css } = await less.render(lessStr, {
    plugins: [MultiplyTwoPlugin, ...extraPlugins],
  });

  return css;
};
