import less from "less";
import plugin from "../src";
import tempPlugin from "../src/to-css-variable";

import { cssVariableInUsage, handleVariableInUsage } from "./utils";

test("使用时 保留 css variables", async () => {
  const { css } = await less.render(cssVariableInUsage.less, {
    plugins: [plugin],
  });
  expect(css).toEqual(cssVariableInUsage.css);
});

test("可转换 less 变量", async () => {
  const { css } = await less.render(handleVariableInUsage.less, {
    plugins: [tempPlugin],
  });

  expect(css).toEqual(handleVariableInUsage.css);
});
