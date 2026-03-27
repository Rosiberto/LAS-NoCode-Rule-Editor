// blocks/email.js
export function addEmail(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
	x = 100;
	y = 100;
  }
	  
  const nodeId = editor.addNode(
    'EMAIL',
    0, 1,
    x,
    y,
    'email',
    {},
    getHtml('EMAIL', [{}], null)
  );
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
  return `
    <div>
      <div class="title-box"><strong>EMAIL</strong></div>
      <div class="box">
        <input type="text" placeholder="Enter TO." df-to><br><br>
        <input type="text" placeholder="Enter FROM." df-from><br><br>
        <input type="text" placeholder="Enter Subject." df-subject><br><br>
        <input type="text" placeholder="Enter Template." df-template>
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
  const value = node.data.to || '';
  const value_from = node.data.from || '';
  const value_subject = node.data.subject || '';
  const value_template = node.data.template || '';


  html = html.replace(
    /<input([^>]*)df-to([^>]*)>/,
    `<input$1df-to$2 value="${value}" onchange="window.updateNode('${nodeId}', 'to', this.value)">`
  );
  
  html = html.replace(
    /<input([^>]*)df-from([^>]*)>/,
    `<input$1df-from$2 value="${value_from}" onchange="window.updateNode('${nodeId}', 'from', this.value)">`
  );
  
  html = html.replace(
    /<input([^>]*)df-subject([^>]*)>/,
    `<input$1df-subject$2 value="${value_subject}" onchange="window.updateNode('${nodeId}', 'subject', this.value)">`
  );
  
  html = html.replace(
    /<input([^>]*)df-template([^>]*)>/,
    `<input$1df-template$2 value="${value_template}" onchange="window.updateNode('${nodeId}', 'template', this.value)">`
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
