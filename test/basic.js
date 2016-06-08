
var ts = require("../");

var file = 'examples/basic.ts';

var input = require('fs').readFileSync(file, 'utf-8');

var result = ts.transpileModule(input, {
    compilerOptions: {
        allowNonTsExtensions: true,
        jsx: 2
    },
    fileName: file,
    reportDiagnostics: true
});

console.log(result.outputText);