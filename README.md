# LAS-NoCode Rule Editor — Community Edition

**LAS-NoCode Rule Editor (LAS)** is an open-source, containerized, low-code framework for designing **Complex Event Processing (CEP)** rules, with a focus on reproducible experimentation and education in IoT systems.

The tool provides a visual, block-based editor that automatically generates **EPL (Event Processing Language)** rules. The generated rules are designed for execution in **FIWARE Perseo CEP**, which serves as the runtime CEP engine.

---

## Statement of Need

Complex Event Processing plays a key role in Internet of Things (IoT), smart cities, and distributed systems research. However, defining and maintaining CEP rules using textual languages such as EPL requires advanced expertise and often hinders reproducibility, experimentation, and teaching.


**LAS addresses this challenge by offering a low-code, visual abstraction layer that:**

- Reduces the cognitive barrier for CEP rule creation.
- Standardizes rule definition through structured, block-based flows.  
- Enables reproducible experimentation using containerized execution.  
- Facilitates rule deployment to CEP execution engines.

This makes LAS suitable for **research, education, and applied experimentation** involving real-time event processing.

---

## Key Features

- Visual creation of complex CEP rules using blocks.  
- Automatic generation of EPL (Event Processing Language) code.  
- Rule deployment targeting FIWARE Perseo CEP via REST API.
- Web-based rule and flow editor. 
- Import and export of rule configurations.  
- Modular architecture using Flask Blueprints for easy integration.  
- Fully containerized execution using Docker.

---

## Architecture Overview

LAS is implemented using:

- **Backend:** Python (Flask).  
- **Frontend:** JavaScript and HTML, based on Drawflow.  
- **Deployment:** Docker containers for reproducible environments.  

The system is designed around a design-time/runtime separation, where LAS is responsible for rule authoring and FIWARE Perseo CEP is responsible for rule execution.

---

## Installation and Running

**Option 1: Docker (Recommended)**

```bash
git clone https://github.com/Rosiberto/LAS-NoCode-Rule-Editor.git
cd LAS-NoCode-Rule-Editor
docker build -t las-editor .
docker run -p 5000:5000 las-editor
````

**Option 2: Docker Compose**

```bash
git clone https://github.com/Rosiberto/LAS-NoCode-Rule-Editor.git
cd LAS-NoCode-Rule-Editor
docker compose up -d
```

## Configuration

The configuration file defines the target endpoint for rule deployment to FIWARE Perseo CEP.

```json
{
  "PERSEO_URL": "http://localhost:9090/rules",
  "FIWARE_SERVICE": "las",
  "FIWARE_SERVICEPATH": "/"
}
```

Configuration is required to define the target Perseo CEP endpoint used for rule deployment.


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

The LAS-NoCode Rule Editor can be embedded into other Flask applications as a **Blueprint**, enabling its reuse as a modular visual component for CEP rule design.

This allows the editor interface to be incorporated into larger systems while preserving its independence, modularity, and licensing.

---

## Documentation
Additional documentation and examples are available in the [documentation folder](./documentation) and [examples](./example).

## Academic Reference

A detailed description of LAS, its architecture, and example use cases is available in the internal documentation.

A **paper describing LAS in detail is currently in preparation** and will provide a formal academic reference for citation upon publication.

---

## License

This project is distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.

---

## Support

For issues, bug reports, or suggestions, please use the [GitHub issue tracker](https://github.com/Rosiberto/LAS-NoCode-Rule-Editor/issues) or contact the maintainers at [rosibertogoncalves6@gmail.com](mailto:rosibertogoncalves6@gmail.com).

```