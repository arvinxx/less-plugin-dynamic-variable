import { readFileSync } from "fs";
import { resolve } from "path";

const loadStyleFiles = (name: string) => ({
  less: readFileSync(resolve(__dirname, `./case/${name}.less`), "utf-8"),
  css: readFileSync(resolve(__dirname, `./case/${name}.css`), "utf-8"),
});

export const cssVariableInUsage = loadStyleFiles("css-variable-in-usage");
export const handleVariableInUsage = loadStyleFiles("handle-variable");
