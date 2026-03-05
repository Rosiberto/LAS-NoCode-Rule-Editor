const { buildEPLFromNodes } = require('../../editor/static/js/eplBuilder.js');

test('gera SELECT simples', () => {

  const nodes = {
    1: {
      name: 'RULE',
      data: { rule: 'temp_rule' }
    },
    2: {
      name: 'SELECT',
      data: { select: 'temperature' }
    }
  };

  const result = buildEPLFromNodes(nodes);

  expect(result.rule_name).toBe('temp_rule');
  expect(result.epl).toContain('SELECT');

});