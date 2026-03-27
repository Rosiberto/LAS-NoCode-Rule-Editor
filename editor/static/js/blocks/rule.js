// blocks/rule.js
/*
editor.addNode(
  name,           // Nome do tipo de nó (tipo lógico)
  inputs,         // Número de entradas (connections IN)
  outputs,        // Número de saídas (connections OUT)
  posX, posY,     // Posição X/Y no canvas
  className,      // Classe CSS do nó
  data,           // Objeto com dados do nó (editáveis)
  html            // HTML do conteúdo interno do nó
)
*/
export function addRule(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
	x = 100;
	y = 100;
  }
	  
  const nodeId = editor.addNode(
    'RULE',
    2, 0,
    x,
    y,
    'rule',
    {},
    getHtml('RULE', [{}], null)
  );
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {
	
  return `
    <div>
      <div class="title-box"><strong>Rule</strong></div>
      <div class="box">
        <input type="text" placeholder="Enter rule name." df-rule>
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
  let html = getHtml();

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value = node.data.rule || '';

  html = html.replace(
    /<input([^>]*)df-rule([^>]*)>/,
    `<input$1df-rule$2 value="${value}" onchange="window.updateNode('${nodeId}', 'rule', this.value)">`
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
