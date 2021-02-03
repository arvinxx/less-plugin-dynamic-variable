export default class Processor implements Less.PreProcessor {
  process(css, extra) {
    console.log(extra);
    return css;
  }
}
