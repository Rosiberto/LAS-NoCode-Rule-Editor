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
		//console.log(rule_name);
	} else if (name === 'EPL') {
		epl_ = `${d.epl || ''}`;
		// console.log(epl_);
    } else if (name === 'SELECT') {
		select_ = `SELECT *, ${d.select || ''} FROM iotEvent`;
		//console.log(select_);
    } else if (name === 'SELECT WHERE') {
		whereattribute = `SELECT *, ${d.attributewhere || ''} FROM iotEvent WHERE ${d.where || ''}`;
		//console.log(whereattribute);
	} else if (name === 'LENGTH') {
		length = `SELECT *, ${d.attributenamelength || ''} FROM iotEvent.win:length(${d.length || ''})`;
		//console.log(length);
	} else if (name === 'TIME') {
		time = `SELECT *, ${d.attributenametime || ''} FROM iotEvent.win:time(${d.length || ''} sec)`;
		//console.log(time);
    } else if (name === 'GROUPBY') {
		groupby = ` GROUP BY ${d.group || ''}`;
		//console.log(groupby);
    } else if (name === 'ORDERBY') {
		orderby = ` ORDER BY ${d.order || ''}`;
		//console.log(orderby);
	/*} else if (name === 'PATTERN') {
		pattern = `SELECT * FROM pattern [every ev=iotEvent( ${d.pattern || ''})]`;
		//console.log(pattern);
	} else if (name === 'ATTRIBUTEPATTERN') {
		attributepattern = `SELECT *, ${d.attribute || ''} FROM pattern [every ev=iotEvent( ${d.pattern || ''})]`;
		//console.log(attributepattern);
	} else if (name === 'PATTERNTYPE') {
		patterntype = `SELECT *, ${d.attributepattern || ''} FROM pattern [every ev=iotEvent( ${d.pattern || ''} and type='${d.typepattern || ''}')]`;
		//console.log(patterntype);*/
  } else if (name === 'PATTERN') {
    pattern = `every ev=iotEvent( ${d.pattern || ''} )`;  // sem SELECT *
    //console.log(pattern);
  } else if (name === 'ATTRIBUTEPATTERN') {
    attributepattern = `FROM pattern [every ev=iotEvent( ${d.pattern || ''} )]`; // sem SELECT *
    //console.log(attributepattern);
  } else if (name === 'PATTERNTYPE') {
    patterntype = `FROM pattern [every ev=iotEvent( ${d.pattern || ''} and type='${d.typepattern || ''}')]`; // sem SELECT *
    //console.log(patterntype);
  } else if (name === 'EMAIL') {
		email_to = `${d.to || ''}`;
		email_from = `${d.from || ''}`;
		email_subject = `${d.subject || ''}`;
		email_template = `${d.template || ''}`;
		//console.log(email_to +' '+email_subject+' '+email_template);
	} else if (name === 'POST') {
		post = `${d.post || ''}`;
		data_post = `${d.data_post || ''}`;
		//console.log("console.log "+ post +" data_post: "+data_post);
    } else if (name === 'AVG') {
		avg = `SELECT avg(${d.avgattributename || ''}) FROM iotEvent`;
	  //console.log("console.log "+ avg );
	} else if (name === 'COUNT') {
		count = `SELECT count(${d.countattributename || ''}) FROM iotEvent`;
	  //console.log("console.log "+ count );
	} else if (name === 'MIN') {
		min = `SELECT min(${d.minattributename || ''})FROM iotEvent`;
	  //console.log("console.log "+ min);
	} else if (name === 'MAX') {
		max = `SELECT max(${d.maxattributename || ''}) FROM iotEvent`;
	  //console.log("console.log "+ max);
	} else if (name === 'SUM') {
		sum = `SELECT sum(${d.sumname || ''}) FROM iotEvent`;
	  //console.log("console.log "+ sum);
    } else if (name === 'ACTIONTYPE') {
		action = {
			type: d.type || '',
			template: '', 
			parameters: { }        
		};		
	  }    
  }

  //const epl = epl_ + select_ + length + time + avg + count + min + max + sum + whereattribute + pattern + attributepattern + patterntype + orderby + groupby;
  const epl = epl_ + select_ + length + time + avg + count + min + max + sum + whereattribute + 
            (pattern ? `SELECT * FROM pattern [${pattern}]` : '') +
            (attributepattern ? `SELECT *, ${attributepattern}` : '') +
            (patterntype ? `SELECT *, ${patterntype}` : '') +
            orderby + groupby;


  if (action) {
    if (post){
      action.template = data_post; 
      action.parameters.url = post;
      action.parameters.headers = { "Content-Type": "application/json" };
      //action.parameters.json = { ruleName: rule_name, epl: epl, data: data_post};
      //action.parameters.json = { ruleName: rule_name, data: data_post};
      //action.parameters.json = { ruleName: rule_name};
      console.log("POST action.template " + action.template);  
    }else if (email_to){
      action.template = email_template; 
      action.parameters.to = email_to; 
      action.parameters.from = email_from; 
      action.parameters.subject = email_subject; 
      console.log("EMAIL action.template " + action.template);  
     
    }		
  }

  return { rule_name, epl, action };
}