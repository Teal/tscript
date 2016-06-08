
import * as ts from "typescript";

/**
 * 扩展的编译选项。
 */
interface CompilerOptions extends ts.CompilerOptions {

}

// 重写 createProgram 函数以添加转换。
const createProgram = ts.createProgram;
ts.createProgram = function (rootNames: string[], options: CompilerOptions, host?: ts.CompilerHost, oldProgram?: ts.Program) {
    const program = createProgram.apply(this, arguments);
    const checker = program.getTypeChecker();

    // 处理每个源文件。
    for (const sourceFile of program.getSourceFiles()) {
        if (!ts.isExternalModule(sourceFile)) {
            visitSourceFile(sourceFile);
        }
    }

    /**
     * 处理一个文件。
     * @param sourceFile 要处理的文件。
     */
    function visitSourceFile(sourceFile: ts.SourceFile) {

    }

    return program;
};

/**
 * 遍历一个节点及子节点，并执行 *callback*。
 * @param node 要遍历的父节点。
 * @param callback 回调函数。如果函数返回 false，则不再继续遍历子节点，否则将继续遍历。
 */
function eachChildDescendent(node: ts.Node, callback: (node: ts.Node) => boolean) {
    ts.forEachChild(node, childNode => {
        if (callback(childNode) === false) return;
        eachChildDescendent(childNode, callback);
    });
}

export = ts;
