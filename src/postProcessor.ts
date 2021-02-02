export default class Processor implements Less.PreProcessor {
  process(css) {
    console.log(css);
    return css;
  }
}
