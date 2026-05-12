/*
export function buildEPLFromNodes(nodes) {
  let rule_name = '';
  let epl_ = '', select_ = '', whereattribute = '', 
      groupby = '', orderby = '';
  let min = '', max = '', avg = '', count = '', sum = '';
  let length = '', time = '';
  let pattern = '', patterntype = '', attributepattern = '';
  
  let action = null;
  let postNode = null;
  let emailNode = null;

  // Primeiro, percorre todos os nós e guarda informações
  for (const id in nodes) {
    const node = nodes[id];
    const name = node.name;
    const d = node.data;

    switch (name) {
      case 'RULE':
        rule_name = d.rule || '';
        break;

      case 'EPL':
        epl_ = d.epl || '';
        break;

      case 'SELECT':
        select_ = `SELECT *, ${d.select || ''} FROM iotEvent`;
        break;

      case 'SELECT WHERE':
        whereattribute = `SELECT *, ${d.attributewhere || ''} FROM iotEvent WHERE ${d.where || ''}`;
        break;

      case 'LENGTH':
        length = `SELECT *, ${d.attributenamelength || ''} FROM iotEvent.win:length(${d.length || ''})`;
        break;

      case 'TIME':
        time = `SELECT *, ${d.attributenametime || ''} FROM iotEvent.win:time(${d.length || ''} sec)`;
        break;

      case 'GROUPBY':
        groupby = ` GROUP BY ${d.group || ''}`;
        break;

      case 'ORDERBY':
        orderby = ` ORDER BY ${d.order || ''}`;
        break;

      case 'PATTERN':
        pattern = `every ev=iotEvent( ${d.pattern || ''} )`;
        break;

      case 'ATTRIBUTEPATTERN':
        attributepattern = `FROM pattern [every ev=iotEvent( ${d.pattern || ''} )]`;
        break;

      case 'PATTERNTYPE':
        patterntype = `FROM pattern [every ev=iotEvent( ${d.pattern || ''} and type='${d.typepattern || ''}')]`;
        break;

      case 'AVG':
        avg = `SELECT avg(${d.avgattributename || ''}) FROM iotEvent`;
        break;

      case 'COUNT':
        count = `SELECT count(${d.countattributename || ''}) FROM iotEvent`;
        break;

      case 'MIN':
        min = `SELECT min(${d.minattributename || ''}) FROM iotEvent`;
        break;

      case 'MAX':
        max = `SELECT max(${d.maxattributename || ''}) FROM iotEvent`;
        break;

      case 'SUM':
        sum = `SELECT sum(${d.sumname || ''}) FROM iotEvent`;
        break;

      case 'ACTIONTYPE':
        action = { type: d.type || '', template: '', parameters: {} };
        break;

      case 'POST':
        postNode = d;
        break;

      case 'EMAIL':
        emailNode = d;
        break;

      default:
        // ignora nós desconhecidos
        break;
    }
  }

  // Monta a instrução EPL final
  const epl = epl_ + select_ + length + time + avg + count + min + max + sum + whereattribute +
    (pattern ? `SELECT * FROM pattern [${pattern}]` : '') +
    (attributepattern ? `SELECT *, ${attributepattern}` : '') +
    (patterntype ? `SELECT *, ${patterntype}` : '') +
    orderby + groupby;

  // Conecta POST ou EMAIL ao ACTIONTYPE
  if (action) {
    if (postNode) {
      const priority = (postNode.priority || 'I').trim().toUpperCase();
      const payload = { ruleName: rule_name,
                        template: postNode.template || '',
                        priority: priority,
                        epl: epl
                      };
      action.template = JSON.stringify(payload) || '';
      action.parameters.url = postNode.post || '';
      action.parameters.headers = { "Content-Type": "application/json" };
    } else if (emailNode) {
      action.template = emailNode.template || '';
      action.parameters.to = emailNode.to || '';
      action.parameters.from = emailNode.from || '';
      action.parameters.subject = emailNode.subject || '';
    } else {
    // Mostra alerta pro usuário ao invés de lançar erro
      Swal.fire({
      icon: 'error',
      title: 'Rule validation error',
      html: `<p>Each rule must have a POST or EMAIL block connected to the ACTIONTYPE.</p>`,
      width: 600
      });		
        throw new Error("Each rule must have a POST or EMAIL block connected to the ACTIONTYPE.");
	  }
  } else if (postNode || emailNode) {    
	// Mostra alerta pro usuário ao invés de lançar erro
    Swal.fire({
      icon: 'error',
      title: 'Rule validation error',
      html: `<p>Each rule must have a POST or EMAIL block connected to the ACTIONTYPE.</p>`,
      width: 600
    });
 	  throw new Error("It is not possible to use POST or EMAIL without an ACTIONTYPE.");
 	} 
  

  return { ruleName: rule_name, epl, action };
}
*/

