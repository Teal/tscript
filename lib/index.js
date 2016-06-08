var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var visitor_1 = require("./visitor");
/**
 * 表示一个语法树转换器。
 */
var Translator = (function (_super) {
    __extends(Translator, _super);
    function Translator() {
        _super.apply(this, arguments);
    }
    /**
     * 转换现有的语法树。
     * @param program 要转换的程序。
     */
    Translator.prototype.process = function (program) {
        this._program = program;
        this._checker = program.getTypeChecker();
        _super.prototype.process.call(this, program);
    };
    Translator.prototype.visitIdentifier = function (node) {
        return node;
    };
    return Translator;
}(visitor_1.NodeVisitor));
// 在编译后添加操作。
addCallback(ts, 'createProgram', function (program) {
    new Translator().process(program);
});
function addCallback(obj, methodName, callback) {
    var oldMethod = obj[methodName];
    obj[methodName] = function () {
        var result = oldMethod.apply(this, arguments);
        callback.call(this, result);
        return result;
    };
}
module.exports = ts;
//# sourceMappingURL=index.js.map