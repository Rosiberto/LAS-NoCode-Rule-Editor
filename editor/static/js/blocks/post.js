// blocks/post.js
export function addPost(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
	x = 100;
	y = 100;
  }
	  
  const nodeId = editor.addNode(
    'POST',
    0, 1,
    x,
    y,
    'post',
    {},
    getHtml('POST', [{}], null)
  );
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {
	
  return `
    <div>
      <div class="title-box"><strong>POST</strong></div>
      <div class="box">
        <input type="text" placeholder="Enter URL." df-post>
        <br/><br/>
        <input type="text" placeholder="Ex: Level= \${level}." df-template>
        <br/><br/>
        <input type="text" placeholder="Enter priority (C, W, I)." df-priority>
        <small style="margin-left:10px; color:#555; font-size:0.62rem;">
          C = Critical, W = Warning, I = Info
        </small>
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
  const value = node.data.post || '';
  const value_template = node.data.template || '';
  const value_priority = node.data.priority || '';

  html = html.replace(
    /<input([^>]*)df-post([^>]*)>/,
    `<input$1df-post$2 value="${value}" onchange="window.updateNode('${nodeId}', 'post', this.value)">`
  );

  html = html.replace(
    /<input([^>]*)df-template([^>]*)>/,
    `<input$1df-template$2 value="${value_template}" onchange="window.updateNode('${nodeId}', 'template', this.value)">`
  );

  html = html.replace(
    /<input([^>]*)df-priority([^>]*)>/,
    `<input$1df-priority$2 value="${value_priority}" onchange="window.updateNode('${nodeId}', 'priority', this.value)">`
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
