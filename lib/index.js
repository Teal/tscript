var ts = require("typescript");
// 重写 createProgram 函数以添加转换。
var createProgram = ts.createProgram;
ts.createProgram = function (rootNames, options, host, oldProgram) {
    // 设置默认选项。
    options.noImplicitUseStrict = options.noImplicitUseStrict !== false;
    var program = createProgram.apply(this, arguments);
    var checker = program.getTypeChecker();
    // 处理每个源文件。
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        // if (!ts.isExternalModule(sourceFile)) {
        visitSourceFile(sourceFile);
    }
    /**
     * 处理一个文件。
     * @param sourceFile 要处理的文件。
     */
    function visitSourceFile(sourceFile) {
        // 删除未使用的模块。
        if (options.includedExports) {
            removeUnusedExports(options.includedExports.split(","));
        }
        /**
         * 删除未使用的导出项。
         * @param usedExports 已使用的导出项列表。
         */
        function removeUnusedExports(usedExports) {
            sourceFile.statements[0] = ts.createNode(ts.SyntaxKind.EmptyStatement);
            // console.log(sourceFile.statements[0].getText())
            //eachChildDescendent(sourceFile, node => {
            //    if (node.flags & ts.NodeFlags.Export) {
            //        console.log("AA", node.getText(sourceFile));
            //    }
            //    return true;
            //});
        }
    }
    return program;
};
/**
 * 遍历一个节点并执行更新操作。
 * @param node 要遍历的父节点。
 * @param callback 回调函数。函数返回用于更新的节点，如果函数返回 null，说明删除当前节点。
 */
