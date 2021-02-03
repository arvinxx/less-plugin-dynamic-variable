const visitor = (
  {
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
  }: any,
  config,
) => {
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
      return this.native.visit(root);
    }

    /**
     * 访问使用中的变量
     * @param node
     */
    visitVariable(node) {
      // 这个是被调用的 variable
      return call('var', new Anonymous(node.name.replace(/^@/, '--')));
    }

    /**
     * 保留计算公式
     *
     * 100% - 100px
     * ⬇️⬇️⬇️
     * calc(100% - 100px)
     *
     * @param node
     */
    visitOperation(node) {
      return call(
        'calc',
        node.operands[0],
        new Anonymous(node.op),
        node.operands[1],
      );
    }

    /**
     * 处理负数值
     * @param node
     */
    visitNegative(node) {
      return call('calc', new Anonymous('-1'), new Anonymous('*'), node.value);
    }

    /**
     * 修改声明对象的方法
     * @param node
     */
    visitDeclaration(node) {
      // 如果不是 @ 开头的node,直接过滤返回
      if (!(typeof node.name === 'string') || !node.name.match(/^@/)) {
        return node;
      }

      // 将原本 @var 替换成 -> --var
      const declaration = new Declaration(
        node.name.replace(/^@/, '--'),
        node.value,
      );

      if (
        // 如果节点处于 Root 层级
        node.parent.root ||
        // 或者在 Media 类型下面,且 media 的父级是顶级
        // Media 是什么类型?
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

export default visitor;
