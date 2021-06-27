 ## Description
Small helper library to fetch environment variables from Mongodb and set these in project.

## Installing
Using npm:

```bash
$ npm install fetch-mongo-envs
```

## Example

```js
(async() => {
  const { Env } = require('fetch-mongo-envs');
  const env = new Env(yourMongoUri, yourModel, codebase, envType);
  await env.build();
})()
```