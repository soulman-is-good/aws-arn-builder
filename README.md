# AWS ARN Builder

Package that helps to compose and parse AWS ARN strings.

This package uses botocore to get information on the regions and services.
https://raw.githubusercontent.com/boto/botocore/develop/botocore/data/endpoints.json

Why use it
- Simple to use, as in calling just one function to generate ARN.
- Supports AWS partitions per region.
- Typed.

## How to contribute

`npm run build` - build types

`npm run docs` - generate typedoc