function mapChild(node, callback) {
    if (!node)
        return;
    switch (node.kind) {
        case ts.SyntaxKind.QualifiedName:
            node.left = callback(node.left);
            node.right = callback(node.right);
            return;
        case ts.SyntaxKind.TypeParameter:
            node.name = callback(node.name);
            node.constraint = callback(node.constraint);
            node.expression = callback(node.expression);
            return;
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            mapArray(node.decorators, callback);
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.questionToken) ||
                visitNode(cbNode, node.equalsToken) ||
                visitNode(cbNode, node.objectAssignmentInitializer);
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.BindingElement:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.propertyName) ||
                visitNode(cbNode, node.dotDotDotToken) ||
                visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.questionToken) ||
                visitNode(cbNode, node.type) ||
                visitNode(cbNode, node.initializer);
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.IndexSignature:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNodes(cbNodes, node.typeParameters) ||
                visitNodes(cbNodes, node.parameters) ||
                visitNode(cbNode, node.type);
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ArrowFunction:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.asteriskToken) ||
                visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.questionToken) ||
                visitNodes(cbNodes, node.typeParameters) ||
                visitNodes(cbNodes, node.parameters) ||
                visitNode(cbNode, node.type) ||
                visitNode(cbNode, node.equalsGreaterThanToken) ||
                visitNode(cbNode, node.body);
        case ts.SyntaxKind.TypeReference:
            return visitNode(cbNode, node.typeName) ||
                visitNodes(cbNodes, node.typeArguments);
        case ts.SyntaxKind.TypePredicate:
            return visitNode(cbNode, node.parameterName) ||
                visitNode(cbNode, node.type);
        case ts.SyntaxKind.TypeQuery:
            return visitNode(cbNode, node.exprName);
        case ts.SyntaxKind.TypeLiteral:
            return visitNodes(cbNodes, node.members);
        case ts.SyntaxKind.ArrayType:
            return visitNode(cbNode, node.elementType);
        case ts.SyntaxKind.TupleType:
            return visitNodes(cbNodes, node.elementTypes);
        case ts.SyntaxKind.UnionType:
        case ts.SyntaxKind.IntersectionType:
            return visitNodes(cbNodes, node.types);
        case ts.SyntaxKind.ParenthesizedType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.ArrayBindingPattern:
            return visitNodes(cbNodes, node.elements);
        case ts.SyntaxKind.ArrayLiteralExpression:
            return visitNodes(cbNodes, node.elements);
        case ts.SyntaxKind.ObjectLiteralExpression:
            return visitNodes(cbNodes, node.properties);
        case ts.SyntaxKind.PropertyAccessExpression:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.dotToken) ||
                visitNode(cbNode, node.name);
        case ts.SyntaxKind.ElementAccessExpression:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.argumentExpression);
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
            return visitNode(cbNode, node.expression) ||
                visitNodes(cbNodes, node.typeArguments) ||
                visitNodes(cbNodes, node.arguments);
        case ts.SyntaxKind.TaggedTemplateExpression:
            return visitNode(cbNode, node.tag) ||
                visitNode(cbNode, node.template);
        case ts.SyntaxKind.TypeAssertionExpression:
            return visitNode(cbNode, node.type) ||
                visitNode(cbNode, node.expression);
        case ts.SyntaxKind.ParenthesizedExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.DeleteExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.TypeOfExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.VoidExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.PrefixUnaryExpression:
            return visitNode(cbNode, node.operand);
        case ts.SyntaxKind.YieldExpression:
            return visitNode(cbNode, node.asteriskToken) ||
                visitNode(cbNode, node.expression);
        case ts.SyntaxKind.AwaitExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.PostfixUnaryExpression:
            return visitNode(cbNode, node.operand);
        case ts.SyntaxKind.BinaryExpression:
            return visitNode(cbNode, node.left) ||
                visitNode(cbNode, node.operatorToken) ||
                visitNode(cbNode, node.right);
        case ts.SyntaxKind.AsExpression:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.type);
        case ts.SyntaxKind.NonNullExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.ConditionalExpression:
            return visitNode(cbNode, node.condition) ||
                visitNode(cbNode, node.questionToken) ||
                visitNode(cbNode, node.whenTrue) ||
                visitNode(cbNode, node.colonToken) ||
                visitNode(cbNode, node.whenFalse);
        case ts.SyntaxKind.SpreadElementExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.ModuleBlock:
            return visitNodes(cbNodes, node.statements);
        case ts.SyntaxKind.SourceFile:
            return visitNodes(cbNodes, node.statements) ||
                visitNode(cbNode, node.endOfFileToken);
        case ts.SyntaxKind.VariableStatement:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.declarationList);
        case ts.SyntaxKind.VariableDeclarationList:
            return visitNodes(cbNodes, node.declarations);
        case ts.SyntaxKind.ExpressionStatement:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.IfStatement:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.thenStatement) ||
                visitNode(cbNode, node.elseStatement);
        case ts.SyntaxKind.DoStatement:
            return visitNode(cbNode, node.statement) ||
                visitNode(cbNode, node.expression);
        case ts.SyntaxKind.WhileStatement:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.statement);
        case ts.SyntaxKind.ForStatement:
            return visitNode(cbNode, node.initializer) ||
                visitNode(cbNode, node.condition) ||
                visitNode(cbNode, node.incrementor) ||
                visitNode(cbNode, node.statement);
        case ts.SyntaxKind.ForInStatement:
            return visitNode(cbNode, node.initializer) ||
                visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.statement);
        case ts.SyntaxKind.ForOfStatement:
            return visitNode(cbNode, node.initializer) ||
                visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.statement);
        case ts.SyntaxKind.ContinueStatement:
        case ts.SyntaxKind.BreakStatement:
            return visitNode(cbNode, node.label);
        case ts.SyntaxKind.ReturnStatement:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.WithStatement:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.statement);
        case ts.SyntaxKind.SwitchStatement:
            return visitNode(cbNode, node.expression) ||
                visitNode(cbNode, node.caseBlock);
        case ts.SyntaxKind.CaseBlock:
            return visitNodes(cbNodes, node.clauses);
        case ts.SyntaxKind.CaseClause:
            return visitNode(cbNode, node.expression) ||
                visitNodes(cbNodes, node.statements);
        case ts.SyntaxKind.DefaultClause:
            return visitNodes(cbNodes, node.statements);
        case ts.SyntaxKind.LabeledStatement:
            return visitNode(cbNode, node.label) ||
                visitNode(cbNode, node.statement);
        case ts.SyntaxKind.ThrowStatement:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.TryStatement:
            return visitNode(cbNode, node.tryBlock) ||
                visitNode(cbNode, node.catchClause) ||
                visitNode(cbNode, node.finallyBlock);
        case ts.SyntaxKind.CatchClause:
            return visitNode(cbNode, node.variableDeclaration) ||
                visitNode(cbNode, node.block);
        case ts.SyntaxKind.Decorator:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNodes(cbNodes, node.typeParameters) ||
                visitNodes(cbNodes, node.heritageClauses) ||
                visitNodes(cbNodes, node.members);
        case ts.SyntaxKind.InterfaceDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNodes(cbNodes, node.typeParameters) ||
                visitNodes(cbNodes, node.heritageClauses) ||
                visitNodes(cbNodes, node.members);
        case ts.SyntaxKind.TypeAliasDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNodes(cbNodes, node.typeParameters) ||
                visitNode(cbNode, node.type);
        case ts.SyntaxKind.EnumDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNodes(cbNodes, node.members);
        case ts.SyntaxKind.EnumMember:
            return visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.initializer);
        case ts.SyntaxKind.ModuleDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.body);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.moduleReference);
        case ts.SyntaxKind.ImportDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.importClause) ||
                visitNode(cbNode, node.moduleSpecifier);
        case ts.SyntaxKind.ImportClause:
            return visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.namedBindings);
        case ts.SyntaxKind.NamespaceExportDeclaration:
            return visitNode(cbNode, node.name);
        case ts.SyntaxKind.NamespaceImport:
            return visitNode(cbNode, node.name);
        case ts.SyntaxKind.NamedImports:
        case ts.SyntaxKind.NamedExports:
            return visitNodes(cbNodes, node.elements);
        case ts.SyntaxKind.ExportDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.exportClause) ||
                visitNode(cbNode, node.moduleSpecifier);
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ExportSpecifier:
            return visitNode(cbNode, node.propertyName) ||
                visitNode(cbNode, node.name);
        case ts.SyntaxKind.ExportAssignment:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, node.expression);
        case ts.SyntaxKind.TemplateExpression:
            return visitNode(cbNode, node.head) || visitNodes(cbNodes, node.templateSpans);
        case ts.SyntaxKind.TemplateSpan:
            return visitNode(cbNode, node.expression) || visitNode(cbNode, node.literal);
        case ts.SyntaxKind.ComputedPropertyName:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.HeritageClause:
            return visitNodes(cbNodes, node.types);
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return visitNode(cbNode, node.expression) ||
                visitNodes(cbNodes, node.typeArguments);
        case ts.SyntaxKind.ExternalModuleReference:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.MissingDeclaration:
            return visitNodes(cbNodes, node.decorators);
        case ts.SyntaxKind.JsxElement:
            return visitNode(cbNode, node.openingElement) ||
                visitNodes(cbNodes, node.children) ||
                visitNode(cbNode, node.closingElement);
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxOpeningElement:
            return visitNode(cbNode, node.tagName) ||
                visitNodes(cbNodes, node.attributes);
        case ts.SyntaxKind.JsxAttribute:
            return visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.initializer);
        case ts.SyntaxKind.JsxSpreadAttribute:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.JsxExpression:
            return visitNode(cbNode, node.expression);
        case ts.SyntaxKind.JsxClosingElement:
            return visitNode(cbNode, node.tagName);
        case ts.SyntaxKind.JSDocTypeExpression:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocUnionType:
            return visitNodes(cbNodes, node.types);
        case ts.SyntaxKind.JSDocTupleType:
            return visitNodes(cbNodes, node.types);
        case ts.SyntaxKind.JSDocArrayType:
            return visitNode(cbNode, node.elementType);
        case ts.SyntaxKind.JSDocNonNullableType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocNullableType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocRecordType:
            return visitNodes(cbNodes, node.members);
        case ts.SyntaxKind.JSDocTypeReference:
            return visitNode(cbNode, node.name) ||
                visitNodes(cbNodes, node.typeArguments);
        case ts.SyntaxKind.JSDocOptionalType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocFunctionType:
            return visitNodes(cbNodes, node.parameters) ||
                visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocVariadicType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocConstructorType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocThisType:
            return visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocRecordMember:
            return visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.type);
        case ts.SyntaxKind.JSDocComment:
            return visitNodes(cbNodes, node.tags);
        case ts.SyntaxKind.JSDocParameterTag:
            return visitNode(cbNode, node.preParameterName) ||
                visitNode(cbNode, node.typeExpression) ||
                visitNode(cbNode, node.postParameterName);
        case ts.SyntaxKind.JSDocReturnTag:
            return visitNode(cbNode, node.typeExpression);
        case ts.SyntaxKind.JSDocTypeTag:
            return visitNode(cbNode, node.typeExpression);
        case ts.SyntaxKind.JSDocTemplateTag:
            return visitNodes(cbNodes, node.typeParameters);
        case ts.SyntaxKind.JSDocTypedefTag:
            return visitNode(cbNode, node.typeExpression) ||
                visitNode(cbNode, node.name) ||
                visitNode(cbNode, node.jsDocTypeLiteral);
        case ts.SyntaxKind.JSDocTypeLiteral:
            return visitNodes(cbNodes, node.jsDocPropertyTags);
        case ts.SyntaxKind.JSDocPropertyTag:
            return visitNode(cbNode, node.typeExpression) ||
                visitNode(cbNode, node.name);
    }
}
/**
 * 遍历一个节点并执行更新操作。
 * @param nodes 要遍历的父节点。
 * @param callback 回调函数。函数返回用于更新的节点，如果函数返回 null，说明删除当前节点。
 */
function mapArray(nodes, callback) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i] = callback(nodes[i]);
        if (nodes[i] == null) {
        }
    }
}
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