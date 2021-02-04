import parser from 'less/lib/less/parser/parser';
import tree from 'less/lib/less/tree';
import visitors from 'less/lib/less/visitors';

import { Visitor } from '../src/generateCssVariable';

const { Value, Declaration, Ruleset, Expression, Selector } = tree;
describe('Visitor', () => {
  const visitor = new Visitor(tree, visitors);
  // describe('visitVariable', () => {
    // it('转换 @less 为 var(--less)', () => {
    //   const variable = visitor.visitVariable({ name: '@less' });
    //
    //   expect(variable).toEqual({
    //     calc: false,
    //     name: 'var',
    //     args: [
    //       {
    //         value: [
    //           {
    //             allowRoot: true,
    //             rulesetLike: false,
    //             value: '--less',
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // });
  // });

  describe('visitDeclaration', () => {
    it('为 less 变量创建 css 变量', () => {
      console.log(parser('@primay:123;'));

      const variable = visitor.visitDeclaration(
        new Declaration('@bg', new Value(new Expression('#FFF'))),
      );

      expect(variable.name).toEqual('--bg');
      expect(variable.value).toEqual({
        value: [
          {
            value: '#FFF',
          },
        ],
      });
      expect(variable.variable).toBeTruthy();
    });
  });
});
