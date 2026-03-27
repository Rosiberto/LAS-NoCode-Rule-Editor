// blocks/pattern-type.js
export function addPatternType(editor, x = 100, y = 100) {
	
  if (isNaN(x) || isNaN(y)) {
    x = 100;
    y = 100;
  }
  
  const nodeId = editor.addNode(
    'PATTERNTYPE',
    0, 1,
    x,
    y,
    'patterntype',
    {},
    getHtml('PATTERNTYPE', [
      { default: 'SELECT *, '},
	  { from_pattern: 'FROM pattern [every ev=iotEvent('},
	  { and_type: 'AND type='},	  
	  { close_pattern: ')]' }
    ], null)
  );
  // Em vez de setTimeout
  waitForNodeAndUpdateHtml(editor, nodeId);
}

// HTML para o conteúdo do nó
function getHtml(title, fields) {	
	return `
    <div>
      <div class="title-box"><strong>Every Type</strong></div>
      <div class="box">
		    <label>${fields[0].default}</label><br> <br/>
        <input type="text" placeholder="Enter attribute." df-attributepattern>
		    <br><br/><label>${fields[1].from_pattern}</label><br/><br/>
        <input type="text" placeholder="Enter pattern." df-pattern>
		    <br><br/><label>${fields[2].and_type}</label><br/><br/>
        <input type="text" placeholder="Enter type." df-typepattern>
		    <br><br/><label>${fields[3].close_pattern}</label>
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
  let html = getHtml('PATTERNTYPE', [{ default: 'SELECT *, '},
									 { from_pattern: 'FROM pattern [every ev=iotEvent('},
									 { and_type: 'AND type='},	  
									 { close_pattern: ')]' }
									]);

  // Substituímos o input para adicionar o onchange com nodeId e o valor atual
  const value_attributepattern = node.data.attributepattern || '';
  const value_pattern = node.data.pattern || '';
  const value_typepattern = node.data.typepattern || '';

  
  html = html.replace(
    /<input([^>]*)df-attributepattern([^>]*)>/,
    `<input$1df-attributepattern$2 value="${value_attributepattern}" onchange="window.updateNode('${nodeId}', 'attributepattern', this.value)">`
  );
  
  html = html.replace(
    /<input([^>]*)df-pattern([^>]*)>/,
    `<input$1df-pattern$2 value="${value_pattern}" onchange="window.updateNode('${nodeId}', 'pattern', this.value)">`
  );
  
  html = html.replace(
    /<input([^>]*)df-typepattern([^>]*)>/,
    `<input$1df-typepattern$2 value="${value_typepattern}" onchange="window.updateNode('${nodeId}', 'typepattern', this.value)">`
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