
import * as ts from "typescript";

/**
 * 扩展的编译选项。
 */
interface CompilerOptions extends ts.CompilerOptions {

    /**
     * 如果指定了导入的模块，则只有列表中包含的名称会被正常导出，其它名称会被删除。
     */
    includedExports?: string;

}

// 重写 createProgram 函数以添加转换。
const createProgram = ts.createProgram;
ts.createProgram = function (rootNames: string[], options: CompilerOptions, host?: ts.CompilerHost, oldProgram?: ts.Program) {

    // 设置默认选项。
    options.noImplicitUseStrict = options.noImplicitUseStrict !== false;

    const program = createProgram.apply(this, arguments);
    const checker = program.getTypeChecker();

    // 处理每个源文件。
    for (const sourceFile of program.getSourceFiles()) {
        // if (!ts.isExternalModule(sourceFile)) {
        visitSourceFile(sourceFile);
        // }
    }

    /**
     * 处理一个文件。
     * @param sourceFile 要处理的文件。
     */
    function visitSourceFile(sourceFile: ts.SourceFile) {

        // 删除未使用的模块。
        if (options.includedExports) {
            removeUnusedExports(options.includedExports.split(","));
        }

        /**
         * 删除未使用的导出项。
         * @param usedExports 已使用的导出项列表。
         */
        function removeUnusedExports(usedExports: string[]) {

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

declare function MapCallback<T extends ts.Node>(node: T): T;

/**
 * 遍历一个节点并执行更新操作。
 * @param node 要遍历的父节点。
 * @param callback 回调函数。函数返回用于更新的节点，如果函数返回 null，说明删除当前节点。
 */
function mapChild(node: ts.Node, callback: typeof MapCallback) {
    if (!node) return;
    switch (node.kind) {
        case ts.SyntaxKind.QualifiedName:
            (<ts.QualifiedName>node).left = callback((<ts.QualifiedName>node).left);
            (<ts.QualifiedName>node).right = callback((<ts.QualifiedName>node).right);
            return;
        case ts.SyntaxKind.TypeParameter:
            (<ts.TypeParameterDeclaration>node).name = callback((<ts.TypeParameterDeclaration>node).name);
            (<ts.TypeParameterDeclaration>node).constraint = callback((<ts.TypeParameterDeclaration>node).constraint);
            (<ts.TypeParameterDeclaration>node).expression = callback((<ts.TypeParameterDeclaration>node).expression);
            return;
        case ts.SyntaxKind.ShorthandPropertyAssignment:
            mapArray(node.decorators, callback);
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ShorthandPropertyAssignment>node).name) ||
                visitNode(cbNode, (<ts.ShorthandPropertyAssignment>node).questionToken) ||
                visitNode(cbNode, (<ts.ShorthandPropertyAssignment>node).equalsToken) ||
                visitNode(cbNode, (<ts.ShorthandPropertyAssignment>node).objectAssignmentInitializer);
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.BindingElement:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.VariableLikeDeclaration>node).propertyName) ||
                visitNode(cbNode, (<ts.VariableLikeDeclaration>node).dotDotDotToken) ||
                visitNode(cbNode, (<ts.VariableLikeDeclaration>node).name) ||
                visitNode(cbNode, (<ts.VariableLikeDeclaration>node).questionToken) ||
                visitNode(cbNode, (<ts.VariableLikeDeclaration>node).type) ||
                visitNode(cbNode, (<ts.VariableLikeDeclaration>node).initializer);
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.IndexSignature:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNodes(cbNodes, (<ts.SignatureDeclaration>node).typeParameters) ||
                visitNodes(cbNodes, (<ts.SignatureDeclaration>node).parameters) ||
                visitNode(cbNode, (<ts.SignatureDeclaration>node).type);
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
                visitNode(cbNode, (<ts.FunctionLikeDeclaration>node).asteriskToken) ||
                visitNode(cbNode, (<ts.FunctionLikeDeclaration>node).name) ||
                visitNode(cbNode, (<ts.FunctionLikeDeclaration>node).questionToken) ||
                visitNodes(cbNodes, (<ts.FunctionLikeDeclaration>node).typeParameters) ||
                visitNodes(cbNodes, (<ts.FunctionLikeDeclaration>node).parameters) ||
                visitNode(cbNode, (<ts.FunctionLikeDeclaration>node).type) ||
                visitNode(cbNode, (<ts.ArrowFunction>node).equalsGreaterThanToken) ||
                visitNode(cbNode, (<ts.FunctionLikeDeclaration>node).body);
        case ts.SyntaxKind.TypeReference:
            return visitNode(cbNode, (<ts.TypeReferenceNode>node).typeName) ||
                visitNodes(cbNodes, (<ts.TypeReferenceNode>node).typeArguments);
        case ts.SyntaxKind.TypePredicate:
            return visitNode(cbNode, (<ts.TypePredicateNode>node).parameterName) ||
                visitNode(cbNode, (<ts.TypePredicateNode>node).type);
        case ts.SyntaxKind.TypeQuery:
            return visitNode(cbNode, (<ts.TypeQueryNode>node).exprName);
        case ts.SyntaxKind.TypeLiteral:
            return visitNodes(cbNodes, (<ts.TypeLiteralNode>node).members);
        case ts.SyntaxKind.ArrayType:
            return visitNode(cbNode, (<ts.ArrayTypeNode>node).elementType);
        case ts.SyntaxKind.TupleType:
            return visitNodes(cbNodes, (<ts.TupleTypeNode>node).elementTypes);
        case ts.SyntaxKind.UnionType:
        case ts.SyntaxKind.IntersectionType:
            return visitNodes(cbNodes, (<ts.UnionOrIntersectionTypeNode>node).types);
        case ts.SyntaxKind.ParenthesizedType:
            return visitNode(cbNode, (<ts.ParenthesizedTypeNode>node).type);
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.ArrayBindingPattern:
            return visitNodes(cbNodes, (<ts.BindingPattern>node).elements);
        case ts.SyntaxKind.ArrayLiteralExpression:
            return visitNodes(cbNodes, (<ts.ArrayLiteralExpression>node).elements);
        case ts.SyntaxKind.ObjectLiteralExpression:
            return visitNodes(cbNodes, (<ts.ObjectLiteralExpression>node).properties);
        case ts.SyntaxKind.PropertyAccessExpression:
            return visitNode(cbNode, (<ts.PropertyAccessExpression>node).expression) ||
                visitNode(cbNode, (<ts.PropertyAccessExpression>node).dotToken) ||
                visitNode(cbNode, (<ts.PropertyAccessExpression>node).name);
        case ts.SyntaxKind.ElementAccessExpression:
            return visitNode(cbNode, (<ts.ElementAccessExpression>node).expression) ||
                visitNode(cbNode, (<ts.ElementAccessExpression>node).argumentExpression);
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
            return visitNode(cbNode, (<ts.CallExpression>node).expression) ||
                visitNodes(cbNodes, (<ts.CallExpression>node).typeArguments) ||
                visitNodes(cbNodes, (<ts.CallExpression>node).arguments);
        case ts.SyntaxKind.TaggedTemplateExpression:
            return visitNode(cbNode, (<ts.TaggedTemplateExpression>node).tag) ||
                visitNode(cbNode, (<ts.TaggedTemplateExpression>node).template);
        case ts.SyntaxKind.TypeAssertionExpression:
            return visitNode(cbNode, (<ts.TypeAssertion>node).type) ||
                visitNode(cbNode, (<ts.TypeAssertion>node).expression);
        case ts.SyntaxKind.ParenthesizedExpression:
            return visitNode(cbNode, (<ts.ParenthesizedExpression>node).expression);
        case ts.SyntaxKind.DeleteExpression:
            return visitNode(cbNode, (<ts.DeleteExpression>node).expression);
        case ts.SyntaxKind.TypeOfExpression:
            return visitNode(cbNode, (<ts.TypeOfExpression>node).expression);
        case ts.SyntaxKind.VoidExpression:
            return visitNode(cbNode, (<ts.VoidExpression>node).expression);
        case ts.SyntaxKind.PrefixUnaryExpression:
            return visitNode(cbNode, (<ts.PrefixUnaryExpression>node).operand);
        case ts.SyntaxKind.YieldExpression:
            return visitNode(cbNode, (<ts.YieldExpression>node).asteriskToken) ||
                visitNode(cbNode, (<ts.YieldExpression>node).expression);
        case ts.SyntaxKind.AwaitExpression:
            return visitNode(cbNode, (<ts.AwaitExpression>node).expression);
        case ts.SyntaxKind.PostfixUnaryExpression:
            return visitNode(cbNode, (<ts.PostfixUnaryExpression>node).operand);
        case ts.SyntaxKind.BinaryExpression:
            return visitNode(cbNode, (<ts.BinaryExpression>node).left) ||
                visitNode(cbNode, (<ts.BinaryExpression>node).operatorToken) ||
                visitNode(cbNode, (<ts.BinaryExpression>node).right);
        case ts.SyntaxKind.AsExpression:
            return visitNode(cbNode, (<ts.AsExpression>node).expression) ||
                visitNode(cbNode, (<ts.AsExpression>node).type);
        case ts.SyntaxKind.NonNullExpression:
            return visitNode(cbNode, (<ts.NonNullExpression>node).expression);
        case ts.SyntaxKind.ConditionalExpression:
            return visitNode(cbNode, (<ts.ConditionalExpression>node).condition) ||
                visitNode(cbNode, (<ts.ConditionalExpression>node).questionToken) ||
                visitNode(cbNode, (<ts.ConditionalExpression>node).whenTrue) ||
                visitNode(cbNode, (<ts.ConditionalExpression>node).colonToken) ||
                visitNode(cbNode, (<ts.ConditionalExpression>node).whenFalse);
        case ts.SyntaxKind.SpreadElementExpression:
            return visitNode(cbNode, (<ts.SpreadElementExpression>node).expression);
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.ModuleBlock:
            return visitNodes(cbNodes, (<ts.Block>node).statements);
        case ts.SyntaxKind.SourceFile:
            return visitNodes(cbNodes, (<ts.SourceFile>node).statements) ||
                visitNode(cbNode, (<ts.SourceFile>node).endOfFileToken);
        case ts.SyntaxKind.VariableStatement:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.VariableStatement>node).declarationList);
        case ts.SyntaxKind.VariableDeclarationList:
            return visitNodes(cbNodes, (<ts.VariableDeclarationList>node).declarations);
        case ts.SyntaxKind.ExpressionStatement:
            return visitNode(cbNode, (<ts.ExpressionStatement>node).expression);
        case ts.SyntaxKind.IfStatement:
            return visitNode(cbNode, (<ts.IfStatement>node).expression) ||
                visitNode(cbNode, (<ts.IfStatement>node).thenStatement) ||
                visitNode(cbNode, (<ts.IfStatement>node).elseStatement);
        case ts.SyntaxKind.DoStatement:
            return visitNode(cbNode, (<ts.DoStatement>node).statement) ||
                visitNode(cbNode, (<ts.DoStatement>node).expression);
        case ts.SyntaxKind.WhileStatement:
            return visitNode(cbNode, (<ts.WhileStatement>node).expression) ||
                visitNode(cbNode, (<ts.WhileStatement>node).statement);
        case ts.SyntaxKind.ForStatement:
            return visitNode(cbNode, (<ts.ForStatement>node).initializer) ||
                visitNode(cbNode, (<ts.ForStatement>node).condition) ||
                visitNode(cbNode, (<ts.ForStatement>node).incrementor) ||
                visitNode(cbNode, (<ts.ForStatement>node).statement);
        case ts.SyntaxKind.ForInStatement:
            return visitNode(cbNode, (<ts.ForInStatement>node).initializer) ||
                visitNode(cbNode, (<ts.ForInStatement>node).expression) ||
                visitNode(cbNode, (<ts.ForInStatement>node).statement);
        case ts.SyntaxKind.ForOfStatement:
            return visitNode(cbNode, (<ts.ForOfStatement>node).initializer) ||
                visitNode(cbNode, (<ts.ForOfStatement>node).expression) ||
                visitNode(cbNode, (<ts.ForOfStatement>node).statement);
        case ts.SyntaxKind.ContinueStatement:
        case ts.SyntaxKind.BreakStatement:
            return visitNode(cbNode, (<ts.BreakOrContinueStatement>node).label);
        case ts.SyntaxKind.ReturnStatement:
            return visitNode(cbNode, (<ts.ReturnStatement>node).expression);
        case ts.SyntaxKind.WithStatement:
            return visitNode(cbNode, (<ts.WithStatement>node).expression) ||
                visitNode(cbNode, (<ts.WithStatement>node).statement);
        case ts.SyntaxKind.SwitchStatement:
            return visitNode(cbNode, (<ts.SwitchStatement>node).expression) ||
                visitNode(cbNode, (<ts.SwitchStatement>node).caseBlock);
        case ts.SyntaxKind.CaseBlock:
            return visitNodes(cbNodes, (<ts.CaseBlock>node).clauses);
        case ts.SyntaxKind.CaseClause:
            return visitNode(cbNode, (<ts.CaseClause>node).expression) ||
                visitNodes(cbNodes, (<ts.CaseClause>node).statements);
        case ts.SyntaxKind.DefaultClause:
            return visitNodes(cbNodes, (<ts.DefaultClause>node).statements);
        case ts.SyntaxKind.LabeledStatement:
            return visitNode(cbNode, (<ts.LabeledStatement>node).label) ||
                visitNode(cbNode, (<ts.LabeledStatement>node).statement);
        case ts.SyntaxKind.ThrowStatement:
            return visitNode(cbNode, (<ts.ThrowStatement>node).expression);
        case ts.SyntaxKind.TryStatement:
            return visitNode(cbNode, (<ts.TryStatement>node).tryBlock) ||
                visitNode(cbNode, (<ts.TryStatement>node).catchClause) ||
                visitNode(cbNode, (<ts.TryStatement>node).finallyBlock);
        case ts.SyntaxKind.CatchClause:
            return visitNode(cbNode, (<ts.CatchClause>node).variableDeclaration) ||
                visitNode(cbNode, (<ts.CatchClause>node).block);
        case ts.SyntaxKind.Decorator:
            return visitNode(cbNode, (<ts.Decorator>node).expression);
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ClassLikeDeclaration>node).name) ||
                visitNodes(cbNodes, (<ts.ClassLikeDeclaration>node).typeParameters) ||
                visitNodes(cbNodes, (<ts.ClassLikeDeclaration>node).heritageClauses) ||
                visitNodes(cbNodes, (<ts.ClassLikeDeclaration>node).members);
        case ts.SyntaxKind.InterfaceDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.InterfaceDeclaration>node).name) ||
                visitNodes(cbNodes, (<ts.InterfaceDeclaration>node).typeParameters) ||
                visitNodes(cbNodes, (<ts.ClassDeclaration>node).heritageClauses) ||
                visitNodes(cbNodes, (<ts.InterfaceDeclaration>node).members);
        case ts.SyntaxKind.TypeAliasDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.TypeAliasDeclaration>node).name) ||
                visitNodes(cbNodes, (<ts.TypeAliasDeclaration>node).typeParameters) ||
                visitNode(cbNode, (<ts.TypeAliasDeclaration>node).type);
        case ts.SyntaxKind.EnumDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.EnumDeclaration>node).name) ||
                visitNodes(cbNodes, (<ts.EnumDeclaration>node).members);
        case ts.SyntaxKind.EnumMember:
            return visitNode(cbNode, (<ts.EnumMember>node).name) ||
                visitNode(cbNode, (<ts.EnumMember>node).initializer);
        case ts.SyntaxKind.ModuleDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ModuleDeclaration>node).name) ||
                visitNode(cbNode, (<ts.ModuleDeclaration>node).body);
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ImportEqualsDeclaration>node).name) ||
                visitNode(cbNode, (<ts.ImportEqualsDeclaration>node).moduleReference);
        case ts.SyntaxKind.ImportDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ImportDeclaration>node).importClause) ||
                visitNode(cbNode, (<ts.ImportDeclaration>node).moduleSpecifier);
        case ts.SyntaxKind.ImportClause:
            return visitNode(cbNode, (<ts.ImportClause>node).name) ||
                visitNode(cbNode, (<ts.ImportClause>node).namedBindings);
        case ts.SyntaxKind.NamespaceExportDeclaration:
            return visitNode(cbNode, (<ts.NamespaceExportDeclaration>node).name);

        case ts.SyntaxKind.NamespaceImport:
            return visitNode(cbNode, (<ts.NamespaceImport>node).name);
        case ts.SyntaxKind.NamedImports:
        case ts.SyntaxKind.NamedExports:
            return visitNodes(cbNodes, (<ts.NamedImportsOrExports>node).elements);
        case ts.SyntaxKind.ExportDeclaration:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ExportDeclaration>node).exportClause) ||
                visitNode(cbNode, (<ts.ExportDeclaration>node).moduleSpecifier);
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ExportSpecifier:
            return visitNode(cbNode, (<ts.ImportOrExportSpecifier>node).propertyName) ||
                visitNode(cbNode, (<ts.ImportOrExportSpecifier>node).name);
        case ts.SyntaxKind.ExportAssignment:
            return visitNodes(cbNodes, node.decorators) ||
                visitNodes(cbNodes, node.modifiers) ||
                visitNode(cbNode, (<ts.ExportAssignment>node).expression);
        case ts.SyntaxKind.TemplateExpression:
            return visitNode(cbNode, (<ts.TemplateExpression>node).head) || visitNodes(cbNodes, (<ts.TemplateExpression>node).templateSpans);
        case ts.SyntaxKind.TemplateSpan:
            return visitNode(cbNode, (<ts.TemplateSpan>node).expression) || visitNode(cbNode, (<ts.TemplateSpan>node).literal);
        case ts.SyntaxKind.ComputedPropertyName:
            return visitNode(cbNode, (<ts.ComputedPropertyName>node).expression);
        case ts.SyntaxKind.HeritageClause:
            return visitNodes(cbNodes, (<ts.HeritageClause>node).types);
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return visitNode(cbNode, (<ts.ExpressionWithTypeArguments>node).expression) ||
                visitNodes(cbNodes, (<ts.ExpressionWithTypeArguments>node).typeArguments);
        case ts.SyntaxKind.ExternalModuleReference:
            return visitNode(cbNode, (<ts.ExternalModuleReference>node).expression);
        case ts.SyntaxKind.MissingDeclaration:
            return visitNodes(cbNodes, node.decorators);

        case ts.SyntaxKind.JsxElement:
            return visitNode(cbNode, (<ts.JsxElement>node).openingElement) ||
                visitNodes(cbNodes, (<ts.JsxElement>node).children) ||
                visitNode(cbNode, (<ts.JsxElement>node).closingElement);
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxOpeningElement:
            return visitNode(cbNode, (<ts.JsxOpeningLikeElement>node).tagName) ||
                visitNodes(cbNodes, (<ts.JsxOpeningLikeElement>node).attributes);
        case ts.SyntaxKind.JsxAttribute:
            return visitNode(cbNode, (<ts.JsxAttribute>node).name) ||
                visitNode(cbNode, (<ts.JsxAttribute>node).initializer);
        case ts.SyntaxKind.JsxSpreadAttribute:
            return visitNode(cbNode, (<ts.JsxSpreadAttribute>node).expression);
        case ts.SyntaxKind.JsxExpression:
            return visitNode(cbNode, (<ts.JsxExpression>node).expression);
        case ts.SyntaxKind.JsxClosingElement:
            return visitNode(cbNode, (<ts.JsxClosingElement>node).tagName);

        case ts.SyntaxKind.JSDocTypeExpression:
            return visitNode(cbNode, (<ts.JSDocTypeExpression>node).type);
        case ts.SyntaxKind.JSDocUnionType:
            return visitNodes(cbNodes, (<ts.JSDocUnionType>node).types);
        case ts.SyntaxKind.JSDocTupleType:
            return visitNodes(cbNodes, (<ts.JSDocTupleType>node).types);
        case ts.SyntaxKind.JSDocArrayType:
            return visitNode(cbNode, (<ts.JSDocArrayType>node).elementType);
        case ts.SyntaxKind.JSDocNonNullableType:
            return visitNode(cbNode, (<ts.JSDocNonNullableType>node).type);
        case ts.SyntaxKind.JSDocNullableType:
            return visitNode(cbNode, (<ts.JSDocNullableType>node).type);
        case ts.SyntaxKind.JSDocRecordType:
            return visitNodes(cbNodes, (<ts.JSDocRecordType>node).members);
        case ts.SyntaxKind.JSDocTypeReference:
            return visitNode(cbNode, (<ts.JSDocTypeReference>node).name) ||
                visitNodes(cbNodes, (<ts.JSDocTypeReference>node).typeArguments);
        case ts.SyntaxKind.JSDocOptionalType:
            return visitNode(cbNode, (<ts.JSDocOptionalType>node).type);
        case ts.SyntaxKind.JSDocFunctionType:
            return visitNodes(cbNodes, (<ts.JSDocFunctionType>node).parameters) ||
                visitNode(cbNode, (<ts.JSDocFunctionType>node).type);
        case ts.SyntaxKind.JSDocVariadicType:
            return visitNode(cbNode, (<ts.JSDocVariadicType>node).type);
        case ts.SyntaxKind.JSDocConstructorType:
            return visitNode(cbNode, (<ts.JSDocConstructorType>node).type);
        case ts.SyntaxKind.JSDocThisType:
            return visitNode(cbNode, (<ts.JSDocThisType>node).type);
        case ts.SyntaxKind.JSDocRecordMember:
            return visitNode(cbNode, (<ts.JSDocRecordMember>node).name) ||
                visitNode(cbNode, (<ts.JSDocRecordMember>node).type);
        case ts.SyntaxKind.JSDocComment:
            return visitNodes(cbNodes, (<ts.JSDocComment>node).tags);
        case ts.SyntaxKind.JSDocParameterTag:
            return visitNode(cbNode, (<ts.JSDocParameterTag>node).preParameterName) ||
                visitNode(cbNode, (<ts.JSDocParameterTag>node).typeExpression) ||
                visitNode(cbNode, (<ts.JSDocParameterTag>node).postParameterName);
        case ts.SyntaxKind.JSDocReturnTag:
            return visitNode(cbNode, (<ts.JSDocReturnTag>node).typeExpression);
        case ts.SyntaxKind.JSDocTypeTag:
            return visitNode(cbNode, (<ts.JSDocTypeTag>node).typeExpression);
        case ts.SyntaxKind.JSDocTemplateTag:
            return visitNodes(cbNodes, (<ts.JSDocTemplateTag>node).typeParameters);
        case ts.SyntaxKind.JSDocTypedefTag:
            return visitNode(cbNode, (<ts.JSDocTypedefTag>node).typeExpression) ||
                visitNode(cbNode, (<ts.JSDocTypedefTag>node).name) ||
                visitNode(cbNode, (<ts.JSDocTypedefTag>node).jsDocTypeLiteral);
        case ts.SyntaxKind.JSDocTypeLiteral:
            return visitNodes(cbNodes, (<ts.JSDocTypeLiteral>node).jsDocPropertyTags);
        case ts.SyntaxKind.JSDocPropertyTag:
            return visitNode(cbNode, (<ts.JSDocPropertyTag>node).typeExpression) ||
                visitNode(cbNode, (<ts.JSDocPropertyTag>node).name);
    }
}

/**
 * 遍历一个节点并执行更新操作。
 * @param nodes 要遍历的父节点。
 * @param callback 回调函数。函数返回用于更新的节点，如果函数返回 null，说明删除当前节点。
 */
function mapArray<T extends ts.Node>(nodes: ts.NodeArray<T>, callback: typeof MapCallback) {
    for (let i = 0; i < nodes.length; i++) {
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
function eachChildDescendent(node: ts.Node, callback: (node: ts.Node) => boolean) {
    ts.forEachChild(node, childNode => {
        if (callback(childNode) === false) return;
        eachChildDescendent(childNode, callback);
    });
}

export = ts;
