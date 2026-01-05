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
	  { from: ' FROM ' }
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
        <input type="text" placeholder="Enter max name." df-maxname>
		<br><br/><label>${fields[1].from}</label><br> <br/>
        <input type="text" placeholder="Enter event name." df-eventname>
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
  let html = getHtml('MAX', [{ default: 'SELECT max '},
								{ from: ' FROM ' }
							   ]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const maxValue = node.data.maxname || '';
  const eventValue = node.data.eventname || '';
  
  // Atualiza o primeiro input (df-maxname)
  html = html.replace(
    /<input([^>]*)df-maxname([^>]*)>/,
    `<input$1df-maxname$2 value="${maxValue}" onchange="window.updateNode('${nodeId}', 'maxname', this.value')">`
  );
  
  // Atualiza o segundo input (df-eventname)
  html = html.replace(
    /<input([^>]*)df-eventname([^>]*)>/,
    `<input$1df-eventname$2 value="${eventValue}" onchange="window.updateNode('${nodeId}', 'eventname', this.value)">`
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