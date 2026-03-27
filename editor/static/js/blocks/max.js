// blocks/max.js
export function addMax(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'MAX',
    0, 1,
    x,
    y,
    'max',
    {},
    getHtml('MAX', [
      { default: 'SELECT max '}, 
	  { default_from: ' FROM iotEvent' }
    ], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Max</strong></div>
      <div class="box">
		    <label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter attribute name." df-maxattributename>
		    <br><br/><label>${fields[1].default_from}</label>
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
  let html = getHtml('MAX', [{ default: 'SELECT max '},
								             { default_from: ' FROM iotEvent'}
							              ]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const maxattributeValue = node.data.maxattributename || '';
  
  // Atualiza o primeiro input (df-maxattributename)
  html = html.replace(
    /<input([^>]*)df-maxattributename([^>]*)>/,
    `<input$1df-maxattributename$2 value="${maxattributeValue}" onchange="window.updateNode('${nodeId}', 'maxattributename', this.value)">`
  );
  
  // Valida antes de setar o HTML
    editor.drawflow.drawflow[editor.module].data[nodeId].html = html;
    editor.updateConnectionNodes('');
}

// Tenta atualizar o HTML após o nó ser completamente registrado
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