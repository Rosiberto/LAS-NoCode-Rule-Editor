// blocks/select.js
export function addSelect(editor, x = 100, y = 100) {

  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }

  const nodeId = editor.addNode(
    'SELECT',
    0, 1,
    x,
    y,
    'select',
    { },
    getHtml('SELECT', [ { default: 'SELECT *, '}, 
						{ from: ' FROM iotEvent' } ], null)
  );
  

  //console.log("Criando SELECT nodeId:", nodeId);
  //console.log("nodeId:", nodeId);
  //console.log("editor.module:", editor.module);
  //console.log("editor.drawflow:", editor.drawflow);

  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Select</strong></div>
      <div class="box">
		<label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter attribute name." df-select><br> <br/>
		<label>${fields[1].from}</label>
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
  let html = getHtml('SELECT', [{ default: 'SELECT *, '}, 
								{ from: ' FROM iotEvent' }]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value = node.data.select || '';

  html = html.replace(
    /<input([^>]*)df-select([^>]*)>/,
    `<input$1df-select$2 value="${value}" onchange="window.updateNode('${nodeId}', 'select', this.value)">`
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