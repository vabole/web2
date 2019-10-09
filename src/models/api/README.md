Typescript schema generated from swagger schema located at http://10.5.0.178:9999/api/v2/api-docs

if swager schema is saved in _api-docs.json_, typescript schema can be generated with the following command:

```
npx @manifoldco/swagger-to-ts api-docs.json --wrapper "declare namespace Safl" --output safl.d.ts
```
