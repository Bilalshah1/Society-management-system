import React from 'react';
// import { UMLDiagram } from 'react-uml-diagram';
import {Mermaid } from 'react-mermaid'

const data = {
    "tables": [
        { "name": "Table1" },
        { "name": "Table2" }
    ],
    "relations": [
        { "from": "Table1", "to": "Table2", "type": "oneToMany" }
    ]
};
const UMLDiagramComponent = () => {
    return (
        <div>
            <Mermaid>{`
        ${data.tables.map(table => `[${table.name}]`).join('\n')}
        ${data.relations.map(relation => `[${relation.from}] --> [${relation.to}] : ${relation.type}`).join('\n')}
      `}</Mermaid>
        </div>
    );
}

export default UMLDiagramComponent;
