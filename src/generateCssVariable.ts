export class Visitor {
  private native;
  private isPreEvalVisitor: boolean;
  private isReplacing: boolean;
  private tree: any;

  private readonly call: (name, ...args) => any;

  constructor(tree, visitors) {
    this.native = new visitors.Visitor(this);
    this.isPreEvalVisitor = true;
    this.isReplacing = true;
    this.tree = tree;
    this.call = (name, ...args) =>
      new tree.Call(name, [new tree.Expression(args)]);
  }

  run(root) {
    return this.native.visit(root);
  }

  /**
   * 访问使用中的变量
   * @param node
   */
  // visitVariable(node) {
  //   // 这个是被调用的 variable
  //   return this.call(
  //     'var',
  //     new this.tree.Anonymous(node.name.replace(/^@/, '--')),
  //   );
  // }

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
    return this.call(
      'calc',
      node.operands[0],
      new this.tree.Anonymous(node.op),
      node.operands[1],
    );
  }

  /**
   * 处理负数值
   * @param node
   */
  visitNegative(node) {
    return this.call(
      'calc',
      new this.tree.Anonymous('-1'),
      new this.tree.Anonymous('*'),
      node.value,
    );
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
    const declaration = new this.tree.Declaration(
      node.name.replace(/^@/, '--'),
      node.value,
    );

    if (!node.parent) return declaration;
    if (
      // 如果节点处于 Root 层级
      node.parent.root ||
      // 或者在 Media 类型下面,且 media 的父级是顶级
      // Media 是什么类型?
      (node.parent.parent &&
        node.parent.parent.type === 'Media' &&
        node.parent.parent.parent.root)
    ) {
      const { Ruleset, Selector, Element, Combinator } = this.tree;

      return [
        node,
        new Ruleset(
          [new Selector([new Element(new Combinator(' '), ':root')], [])],
          [declaration],
        ),
      ];
    }

    return declaration;
  }
}

const visitor = (less, config = {}) => {
  const { tree, visitors } = less;

  return new Visitor(tree, visitors);
};

export default visitor;
