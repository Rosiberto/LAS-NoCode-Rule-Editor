---
title: 'LAS-NoCode Rule Editor: A visual low-code framework for Complex Event Processing rule design in IoT research'
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
    orcid: 0000-0000-0000-0000
    corresponding: true
    affiliation: 1
affiliations:
 - name: [Your Institution Name], Brazil
   index: 1
date: 20 February 2026
bibliography: paper.bib
---

# Summary

Complex Event Processing (CEP) enables real-time detection of patterns and anomalies in continuous event streams and plays a central role in Internet of Things (IoT) and distributed systems architectures. However, rule definition in CEP engines typically depends on textual domain-specific languages such as Event Processing Language (EPL), creating barriers for experimentation, teaching, and reproducible research.

LAS-NoCode Rule Editor (LAS) is an open-source, containerized, low-code web application that enables visual construction of CEP rules through block-based flows. The system automatically translates visual rule graphs into syntactically valid EPL and integrates with FIWARE Perseo CEP via REST APIs. LAS is designed to support reproducible experimentation and educational use in event-driven systems.

# Statement of need

Although CEP infrastructures provide efficient runtime environments, rule authoring remains dependent on textual programming. This limits accessibility for students and non-specialist researchers and introduces variability in rule specification that may hinder reproducibility.

Existing platforms focus on execution performance and scalability rather than structured visual rule modeling aligned with CEP semantics.

LAS addresses this gap by providing:

- A structured visual abstraction layer for CEP rule composition.
- Automatic translation from block-based flows to EPL.
- Native integration with FIWARE Perseo CEP.
- Containerized deployment for reproducible experimental environments.

By reducing the cognitive barrier to rule creation while maintaining compatibility with production-grade CEP engines, LAS supports both research experimentation and classroom adoption.

# State of the field

Complex Event Processing (CEP) has been an established research and industrial domain since the formalization of event pattern detection models [@luckham2002cep]. Mature CEP engines such as Esper [@espertech] provide expressive Event Processing Language (EPL) support and efficient runtime execution. Similarly, distributed stream processing frameworks such as Apache Flink [@carbone2015flink] and Kafka Streams [@kreps2011kafka] offer scalable infrastructures for real-time event handling.

Within the FIWARE ecosystem, Perseo CEP [@fiwareperseo] enables rule-based event processing integrated with context management services. While these systems provide robust execution capabilities, they primarily rely on textual rule specification.

Visual programming tools such as Node-RED [@node-red] support event-driven application composition through graphical flows. However, these platforms are not designed to generate EPL rules nor structured specifically for CEP-focused experimentation.

LAS complements existing CEP infrastructures by introducing a dedicated visual abstraction layer for EPL rule construction, automatic code generation, and reproducible containerized deployment using Docker [@docker].

# Software design

LAS is implemented as a modular web application composed of:

- Backend: Python with Flask [@flask].
- Frontend: JavaScript-based block editor built on Drawflow [@drawflow].
- Deployment: Containerized execution using Docker [@docker].

Rules are modeled as directed block graphs. The backend parses the graph into an intermediate representation and generates EPL code, which can be deployed to FIWARE Perseo CEP via REST integration.

The system can operate as a standalone application or as a Flask Blueprint embedded within larger systems. Containerization ensures consistent execution environments across development, teaching, and research contexts.

# Acknowledgements

The author acknowledges the open-source communities behind Flask, Docker, Drawflow, and FIWARE.

# References