import { cosmiconfigSync } from 'cosmiconfig';
import Processor from './postProcessor';
import generateCssVariable from './generateCssVariable';

const explorer = cosmiconfigSync('dynamic-variable');
const { config = { variables: {} } } = explorer.search() || {};

const plugin: Less.Plugin = {
  install(less, manager) {
    manager.addVisitor(generateCssVariable(less, config));
    // manager.addPostProcessor(new Processor());
  },
};

export default plugin;
