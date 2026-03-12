---
title: 'LAS-NoCode Rule Editor: A visual low-code framework for reproducible Complex Event Processing rule design in IoT research'
tags:
  - Python
  - Flask
  - IoT
  - Complex Event Processing
  - CEP
  - FIWARE
  - low-code
  - reproducible research
authors:
  - name: Rosiberto Gonçalves
    orcid: "0000-0000-0000-0000"
    corresponding: true
    affiliation: 1
affiliations:
 - name: "Estácio University Center Recife, Brazil"
   index: 1
date: 20 February 2026
bibliography: paper.bib
repository: https://github.com/SEU_USUARIO/LAS-NoCode-Rule-Editor

---

# Summary

Complex Event Processing (CEP) supports real-time detection of patterns and anomalies over continuous event streams and is widely adopted in Internet of Things (IoT), smart environments, and distributed systems. Despite mature execution engines, rule definition typically depends on textual domain-specific languages such as Event Processing Language (EPL), which increases cognitive load and introduces variability in rule specification.

LAS-NoCode Rule Editor (LAS) is an open-source, containerized, low-code web application that enables structured visual construction of CEP rules. LAS represents rules as directed block graphs and automatically generates syntactically valid EPL compatible with FIWARE Perseo CEP. The system is designed to support reproducible experimentation, structured rule modeling, and educational adoption in event-driven systems research.

![LAS-NoCode Rule Editor interface showing visual block-based construction of CEP rules and automatic EPL generation.](figures/las_editor.png)

Figure 1: LAS-NoCode Rule Editor interface illustrating visual modeling of CEP rules using connected blocks. The editor represents event processing logic as a directed graph and automatically generates EPL rules compatible with FIWARE Perseo CEP.


# Statement of need

CEP engines provide scalable and efficient runtime infrastructures, yet rule authoring remains largely manual and text-based. This creates challenges for:

- Teaching event-driven architectures and CEP concepts.
- Rapid prototyping of event patterns in research scenarios.
- Reproducible specification of rule logic across experiments.

In research contexts, rule definitions are often embedded in configuration files or scripts without structured modeling support, making controlled experimentation and replication more difficult.

LAS addresses this limitation by introducing a visual abstraction layer aligned with CEP semantics. The system:

- Encodes rule logic as structured block-based flows.
- Enforces consistent rule composition patterns.
- Automatically translates visual models into EPL.
- Enables containerized deployment for reproducible environments.
- Integrates natively with FIWARE Perseo CEP infrastructures.

By formalizing the rule authoring layer, LAS reduces syntactic variability in rule definitions, improves accessibility for students and researchers, and supports reproducible experimentation in event-driven IoT research workflows.

# State of the field

CEP has been a recognized research and industrial field since the formalization of event pattern detection models [@luckham2002cep]. Engines such as Esper [@espertech] provide expressive EPL-based rule definition and efficient in-memory execution. Distributed stream processing frameworks including Apache Flink [@carbone2015flink] and Kafka Streams [@kreps2011kafka] extend event processing to large-scale, fault-tolerant environments.

Within the FIWARE ecosystem, Perseo CEP [@fiwareperseo] offers rule-based event processing integrated with context management services. However, these systems primarily focus on runtime execution and scalability rather than structured rule modeling or visual abstraction.

Visual flow-based tools such as Node-RED [@node-red] enable event-driven composition through graphical interfaces, but they are not specifically designed for EPL generation or CEP rule modeling. As a result, CEP rules must still be manually implemented in underlying engines.

LAS differs from these systems by introducing a domain-specific visual modeling environment tailored to CEP rule construction. Instead of generic flow programming, LAS enforces structural constraints aligned with EPL semantics and automatically generates executable rules for CEP engines.

This approach contributes to the research ecosystem by:

1. Providing a domain-specific visual modeling environment for CEP rule construction.
2. Automating the transformation from visual rule graphs to executable EPL code.
3. Supporting reproducible experimental workflows through containerized deployment using Docker [@docker].

By focusing on the rule authoring layer, LAS complements existing CEP infrastructures and addresses the gap between formal CEP engines and general-purpose visual workflow systems.


# Software design

LAS is implemented as a modular web application composed of:

- Backend: Python with Flask [@flask].
- Frontend: JavaScript-based block editor built on Drawflow [@drawflow].
- Deployment: containerized environment using Docker [@docker].

Rules are internally represented as directed block graphs. The backend parses the graph into an intermediate representation and generates EPL statements. Generated rules can then be deployed directly to FIWARE Perseo CEP through REST-based integration.

The system can operate as a standalone web application or as a Flask Blueprint embedded into larger systems. Containerization ensures consistent execution across development, experimentation, and teaching environments, supporting reproducibility in research settings.

# Acknowledgements

The author acknowledges the open-source communities behind Flask, Docker, Drawflow, and FIWARE.

# References