// blocks/pattern.js
export function addPattern(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'PATTERN',
    0, 1,
    x,
    y,
    'pattern',
    {},
    getHtml('PATTERN', [
      { default: 'SELECT * FROM pattern [every ev=iotEvent('}, 
	  { close_pattern: ' )]' }
    ], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Every</strong></div>
      <div class="box">
		<label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter pattern." df-pattern>
		<br><br/><label>${fields[1].close_pattern}</label>
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
  let html = getHtml('PATTERN', [{ default: 'SELECT * FROM pattern [every ev=iotEvent('},
								 { close_pattern: ')]' }
							    ]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value_pattern = node.data.pattern || '';

  html = html.replace(
    /<input([^>]*)df-pattern([^>]*)>/,
    `<input$1df-pattern$2 value="${value_pattern}" onchange="window.updateNode('${nodeId}', 'pattern', this.value')">`
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