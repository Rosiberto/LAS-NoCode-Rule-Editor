// tests/frontend/eplBuilderIntegration.test.js
import { buildEPLFromNodes } from '../../editor/static/js/eplBuilder.js';

describe('eplBuilder - teste de integração completo', () => {

  test('geração de regra completa combinando múltiplos blocos', () => {

    const nodes = [
      { name: 'SELECT', data: { select: 'temperature' } },
      { name: 'SELECT WHERE', data: { attributewhere: 'temperature', where: 'temperature > 30' } },
      { name: 'AVG', data: { avgattributename: 'temperature' } },
      { name: 'PATTERN', data: { pattern: 'temperature > 30' } },
      { name: 'ATTRIBUTEPATTERN', data: { pattern: 'temperature > 30', attribute: '' } },
      { name: 'PATTERNTYPE', data: { pattern: 'temperature > 30', typepattern: 'sensor' } },
      { name: 'EMAIL', data: { to: 'user@example.com', from: 'noreply@example.com', subject: 'Alert', template: 'High temperature detected' } },
      { name: 'POST', data: { post: 'https://api.example.com/alert', data_post: '{"temperature": 35}' } },
    ];

    const result = buildEPLFromNodes(nodes);

    // Cada bloco gera sua própria instrução completa
    expect(result.epl).toContain('SELECT *, temperature FROM iotEvent');               // SELECT
    expect(result.epl).toContain('SELECT *, temperature FROM iotEvent WHERE temperature > 30'); // WHERE
    expect(result.epl).toContain('SELECT avg(temperature) FROM iotEvent');             // AVG
    expect(result.epl).toContain('SELECT * FROM pattern [every ev=iotEvent( temperature > 30 )]'); // PATTERN
    expect(result.epl).toContain('SELECT *, FROM pattern [every ev=iotEvent( temperature > 30 )]'); // ATTRIBUTEPATTERN
    expect(result.epl).toContain("SELECT *, FROM pattern [every ev=iotEvent( temperature > 30 and type='sensor')]"); // PATTERNTYPE

    // Ação deve estar definida corretamente
    expect(result.action).toBeDefined();
    expect(result.action.type).toBe('EMAIL'); // último bloco de ação sobrescreve o anterior
    expect(result.action.template).toBe('High temperature detected');
    expect(result.action.parameters.to).toBe('user@example.com');
    expect(result.action.parameters.from).toBe('noreply@example.com');
    expect(result.action.parameters.subject).toBe('Alert');

  });

});