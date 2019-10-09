const fs = require('fs');
const CodeGen = require('swagger-typescript-codegen').CodeGen;
// const file = './api-docs.json';
const file = './spirs_swagger_mod.json';
const swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
// const swagger = require('./swagger.js');
console.log(swagger);
const tsSourceCode = CodeGen.getTypescriptCode({
    className: 'Test',
    swagger: swagger,
    imports: ['../../typings/tsd.d.ts']
});
console.log(tsSourceCode);
