// tests/frontend/eplBuilderFull.test.js
import { buildEPLFromNodes } from '../../editor/static/js/eplBuilder.js';

describe('eplBuilder – Complete CEP Rule Tests', () => {

  test('Generate simple SELECT rule', () => {
    const nodes = [
      { name: 'SELECT', data: { select: 'temperature' } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('SELECT *, temperature FROM iotEvent');
  });

  test('Generate rule with SELECT WHERE', () => {
    const nodes = [
      { name: 'SELECT WHERE', data: { attributewhere: 'humidity', where: 'humidity > 50' } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('SELECT *, humidity FROM iotEvent WHERE humidity > 50');
  });

  test('Generate rule with LENGTH and TIME', () => {
    const nodes = [
      { name: 'LENGTH', data: { attributenamelength: 'temperature', length: 5 } },
      { name: 'TIME', data: { attributenametime: 'temperature', length: 10 } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('win:length(5)');
    expect(result.epl).toContain('win:time(10 sec)');
  });

  test('Generate rule with GROUPBY and ORDERBY', () => {
    const nodes = [
      { name: 'GROUPBY', data: { group: 'deviceId' } },
      { name: 'ORDERBY', data: { order: 'temperature' } },
      { name: 'SELECT', data: { select: 'temperature' } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('GROUP BY deviceId');
    expect(result.epl).toContain('ORDER BY temperature');
  });

  test('Generate pattern with PATTERN, ATTRIBUTEPATTERN, and PATTERNTYPE', () => {
    const nodes = [
      { name: 'PATTERN', data: { pattern: 'temperature > 30' } },
      { name: 'ATTRIBUTEPATTERN', data: { pattern: 'temperature > 30', attribute: 'temperature' } },
      { name: 'PATTERNTYPE', data: { pattern: 'temperature > 30', typepattern: 'sensor' } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('SELECT * FROM pattern [every ev=iotEvent( temperature > 30 )]');
    expect(result.epl).toContain('SELECT *, FROM pattern [every ev=iotEvent( temperature > 30 )]');
    expect(result.epl).toContain('SELECT *, FROM pattern [every ev=iotEvent( temperature > 30 and type=\'sensor\')]');
  });

  test('Generate aggregations AVG, COUNT, MIN, MAX, SUM', () => {
    const nodes = [
      { name: 'AVG', data: { avgattributename: 'temperature' } },
      { name: 'COUNT', data: { countattributename: 'temperature' } },
      { name: 'MIN', data: { minattributename: 'temperature' } },
      { name: 'MAX', data: { maxattributename: 'temperature' } },
      { name: 'SUM', data: { sumname: 'temperature' } }
    ];
    const result = buildEPLFromNodes(nodes);
    ['avg(temperature)', 'count(temperature)', 'min(temperature)', 'max(temperature)', 'sum(temperature)'].forEach(op => {
      expect(result.epl).toContain(op);
    });
  });

  test('Generate POST action', () => {
    const nodes = [
      { name: 'ACTIONTYPE', data: { type: 'POST' } },
      { name: 'POST', data: { post: 'http://example.com', data_post: '{}' } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.action).toBeDefined();
    expect(result.action.type).toBe('POST');
    expect(result.action.template).toContain('ruleName');
    expect(result.action.parameters.url).toBe('http://example.com');
  });

  test('Generate EMAIL action', () => {
    const nodes = [
      { name: 'ACTIONTYPE', data: { type: 'EMAIL' } },
      { name: 'EMAIL', data: { to: 'a@b.com', from: 'c@d.com', subject: 'Test', template: 'Hello' } }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.action).toBeDefined();
    expect(result.action.type).toBe('EMAIL');
    expect(result.action.template).toBe('Hello');
    expect(result.action.parameters.to).toBe('a@b.com');
    expect(result.action.parameters.from).toBe('c@d.com');
    expect(result.action.parameters.subject).toBe('Test');
  });

  test('Ignore invalid node', () => {
    const nodes = [
      { name: 'SELECT', data: { select: 'temperature' } },
      { name: 'INVALID', data: {} }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('SELECT *, temperature FROM iotEvent');
  });

  test('Complex rules combining multiple blocks', () => {
    const nodes = [
      { name: 'SELECT WHERE', data: { attributewhere: 'temperature', where: 'temperature > 30' } },
      { name: 'AVG', data: { avgattributename: 'temperature' } },
      { name: 'ACTIONTYPE', data: { type: 'EMAIL' } },
      { name: 'EMAIL', data: { to: 'x@y.com', from: 'y@z.com', subject: 'Warning', template: 'Warning' } }
    ];
    const result = buildEPLFromNodes(nodes);
    // Cada bloco gera sua própria instrução completa
    expect(result.epl).toContain('SELECT *, temperature FROM iotEvent WHERE temperature > 30'); // SELECT WHERE
    expect(result.epl).toContain('SELECT avg(temperature) FROM iotEvent'); // AVG
    expect(result.action).toBeDefined();
    expect(result.action.type).toBe('EMAIL');
    expect(result.action.template).toBe('Warning');
  });

});