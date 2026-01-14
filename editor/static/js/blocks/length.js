// blocks/select-length.js
export function addLength(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'SELECT LENGTH',
    0, 1,
    x,
    y,
    'select length',
    {},
    getHtml('SELECT WHERE', [
      { default: 'SELECT *, '}, 
	  { default_length: 'FROM iotEvent.win:LENGTH ' }
    ], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Select Length</strong></div>
      <div class="box">
		<label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter attribute name." df-attributenamelength>
		<br><br/><label>${fields[1].default_length}</label><br> <br/>
        <input type="text" placeholder="Enter the length." df-length>
      </div>
    </div>
  `;
}

// depois de criado, atualiza o HTML com o ID correto
function updateNodeHtml(editor, nodeId) {
  const node = editor.getNodeFromId(nodeId);
  if (!node || !node.data) {
    console.warn(`Nó ${nodeId} não encontrado ou sem dados.`);
    return;
  }

 // Pegamos o HTML base
  let html = getHtml('SELECT', [{ default: 'SELECT *, '},
								{ default_length: 'FROM iotEvent.win:LENGTH ' }
							   ]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value = node.data.attributenamelength || '';
  const lengthValue = node.data.length || '';
  
  // Atualiza o primeiro input (df-attributenamelength)
  html = html.replace(
    /<input([^>]*)df-attributenamelength([^>]*)>/,
    `<input$1df-attributenamelength$2 value="${value}" onchange="window.updateNode('${nodeId}', 'attributenamelength', this.value')">`
  );
  
  // Atualiza o segundo input (df-length)
  html = html.replace(
    /<input([^>]*)df-length([^>]*)>/,
    `<input$1df-length$2 value="${lengthValue}" onchange="window.updateNode('${nodeId}', 'length', this.value)">`
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
    console.log(`✅ Nó ${nodeId} encontrado. Atualizando HTML...`);
    updateNodeHtml(editor, nodeId);
  } else if (tries > 0) {
    setTimeout(() => {
      waitForNodeAndUpdateHtml(editor, nodeId, tries - 1);
    }, 50);
  } else {
    console.warn(`❌ Nó ${nodeId} não foi encontrado após várias tentativas.`);
  }
}

export { updateNodeHtml };