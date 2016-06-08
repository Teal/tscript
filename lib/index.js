var ts = require("typescript");
// 重写 createProgram 函数以添加转换。
var createProgram = ts.createProgram;
ts.createProgram = function (rootNames, options, host, oldProgram) {
    var program = createProgram.apply(this, arguments);
    var checker = program.getTypeChecker();
    // 处理每个源文件。
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        if (!ts.isExternalModule(sourceFile)) {
            visitSourceFile(sourceFile);
        }
    }
    /**
     * 处理一个文件。
     * @param sourceFile 要处理的文件。
     */
    function visitSourceFile(sourceFile) {
    }
    return program;
};
/**
 * 遍历一个节点及子节点，并执行 *callback*。
 * @param node 要遍历的父节点。
 * @param callback 回调函数。如果函数返回 false，则不再继续遍历子节点，否则将继续遍历。
 */
function eachChildDescendent(node, callback) {
    ts.forEachChild(node, function (childNode) {
        if (callback(childNode) === false)
            return;
        eachChildDescendent(childNode, callback);
    });
}
module.exports = ts;
//# sourceMappingURL=index.js.map