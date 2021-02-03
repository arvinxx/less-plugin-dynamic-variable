const plugin: Less.Plugin = {
  install: (less) => {
    less.functions.functionRegistry.add(
      'multiplyTwo',
      (input) => new less.tree.Anonymous(input.value * 2),
    );
  },
};

export default plugin;
