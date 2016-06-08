
var ts = require("../");

var file = 'examples/basic.ts';

var input = require('fs').readFileSync(file, 'utf-8');

var result = ts.transpileModule(input, {
    compilerOptions: {
        allowNonTsExtensions: true,
        jsx: 2,
        includedExports: "a,c"
    },
    fileName: file,
    reportDiagnostics: true
});

console.log("--------------------------------------------------");
console.log(result.outputText);
console.log(result.diagnostics);