// blocks/actiontype.js
export function addActionType(editor, x = 100, y = 100) {
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }

  const nodeId = editor.addNode(
    'ACTIONTYPE',
    1, 1,
    x,
    y,
    'actiontype',
    {},
	getHtml('ACTIONTYPE', [{}], null)    
  );

  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Action Type</strong></div>   
	      <div class="box">         
          <select df-type>
		        <option value="">select type</option>
            <option value="email">EMAIL</option>
            <option value="post">POST</option>                
          </select>
        </div>	  
    </div>
  `;
}

// depois de criado, atualiza o HTML com o ID correto
function updateNodeHtml(editor, nodeId) {
  const node = editor.getNodeFromId(nodeId);
  if (!node || !node.data) {
    console.warn(`Node ${nodeId} was not found or contains no data.`);
    return; 
  }

 // Pegamos o HTML base
  let html = getHtml('ACTIONTYPE', [{}]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value = node.data.type || '';
  
  // Atualiza o primeiro input (df-order)
  html = html.replace(
    /<input([^>]*)df-type([^>]*)>/,
    `<select$1df-type$2 value="${value}" onchange="window.updateNode('${nodeId}', 'type', this.value)">`
  );
     
  // Valida antes de setar o HTML
    editor.drawflow.drawflow[editor.module].data[nodeId].html = html;
    editor.updateConnectionNodes('');
}

function waitForNodeAndUpdateHtml(editor, nodeId, tries = 20) {
  const module = editor.module;
  const nodeExists = editor.drawflow?.drawflow?.[module]?.data?.[nodeId];

  if (nodeExists) {
    console.log(`✅ Node ${nodeId} was successfully located. Updating HTML...`);
    updateNodeHtml(editor, nodeId);
  } else if (tries > 0) {
    setTimeout(() => {
      waitForNodeAndUpdateHtml(editor, nodeId, tries - 1);
    }, 50);
  } else {
    console.warn(`❌ Node ${nodeId} could not be found after multiple attempts.`);
  }
}

export { updateNodeHtml };
