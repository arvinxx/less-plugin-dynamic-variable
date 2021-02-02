declare namespace Less {
  export class PluginManager {
    constructor(less: LessStatic);

    addFileManager(fileManager: FileManager): void;
    addPlugins: (plugins: any[]) => void;
    addPlugin: (plugin: any) => void;
    addVisitor: (visitor: any) => void;
    addPostProcessor: (postProcessor: any, priority?) => void;

    getPreProcessors;
    getPostProcessors;
    getVisitors: () => any;
    getFileManagers: () => any;
    getLogs: () => string[];
  }
}
