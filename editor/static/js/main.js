import { addSelect } from './blocks/select.js';
import { addWhere } from './blocks/where.js';
import { addGroupBy } from './blocks/groupby.js';
import { addOrderBy } from './blocks/orderby.js';
import { addActionType } from './blocks/actiontype.js';
import { addRule } from './blocks/rule.js';
import { addEpl } from './blocks/epl.js';
import { addLength } from './blocks/length.js';
import { addTime } from './blocks/time.js';
import { addPost } from './blocks/post.js';
import { addEmail } from './blocks/email.js';
import { addAVG } from './blocks/avg.js';
import { addCount } from './blocks/count.js';
import { addMin } from './blocks/min.js';
import { addMax } from './blocks/max.js';
import { addSum } from './blocks/sum.js';
import { addPattern } from './blocks/pattern.js';
import { addAttributePattern } from './blocks/attribute-pattern.js';
import { addPatternType } from './blocks/pattern-type.js';
import { buildEPLFromNodes } from './eplBuilder.js';


window.editor = null;

const nodeFactory = {
  'SELECT': addSelect,
  'WHERE': addWhere,
  'GROUPBY': addGroupBy,
  'ORDERBY': addOrderBy,
  'ACTIONTYPE': addActionType,
  'RULE': addRule,
  'EPL': addEpl,
  'LENGTH': addLength,
  'TIME': addTime,
  'POST': addPost,
  'EMAIL': addEmail,
  'AVG' : addAVG,
  'MIN': addMin,
  'MAX' : addMax,
  'COUNT' : addCount,
  'SUM' : addSum,
  'PATTERN' : addPattern,
  'ATTRIBUTEPATTERN' :addAttributePattern,
  'PATTERNTYPE' : addPatternType

};