/*
export function buildEPLFromNodes(nodes) {
  let rule_name = '';
  let epl_ = '', select_ = '', whereattribute = '', 
      groupby = '', orderby = '';
  let min = '', max = '', avg = '', count = '', sum = '';
  let length = '', time = '';
  let pattern = '', patterntype = '', attributepattern = '';
  
  let action    = null;
  let postNode  = null;
  let emailNode = null;

  function buildSafeExpression(expr, fieldName = '') {
    if (!expr) return '';

    // Regex robusta: campos com ponto, strings, números negativos/decimais
    const regex = /([a-zA-Z0-9_.?]+)\s*(=|!=|>=|<=|>|<)\s*('[^']*'|-?\d+(\.\d+)?)/g;
    try {
      return expr.replace(regex, (match, field, op, value) => {
        if (value.startsWith("'") && value.endsWith("'")) {
          return `${field} ${op} ${value}`;
        }

        if (!isNaN(value)) {
          return `cast(cast(${field}, String), Float) ${op} ${value}`;
        }

        return match;
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro na expressão',
        html: `<p>Campo <b>${fieldName}</b> possui uma expressão inválida: <pre>${expr}</pre></p>`,
        width: 600
      });
      throw new Error(`Erro de parsing em ${fieldName}`);
    }
  }

  for (const id in nodes) {
    const node = nodes[id];
    const name = node.name;
    const d    = node.data;

    switch (name) {
      case 'RULE':
        rule_name = d.rule || '';
        break;

      case 'EPL':
        epl_ = d.epl || '';
        break;

      case 'SELECT':
        if (!d.select) {
          Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            html: `<p>O campo <b>SELECT</b> está vazio. Nenhum atributo será selecionado.</p>`,
            width: 600
          });
        }
        select_ = `SELECT *, ${d.select || ''} FROM iotEvent`;
        break;

      case 'SELECT WHERE':
        if (!d.where) {
          Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            html: `<p>O campo <b>WHERE</b> está vazio. Nenhuma condição será aplicada.</p>`,
            width: 600
          });
        }
        whereattribute = `SELECT *, ${d.attributewhere || ''} FROM iotEvent WHERE ${buildSafeExpression(d.where || '', 'WHERE')}`;
        break;

      case 'LENGTH':
        length = `SELECT *, ${d.attributenamelength || ''} FROM iotEvent.win:length(${d.length || ''})`;
        break;

      case 'TIME':
        time = `SELECT *, ${d.attributenametime || ''} FROM iotEvent.win:time(${d.time || ''} sec)`;
        break;

      case 'GROUPBY':
        groupby = ` GROUP BY ${buildSafeExpression(d.group || '', 'GROUPBY')}`;
        break;

      case 'ORDERBY':
        orderby = ` ORDER BY ${buildSafeExpression(d.order || '', 'ORDERBY')}`;
        break;

      case 'PATTERN':
        pattern = `every ev=iotEvent( ${buildSafeExpression(d.pattern || '', 'PATTERN')} )`;
        break;

      case 'ATTRIBUTEPATTERN':
        attributepattern = ` SELECT *, ${d.attribute || ''} FROM pattern [every ev=iotEvent( ${buildSafeExpression(d.pattern || '', 'ATTRIBUTEPATTERN')} )]`;
        break;

      case 'PATTERNTYPE':
        patterntype = `SELECT *, ${d.attributepattern || ''} FROM pattern [every ev=iotEvent( ${buildSafeExpression(d.pattern || '', 'PATTERNTYPE')} and type='${d.typepattern || ''}')]`;
        break;

      case 'AVG':
        avg = `SELECT avg(${d.avgattributename || ''}) FROM iotEvent`;
        break;

      case 'COUNT':
        count = `SELECT count(${d.countattributename || ''}) FROM iotEvent`;
        break;

      case 'MIN':
        min = `SELECT min(${d.minattributename || ''}) FROM iotEvent`;
        break;

      case 'MAX':
        max = `SELECT max(${d.maxattributename || ''}) FROM iotEvent`;
        break;

      case 'SUM':
        sum = `SELECT sum(${d.sumname || ''}) FROM iotEvent`;
        break;

      case 'ACTIONTYPE':
        action = { type: d.type || '', template: '', parameters: {} };
        break;

      case 'POST':
        postNode = d;
        break;

      case 'EMAIL':
        emailNode = d;
        break;
    }
  }

 let epl = epl_;

  if (length) {
    epl += length;
  } else if (time) {
    epl += time;
  } else if (pattern) {
    epl += `SELECT * FROM pattern [${pattern}]`;
  } else if (attributepattern) {
    epl += attributepattern;
  } else if (patterntype) {
    epl += patterntype;
  } else if (whereattribute) {
    epl += whereattribute;
  } else {
    epl += select_;
  }
  
  epl += avg + count + min + max + sum;
  epl += orderby + groupby;


  if (action) {
    if (postNode) {
      const priority = (postNode.priority || 'I').trim().toUpperCase();
      const payload  = {
        ruleName: rule_name,
        template: postNode.template || '',
        priority: priority,
        epl: epl
      };

      action.template           = JSON.stringify(payload) || '';
      action.parameters.url     = postNode.post || '';
      action.parameters.headers = { "Content-Type": "application/json" };

    } else if (emailNode) {
      action.template           = emailNode.template || '';
      action.parameters.to      = emailNode.to || '';
      action.parameters.from    = emailNode.from || '';
      action.parameters.subject = emailNode.subject || '';

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro de validação',
        html: `<p>Cada regra deve ter um bloco POST ou EMAIL conectado ao ACTIONTYPE.</p>`,
        width: 600
      });
      throw new Error("Cada regra deve ter POST ou EMAIL.");
    }

  } else if (postNode || emailNode) {
    Swal.fire({
      icon: 'error',
      title: 'Erro de validação',
      html: `<p>Cada regra deve ter um ACTIONTYPE antes de usar POST ou EMAIL.</p>`,
      width: 600
    });
    throw new Error("POST/EMAIL sem ACTIONTYPE.");
  }

  return { ruleName: rule_name, epl, action };
}
*/



