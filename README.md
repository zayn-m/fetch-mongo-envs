 ## Description
Small helper library to fetch environment variables from Mongodb and set these in project.

## Installing
Using npm:

```bash
$ npm install axios
```

## Example

```js
(async() => {
  const { Env } = require('fetch-mongo-envs');
  const env = new Env(yourCodebase, yourMongoUri, yourModel);
  await env.build();
})()
```