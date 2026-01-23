## Rule Editor Top Menu — Buttons Usage

The **Top Menu** of the **Perseo CEP (FIWARE) rule editor** provides access to the main features related to block-based rule creation, management, and persistence. Each button performs a specific action, as described below.

![TOP Menu](images/top-menu.png)

---

### Generate EPL

Generates a rule in **EPL (Event Processing Language)** from the block flow created in the editor.

When this button is triggered, the system:
- Automatically converts the visual block flow into EPL code;
- Registers the generated rule directly in **Perseo CEP**, making it available for event processing.

### Save

Saves the block flow created in the editor.

When activated:
- The current state of the flow is persisted in the database;
- The rule can be reused, edited, or versioned later.

### Load

Allows users to load previously saved rules.

When this button is triggered:
- The system lists all rules stored in the database;
- The user selects a rule;
- The corresponding block flow is automatically loaded into the editor workspace.

### Clear

Completely clears the editor workspace.

This action:
- Removes all blocks and connections from the current flow;
- Allows the user to start creating a new rule from an empty editor.

### Export

Allows exporting the block flow currently present in the editor.

This feature can be used for:
- Rule sharing;
- Flow backup;
- Future import into other compatible environments.