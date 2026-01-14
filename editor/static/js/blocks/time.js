// blocks/time.js
export function addTime(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'SELECT TIME',
    0, 1,
    x,
    y,
    'select time',
    {},
    getHtml('SELECT TIME', [
      { default: 'SELECT *, '}, 
	  { default_time: 'FROM iotEvent.win:TIME ' }
    ], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Select Time</strong></div>
      <div class="box">
		<label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter attribute name." df-attributenametime>
		<br><br/><label>${fields[1].default_time}</label><br> <br/>
        <input type="text" placeholder="Enter the time." df-time>
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
  let html = getHtml('SELECT', [ { default: 'SELECT *, '}, 
								 { default_time: 'FROM iotEvent.win:TIME ' }
							   ]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const attributeValue = node.data.eventname || '';
  const timeValue = node.data.time || '';
  
  // Atualiza o primeiro input (df-name)
  html = html.replace(
    /<input([^>]*)df-attributenametime([^>]*)>/,
    `<input$1df-attributenametime$2 value="${attributeValue}" onchange="window.updateNode('${nodeId}', 'attributenametime', this.value')">`
  );
  
  // Atualiza o segundo input (df-time)
  html = html.replace(
    /<input([^>]*)df-time([^>]*)>/,
    `<input$1df-time$2 value="${timeValue}" onchange="window.updateNode('${nodeId}', 'time', this.value)">`
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