# LAS-NoCode-Rule-Editor - Community Edition
This is the **Community Edition** of the LAS NoCode Rule Editor.  
The LAS NoCode Rule Editor is a visual editor for rules and flows, developed in Flask, which can be used standalone or integrated into other applications.

A visual EPL rule editor integrated with **FIWARE Perseo CEP**, featuring a drag-and-drop interface built with **DRAWFLOW**, running on **Flask**, and containerized with **Docker**.

## Features

- Visual creation of complex rules using blocks.
- Automatic EPL (Event Processing Language) code generation.
- Seamless rule deployment to FIWARE Perseo via REST API.
- Create and edit rules and flows via a web interface.
- Export and import configurations.
- Modular structure (Flask Blueprint) for easy integration.
- Fully containerized with Docker.

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

## Access the application
Once the container is running, open your browser and go to: http://localhost:5000


## Integration with other applications
This Community Edition can be incorporated into other Flask applications as a Blueprint.
For example, your private application TT can use the editor as a feature without exposing proprietary code.

## License
This project is distributed under the MIT License. See LICENSE for more details.

## Notes
This is the Community Edition: free and open source.
For commercial use, you can integrate the editor into proprietary systems while keeping the editor’s license intact.

## Support
If you encounter any issues or have suggestions, please contact:
rosibertogoncalves6@gmail.com
