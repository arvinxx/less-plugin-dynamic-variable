// const cosmiconfig = require("cosmiconfig");
//
// const explorer = cosmiconfig("less-plugin-custom-properties");

const { config = { variables: {} } } = {};

const vistor = ({
  tree: {
    Call,
    Anonymous,
    Expression,
    Ruleset,
    Declaration,
    Selector,
    Element,
    Combinator,
  },
  visitors,
}: any) => {
  const call = (name, ...args) => new Call(name, [new Expression(args)]);

  class Visitor {
    private native;
    private isPreEvalVisitor: boolean;
    private isReplacing: boolean;

    constructor() {
      this.native = new visitors.Visitor(this);
      this.isPreEvalVisitor = true;
      this.isReplacing = true;
    }

    run(root) {
      console.log(root);
      return this.native.visit(root);
    }

    /**
     * 访问变量
     * @param node
     */
    visitVariable(node) {
      console.log(node);
      console.log(new Anonymous(node.name.replace(/^@/, '--')));
      return call('var', new Anonymous(node.name.replace(/^@/, '--')));
    }

    visitOperation(node) {
      return call(
        'calc',
        node.operands[0],
        new Anonymous(node.op),
        node.operands[1],
      );
    }

    visitNegative(node) {
      return call('calc', new Anonymous('-1'), new Anonymous('*'), node.value);
    }

    /**
     * 用于放文档相应的声明对象的方法
     * @param node
     */
    visitDeclaration(node) {
      if (!(typeof node.name === 'string') || !node.name.match(/^@/)) {
        return node;
      }

      const declaration = new Declaration(
        node.name.replace(/^@/, '--'),
        node.value,
      );

      if (
        node.parent.root ||
        (node.parent.parent &&
          node.parent.parent.type === 'Media' &&
          node.parent.parent.parent.root)
      ) {
        return new Ruleset(
          [new Selector([new Element(new Combinator(' '), ':root')], [])],
          [declaration],
        );
      }

      return declaration;
    }
  }
  return new Visitor();
};

const plugin: Less.Plugin = {
  install(less, manager) {
    const { Call, Anonymous, Expression } = less.tree;

    const call = (name, ...args) => new Call(name, [new Expression(args)]);

    manager.addVisitor(vistor(less));

    less.functions.functionRegistry.add('external', (variable) => {
      if (variable.type !== 'Keyword') {
        return call('var', variable);
      }

      const name = variable.value.replace(/^--/, '');

      if (!(name in config.variables)) {
        return call('var', variable);
      }

      return new Anonymous(String(config.variables[name]));
    });
  },
};

export default plugin;
