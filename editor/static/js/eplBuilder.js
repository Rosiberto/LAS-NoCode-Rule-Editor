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
      action.template = postNode.data_post || '';
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
  

  return { rule_name, epl, action };
}