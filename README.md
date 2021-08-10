 ## Description
Lightweight helper library to fetch environment variables from Mongodb and set these in project.

## Installing
Using npm:

```bash
$ npm install fetch-mongo-envs
```

## Example

```js
(async() => {
  const { Env } = require('fetch-mongo-envs');
  const env = new Env(yourMongoUri, yourModel || 'environments', codebase || 'project-name', envType || 'production');
  await env.build();
})()
```

## Note
Document schema should be like this:
```
{
  codebase: "project-name",
  envType: "production",
  envs: {
    FOO: "",
    BAR: "",
    ...
  }
}
```
