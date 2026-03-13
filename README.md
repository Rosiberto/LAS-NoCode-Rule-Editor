# LAS-NoCode Rule Editor — Community Edition

**LAS-NoCode Rule Editor (LAS)** is an open-source, containerized, low-code framework for designing, validating, and deploying **Complex Event Processing (CEP)** rules, with a focus on reproducible experimentation and education in IoT systems.

The tool provides a visual, block-based editor that automatically generates **EPL (Event Processing Language)** rules and supports native integration with **FIWARE Perseo CEP**.

---

## Statement of Need

Complex Event Processing plays a key role in Internet of Things (IoT), smart cities, and distributed systems research. However, defining and maintaining CEP rules using textual languages such as EPL requires advanced expertise and often hinders reproducibility, experimentation, and teaching.

**LAS addresses this challenge by offering a low-code, visual abstraction layer that:**

- Reduces the cognitive barrier for CEP rule creation.
- Standardizes rule definition through structured, block-based flows.  
- Enables reproducible experimentation using containerized execution.  
- Facilitates integration with existing IoT and event-driven systems.  

This makes LAS suitable for **research, education, and applied experimentation** involving real-time event processing.

---

## Key Features

- Visual creation of complex CEP rules using blocks.  
- Automatic generation of EPL (Event Processing Language) code.  
- Native integration with FIWARE Perseo CEP via REST API.  
- Web-based rule and flow editor. 
- Import and export of rule configurations.  
- Modular architecture using Flask Blueprints for easy integration.  
- Fully containerized execution using Docker and Docker Compose.  

---

## Architecture Overview

LAS is implemented using:

- **Backend:** Python (Flask).  
- **Frontend:** JavaScript and HTML, based on Drawflow.  
- **Deployment:** Docker containers for reproducible environments.  

The editor can be run as a standalone application or embedded into other Flask-based systems.

---

## Installation and Running

**Option 1: Docker**

```bash
git clone https://github.com/Rosiberto/LAS-NoCode-Rule-Editor.git
cd LAS-NoCode-Rule-Editor
docker build -t las-editor .
docker run -p 5000:5000 las-editor
````

**Option 2: Docker Compose (Recommended)**

```bash
git clone https://github.com/Rosiberto/LAS-NoCode-Rule-Editor.git
cd LAS-NoCode-Rule-Editor
docker compose up -d
```

## Accessing the Application

Once the container is running, open your browser at: [http://localhost:5000](http://localhost:5000)

---

## Example Use Case

LAS can be used to define CEP rules for IoT scenarios such as:

* Detecting abnormal sensor readings.
* Identifying event patterns in smart environments.
* Prototyping and testing CEP-based applications.

Rules are visually defined using blocks and automatically translated into EPL for execution in FIWARE Perseo CEP.

---

## Integration with Other Applications

The Community Edition can be integrated into other Flask applications as a **Blueprint**, allowing the editor to be embedded into larger systems while preserving modularity and licensing.

---

## Documentation
Additional documentation and examples are available in the [documentation folder](./documentation/) and [examples](./example).

## Academic Reference

A detailed description of LAS, its architecture, and example use cases is available in the internal documentation.

A **paper describing LAS in detail is currently in preparation** and will provide a formal academic reference for citation upon publication..

---

## License

This project is distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.

---

## Support

For issues, bug reports, or suggestions, please use the [GitHub issue tracker](https://github.com/Rosiberto/LAS-NoCode-Rule-Editor/issues) or contact the maintainers at [rosibertogoncalves6@gmail.com](mailto:rosibertogoncalves6@gmail.com).

```