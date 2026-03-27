import { buildEPLFromNodes } 
from '../../editor/static/js/eplBuilder.js';

describe('eplBuilder - CEP Rule Tests', () => {

  test('Generate simple SELECT rule', () => {
    const nodes = {
      1: { name: 'RULE', data: { rule: 'temp_rule' } },
      2: { name: 'SELECT', data: { select: 'temperature' } }
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.rule_name).toBe('temp_rule');
    expect(result.epl).toBe('SELECT *, temperature FROM iotEvent');
    expect(result.action).toBeNull();
  });

  test('Generate rule with WHERE clause', () => {
    const nodes = {
      1: { name: 'SELECT WHERE', data: { attributewhere: 'humidity', where: 'humidity > 50' } },
      2: { name: 'RULE', data: { rule: 'humidity_rule' } }
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.epl).toBe('SELECT *, humidity FROM iotEvent WHERE humidity > 50');
  });

  test('Generate rule with LENGTH and TIME', () => {
    const nodes = {
      1: { name: 'LENGTH', data: { attributenamelength: 'temperature', length: 5 } },
      2: { name: 'TIME', data: { attributenametime: 'temperature', length: 10 } },
      3: { name: 'RULE', data: { rule: 'window_rule' } }
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.epl).toContain('win:length(5)');
    expect(result.epl).toContain('win:time(10 sec)');
  });

  test('Generate rule with GROUPBY and ORDERBY', () => {
    const nodes = {
      1: { name: 'GROUPBY', data: { group: 'sensor_id' } },
      2: { name: 'ORDERBY', data: { order: 'timestamp DESC' } },
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.epl).toContain('GROUP BY sensor_id');
    expect(result.epl).toContain('ORDER BY timestamp DESC');
  });

  test('Generate pattern with PATTERN, ATTRIBUTEPATTERN, and PATTERNTYPE', () => {
    const nodes = {
      1: { name: 'PATTERN', data: { pattern: 'temperature > 30' } },
      2: { name: 'ATTRIBUTEPATTERN', data: { pattern: 'temperature > 30', attribute: 'temperature' } },
      3: { name: 'PATTERNTYPE', data: { pattern: 'temperature > 30', attributepattern: 'temperature', typepattern: 'sensor' } }
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.epl).toContain('every ev=iotEvent( temperature > 30 )');
    expect(result.epl).toContain('FROM pattern [every ev=iotEvent( temperature > 30 )]');
    expect(result.epl).toContain("type='sensor'");
  });

  test('Generate aggregations AVG, COUNT, MIN, MAX, SUM', () => {
    const nodes = {
      1: { name: 'AVG', data: { avgattributename: 'temperature' } },
      2: { name: 'COUNT', data: { countattributename: 'temperature' } },
      3: { name: 'MIN', data: { minattributename: 'temperature' } },
      4: { name: 'MAX', data: { maxattributename: 'temperature' } },
      5: { name: 'SUM', data: { sumname: 'temperature' } },
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.epl).toContain('avg(temperature)');
    expect(result.epl).toContain('count(temperature)');
    expect(result.epl).toContain('min(temperature)');
    expect(result.epl).toContain('max(temperature)');
    expect(result.epl).toContain('sum(temperature)');
  });

  test('Generate POST action', () => {
    const nodes = {
      1: { name: 'ACTIONTYPE', data: { type: 'post' } },
      2: { name: 'POST', data: { post: 'http://localhost:9090', data_post: '{}' } }
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.action.type).toBe('post');
    expect(result.action.parameters.url).toBe('http://localhost:9090');
    expect(result.action.template).toBe('{}');
  });

  test('Generate EMAIL action', () => {
    const nodes = {
      1: { name: 'ACTIONTYPE', data: { type: 'email' } },
      2: { name: 'EMAIL', data: { to: 'to@example.com', from: 'from@example.com', subject: 'Test', template: 'Hello' } }
    };

    const result = buildEPLFromNodes(nodes);

    expect(result.action.type).toBe('email');
    expect(result.action.parameters.to).toBe('to@example.com');
    expect(result.action.parameters.from).toBe('from@example.com');
    expect(result.action.parameters.subject).toBe('Test');
    expect(result.action.template).toBe('Hello');
  });

});