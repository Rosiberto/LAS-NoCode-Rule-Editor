export function buildEPLFromNodes(nodes) {

  let post ='', epl_='', select_ ='', whereattribute ='', 
      orderby ='', groupby ='', min ='',  max ='', avg ='', 
      count ='', sum ='', length ='', time ='', 
      pattern ='', patterntype ='', attributepattern ='', 
      action = null, data_post='',
      email_to ='', email_from ='', 
      email_subject ='', email_template ='',  
      rule_name ='';

  for (const id in nodes) {

    const node = nodes[id];
    const name = node.name;
    const d = node.data;

    if (name === 'RULE') {
      rule_name = `${d.rule || ''}`;

    } else if (name === 'EPL') {
      epl_ = `${d.epl || ''}`;

    } else if (name === 'SELECT') {
      select_ = `SELECT *, ${d.select || ''} FROM iotEvent`;

    } else if (name === 'GROUPBY') {
      groupby = ` GROUP BY ${d.group || ''}`;

    } else if (name === 'ORDERBY') {
      orderby = ` ORDER BY ${d.order || ''}`;

    } else if (name === 'POST') {
      post = `${d.post || ''}`;
      data_post = `${d.data_post || ''}`;

    } else if (name === 'EMAIL') {
      email_to = `${d.to || ''}`;
      email_from = `${d.from || ''}`;
      email_subject = `${d.subject || ''}`;
      email_template = `${d.template || ''}`;

    } else if (name === 'ACTIONTYPE') {

      action = {
        type: d.type || '',
        template: '',
        parameters: {}
      };
    }
  }

  const epl = epl_ + select_ + length + time + avg + count +
              min + max + sum + whereattribute + pattern +
              attributepattern + patterntype + orderby + groupby;

  if (action) {

    if (post) {
      action.template = data_post;
      action.parameters.url = post;
      action.parameters.headers = { "Content-Type": "application/json" };

    } else if (email_to) {

      action.template = email_template;
      action.parameters.to = email_to;
      action.parameters.from = email_from;
      action.parameters.subject = email_subject;

    }
  }

  return { rule_name, epl, action };
}