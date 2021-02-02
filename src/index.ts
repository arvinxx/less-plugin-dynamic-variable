import Processor from './postProcessor';
import functions from './functions';

const plugin: Less.Plugin = {
  install (less, pluginManager) {
    less.functions.functionRegistry.addMultiple(functions(less));
    pluginManager.addPostProcessor(new Processor());
  },
};
export default plugin;
