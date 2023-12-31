/* eslint-disable @typescript-eslint/no-var-requires */
const { printSchemaWithDirectives } = require('@graphql-tools/utils');
const { parse } = require('graphql');

module.exports = {
    plugin: (schema) => {
        const schemaString = printSchemaWithDirectives(schema);
        const schemaNode = parse(schemaString);
        return `
import type { DocumentNode } from "graphql";
export const typeDefs: DocumentNode = ${JSON.stringify(
            schemaNode,
            undefined,
            2,
        )} as unknown as DocumentNode;
    `;
    },
};
