export function addOrderBy(editor, x = 100, y = 100) {
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'ORDERBY',
    1,0,
    x,
    y,
    'orderby',
    { },
    getHtml('ORDERBY', [{}], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Order by</strong></div>
      <div class="box">
        <input type="text" placeholder="Enter attribute order." df-order>
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
  let html = getHtml('ORDERBY', [{}]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value = node.data.order || '';
  
  // Atualiza o primeiro input (df-order)
  html = html.replace(
    /<input([^>]*)df-order([^>]*)>/,
    `<input$1df-order$2 value="${value}" onchange="window.updateNode('${nodeId}', 'order', this.value)">`
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