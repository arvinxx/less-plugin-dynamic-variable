export default (less) => ({
  multiplyTwo(input) {
    return new less.tree.Anonymous(input.value * 2);
  },
});
