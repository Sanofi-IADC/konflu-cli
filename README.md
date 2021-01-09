# Confluence public viewer

## How to contribute?

This repository follows the [IADC Release Strategy implementation guidelines](https://iadc.atlassian.net/wiki/spaces/IADC/pages/429326377/Implementation+guidelines+of+the+IADC+Release+Strategy).

## Configuration

Configuration is made with environment variables. They can also be defined with the `.env` file when running locally.

- `NODE_ENV`: `development`, `test` or `production`. Default: `production`
- `CPV_LOG_LEVEL`: `trace`, `debug`, `info`, `warn`, `error` or `fatal`. Default: `info`
- `CPV_BASEPATH`: the base path where the app is exposed. Useful when exposed behind a reverse proxy. Used to generate links. Default: `/` (but defined as `/cpv/` in production)
- `CPV_CONFLUENCE_BASE_URL`: Confluence server base URL. Required
- `CPV_CONFLUENCE_API_USERNAME`: Confluence API username (usually an email address). Required
- `CPV_CONFLUENCE_API_TOKEN`: Confluence API token (can be created [here](https://id.atlassian.com/manage/api-tokens)). Required
- `CPV_MATOMO_BASE_URL`: Matomo server base URL. Optional
- `CPV_MATOMO_ID_SITE`: Id of the Confluence public viewer site in Matomo. Optional

## Development

Node v12 is required.

1. Run `npm install`
2. If not already done, create an Atlassian API token: https://id.atlassian.com/manage/api-tokens
3. Copy `.env.example` to `.env` and edit it
4. Run `npm run start:dev`
5. You can use the proxy on `http://localhost:3000/`