function initDrawflow() {
  const editorDiv = document.getElementById('drawflow');
  const editor = new Drawflow(editorDiv);
  editor.start();
  editor.addModule('Home');   //  Garante que "Home" exista
  editor.changeModule('Home'); // Alterna para ele

  window.editor = editor;

  // Função global para que inputs internos chamem
  window.updateNode = function(nodeId, key, value) {
    const node = editor.getNodeFromId(nodeId);
    if (node && node.data) {
      node.data[key] = value;
    
      // Atualiza o HTML com os novos dados
      if (node.name === 'SELECT') {
        import('./blocks/select.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
       
	  // Atualiza o HTML com os novos dados
      if (node.name === 'WHERE') {
        import('./blocks/where.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'LENGTH') {
        import('./blocks/length.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'TIME') {
        import('./blocks/time.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'GROUPBY') {
        import('./blocks/groupby.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'ORDERBY') {
        import('./blocks/orderby.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'ACTIONTYPE') {
        import('./blocks/actiontype.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'POST'){
        import('./blocks/post.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'EMAIL'){
        import('./blocks/email.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      // Atualiza o HTML com os novos dados
      if (node.name === 'RULE') {
        import('./blocks/rule.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'EPL') {
        import('./blocks/epl.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }

	  // Atualiza o HTML com os novos dados
      if (node.name === 'AVG') {
        import('./blocks/avg.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }

	  // Atualiza o HTML com os novos dados
      if (node.name === 'COUNT') {
        import('./blocks/count.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }	  
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'MIN') {
        import('./blocks/min.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }	 
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'MAX') {
        import('./blocks/max.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }	 
	  
	  // Atualiza o HTML com os novos dados
      if (node.name === 'SUM') {
        import('./blocks/sum.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }

	 // Atualiza o HTML com os novos dados
     if (node.name === 'PATTERN') {
       import('./blocks/pattern.js').then(module => {
         module.updateNodeHtml(editor, nodeId);
       });
     }	 

	// Atualiza o HTML com os novos dados
     if (node.name === 'ATTRIBUTEPATTERN') {
       import('./blocks/attribute-pattern.js').then(module => {
         module.updateNodeHtml(editor, nodeId);
       });
     }	 

	// Atualiza o HTML com os novos dados
     if (node.name === 'PATTERNTYPE') {
       import('./blocks/pattern-type.js').then(module => {
         module.updateNodeHtml(editor, nodeId);
       });
     }
	  
    }
  };

  setupDragAndDrop(editor);
  return editor;
}

function setupDragAndDrop(editor) {
  // Adiciona evento de dragstart para cada bloco
  document.querySelectorAll('.drag-drawflow').forEach(el => {
    el.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    });
  });

  const drawflow = document.getElementById('drawflow');

    drawflow.addEventListener('dragover', ev => ev.preventDefault());

    drawflow.addEventListener('drop', ev => {
      ev.preventDefault();
      const nodeName = ev.dataTransfer.getData("node");
      const rect = drawflow.getBoundingClientRect();
      const x = (ev.clientX - rect.left) * (editor.precanvas.clientWidth / rect.width);
      const y = (ev.clientY - rect.top) * (editor.precanvas.clientHeight / rect.height);

      const addFunc = nodeFactory[nodeName];
      if (addFunc) {
        addFunc(editor, x, y); // passamos posição
      } else {
        console.warn(`Bloco "${nodeName}" não encontrado`);
      }
    });
  }


function setupControls() {
  document.getElementById('btn-select')?.addEventListener('click', () => addSelect(window.editor));
  document.getElementById('btn-where')?.addEventListener('click', () => addWhere(window.editor));
  document.getElementById('btn-groupby')?.addEventListener('click', () => addGroupBy(window.editor));
  document.getElementById('btn-orderby')?.addEventListener('click', () => addOrderBy(window.editor));
  document.getElementById('btn-actiontype')?.addEventListener('click', () => addActionType(window.editor));  
  document.getElementById('btn-rule')?.addEventListener('click', () => addRule(window.editor));
  document.getElementById('btn-epl')?.addEventListener('click', () => addEpl(window.editor));
  document.getElementById('btn-length')?.addEventListener('click', () => addLength(window.editor));
  document.getElementById('btn-time')?.addEventListener('click', () => addTime(window.editor));
  document.getElementById('btn-post')?.addEventListener('click', () => addPost(window.editor));
  document.getElementById('btn-email')?.addEventListener('click', () => addEmail(window.editor));
  document.getElementById('btn-avg')?.addEventListener('click', () => addAVG(window.editor));
  document.getElementById('btn-min')?.addEventListener('click', () => addMin(window.editor));
  document.getElementById('btn-max')?.addEventListener('click', () => addMax(window.editor));
  document.getElementById('btn-sum')?.addEventListener('click', () => addSum(window.editor));
  document.getElementById('btn-count')?.addEventListener('click', () => addCount(window.editor));
  document.getElementById('btn-pattern')?.addEventListener('click', () => addPattern(window.editor));
  document.getElementById('btn-attributepattern')?.addEventListener('click', () => addAttributePattern(window.editor));
  document.getElementById('btn-patterntype')?.addEventListener('click', () => addPatternType(window.editor));
  
  
  document.getElementById('btn-generate')?.addEventListener('click', generateEPL);
  document.getElementById('btn-saveFlowToServer')?.addEventListener('click', saveFlowToServer);
  document.getElementById('btn-loadFlowFromServer')?.addEventListener('click', loadFlowFromServer);
}

function generateEPL() {
  const data = window.editor.export();
  const nodes = data.drawflow.Home.data;

  /*
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
	} else if (name === 'PATTERN') {
		pattern = `SELECT * FROM pattern [every ev=iotEvent( ${d.pattern || ''})]`;
		//console.log(pattern);
	} else if (name === 'ATTRIBUTEPATTERN') {
		attributepattern = `SELECT *, ${d.attribute || ''} FROM pattern [every ev=iotEvent( ${d.pattern || ''})]`;
		//console.log(attributepattern);
	} else if (name === 'PATTERNTYPE') {
		patterntype = `SELECT *, ${d.attributepattern || ''} FROM pattern [every ev=iotEvent( ${d.pattern || ''} and type='${d.typepattern || ''}')]`;
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

  const epl = epl_ + select_ + length + time + avg + count + min + max + sum + whereattribute + pattern + attributepattern + patterntype + orderby + groupby;
  
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
  const result = { rule_name, epl, action };
*/

  const result = buildEPLFromNodes(nodes);

  Swal.fire({
    title: 'View EPL',
    html: `<pre style="text-align:left; max-height:400px; overflow:auto;">${JSON.stringify(result, null, 2)}</pre>`,
    width: 800
  });

  fetch('/gerar_epl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  })
    .then(res => res.json())
    .then(j => console.log('Resposta backend:', j));
}

// ** Nova função para salvar no backend **
function saveFlowToServer() {
  const flow = window.editor.export();
  const name = prompt('Enter a name to save the flow.:', 'My flow');
      
  if (!name) {
    alert('Name is required!');
    return;
  }
/*      
  Swal.fire({
    title: 'Save Flow',
    html: `<pre style="text-align:left; max-height:400px; overflow:auto;">${JSON.stringify(flow, null, 2)}</pre>`,
    width: 800
  });
*/ 
  console.log(flow);
  
  fetch('/saveFlow', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, flow})
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert('Error saving flow: ' + data.error);
      } else {
        alert(`Flow saved successfully.! ID: ${data.id}`);
      }
    })
    .catch(err => alert('Erro na comunicação: ' + err.message));
  }

function loadFlowFromServer() {
  // Buscar todos os fluxos
  fetch('/listFlows')
    .then(res => res.json())
    .then(flows => {
      if (flows.error) {
        alert('Error: ' + flows.error);
        return;
      }

      if (flows.length === 0) {
        Swal.fire('No saved flows found.');
        return;
      }

      // Criar HTML para SweetAlert
      const html = flows.map(f => 
        `<div class="flow-item" data-id="${f.id}" style="cursor:pointer; padding:5px 0;">${f.name} (ID: ${f.id})</div>`
      ).join('');

      // Mostrar modal
      Swal.fire({
        title: 'Choose a rule to load',
        html: html,
        width: 400,
        showConfirmButton: false
      });

      // Adicionar evento de clique
      document.querySelectorAll('.flow-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.getAttribute('data-id');
          fetch(`/flow/getFlow/${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                alert('Error: ' + data.error);
              } else {
                window.editor.clear();
                window.editor.import(data.flow);
                console.log('Flow loaded successfully:', data.flow);
                Swal.close();
              }
            })
            .catch(err => alert('Communication error: ' + err.message));
        });
      });

    })
    .catch(err => alert('Communication error: ' + err.message));
}



window.generateEPL = generateEPL;

window.onload = function() {
  initDrawflow();
  setupControls();
};
