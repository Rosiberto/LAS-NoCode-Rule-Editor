import { buildEPLFromNodes } from '../../editor/static/js/eplBuilder.js';

test('Generate complete rule combining multiple blocks', () => {

  const nodes = [
    { name: 'SELECT WHERE', data: { attributewhere: 'temperature', where: 'temperature > 30' } },
    { name: 'AVG', data: { avgattributename: 'temperature' } },
    { name: 'PATTERN', data: { pattern: 'temperature > 30' } },
    { name: 'ATTRIBUTEPATTERN', data: { pattern: 'temperature > 30', attribute: '' } },
    { name: 'PATTERNTYPE', data: { pattern: 'temperature > 30', typepattern: 'sensor' } },
    { name: 'ACTIONTYPE', data: { type: 'EMAIL' } },
    {
      name: 'EMAIL',
      data: {
        to: 'user@example.com',
        from: 'noreply@example.com',
        subject: 'Alert',
        template: 'High temperature detected'
      }
    }
  ];

  const result = buildEPLFromNodes(nodes);

  // ✔ WHERE real
  expect(result.epl).toContain('WHERE temperature > 30');

  // ✔ agregação
  expect(result.epl).toContain('avg(temperature)');

  // ✔ pattern base
  expect(result.epl).toContain('every ev=iotEvent');

  // ✔ pattern com type
  expect(result.epl).toContain("type='sensor'");

  // ✔ ação
  expect(result.action).toBeDefined();
  expect(result.action.type).toBe('EMAIL');
  expect(result.action.template).toBe('High temperature detected');
});