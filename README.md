# LAS-NoCode-Rule-Editor

A visual EPL rule editor integrated with **FIWARE Perseus CEP**, featuring a drag-and-drop interface built with **BARFI**, running on **Flask**, and containerized with **Docker**.

## 🔧 Features

- Visual creation of complex rules using blocks  
- Automatic EPL (Event Processing Language) code generation  
- Seamless rule deployment to FIWARE Perseus via REST API

## 🚀 Running with Docker

```bash
docker build -t epl-editor .
docker run -p 5000:5000 epl-editor


# By: Rosiberto S.G. - 2025
