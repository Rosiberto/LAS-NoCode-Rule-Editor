// blocks/select-where.js
export function addWhere(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'SELECT WHERE',
    0, 1,
    x,
    y,
    'select where',
    {},
    getHtml('SELECT WHERE', [
      { default: 'SELECT *, '}, 
	  { default_fromwhere: 'FROM iotEvent WHERE ' }
    ], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Select Where</strong></div>
      <div class="box">
		<label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter attribute name." df-attributewhere>
		<br><br/><label>${fields[1].default_fromwhere}</label><br> <br/>
        <input type="text" placeholder="Enter the condition." df-where>
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
								{ default_fromwhere: 'FROM iotEvent WHERE ' }
							   ]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value_attribute = node.data.attributewhere || '';
  const value_where = node.data.where || '';

  html = html.replace(
    /<input([^>]*)df-attributewhere([^>]*)>/,
    `<input$1df-attributewhere$2 value="${value_attribute}" onchange="window.updateNode('${nodeId}', 'attributewhere', this.value)">`
  );
// Atualiza o segundo input (df-time)
  html = html.replace(
	/<input([^>]*)df-where([^>]*)>/,
    `<input$1df-where$2 value="${value_where}" onchange="window.updateNode('${nodeId}', 'where', this.value)">`
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