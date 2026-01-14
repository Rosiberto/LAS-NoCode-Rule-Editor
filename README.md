# LAS-NoCode-Rule-Editor - Community Edition
Esta é a versão **Community** do LAS NoCode Rule Editor.
O LAS NoCode Rule Editor é um editor visual de regras e fluxos, desenvolvido em Flask, e pode ser utilizado de forma independente ou integrado a outras aplicações.

A visual EPL rule editor integrated with **FIWARE Perseo CEP**, featuring a drag-and-drop interface built with **DRAWFLOW**, running on **Flask**, and containerized with **Docker**.

## Features

- Visual creation of complex rules using blocks  
- Automatic EPL (Event Processing Language) code generation  
- Seamless rule deployment to FIWARE Perseo via REST API
- Criar e editar regras e fluxos via interface web.
- Exportar/importar configurações.
- Estrutura modular (Blueprint Flask) para fácil integração.
- Totalmente containerizável via Docker.

## Running with Docker

**Option 1: Installation using Docker**
```bash
1. git clone https://github.com/Rosiberto/LAS-NoCode-Rule-Editor.git
2. cd LAS-NoCode-Rule-Editor
3. docker build -t editor .
4. docker run -p 5000:5000 editor
```

**Option 2: Installation using Docker Compose (recommended)**
```bash
1. git clone https://github.com/Rosiberto/LAS-NoCode-Rule-Editor.git
2. cd LAS-NoCode-Rule-Editor
3. docker compose up -d
```

Access the application
Once the container is running, open your browser and go to: http://localhost:5000


## Integração com outras aplicações
Esta edição Community pode ser incorporada em outras aplicações Flask como Blueprint.
Por exemplo, sua aplicação privada TT pode usar o editor como funcionalidade sem expor código proprietário.

## Licença
Este projeto é distribuído sob MIT License. Veja LICENSE para mais detalhes.

## Observações
Esta versão é Community: gratuita e open source.
Para usos comerciais, você pode integrar o editor em sistemas proprietários, mantendo a licença do editor intacta.

## Support
If you encounter any issues or have suggestions, please contact:
rosibertogoncalves6@gmail.com
