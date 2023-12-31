import path from 'path';

import type { Types } from '@graphql-codegen/plugin-helpers';

const backendGraphQLConfig: Types.PluginConfig = {
    immutableTypes: true,
    mapperTypeSuffix: 'Record',
    namingConvention: {
        typeNames: 'change-case-all#pascalCase',
        enumValues: 'change-case-all#upperCase'
    },
    preResolveTypes: false
};

const backendGraphQLPlugins = [
    'typescript',
    'typescript-resolvers',
    'typescript-operations',
    path.resolve(__dirname, './plugins/export-typedefs.js'),
    path.resolve(__dirname, './plugins/export-version-hash.js')
];

const frontendGraphQLConfig = {
    maybeValue: 'T',
    withComponent: false,
    withHOC: false,
    withHooks: true,
    withMutationFn: true,
    reactApolloVersion: 3,
    preResolveTypes: false
};

const frontendGraphQLPlugins = [
    'typescript',
    'typescript-operations',
    'typescript-react-apollo',
    'typescript-resolvers'
];

export {
    backendGraphQLConfig,
    backendGraphQLPlugins,
    frontendGraphQLConfig,
    frontendGraphQLPlugins
};
