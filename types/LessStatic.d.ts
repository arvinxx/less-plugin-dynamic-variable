declare namespace Less {
  interface LessStatic {
    tree: {
      Node: Node;
      Anonymous: any;
      Expression: any;
      Call: any;
    };
    functions: {
      functionRegistry: FunctionManager;
    };
  }
  class FunctionManager {
    add: (name: string, func: Function) => void;
    addMultiple: (functions: Record<string, Function>) => void;
    get: (name: string) => Function;
  }

  interface Context {
    pluginManager: PluginManager;
  }
}
