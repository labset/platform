/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');

const { printSchemaWithDirectives } = require('@graphql-tools/utils');

/**
 * Simple GraphQL Code Generation (codegen) plugin that appends a version number to the
 * generated file - which is based upon the current generated schema.
 */
module.exports = {
    plugin: (schema) => {
        const schemaString = printSchemaWithDirectives(schema);
        const version = crypto
            .createHash('sha256')
            .update(schemaString)
            .digest('hex');

        return `
/**
 * Version of this file, based upon a hash of the current schema.
 */
export const VERSION: string = ${JSON.stringify(version)};`;
    },
};
