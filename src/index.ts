
import * as ts from "typescript";
import {NodeVisitor} from "./visitor";

/**
 * 表示一个语法树转换器。
 */
class Translator extends NodeVisitor {

    /**
     * 存储当前正在解析的程序。
     */
    private _program: ts.Program;

    /**
     * 存储当前使用的语义分析器。
     */
    private _checker: ts.TypeChecker;

    /**
     * 转换现有的语法树。
     * @param program 要转换的程序。
     */
    process(program: ts.Program) {
        this._program = program;
        this._checker = program.getTypeChecker();
        super.process(program);
    }

    protected visitIdentifier(node: ts.Identifier) {
        return node;
    }

}

// 在编译后添加操作。
addCallback(ts, 'createProgram', (program: ts.Program) => {
    new Translator().process(program);
});

function addCallback(obj: any, methodName: string, callback: Function) {
    const oldMethod = obj[methodName];
    obj[methodName] = function () {
        const result = oldMethod.apply(this, arguments);
        callback.call(this, result);
        return result;
    };
}

export = ts;
