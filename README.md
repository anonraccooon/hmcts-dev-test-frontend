# HMCTS Dev Test Frontend

The frontend portion of the HMCTS case management system. The backend can be found at: https://github.com/anonraccooon/hmcts-dev-test-backend

The technology stack includes TypeScript, Node.js, Express.js, Nunjucks, and Jest + CodeceptJS for testing.

## Quick Start

```bash
yarn install
yarn webpack
yarn start:dev
```

The application runs on **https://localhost:3100**

## Testing

The project has **three layers of tests**:

### Unit Tests

```bash
yarn test:unit
```

### Route Tests

```bash
yarn test:routes
```

### Functional Tests

```bash
yarn test:functional
```

## Key Features

- Create, view, and list tasks
- Form validation (title: required + max 100 chars, description: max 500 chars)
- Error handling and success messaging
- Backend API integration via axios
