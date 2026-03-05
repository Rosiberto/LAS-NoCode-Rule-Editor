// tests/frontend/eplBuilder.full.test.js
import { buildEPLFromNodes } from '../../editor/static/js/eplBuilder.js';

/**
 * Suite completa de testes para LAS-NoCode Rule Editor
 */
describe('eplBuilder - testes de regras CEP completos', () => {

  // -----------------------------
  // 1. SELECT simples e WHERE
  // -----------------------------
  test('gera regra simples SELECT', () => {
    const nodes = [
      { type: 'select', fields: ['temperature'], source: 'iotEvent' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toBe('SELECT *, temperature FROM iotEvent');
  });

  test('gera regra com WHERE', () => {
    const nodes = [
      { type: 'select', fields: ['humidity'], source: 'iotEvent' },
      { type: 'where', condition: 'humidity > 50' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toBe('SELECT *, humidity FROM iotEvent WHERE humidity > 50');
  });

  // -----------------------------
  // 2. LENGTH e TIME
  // -----------------------------
  test('gera regra com LENGTH e TIME', () => {
    const nodes = [
      { type: 'select', fields: ['temperature'], source: 'iotEvent' },
      { type: 'window', length: 5, time: '10 sec' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('win:length(5)');
    expect(result.epl).toContain('win:time(10 sec)');
  });

  // -----------------------------
  // 3. GROUPBY e ORDERBY
  // -----------------------------
  test('gera regra com GROUPBY e ORDERBY', () => {
    const nodes = [
      { type: 'select', fields: ['temperature'], source: 'iotEvent' },
      { type: 'groupby', fields: ['deviceId'] },
      { type: 'orderby', fields: ['temperature'] }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('GROUP BY deviceId');
    expect(result.epl).toContain('ORDER BY temperature');
  });

  // -----------------------------
  // 4. Padrões e atributos
  // -----------------------------
  test('gera padrão com PATTERN, ATTRIBUTEPATTERN e PATTERNTYPE', () => {
    const nodes = [
      { type: 'pattern', expression: 'every ev=iotEvent( temperature > 30 )' },
      { type: 'attributepattern', attribute: 'temperature' },
      { type: 'patterntype', value: 'sensor' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('every ev=iotEvent( temperature > 30 )');
    expect(result.epl).toContain("type='sensor'");
  });

  // -----------------------------
  // 5. Agregações
  // -----------------------------
  test('gera agregações AVG, COUNT, MIN, MAX, SUM', () => {
    const nodes = [
      { type: 'select', fields: ['temperature'], source: 'iotEvent' },
      { type: 'aggregate', operations: ['avg', 'count', 'min', 'max', 'sum'] }
    ];
    const result = buildEPLFromNodes(nodes);
    ['avg(temperature)', 'count(temperature)', 'min(temperature)', 'max(temperature)', 'sum(temperature)'].forEach(op => {
      expect(result.epl).toContain(op);
    });
  });

  // -----------------------------
  // 6. Ações
  // -----------------------------
  test('gera ação POST', () => {
    const nodes = [
      { type: 'action', action: 'POST', template: {} }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.actions).toContainEqual({ type: 'POST', template: {} });
  });

  test('gera ação EMAIL', () => {
    const nodes = [
      { type: 'action', action: 'EMAIL', template: 'Hello' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.actions).toContainEqual({ type: 'EMAIL', template: 'Hello' });
  });

  // -----------------------------
  // 7. Casos de borda
  // -----------------------------
  test('regra com node faltando deve retornar EPL vazio', () => {
    const nodes = [];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toBe('');
  });

  test('node inválido é ignorado', () => {
    const nodes = [
      { type: 'select', fields: ['temperature'], source: 'iotEvent' },
      { type: 'unknown', foo: 'bar' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toBe('SELECT *, temperature FROM iotEvent');
  });

  test('regras complexas combinando múltiplos blocos', () => {
    const nodes = [
      { type: 'select', fields: ['temperature'], source: 'iotEvent' },
      { type: 'where', condition: 'temperature > 30' },
      { type: 'aggregate', operations: ['avg'] },
      { type: 'pattern', expression: 'every ev=iotEvent( temperature > 30 )' },
      { type: 'action', action: 'EMAIL', template: 'Warning' }
    ];
    const result = buildEPLFromNodes(nodes);
    expect(result.epl).toContain('temperature > 30');
    expect(result.epl).toContain('avg(temperature)');
    expect(result.actions).toContainEqual({ type: 'EMAIL', template: 'Warning' });
  });

});