export function buildEPLFromNodes(nodes) {
  let rule_name = '';

  let epl_ = '', select_ = '', where_ = '',
      length = '', time = '', pattern = '',
      attributepattern = '', patterntype = '',
      avg = '', count = '', min = '', max = '', sum = '';

  let groupby_ = '';
  let orderby_ = '';

  let action = null;

  const eplBlockNames = [
    'EPL','SELECT','WHERE','LENGTH','TIME','PATTERN',
    'ATTRIBUTEPATTERN','PATTERNTYPE','AVG','COUNT','MIN','MAX','SUM'
  ];

  // ---------------- RULE ----------------
  const ruleNode = Object.values(nodes).find(n => n.name === 'RULE');

  if (!ruleNode) {
    Swal.fire({ icon: 'error', title: 'Error', html: 'No RULE block found.' });
    throw new Error('RULE missing.');
  }

  // -------- INPUT 1 (EPL principal) --------
  const input1Connections = ruleNode.inputs?.input_1?.connections || [];

  if (input1Connections.length !== 1) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'RULE must have exactly 1 block in input 1.'
    });
    throw new Error('Invalid RULE.');
  }

  const eplNode = nodes[input1Connections[0].node];

  if (!eplNode || !eplBlockNames.includes(eplNode.name)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'Input 1 of the RULE must be a valid EPL block.'
    });
    throw new Error('Invalid block.');
  }

  // -------- VALIDAR SAÍDAS DO BLOCO EPL --------
  const outputs = eplNode.outputs?.output_1?.connections || [];

  if (outputs.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: `${eplNode.name} must be connected to the RULE.`
    });
    throw new Error('No connection to the RULE.');
  }

  if (outputs.length > 2) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: `${eplNode.name} can have a maximum of 2 outputs.`
    });
    throw new Error('Outputs exceeded.');
  }

  let hasRuleConnection = false;
  let groupbyNode = null;
  let orderbyNode = null;

  for (const conn of outputs) {
    const target = nodes[conn.node];

    if (!target) continue;

    if (target.name === 'RULE') {
      hasRuleConnection = true;
    }

    else if (target.name === 'GROUPBY') {
      if (groupbyNode) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Only one GROUPBY is allowed.'
        });
        throw new Error('Duplicate GROUPBY.');
      }
      groupbyNode = target;
    }

    else if (target.name === 'ORDERBY') {
      if (orderbyNode) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Only one ORDERBY is allowed.'
        });
        throw new Error('Duplicate ORDERBY.');
      }
      orderbyNode = target;
    }

    else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: `Invalid connection: ${eplNode.name} → ${target.name}`
      });
      throw new Error('Invalid link.');
    }
  }

  if (!hasRuleConnection) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: `${eplNode.name} must be connected to the RULE.`
    });
    throw new Error('No RULE');
  }

  // -------- GROUPBY / ORDERBY --------
  if (groupbyNode) {
    groupby_ = ` GROUP BY ${groupbyNode.data.group || ''}`;
  }

  if (orderbyNode) {
    orderby_ = ` ORDER BY ${orderbyNode.data.order || ''}`;
  }

  // ---------------- ACTIONTYPE ----------------
  const input2Connections = ruleNode.inputs?.input_2?.connections || [];

  if (input2Connections.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'RULE must be connected to an ACTIONTYPE.'
    });
    throw new Error('ACTIONTYPE missing.');
  }

  const actionTypeNode = nodes[input2Connections[0].node];

  if (!actionTypeNode || actionTypeNode.name !== 'ACTIONTYPE') {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'Input 2 of the RULE must be an ACTIONTYPE.'
    });
    throw new Error('Invalid ACTIONTYPE.');
  }

  // -------- POST / EMAIL --------
  const actionConnections = actionTypeNode.inputs?.input_1?.connections || [];

  if (actionConnections.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'ACTIONTYPE requires POST or EMAIL.'
    });
    throw new Error('No action.');
  }

  let postNode = null;
  let emailNode = null;

  function buildSafeExpression(expr, fieldName = '') {
    if (!expr) return '';

    // Regex robusta: campos com ponto, strings, números negativos/decimais
    const regex = /([a-zA-Z0-9_.?]+)\s*(=|!=|>=|<=|>|<)\s*('[^']*'|-?\d+(\.\d+)?)/g;
    try {
      return expr.replace(regex, (match, field, op, value) => {
        if (value.startsWith("'") && value.endsWith("'")) {
          return `${field} ${op} ${value}`;
        }

        if (!isNaN(value)) {
          return `cast(cast(${field}, String), Float) ${op} ${value}`;
        }

        return match;
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Expression error',
        html: `<p>Field <b>${fieldName}</b> has an invalid expression: <pre>${expr}</pre></p>`,
        width: 600
      });
      throw new Error(`Erro de parsing em ${fieldName}`);
    }
  }


  for (const conn of actionConnections) {
    const n = nodes[conn.node];
    if (n.name === 'POST') postNode = n.data;
    if (n.name === 'EMAIL') emailNode = n.data;
  }

  if (!postNode && !emailNode) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: 'ACTIONTYPE requires POST or EMAIL.'
    });
    throw new Error('Invalid action.');
  }

  // ---------------- EPL BASE ----------------
  const d = eplNode.data;

  switch (eplNode.name) {
    case 'EPL': epl_ = d.epl || ''; break;
    case 'SELECT': select_ = `SELECT *, ${d.select || ''} FROM iotEvent`; break;
    case 'WHERE': where_ = `SELECT *, ${d.attributewhere || ''} FROM iotEvent WHERE ${buildSafeExpression(d.where || '')}`; break;
    case 'LENGTH': length = `SELECT *, ${d.attributenamelength || ''} FROM iotEvent.win:length(${d.length || ''})`; break;
    case 'TIME': time = `SELECT *, ${d.attributenametime || ''} FROM iotEvent.win:time(${d.time || ''} sec)`; break;
    case 'PATTERN': pattern = `SELECT * FROM pattern [every ev=iotEvent(${buildSafeExpression(d.pattern || '')})]`; break;
    case 'ATTRIBUTEPATTERN': attributepattern = `SELECT *, ${d.attribute || ''} FROM pattern [every ev=iotEvent(${buildSafeExpression(d.pattern || '')})]`; break;
    case 'PATTERNTYPE': patterntype = `SELECT *, ${d.attributepattern || ''} FROM pattern [every ev=iotEvent(${buildSafeExpression(d.pattern || '')} and type='${buildSafeExpression(d.typepattern || '')}')]`; break;
    case 'AVG': avg = `SELECT avg(${d.avgattributename || ''}) FROM iotEvent`; break;
    case 'COUNT': count = `SELECT count(${d.countattributename || ''}) FROM iotEvent`; break;
    case 'MIN': min = `SELECT min(${d.minattributename || ''}) FROM iotEvent`; break;
    case 'MAX': max = `SELECT max(${d.maxattributename || ''}) FROM iotEvent`; break;
    case 'SUM': sum = `SELECT sum(${d.sumname || ''}) FROM iotEvent`; break;
  }

  // ---------------- MONTAGEM EPL ----------------
  let epl = epl_ || '';

  if (length) epl += length;
  else if (time) epl += time;
  else if (pattern) epl += pattern;
  else if (attributepattern) epl += attributepattern;
  else if (patterntype) epl += patterntype;
  else if (where_) epl += where_;
  else epl += select_;

  epl += avg + count + min + max + sum;

  // novos blocos
  epl += groupby_;
  epl += orderby_;

  // ---------------- ACTION ----------------
  action = {
    type: actionTypeNode.data.type || '',
    template: '',
    parameters: {}
  };

  if (postNode) {
    const priority = (postNode.priority || 'I').toUpperCase();

    const payload = {
      ruleName: rule_name,
      template: postNode.template || '',
      priority,
      epl
    };

    action.template = JSON.stringify(payload);
    action.parameters.url = postNode.post || '';
    action.parameters.headers = {
      "Content-Type": "application/json"
    };

  } else if (emailNode) {
    action.template = emailNode.template || '';
    action.parameters.to = emailNode.to || '';
    action.parameters.from = emailNode.from || '';
    action.parameters.subject = emailNode.subject || '';
  }

  // -------- RULE NAME --------
  rule_name = ruleNode.data.rule || '';

  return { ruleName: rule_name, epl, action };
}