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
  editor.addModule('Home');   
  editor.changeModule('Home'); 

  window.editor = editor;

  window.updateNode = function(nodeId, key, value) {
    const node = editor.getNodeFromId(nodeId);
    if (node && node.data) {
      node.data[key] = value;
    
      if (node.name === 'SELECT') {
        import('./blocks/select.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
       
      if (node.name === 'WHERE') {
        import('./blocks/where.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'LENGTH') {
        import('./blocks/length.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'TIME') {
        import('./blocks/time.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'GROUPBY') {
        import('./blocks/groupby.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'ORDERBY') {
        import('./blocks/orderby.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'ACTIONTYPE') {
        import('./blocks/actiontype.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'POST'){
        import('./blocks/post.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'EMAIL'){
        import('./blocks/email.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'RULE') {
        import('./blocks/rule.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }
	  
      if (node.name === 'EPL') {
        import('./blocks/epl.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }

      if (node.name === 'AVG') {
        import('./blocks/avg.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }

      if (node.name === 'COUNT') {
        import('./blocks/count.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }	  
	  
      if (node.name === 'MIN') {
        import('./blocks/min.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }	 
	  
      if (node.name === 'MAX') {
        import('./blocks/max.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }	 
	  
      if (node.name === 'SUM') {
        import('./blocks/sum.js').then(module => {
          module.updateNodeHtml(editor, nodeId);
        });
      }

     if (node.name === 'PATTERN') {
       import('./blocks/pattern.js').then(module => {
         module.updateNodeHtml(editor, nodeId);
       });
     }	 

     if (node.name === 'ATTRIBUTEPATTERN') {
       import('./blocks/attribute-pattern.js').then(module => {
         module.updateNodeHtml(editor, nodeId);
       });
     }	 

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
        addFunc(editor, x, y); 
      } else {
        console.warn(`Block "${nodeName}" was not found`);
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

  const result = buildEPLFromNodes(nodes);

  Swal.fire({
    title: 'LAS – Generated EPL (Perseo CEP)',
    html: `<pre style="text-align:left; max-height:400px; overflow:auto;">${JSON.stringify(result, null, 2)}</pre>`,
    width: 800
  });

  fetch('/gerar_epl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  })
    .then(res => res.json())
    .then(j => console.log('Backend response:', j));
}

function saveFlowToServer() {
  const flow = window.editor.export();
  const name = prompt('Enter a name to save the flow.:', 'My flow');
      
  if (!name) {
    alert('Name is required!');
    return;
  }


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
    .catch(err => alert('A communication error has occurred: ' + err.message));
  }

function loadFlowFromServer() {
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

      const html = flows.map(f => 
        `<div class="flow-item" data-id="${f.id}" style="cursor:pointer; padding:5px 0;">${f.name} (ID: ${f.id})</div>`
      ).join('');

      Swal.fire({
        title: 'Choose a rule to load',
        html: html,
        width: 400,
        showConfirmButton: false
      });

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
