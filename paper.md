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
    orcid: 0000-0000-0000-0000
    corresponding: true
    affiliation: 1
affiliations:
 - name: [Estácio University Center Recife], Brazil
   index: 1
date: 20 February 2026
bibliography: paper.bib
---

# Summary

Complex Event Processing (CEP) supports real-time detection of patterns and anomalies over continuous event streams and is widely adopted in Internet of Things (IoT), smart environments, and distributed systems. Despite mature execution engines, rule definition typically depends on textual domain-specific languages such as Event Processing Language (EPL), which increases cognitive load and introduces variability in rule specification.

LAS-NoCode Rule Editor (LAS) is an open-source, containerized, low-code web application that enables structured visual construction of CEP rules. LAS represents rules as directed block graphs and automatically generates syntactically valid EPL compatible with FIWARE Perseo CEP. The system is designed to support reproducible experimentation, structured rule modeling, and educational adoption in event-driven systems research.

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

Rather than replacing existing CEP engines, LAS formalizes the rule authoring layer, improving accessibility and reproducibility while preserving compatibility with production-grade infrastructures.

LAS has been used in practical IoT experimentation scenarios as part of a broader event-driven platform, where it supports visual specification and deployment of CEP rules.

# State of the field

CEP has been a recognized research and industrial field since the formalization of event pattern detection models [@luckham2002cep]. Engines such as Esper [@espertech] provide expressive EPL-based rule definition and efficient in-memory execution. Distributed stream processing frameworks including Apache Flink [@carbone2015flink] and Kafka Streams [@kreps2011kafka] extend event processing to large-scale, fault-tolerant environments.

Within the FIWARE ecosystem, Perseo CEP [@fiwareperseo] offers rule-based event processing integrated with context management services. However, these systems emphasize runtime execution and scalability rather than structured rule modeling or visual abstraction.

Visual flow-based tools such as Node-RED [@node-red] support event-driven composition but are not specifically designed for EPL generation or formal CEP rule modeling. Unlike general-purpose flow editors, LAS enforces CEP-specific rule structure constraints aligned with EPL semantics, reducing syntactic and structural inconsistencies.

LAS contributes at the intersection of CEP and low-code tooling by:

1. Providing a domain-specific visual modeling environment tailored to EPL rule construction.
2. Automating transformation from visual graph structures to executable EPL.
3. Supporting reproducible experimental workflows via containerized deployment using Docker [@docker].

By focusing on the rule authoring layer, LAS complements existing CEP infrastructures and addresses a gap between formal CEP engines and general-purpose visual workflow systems.

# Software design

LAS is implemented as a modular web application composed of:

- Backend: Python with Flask [@flask].
- Frontend: JavaScript-based block editor built on Drawflow [@drawflow].
- Deployment: Docker-based containerization [@docker].

Rules are internally represented as directed block graphs. The backend parses the graph into an intermediate representation and generates EPL statements. Generated rules can be deployed directly to FIWARE Perseo CEP via REST integration.

The system can operate as a standalone web application or as a Flask Blueprint embedded into larger systems. Containerization ensures consistent execution across development, experimentation, and teaching environments, reinforcing reproducibility.

# Acknowledgements

The author acknowledges the open-source communities behind Flask, Docker, Drawflow, and FIWARE.

# References