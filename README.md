[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=labset_platform&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=labset_platform)

## labset-platform

Monorepo of labset platform, built with TypeScript

### environment

- **[nvm](https://github.com/nvm-sh/nvm)** to manage node versions.

```bash
brew install nvm
```

- **[yarn](https://yarnpkg.com/)** as node package manager

```bash
brew install yarn
```

### house-keeping

- build it

```bash
yarn build
```

- format it

```bash
yarn format
```

- lint it

```bash
yarn lint
yarn lint --fix
```

- test it

```bash
yarn test
```
