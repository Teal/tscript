var ts = require("typescript");
/**
 * 表示一个节点遍历器。
 */
var NodeVisitor = (function () {
    function NodeVisitor() {
    }
    // #region 对外接口
    /**
     * 转换现有的语法树。
     * @param program 要转换的程序。
     */
    NodeVisitor.prototype.process = function (program) {
        for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            if (!NodeVisitor.isExternalModule(sourceFile)) {
                this.visitSourceFile(sourceFile);
            }
        }
    };
    /**
     * 访问指定的节点。
     * @param node 要访问的节点。
     */
    NodeVisitor.prototype.visit = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                return this.visitIdentifier(node);
            case ts.SyntaxKind.Parameter:
                return this.visitParameter(node);
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
                return this.visitMethod(node);
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return this.visitAccessor(node);
            case ts.SyntaxKind.ThisKeyword:
                return this.visitThis(node);
            case ts.SyntaxKind.SuperKeyword:
                return this.visitSuper(node);
            case ts.SyntaxKind.NullKeyword:
                return this.visitNull(node);
            case ts.SyntaxKind.TrueKeyword:
                return this.visitTrue(node);
            case ts.SyntaxKind.FalseKeyword:
                return this.visitFalse(node);
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.RegularExpressionLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.TemplateHead:
            case ts.SyntaxKind.TemplateMiddle:
            case ts.SyntaxKind.TemplateTail:
                return this.visitLiteral(node);
            case ts.SyntaxKind.TemplateExpression:
                return this.visitTemplateExpression(node);
            case ts.SyntaxKind.TemplateSpan:
                return this.visitTemplateSpan(node);
            case ts.SyntaxKind.JsxElement:
            case ts.SyntaxKind.JsxSelfClosingElement:
                return this.visitJsxElement(node);
            case ts.SyntaxKind.JsxText:
                return this.visitJsxText(node);
            case ts.SyntaxKind.JsxExpression:
                return this.visitJsxExpression(node);
            case ts.SyntaxKind.QualifiedName:
                return this.visitQualifiedName(node);
            case ts.SyntaxKind.ObjectBindingPattern:
                return this.visitObjectBindingPattern(node);
            case ts.SyntaxKind.ArrayBindingPattern:
                return this.visitArrayBindingPattern(node);
            case ts.SyntaxKind.BindingElement:
                return this.visitBindingElement(node);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return this.visitArrayLiteral(node);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return this.visitObjectLiteral(node);
            case ts.SyntaxKind.PropertyAssignment:
                return this.visitPropertyAssignment(node);
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return this.visitShorthandPropertyAssignment(node);
            case ts.SyntaxKind.ComputedPropertyName:
                return this.visitComputedPropertyName(node);
            case ts.SyntaxKind.PropertyAccessExpression:
                return this.visitPropertyAccess(node);
            case ts.SyntaxKind.ElementAccessExpression:
                return this.visitIndexedAccess(node);
            case ts.SyntaxKind.CallExpression:
                return this.visitCallExpression(node);
            case ts.SyntaxKind.NewExpression:
                return this.visitNewExpression(node);
            case ts.SyntaxKind.TaggedTemplateExpression:
                return this.visitTaggedTemplateExpression(node);
            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.AsExpression:
                return this.visit(node.expression);
            case ts.SyntaxKind.ParenthesizedExpression:
                return this.visitParenExpression(node);
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
                return this.visitFunctionDeclaration(node);
            case ts.SyntaxKind.DeleteExpression:
                return this.visitDeleteExpression(node);
            case ts.SyntaxKind.TypeOfExpression:
                return this.visitTypeOfExpression(node);
            case ts.SyntaxKind.VoidExpression:
                return this.visitVoidExpression(node);
            case ts.SyntaxKind.AwaitExpression:
                return this.visitAwaitExpression(node);
            case ts.SyntaxKind.PrefixUnaryExpression:
                return this.visitPrefixUnaryExpression(node);
            case ts.SyntaxKind.PostfixUnaryExpression:
                return this.visitPostfixUnaryExpression(node);
            case ts.SyntaxKind.BinaryExpression:
                return this.visitBinaryExpression(node);
            case ts.SyntaxKind.ConditionalExpression:
                return this.visitConditionalExpression(node);
            case ts.SyntaxKind.SpreadElementExpression:
                return this.visitSpreadElementExpression(node);
            case ts.SyntaxKind.YieldExpression:
                return this.visitYieldExpression(node);
            case ts.SyntaxKind.OmittedExpression:
                return;
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.ModuleBlock:
                return this.visitBlock(node);
            case ts.SyntaxKind.VariableStatement:
                return this.visitVariableStatement(node);
            case ts.SyntaxKind.EmptyStatement:
            //return write(";");
            case ts.SyntaxKind.ExpressionStatement:
                return this.visitExpressionStatement(node);
            case ts.SyntaxKind.IfStatement:
                return this.visitIfStatement(node);
            case ts.SyntaxKind.DoStatement:
                return this.visitDoStatement(node);
            case ts.SyntaxKind.WhileStatement:
                return this.visitWhileStatement(node);
            case ts.SyntaxKind.ForStatement:
                return this.visitForStatement(node);
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForInStatement:
                return this.visitForInOrForOfStatement(node);
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.BreakStatement:
                return this.visitBreakOrContinueStatement(node);
            case ts.SyntaxKind.ReturnStatement:
                return this.visitReturnStatement(node);
            case ts.SyntaxKind.WithStatement:
                return this.visitWithStatement(node);
            case ts.SyntaxKind.SwitchStatement:
                return this.visitSwitchStatement(node);
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.DefaultClause:
                return this.visitCaseOrDefaultClause(node);
            case ts.SyntaxKind.LabeledStatement:
                return this.visitLabeledStatement(node);
            case ts.SyntaxKind.ThrowStatement:
                return this.visitThrowStatement(node);
            case ts.SyntaxKind.TryStatement:
                return this.visitTryStatement(node);
            case ts.SyntaxKind.CatchClause:
                return this.visitCatchClause(node);
            case ts.SyntaxKind.DebuggerStatement:
                return this.visitDebuggerStatement(node);
            case ts.SyntaxKind.VariableDeclaration:
                return this.visitVariableDeclaration(node);
            case ts.SyntaxKind.ClassExpression:
                return this.visitClassExpression(node);
            case ts.SyntaxKind.ClassDeclaration:
                return this.visitClassDeclaration(node);
            case ts.SyntaxKind.InterfaceDeclaration:
                return this.visitInterfaceDeclaration(node);
            case ts.SyntaxKind.EnumDeclaration:
                return this.visitEnumDeclaration(node);
            case ts.SyntaxKind.EnumMember:
                return this.visitEnumMember(node);
            case ts.SyntaxKind.ModuleDeclaration:
                return this.visitModuleDeclaration(node);
            case ts.SyntaxKind.ImportDeclaration:
                return this.visitImportDeclaration(node);
            case ts.SyntaxKind.ImportEqualsDeclaration:
                return this.visitImportEqualsDeclaration(node);
            case ts.SyntaxKind.ExportDeclaration:
                return this.visitExportDeclaration(node);
            case ts.SyntaxKind.ExportAssignment:
                return this.visitExportAssignment(node);
            case ts.SyntaxKind.SourceFile:
                return this.visitSourceFile(node);
        }
    };
    // #endregion
    // #region 成员定义
    NodeVisitor.prototype.visitSourceFile = function (sourceFile) {
        sourceFile.statements = this.visitStatements(sourceFile.statements);
        return sourceFile;
    };
    NodeVisitor.prototype.visitMethod = function (node) {
        return this.visitFunctionLike(node);
    };
    NodeVisitor.prototype.visitAccessor = function (node) {
        return this.visitFunctionLike(node);
    };
    NodeVisitor.prototype.visitFunctionLike = function (node) {
        // 处理名字。
        node.name = this.visitName(node.name);
        // 处理类型参数。
        for (var i = 0; i < node.typeParameters.length; i++) {
            node.typeParameters[i] = this.visitTypeParameter(node.typeParameters[i]);
        }
        // 处理参数。
        for (var i = 0; i < node.parameters.length; i++) {
            node.parameters[i] = this.visitParameter(node.parameters[i]);
        }
        // 处理主体。
        node.body = node.body.kind === ts.SyntaxKind.Block ? this.visitBlock(node.body) : this.visit(node.body);
    };
    NodeVisitor.prototype.visitName = function (name) {
        return this.visit(name);
    };
    NodeVisitor.prototype.visitTypeParameter = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitParameter = function (node) {
        return node;
    };
    // #endregion
    // #region 语句
    NodeVisitor.prototype.visitStatement = function (node) {
        return this.visit(node);
    };
    NodeVisitor.prototype.visitStatements = function (statements) {
        for (var i = 0; i < statements.length; i++) {
            statements[i] = this.visitStatement(statements[i]);
        }
        return statements;
    };
    NodeVisitor.prototype.visitExpressionStatement = function (node) {
        node.expression = this.visit(node.expression);
        return node;
    };
    // #endregion
    // #region 表达式
    NodeVisitor.prototype.visitExpression = function (node) {
        return this.visit(node);
    };
    NodeVisitor.prototype.visitIdentifier = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitThis = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitSuper = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitNull = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitTrue = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitFalse = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitLiteral = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitTemplateExpression = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitTemplateSpan = function (span) {
        this.visitExpression(span.expression);
        this.visit(span.literal);
        return span;
    };
    NodeVisitor.prototype.visitJsxElement = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitJsxText = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitJsxExpression = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitQualifiedName = function (node) {
        node.left = node.left.kind === ts.SyntaxKind.QualifiedName ? this.visitQualifiedName(node.left) : this.visitIdentifier(node.left);
        node.right = this.visitIdentifier(node.right);
        return node;
    };
    NodeVisitor.prototype.visitObjectBindingPattern = function (node) {
        for (var i = 0; i < node.elements.length; i++) {
            node.elements[i] = this.visitBindingElement(node.elements[i]);
        }
        return node;
    };
    NodeVisitor.prototype.visitArrayBindingPattern = function (node) {
        for (var i = 0; i < node.elements.length; i++) {
            node.elements[i] = this.visitBindingElement(node.elements[i]);
        }
    };
    NodeVisitor.prototype.visitBindingElement = function (node) {
        return node;
    };
    NodeVisitor.prototype.visitSpreadElementExpression = function (node) {
        node.expression = this.visitExpression(node.expression);
        return node;
    };
    NodeVisitor.prototype.visitArrayLiteral = function (node) {
        for (var i = 0; i < node.elements.length; i++) {
            node.elements[i] = this.visitExpression(node.elements[i]);
        }
        return node;
    };
    NodeVisitor.prototype.visitObjectLiteral = function (node) {
        for (var i = 0; i < node.properties.length; i++) {
            node.properties[i] = this.visitObjectLiteralElement(node.properties[i]);
        }
        return node;
    };
    NodeVisitor.prototype.visitObjectLiteralElement = function (node) {
        node.name = this.visitName(node.name);
        if (node.initializer) {
            node.initializer = this.visitExpression(node.initializer);
        }
        return node;
    };
    // #endregion
    // #region 工具函数
    NodeVisitor.prototype.visitList = function (nodes) {
    };
    NodeVisitor.isExternalModule = function (file) {
        return file.externalModuleIndicator !== undefined;
    };
    // #endregion
    NodeVisitor.prototype.visitTempDeclarations = function (newLine) {
        //if (tempVariables) {
        //    if (newLine) {
        //        writeLine();
        //    }
        //    else {
        //        write(" ");
        //    }
        //    write("var ");
        //    this.visitCommaList(tempVariables);
        //    write(";");
        //}
    };
    /** this.visit the text for the given token that comes after startPos
      * This by default writes the text provided with the given tokenKind
      * but if optional this.visitFn callback is provided the text is this.visitted using the callback instead of default text
      * @param tokenKind the kind of the token to search and this.visit
      * @param startPos the position in the source to start searching for the token
      * @param this.visitFn if given will be invoked to this.visit the text instead of actual token this.visit */
    NodeVisitor.prototype.visitToken = function (tokenKind, startPos, emitFn) {
        //const tokenStartPos = skipTrivia(currentText, startPos);
        //this.visitPos(tokenStartPos);
        //const tokenString = tokenToString(tokenKind);
        //if (this.visitFn) {
        //    this.visitFn();
        //}
        //else {
        //    write(tokenString);
        //}
        //const tokenEndPos = tokenStartPos + tokenString.length;
        //this.visitPos(tokenEndPos);
        //return tokenEndPos;
    };
    NodeVisitor.prototype.visitOptional = function (prefix, node) {
        //if (node) {
        //    write(prefix);
        //    this.visit(node);
        //}
    };
    NodeVisitor.prototype.visitParenthesizedIf = function (node, parenthesized) {
        //if (parenthesized) {
        //    write("(");
        //}
        //this.visit(node);
        //if (parenthesized) {
        //    write(")");
        //}
    };
    NodeVisitor.prototype.visitLinePreservingList = function (parent, nodes, allowTrailingComma, spacesBetweenBraces) {
        //Debug.assert(nodes.length > 0);
        //increaseIndent();
        //if (nodeStartPositionsAreOnSameLine(parent, nodes[0])) {
        //    if (spacesBetweenBraces) {
        //        write(" ");
        //    }
        //}
        //else {
        //    writeLine();
        //}
        //for (let i = 0, n = nodes.length; i < n; i++) {
        //    if (i) {
        //        if (nodeEndIsOnSameLineAsNodeStart(nodes[i - 1], nodes[i])) {
        //            write(", ");
        //        }
        //        else {
        //            write(",");
        //            writeLine();
        //        }
        //    }
        //    this.visit(nodes[i]);
        //}
        //if (nodes.hasTrailingComma && allowTrailingComma) {
        //    write(",");
        //}
        //decreaseIndent();
        //if (nodeEndPositionsAreOnSameLine(parent, lastOrUndefined(nodes))) {
        //    if (spacesBetweenBraces) {
        //        write(" ");
        //    }
        //}
        //else {
        //    writeLine();
        //}
    };
    NodeVisitor.prototype.visitCommaList = function (nodes) {
        //if (nodes) {
        //    this.visitList(nodes, 0, nodes.length, /*multiLine*/ false, /*trailingComma*/ false);
        //}
    };
    NodeVisitor.prototype.visitLines = function (nodes) {
        this.visitLinesStartingAt(nodes, /*startIndex*/ 0);
    };
    NodeVisitor.prototype.visitLinesStartingAt = function (nodes, startIndex) {
        //for(let i = startIndex; i < nodes.length; i++) {
        //    writeLine();
        //    this.visit(nodes[i]);
        //}
    };
    NodeVisitor.prototype.isBinaryOrOctalIntegerLiteral = function (node, text) {
        //if (node.kind === SyntaxKind.NumericLiteral && text.length > 1) {
        //    switch (text.charCodeAt(1)) {
        //        case CharacterCodes.b:
        //        case CharacterCodes.B:
        //        case CharacterCodes.o:
        //        case CharacterCodes.O:
        //            return true;
        //    }
        //}
        return false;
    };
    NodeVisitor.prototype.visitDownlevelRawTemplateLiteral = function (node) {
        //// Find original source text, since we need to this.visit the raw strings of the tagged template.
        //// The raw strings contain the (escaped) strings of what the user wrote.
        //// Examples: ts.`\n` is converted to "\\n", a template string with a newline to "\n".
        //let text = getTextOfNodeFromSourceText(currentText, node);
        //// text contains the original source, it will also contain quotes ("`"), dollar signs and braces ("${" and "}"),
        //// thus we need to remove those characters.
        //// First template piece starts with "`", others with "}"
        //// Last template piece ends with "`", others with "${"
        //const isLast = node.kind === SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === SyntaxKind.TemplateTail;
        //text = text.substring(1, text.length - (isLast ? 1 : ts.2));
        //// Newline normalization:
        //// ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
        //// <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
        //text = text.replace(/\r\n?/g, "\n");
        //text = escapeString(text);
        //write(`"${text}"`);
    };
    NodeVisitor.prototype.visitDownlevelTaggedTemplateArray = function (node, literalEmitter) {
        //write("[");
        //if (node.template.kind === SyntaxKind.NoSubstitutionTemplateLiteral) {
        //    literalthis.visitter(<LiteralExpression>node.template);
        //}
        //else {
        //    literalthis.visitter((<TemplateExpression>node.template).head);
        //    forEach((<TemplateExpression>node.template).templateSpans, (child) => {
        //        write(", ");
        //        literalthis.visitter(child.literal);
        //    });
        //}
        //write("]");
    };
    NodeVisitor.prototype.visitDownlevelTaggedTemplate = function (node) {
        //const tempVariable = createAndRecordTempVariable(TempFlags.Auto);
        //write("(");
        //this.visit(tempVariable);
        //write(" = ");
        //this.visitDownlevelTaggedTemplateArray(node, this.visit);
        //write(", ");
        //this.visit(tempVariable);
        //write(".raw = ");
        //this.visitDownlevelTaggedTemplateArray(node, this.visitDownlevelRawTemplateLiteral);
        //write(", ");
        //this.visitParenthesizedIf(node.tag, needsParenthesisForPropertyAccessOrInvocation(node.tag));
        //write("(");
        //this.visit(tempVariable);
        //// Now we this.visit the expressions
        //if (node.template.kind === SyntaxKind.TemplateExpression) {
        //    forEach((<TemplateExpression>node.template).templateSpans, templateSpan => {
        //        write(", ");
        //        const needsParens = templateSpan.expression.kind === SyntaxKind.BinaryExpression
        //            && (<BinaryExpression>templateSpan.expression).operatorToken.kind === SyntaxKind.CommaToken;
        //        this.visitParenthesizedIf(templateSpan.expression, needsParens);
        //    });
        //}
        //write("))");
    };
    NodeVisitor.prototype.shouldVisitTemplateHead = function () {
        //// If this expression has an empty head literal and the first template span has a non-empty
        //// literal, then this.visitting the empty head literal is not necessary.
        ////     `${ foo } and ${ bar }`
        //// can be this.visitted as
        ////     foo + " and " + bar
        //// This is because it is only required that one of the first two operands in the this.visit
        //// output must be a string literal, so that the other operand and all following operands
        //// are forced into strings.
        ////
        //// If the first template span has an empty literal, then the head must still be this.visitted.
        ////     `${ foo }${ bar }`
        //// must still be this.visitted as
        ////     "" + foo + bar
        //// There is always atleast one templateSpan in this code path, since
        //// NoSubstitutionTemplateLiterals are directly this.visitted via this.visitLiteral()
        //Debug.assert(node.templateSpans.length !== 0);
        //return node.head.text.length !== 0 || node.templateSpans[0].literal.text.length === 0;
    };
    NodeVisitor.prototype.templateNeedsParens = function (template, parent) {
        //switch (parent.kind) {
        //    case SyntaxKind.CallExpression:
        //    case SyntaxKind.NewExpression:
        //        return (<CallExpression>parent).expression === template;
        //    case SyntaxKind.TaggedTemplateExpression:
        //    case SyntaxKind.ParenthesizedExpression:
        //        return false;
        //    default:
        //        return comparePrecedenceToBinaryPlus(parent) !== Comparison.LessThan;
        //}
    };
    /**
     * Returns whether the expression has lesser, greater,
     * or equal precedence to the binary '+' operator
     */
    NodeVisitor.prototype.comparePrecedenceToBinaryPlus = function (expression) {
        //// All binary expressions have lower precedence than '+' apart from '*', '/', and '%'
        //// which have greater precedence and '-' which has equal precedence.
        //// All unary operators have a higher precedence apart from yield.
        //// Arrow functions and conditionals have a lower precedence,
        //// although we convert the former into regular protected expressions in ES5 mode,
        //// and in ES6 mode this protected won't get called anyway.
        ////
        //// TODO (drosen): ts.Note that we need to account for the upcoming 'yield' and
        ////                spread ('...') unary operators that are anticipated for ES6.
        //switch (expression.kind) {
        //    case SyntaxKind.BinaryExpression:
        //        switch ((<BinaryExpression>expression).operatorToken.kind) {
        //            case SyntaxKind.AsteriskToken:
        //            case SyntaxKind.SlashToken:
        //            case SyntaxKind.PercentToken:
        //                return Comparison.GreaterThan;
        //            case SyntaxKind.PlusToken:
        //            case SyntaxKind.MinusToken:
        //                return Comparison.EqualTo;
        //            default:
        //                return Comparison.LessThan;
        //        }
        //    case SyntaxKind.YieldExpression:
        //    case SyntaxKind.ConditionalExpression:
        //        return Comparison.LessThan;
        //    default:
        //        return Comparison.GreaterThan;
        //}
        //}
    };
    NodeVisitor.prototype.jsxVisitReact = function (node) {
        ///// Emit a tag name, which is either '"div"' for lower-cased names, or
        ///// 'Div' for upper-cased or dotted names
        //function emitTagName(name: Identifier | QualifiedName) {
        //    if (name.kind === SyntaxKind.Identifier && isIntrinsicJsxName((<Identifier>name).text)) {
        //        write('"');
        //        emit(name);
        //        write('"');
        //    }
        //    else {
        //        emit(name);
        //    }
        //}
        ///// Emit an attribute name, which is quoted if it needs to be quoted. Because
        ///// these emit into an object literal property name, we don't need to be worried
        ///// about keywords, just non-identifier characters
        //function emitAttributeName(name: Identifier) {
        //    if (/^[A-Za-z_]\w*$/.test(name.text)) {
        //        emit(name);
        //    }
        //    else {
        //        write('"');
        //        emit(name);
        //        write('"');
        //    }
        //}
        ///// Emit an name/value pair for an attribute (e.g. "x: 3")
        //function emitJsxAttribute(node: JsxAttribute) {
        //    emitAttributeName(node.name);
        //    write(": ");
        //    if (node.initializer) {
        //        emit(node.initializer);
        //    }
        //    else {
        //        write("true");
        //    }
        //}
        //function emitJsxElement(openingNode: JsxOpeningLikeElement, children?: JsxChild[]) {
        //    const syntheticReactRef = <Identifier>createSynthesizedNode(SyntaxKind.Identifier);
        //    syntheticReactRef.text = compilerOptions.reactNamespace ? compilerOptions.reactNamespace : "React";
        //    syntheticReactRef.parent = openingNode;
        //    // Call React.createElement(tag, ...
        //    emitLeadingComments(openingNode);
        //    emitExpressionIdentifier(syntheticReactRef);
        //    write(".createElement(");
        //    emitTagName(openingNode.tagName);
        //    write(", ");
        //    // Attribute list
        //    if (openingNode.attributes.length === 0) {
        //        // When there are no attributes, React wants "null"
        //        write("null");
        //    }
        //    else {
        //        // Either emit one big object literal (no spread attribs), or
        //        // a call to the __assign helper
        //        const attrs = openingNode.attributes;
        //        if (forEach(attrs, attr => attr.kind === SyntaxKind.JsxSpreadAttribute)) {
        //            write("__assign(");
        //            let haveOpenedObjectLiteral = false;
        //            for (let i = 0; i < attrs.length; i++) {
        //                if (attrs[i].kind === SyntaxKind.JsxSpreadAttribute) {
        //                    // If this is the first argument, we need to emit a {} as the first argument
        //                    if (i === 0) {
        //                        write("{}, ");
        //                    }
        //                    if (haveOpenedObjectLiteral) {
        //                        write("}");
        //                        haveOpenedObjectLiteral = false;
        //                    }
        //                    if (i > 0) {
        //                        write(", ");
        //                    }
        //                    emit((<JsxSpreadAttribute>attrs[i]).expression);
        //                }
        //                else {
        //                    Debug.assert(attrs[i].kind === SyntaxKind.JsxAttribute);
        //                    if (haveOpenedObjectLiteral) {
        //                        write(", ");
        //                    }
        //                    else {
        //                        haveOpenedObjectLiteral = true;
        //                        if (i > 0) {
        //                            write(", ");
        //                        }
        //                        write("{");
        //                    }
        //                    emitJsxAttribute(<JsxAttribute>attrs[i]);
        //                }
        //            }
        //            if (haveOpenedObjectLiteral) write("}");
        //            write(")"); // closing paren to React.__spread(
        //        }
        //        else {
        //            // One object literal with all the attributes in them
        //            write("{");
        //            for (let i = 0, n = attrs.length; i < n; i++) {
        //                if (i > 0) {
        //                    write(", ");
        //                }
        //                emitJsxAttribute(<JsxAttribute>attrs[i]);
        //            }
        //            write("}");
        //        }
        //    }
        //    // Children
        //    if (children) {
        //        let firstChild: JsxChild;
        //        let multipleEmittableChildren = false;
        //        for (let i = 0, n = children.length; i < n; i++) {
        //            const jsxChild = children[i];
        //            if (isJsxChildEmittable(jsxChild)) {
        //                // we need to decide whether to emit in single line or multiple lines as indented list
        //                // store firstChild reference, if we see another emittable child, then emit accordingly
        //                if (!firstChild) {
        //                    write(", ");
        //                    firstChild = jsxChild;
        //                }
        //                else {
        //                    // more than one emittable child, emit indented list
        //                    if (!multipleEmittableChildren) {
        //                        multipleEmittableChildren = true;
        //                        increaseIndent();
        //                        writeLine();
        //                        emit(firstChild);
        //                    }
        //                    write(", ");
        //                    writeLine();
        //                    emit(jsxChild);
        //                }
        //            }
        //        }
        //        if (multipleEmittableChildren) {
        //            decreaseIndent();
        //        }
        //        else if (firstChild) {
        //            if (firstChild.kind !== SyntaxKind.JsxElement && firstChild.kind !== SyntaxKind.JsxSelfClosingElement) {
        //                emit(firstChild);
        //            }
        //            else {
        //                // If the only child is jsx element, put it on a new indented line
        //                increaseIndent();
        //                writeLine();
        //                emit(firstChild);
        //                writeLine();
        //                decreaseIndent();
        //            }
        //        }
        //    }
        //    // Closing paren
        //    write(")"); // closes "React.createElement("
        //    emitTrailingComments(openingNode);
        //}
        //if (node.kind === SyntaxKind.JsxElement) {
        //    emitJsxElement((<JsxElement>node).openingElement, (<JsxElement>node).children);
        //}
        //else {
        //    Debug.assert(node.kind === SyntaxKind.JsxSelfClosingElement);
        //    emitJsxElement(<JsxSelfClosingElement>node);
        //}
    };
    NodeVisitor.prototype.jsxVisitPreserve = function (node) {
        //function emitJsxAttribute(node: JsxAttribute) {
        //    emit(node.name);
        //    if (node.initializer) {
        //        write("=");
        //        emit(node.initializer);
        //    }
        //}
        //function emitJsxSpreadAttribute(node: JsxSpreadAttribute) {
        //    write("{...");
        //    emit(node.expression);
        //    write("}");
        //}
        //function emitAttributes(attribs: NodeArray<JsxAttribute | JsxSpreadAttribute>) {
        //    for (let i = 0, n = attribs.length; i < n; i++) {
        //        if (i > 0) {
        //            write(" ");
        //        }
        //        if (attribs[i].kind === SyntaxKind.JsxSpreadAttribute) {
        //            emitJsxSpreadAttribute(<JsxSpreadAttribute>attribs[i]);
        //        }
        //        else {
        //            Debug.assert(attribs[i].kind === SyntaxKind.JsxAttribute);
        //            emitJsxAttribute(<JsxAttribute>attribs[i]);
        //        }
        //    }
        //}
        //function emitJsxOpeningOrSelfClosingElement(node: JsxOpeningElement | JsxSelfClosingElement) {
        //    write("<");
        //    emit(node.tagName);
        //    if (node.attributes.length > 0 || (node.kind === SyntaxKind.JsxSelfClosingElement)) {
        //        write(" ");
        //    }
        //    emitAttributes(node.attributes);
        //    if (node.kind === SyntaxKind.JsxSelfClosingElement) {
        //        write("/>");
        //    }
        //    else {
        //        write(">");
        //    }
        //}
        //function emitJsxClosingElement(node: JsxClosingElement) {
        //    write("</");
        //    emit(node.tagName);
        //    write(">");
        //}
        //function emitJsxElement(node: JsxElement) {
        //    emitJsxOpeningOrSelfClosingElement(node.openingElement);
        //    for (let i = 0, n = node.children.length; i < n; i++) {
        //        emit(node.children[i]);
        //    }
        //    emitJsxClosingElement(node.closingElement);
        //}
        //if (node.kind === SyntaxKind.JsxElement) {
        //    emitJsxElement(<JsxElement>node);
        //}
        //else {
        //    Debug.assert(node.kind === SyntaxKind.JsxSelfClosingElement);
        //    emitJsxOpeningOrSelfClosingElement(<JsxSelfClosingElement>node);
        //}
    };
    // This protected specifically handles numeric/string literals for enum and accessor 'identifiers'.
    // In a sense, it does not actually this.visit identifiers as much as it declares a name for a specific property.
    // For example, this is utilized when feeding in a result to Object.defineProperty.
    NodeVisitor.prototype.visitExpressionForPropertyName = function (node) {
        return node;
    };
    NodeVisitor.prototype.isExpressionIdentifier = function (node) {
        //const parent = node.parent;
        //switch (parent.kind) {
        //    case SyntaxKind.ArrayLiteralExpression:
        //    case SyntaxKind.AsExpression:
        //    case SyntaxKind.AwaitExpression:
        //    case SyntaxKind.BinaryExpression:
        //    case SyntaxKind.CallExpression:
        //    case SyntaxKind.CaseClause:
        //    case SyntaxKind.ComputedPropertyName:
        //    case SyntaxKind.ConditionalExpression:
        //    case SyntaxKind.Decorator:
        //    case SyntaxKind.DeleteExpression:
        //    case SyntaxKind.DoStatement:
        //    case SyntaxKind.ElementAccessExpression:
        //    case SyntaxKind.ExportAssignment:
        //    case SyntaxKind.ExpressionStatement:
        //    case SyntaxKind.ExpressionWithTypeArguments:
        //    case SyntaxKind.ForStatement:
        //    case SyntaxKind.ForInStatement:
        //    case SyntaxKind.ForOfStatement:
        //    case SyntaxKind.IfStatement:
        //    case SyntaxKind.JsxClosingElement:
        //    case SyntaxKind.JsxSelfClosingElement:
        //    case SyntaxKind.JsxOpeningElement:
        //    case SyntaxKind.JsxSpreadAttribute:
        //    case SyntaxKind.JsxExpression:
        //    case SyntaxKind.NewExpression:
        //    case SyntaxKind.NonNullExpression:
        //    case SyntaxKind.ParenthesizedExpression:
        //    case SyntaxKind.PostfixUnaryExpression:
        //    case SyntaxKind.PrefixUnaryExpression:
        //    case SyntaxKind.ReturnStatement:
        //    case SyntaxKind.ShorthandPropertyAssignment:
        //    case SyntaxKind.SpreadElementExpression:
        //    case SyntaxKind.SwitchStatement:
        //    case SyntaxKind.TaggedTemplateExpression:
        //    case SyntaxKind.TemplateSpan:
        //    case SyntaxKind.ThrowStatement:
        //    case SyntaxKind.TypeAssertionExpression:
        //    case SyntaxKind.TypeOfExpression:
        //    case SyntaxKind.VoidExpression:
        //    case SyntaxKind.WhileStatement:
        //    case SyntaxKind.WithStatement:
        //    case SyntaxKind.YieldExpression:
        //        return true;
        //    case SyntaxKind.BindingElement:
        //    case SyntaxKind.EnumMember:
        //    case SyntaxKind.Parameter:
        //    case SyntaxKind.PropertyAssignment:
        //    case SyntaxKind.PropertyDeclaration:
        //    case SyntaxKind.VariableDeclaration:
        //        return (<BindingElement | EnumMember | ParameterDeclaration | PropertyAssignment | PropertyDeclaration | VariableDeclaration>parent).initializer === node;
        //    case SyntaxKind.PropertyAccessExpression:
        //        return (<ExpressionStatement>parent).expression === node;
        //    case SyntaxKind.ArrowFunction:
        //    case SyntaxKind.FunctionExpression:
        //        return (<FunctionLikeDeclaration>parent).body === node;
        //    case SyntaxKind.ImportEqualsDeclaration:
        //        return (<ImportEqualsDeclaration>parent).moduleReference === node;
        //    case SyntaxKind.QualifiedName:
        //        return (<QualifiedName>parent).left === node;
        //}
        return false;
    };
    NodeVisitor.prototype.visitExpressionIdentifier = function (node) {
        //const container = resolver.getReferencedExportContainer(node);
        //if (container) {
        //    if (container.kind === SyntaxKind.SourceFile) {
        //        // Identifier references module export
        //        if (modulekind !== ModuleKind.ES6 && modulekind !== ModuleKind.System) {
        //            write("exports.");
        //        }
        //    }
        //    else {
        //        // Identifier references namespace export
        //        write(getGeneratedNameForNode(container));
        //        write(".");
        //    }
        //}
        //else {
        //    if (modulekind !== ModuleKind.ES6) {
        //        const declaration = resolver.getReferencedImportDeclaration(node);
        //        if (declaration) {
        //            if (declaration.kind === SyntaxKind.ImportClause) {
        //                // Identifier references default import
        //                write(getGeneratedNameForNode(<ImportDeclaration>declaration.parent));
        //                write(languageVersion === ScriptTarget.ES3 ? '["default"]' : ts.".default");
        //                return;
        //            }
        //            else if (declaration.kind === SyntaxKind.ImportSpecifier) {
        //                // Identifier references named import
        //                write(getGeneratedNameForNode(<ImportDeclaration>declaration.parent.parent.parent));
        //                const name = (<ImportSpecifier>declaration).propertyName || (<ImportSpecifier>declaration).name;
        //                const identifier = getTextOfNodeFromSourceText(currentText, name);
        //                if (languageVersion === ScriptTarget.ES3 && identifier === "default") {
        //                    write('["default"]');
        //                }
        //                else {
        //                    write(".");
        //                    write(identifier);
        //                }
        //                return;
        //            }
        //        }
        //    }
        //    if (languageVersion < ScriptTarget.ES6) {
        //        const declaration = resolver.getReferencedDeclarationWithCollidingName(node);
        //        if (declaration) {
        //            write(getGeneratedNameForNode(declaration.name));
        //            return;
        //        }
        //    }
        //    else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.BodyScopedClassBinding) {
        //        // Due to the this.visit for class decorators, any reference to the class from inside of the class body
        //        // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
        //        // behavior of class names in ES6.
        //        const declaration = resolver.getReferencedValueDeclaration(node);
        //        if (declaration) {
        //            const classAlias = decoratedClassAliases[getNodeId(declaration)];
        //            if (classAlias !== undefined) {
        //                write(classAlias);
        //                return;
        //            }
        //        }
        //    }
        //}
        //if (nodeIsSynthesized(node)) {
        //    write(node.text);
        //}
        //else {
        //    writeTextOfNode(currentText, node);
        //}
    };
    NodeVisitor.prototype.isNameOfNestedBlockScopedRedeclarationOrCapturedBinding = function (node) {
        //if (languageVersion < ScriptTarget.ES6) {
        //    const parent = node.parent;
        //    switch (parent.kind) {
        //        case SyntaxKind.BindingElement:
        //        case SyntaxKind.ClassDeclaration:
        //        case SyntaxKind.EnumDeclaration:
        //        case SyntaxKind.VariableDeclaration:
        //            return (<Declaration>parent).name === node && resolver.isDeclarationWithCollidingName(<Declaration>parent);
        //    }
        //}
        //return false;
    };
    NodeVisitor.prototype.visitYieldExpression = function (node) {
        //write(tokenToString(SyntaxKind.YieldKeyword));
        //if (node.asteriskToken) {
        //    write("*");
        //}
        //if (node.expression) {
        //    write(" ");
        //    this.visit(node.expression);
        //}
    };
    NodeVisitor.prototype.visitAwaitExpression = function (node) {
        //const needsParenthesis = needsParenthesisForAwaitExpressionAsYield(node);
        //if (needsParenthesis) {
        //    write("(");
        //}
        //write(tokenToString(SyntaxKind.YieldKeyword));
        //write(" ");
        //this.visit(node.expression);
        //if (needsParenthesis) {
        //    write(")");
        //}
    };
    NodeVisitor.prototype.needsParenthesisForAwaitExpressionAsYield = function (node) {
        //if (node.parent.kind === SyntaxKind.BinaryExpression && !isAssignmentOperator((<BinaryExpression>node.parent).operatorToken.kind)) {
        //    return true;
        //}
        //else if (node.parent.kind === SyntaxKind.ConditionalExpression && (<ConditionalExpression>node.parent).condition === node) {
        //    return true;
        //}
        //return false;
    };
    NodeVisitor.prototype.needsParenthesisForPropertyAccessOrInvocation = function (node) {
        //switch (node.kind) {
        //    case SyntaxKind.Identifier:
        //    case SyntaxKind.ArrayLiteralExpression:
        //    case SyntaxKind.PropertyAccessExpression:
        //    case SyntaxKind.ElementAccessExpression:
        //    case SyntaxKind.CallExpression:
        //    case SyntaxKind.ParenthesizedExpression:
        //        // This list is not exhaustive and only includes those cases that are relevant
        //        // to the check in this.visitArrayLiteral. More cases can be added as needed.
        //        return false;
        //}
        //return true;
    };
    NodeVisitor.prototype.visitListWithSpread = function (elements, needsUniqueCopy, multiLine, trailingComma, useConcat) {
        //let pos = 0;
        //let group = 0;
        //const length = elements.length;
        //while (pos < length) {
        //    // this.visit using the pattern <group0>.concat(<group1>, <group2>, ...)
        //    if (group === 1 && useConcat) {
        //        write(".concat(");
        //    }
        //    else if (group > 0) {
        //        write(", ");
        //    }
        //    let e = elements[pos];
        //    if (e.kind === SyntaxKind.SpreadElementExpression) {
        //        e = (<SpreadElementExpression>e).expression;
        //        this.visitParenthesizedIf(e, /*parenthesized*/ group === 0 && needsParenthesisForPropertyAccessOrInvocation(e));
        //        pos++;
        //        if (pos === length && group === 0 && needsUniqueCopy && e.kind !== SyntaxKind.ArrayLiteralExpression) {
        //            write(".slice()");
        //        }
        //    }
        //    else {
        //        let i = pos;
        //        while (i < length && elements[i].kind !== SyntaxKind.SpreadElementExpression) {
        //            i++;
        //        }
        //        write("[");
        //        if (multiLine) {
        //            increaseIndent();
        //        }
        //        this.visitList(elements, pos, i - pos, multiLine, trailingComma && i === length);
        //        if (multiLine) {
        //            decreaseIndent();
        //        }
        //        write("]");
        //        pos = i;
        //    }
        //    group++;
        //}
        //if (group > 1) {
        //    if (useConcat) {
        //        write(")");
        //    }
        //}
    };
    NodeVisitor.prototype.isSpreadElementExpression = function (node) {
        return node.kind === ts.SyntaxKind.SpreadElementExpression;
    };
    NodeVisitor.prototype.visitDownlevelObjectLiteralWithComputedProperties = function (node, firstComputedPropertyIndex) {
        //    const multiLine = node.multiLine;
        //    const properties = node.properties;
        //    write("(");
        //    if (multiLine) {
        //        increaseIndent();
        //    }
        //    // For computed properties, we need to create a unique handle to the object
        //    // literal so we can modify it without risking internal assignments tainting the object.
        //    const tempVar = createAndRecordTempVariable(TempFlags.Auto);
        //    // Write out the first non-computed properties
        //    // (or all properties if none of them are computed),
        //    // then this.visit the rest through indexing on the temp variable.
        //    this.visit(tempVar);
        //    write(" = ");
        //    this.visitObjectLiteralBody(node, firstComputedPropertyIndex);
        //    for (let i = firstComputedPropertyIndex, n = properties.length; i < n; i++) {
        //        writeComma();
        //        const property = properties[i];
        //        this.visitStart(property);
        //        if (property.kind === SyntaxKind.GetAccessor || property.kind === SyntaxKind.SetAccessor) {
        //            // TODO (drosen): ts.Reconcile with 'this.visitMemberFunctions'.
        //            const accessors = getAllAccessorDeclarations(node.properties, <AccessorDeclaration>property);
        //            if (property !== accessors.firstAccessor) {
        //                continue;
        //            }
        //            write("Object.defineProperty(");
        //            this.visit(tempVar);
        //            write(", ");
        //            this.visitStart(property.name);
        //            this.visitExpressionForPropertyName(property.name);
        //            this.visitEnd(property.name);
        //            write(", {");
        //            increaseIndent();
        //            if (accessors.getAccessor) {
        //                writeLine();
        //                this.visitLeadingComments(accessors.getAccessor);
        //                write("get: ts.");
        //                this.visitStart(accessors.getAccessor);
        //                write("protected ");
        //                this.visitSignatureAndBody(accessors.getAccessor);
        //                this.visitEnd(accessors.getAccessor);
        //                this.visitTrailingComments(accessors.getAccessor);
        //                write(",");
        //            }
        //            if (accessors.setAccessor) {
        //                writeLine();
        //                this.visitLeadingComments(accessors.setAccessor);
        //                write("set: ts.");
        //                this.visitStart(accessors.setAccessor);
        //                write("protected ");
        //                this.visitSignatureAndBody(accessors.setAccessor);
        //                this.visitEnd(accessors.setAccessor);
        //                this.visitTrailingComments(accessors.setAccessor);
        //                write(",");
        //            }
        //            writeLine();
        //            write("enumerable: ts.true,");
        //            writeLine();
        //            write("configurable: ts.true");
        //            decreaseIndent();
        //            writeLine();
        //            write("})");
        //            this.visitEnd(property);
        //        }
        //        else {
        //            this.visitLeadingComments(property);
        //            this.visitStart(property.name);
        //            this.visit(tempVar);
        //            this.visitMemberAccessForPropertyName(property.name);
        //            this.visitEnd(property.name);
        //            write(" = ");
        //            if (property.kind === SyntaxKind.PropertyAssignment) {
        //                this.visit((<PropertyAssignment>property).initializer);
        //            }
        //            else if (property.kind === SyntaxKind.ShorthandPropertyAssignment) {
        //                this.visitExpressionIdentifier((<ShorthandPropertyAssignment>property).name);
        //            }
        //            else if (property.kind === SyntaxKind.MethodDeclaration) {
        //                this.visitFunctionDeclaration(<MethodDeclaration>property);
        //            }
        //            else {
        //                Debug.fail("ObjectLiteralElement type not accounted for: ts." + property.kind);
        //            }
        //        }
        //        this.visitEnd(property);
        //    }
        //    writeComma();
        //    this.visit(tempVar);
        //    if (multiLine) {
        //        decreaseIndent();
        //        writeLine();
        //    }
        //    write(")");
        //function writeComma() {
        //    if (multiLine) {
        //        write(",");
        //        writeLine();
        //    }
        //    else {
        //        write(", ");
        //    }
        //}
    };
    NodeVisitor.prototype.createBinaryExpression = function (left, operator, right, startsOnNewLine) {
        //const result = <BinaryExpression>createSynthesizedNode(SyntaxKind.BinaryExpression, startsOnNewLine);
        //result.operatorToken = createSynthesizedNode(operator);
        //result.left = left;
        //result.right = right;
        //return result;
        return;
    };
    NodeVisitor.prototype.createPropertyAccessExpression = function (expression, name) {
        //const result = <PropertyAccessExpression>createSynthesizedNode(SyntaxKind.PropertyAccessExpression);
        //result.expression = parenthesizeForAccess(expression);
        //result.dotToken = createSynthesizedNode(SyntaxKind.DotToken);
        //result.name = name;
        //return result;
        return;
    };
    NodeVisitor.prototype.createElementAccessExpression = function (expression, argumentExpression) {
        // const result = <ts.ElementAccessExpression>this.createSynthesizedNode(ts.SyntaxKind.ElementAccessExpression);
        //result.expression = parenthesizeForAccess(expression);
        //result.argumentExpression = argumentExpression;
        // return result;
        return;
    };
    NodeVisitor.prototype.parenthesizeForAccess = function (expr) {
        //// When diagnosing whether the expression needs parentheses, the decision should be based
        //// on the innermost expression in a chain of nested type assertions.
        //while (expr.kind === SyntaxKind.TypeAssertionExpression ||
        //    expr.kind === SyntaxKind.AsExpression ||
        //    expr.kind === SyntaxKind.NonNullExpression) {
        //    expr = (<AssertionExpression | NonNullExpression>expr).expression;
        //}
        //// isLeftHandSideExpression is almost the correct criterion for when it is not necessary
        //// to parenthesize the expression before a dot. The known exceptions are:
        ////
        ////    NewExpression:
        ////       new C.x        -> not the same as (new C).x
        ////    NumberLiteral
        ////       1.x            -> not the same as (1).x
        ////
        //if (isLeftHandSideExpression(expr) &&
        //    expr.kind !== SyntaxKind.NewExpression &&
        //    expr.kind !== SyntaxKind.NumericLiteral) {
        //    return <LeftHandSideExpression>expr;
        //}
        //const node = <ParenthesizedExpression>createSynthesizedNode(SyntaxKind.ParenthesizedExpression);
        //node.expression = expr;
        // return node;
        return;
    };
    NodeVisitor.prototype.visitComputedPropertyName = function (node) {
        //this.visitExpressionForPropertyName(node);
    };
    NodeVisitor.prototype.visitPropertyAssignment = function (node) {
        node.name = this.visitName(node.name);
        node.initializer = this.visitExpression(node.initializer);
    };
    // Return true if identifier resolves to an exported member of a namespace
    NodeVisitor.prototype.isNamespaceExportReference = function (node) {
        //const container = resolver.getReferencedExportContainer(node);
        //return container && container.kind !== SyntaxKind.SourceFile;
    };
    // Return true if identifier resolves to an imported identifier
    NodeVisitor.prototype.isImportedReference = function (node) {
        //const declaration = resolver.getReferencedImportDeclaration(node);
        //return declaration && (declaration.kind === SyntaxKind.ImportClause || declaration.kind === SyntaxKind.ImportSpecifier);
    };
    NodeVisitor.prototype.visitShorthandPropertyAssignment = function (node) {
        //// The name property of a short-hand property assignment is considered an expression position, so here
        //// we manually this.visit the identifier to avoid rewriting.
        //writeTextOfNode(currentText, node.name);
        //// If this.visitting pre-ES6 code, or if the name requires rewriting when resolved as an expression identifier,
        //// we this.visit a normal property assignment. For example:
        ////   module m {
        ////       export let y;
        ////   }
        ////   module m {
        ////       let obj = { y };
        ////   }
        //// Here we need to this.visit obj = { y : ts.m.y } regardless of the output target.
        //// The same rules apply for imported identifiers when targeting module formats with indirect access to
        //// the imported identifiers. For example, when targeting CommonJS:
        ////
        ////   import {foo} from './foo';
        ////   export const baz = { foo };
        ////
        //// Must be transformed into:
        ////
        ////   const foo_1 = require('./foo');
        ////   exports.baz = { foo: ts.foo_1.foo };
        ////
        //if (languageVersion < ScriptTarget.ES6 || (modulekind !== ModuleKind.ES6 && isImportedReference(node.name)) || isNamespaceExportReference(node.name)) {
        //    // this.visit identifier as an identifier
        //    write(": ts.");
        //    this.visit(node.name);
        //}
        //if (languageVersion >= ScriptTarget.ES6 && node.objectAssignmentInitializer) {
        //    write(" = ");
        //    this.visit(node.objectAssignmentInitializer);
        //}
    };
    NodeVisitor.prototype.tryVisitConstantValue = function (node) {
        //const constantValue = tryGetConstEnumValue(node);
        //if (constantValue !== undefined) {
        //    write(constantValue.toString());
        //    if (!compilerOptions.removeComments) {
        //        const propertyName: string = node.kind === SyntaxKind.PropertyAccessExpression ? declarationNameToString((<PropertyAccessExpression>node).name) : ts.getTextOfNode((<ElementAccessExpression>node).argumentExpression);
        //        write(" /* " + propertyName + " */");
        //    }
        //    return true;
        //}
        return false;
    };
    NodeVisitor.prototype.tryGetConstEnumValue = function (node) {
        //if (compilerOptions.isolatedModules) {
        return undefined;
        //}
        //return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression
        //    ? resolver.getConstantValue(<PropertyAccessExpression | ElementAccessExpression>node)
        //    : ts.undefined;
    };
    // Returns 'true' if the code was actually indented, false otherwise.
    // If the code is not indented, an optional valueToWriteWhenNotIndenting will be
    // this.visitted instead.
    NodeVisitor.prototype.indentIfOnDifferentLines = function (parent, node1, node2, valueToWriteWhenNotIndenting) {
        //const realNodesAreOnDifferentLines = !nodeIsSynthesized(parent) && !nodeEndIsOnSameLineAsNodeStart(node1, node2);
        //// Always use a newline for synthesized code if the synthesizer desires it.
        //const synthesizedNodeIsOnDifferentLine = synthesizedNodeStartsOnNewLine(node2);
        //if (realNodesAreOnDifferentLines || synthesizedNodeIsOnDifferentLine) {
        //    increaseIndent();
        //    writeLine();
        //    return true;
        //}
        //else {
        //    if (valueToWriteWhenNotIndenting) {
        //        write(valueToWriteWhenNotIndenting);
        //    }
        return false;
        //}
    };
    NodeVisitor.prototype.visitPropertyAccess = function (node) {
        //if (trythis.visitConstantValue(node)) {
        //    return;
        //}
        //if (languageVersion === ScriptTarget.ES6 &&
        //    node.expression.kind === SyntaxKind.SuperKeyword &&
        //    isInAsyncMethodWithSuperInES6(node)) {
        //    const name = <StringLiteral>createSynthesizedNode(SyntaxKind.StringLiteral);
        //    name.text = node.name.text;
        //    this.visitSuperAccessInAsyncMethod(node.expression, name);
        //    return;
        //}
        //this.visit(node.expression);
        //const indentedBeforeDot = indentIfOnDifferentLines(node, node.expression, node.dotToken);
        //// 1 .toString is a valid property access, this.visit a space after the literal
        //// Also this.visit a space if expression is a integer const enum value - it will appear in generated code as numeric literal
        //let shouldthis.visitSpace = false;
        //if (!indentedBeforeDot) {
        //    if (node.expression.kind === SyntaxKind.NumericLiteral) {
        //        // check if numeric literal was originally written with a dot
        //        const text = getTextOfNodeFromSourceText(currentText, node.expression);
        //        shouldthis.visitSpace = text.indexOf(tokenToString(SyntaxKind.DotToken)) < 0;
        //    }
        //    else {
        //        // check if constant enum value is integer
        //        const constantValue = tryGetConstEnumValue(node.expression);
        //        // isFinite handles cases when constantValue is undefined
        //        shouldthis.visitSpace = isFinite(constantValue) && Math.floor(constantValue) === constantValue;
        //    }
        //}
        //if (shouldthis.visitSpace) {
        //    write(" .");
        //}
        //else {
        //    write(".");
        //}
        //const indentedAfterDot = indentIfOnDifferentLines(node, node.dotToken, node.name);
        //this.visit(node.name);
        //decreaseIndentIf(indentedBeforeDot, indentedAfterDot);
    };
    NodeVisitor.prototype.visitQualifiedNameAsExpression = function (node, useFallback) {
        //if (node.left.kind === SyntaxKind.Identifier) {
        //    this.visitEntityNameAsExpression(node.left, useFallback);
        //}
        //else if (useFallback) {
        //    const temp = createAndRecordTempVariable(TempFlags.Auto);
        //    write("(");
        //    this.visitNodeWithoutSourceMap(temp);
        //    write(" = ");
        //    this.visitEntityNameAsExpression(node.left, /*useFallback*/ true);
        //    write(") && ");
        //    this.visitNodeWithoutSourceMap(temp);
        //}
        //else {
        //    this.visitEntityNameAsExpression(node.left, /*useFallback*/ false);
        //}
        //write(".");
        //this.visit(node.right);
    };
    NodeVisitor.prototype.visitEntityNameAsExpression = function (node, useFallback) {
        //switch (node.kind) {
        //    case SyntaxKind.Identifier:
        //        if (useFallback) {
        //            write("typeof ");
        //            this.visitExpressionIdentifier(<Identifier>node);
        //            write(" !== 'undefined' && ");
        //        }
        //        this.visitExpressionIdentifier(<Identifier>node);
        //        break;
        //    case SyntaxKind.QualifiedName:
        //        this.visitQualifiedNameAsExpression(<QualifiedName>node, useFallback);
        //        break;
        //    default:
        //        this.visitNodeWithoutSourceMap(node);
        //        break;
        //}
    };
    NodeVisitor.prototype.visitIndexedAccess = function (node) {
        //if (trythis.visitConstantValue(node)) {
        //    return;
        //}
        //if (languageVersion === ScriptTarget.ES6 &&
        //    node.expression.kind === SyntaxKind.SuperKeyword &&
        //    isInAsyncMethodWithSuperInES6(node)) {
        //    this.visitSuperAccessInAsyncMethod(node.expression, node.argumentExpression);
        //    return;
        //}
        //this.visit(node.expression);
        //write("[");
        //this.visit(node.argumentExpression);
        //write("]");
    };
    NodeVisitor.prototype.hasSpreadElement = function (elements) {
        //return forEach(elements, e => e.kind === SyntaxKind.SpreadElementExpression);
    };
    NodeVisitor.prototype.skipParentheses = function (node) {
        //while (node.kind === SyntaxKind.ParenthesizedExpression ||
        //    node.kind === SyntaxKind.TypeAssertionExpression ||
        //    node.kind === SyntaxKind.AsExpression ||
        //    node.kind === SyntaxKind.NonNullExpression) {
        //    node = (<ParenthesizedExpression | AssertionExpression | NonNullExpression>node).expression;
        //}
        return node;
    };
    NodeVisitor.prototype.visitCallTarget = function (node) {
        //if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisKeyword || node.kind === SyntaxKind.SuperKeyword) {
        //    this.visit(node);
        return node;
        //}
        //const temp = createAndRecordTempVariable(TempFlags.Auto);
        //write("(");
        //this.visit(temp);
        //write(" = ");
        //this.visit(node);
        //write(")");
        //return temp;
    };
    NodeVisitor.prototype.visitCallWithSpread = function (node) {
        //let target: ts.Expression;
        //const expr = skipParentheses(node.expression);
        //if (expr.kind === SyntaxKind.PropertyAccessExpression) {
        //    // Target will be this.visitted as "this" argument
        //    target = this.visitCallTarget((<PropertyAccessExpression>expr).expression);
        //    write(".");
        //    this.visit((<PropertyAccessExpression>expr).name);
        //}
        //else if (expr.kind === SyntaxKind.ElementAccessExpression) {
        //    // Target will be this.visitted as "this" argument
        //    target = this.visitCallTarget((<PropertyAccessExpression>expr).expression);
        //    write("[");
        //    this.visit((<ElementAccessExpression>expr).argumentExpression);
        //    write("]");
        //}
        //else if (expr.kind === SyntaxKind.SuperKeyword) {
        //    target = expr;
        //    write("_super");
        //}
        //else {
        //    this.visit(node.expression);
        //}
        //write(".apply(");
        //if (target) {
        //    if (target.kind === SyntaxKind.SuperKeyword) {
        //        // Calls of form super(...) and super.foo(...)
        //        this.visitThis(target);
        //    }
        //    else {
        //        // Calls of form obj.foo(...)
        //        this.visit(target);
        //    }
        //}
        //else {
        //    // Calls of form foo(...)
        //    write("void 0");
        //}
        //write(", ");
        //this.visitListWithSpread(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false, /*trailingComma*/ false, /*useConcat*/ true);
        //write(")");
    };
    NodeVisitor.prototype.isInAsyncMethodWithSuperInES6 = function (node) {
        //if (languageVersion === ScriptTarget.ES6) {
        //    const container = getSuperContainer(node, /*includeFunctions*/ false);
        //    if (container && resolver.getNodeCheckFlags(container) & (NodeCheckFlags.AsyncMethodWithSuper | NodeCheckFlags.AsyncMethodWithSuperBinding)) {
        //        return true;
        //    }
        //}
        //return false;
    };
    NodeVisitor.prototype.visitSuperAccessInAsyncMethod = function (superNode, argumentExpression) {
        //const container = getSuperContainer(superNode, /*includeFunctions*/ false);
        //const isSuperBinding = resolver.getNodeCheckFlags(container) & NodeCheckFlags.AsyncMethodWithSuperBinding;
        //write("_super(");
        //this.visit(argumentExpression);
        //write(isSuperBinding ? ").value" : ts.")");
    };
    NodeVisitor.prototype.visitCallExpression = function (node) {
        //if (languageVersion < ScriptTarget.ES6 && hasSpreadElement(node.arguments)) {
        //    this.visitCallWithSpread(node);
        //    return;
        //}
        //const expression = node.expression;
        //let superCall = false;
        //let isAsyncMethodWithSuper = false;
        //if (expression.kind === SyntaxKind.SuperKeyword) {
        //    this.visitSuper(expression);
        //    superCall = true;
        //}
        //else {
        //    superCall = isSuperPropertyOrElementAccess(expression);
        //    isAsyncMethodWithSuper = superCall && isInAsyncMethodWithSuperInES6(node);
        //    this.visit(expression);
        //}
        //if (superCall && (languageVersion < ScriptTarget.ES6 || isAsyncMethodWithSuper)) {
        //    write(".call(");
        //    this.visitThis(expression);
        //    if (node.arguments.length) {
        //        write(", ");
        //        this.visitCommaList(node.arguments);
        //    }
        //    write(")");
        //}
        //else {
        //    write("(");
        //    this.visitCommaList(node.arguments);
        //    write(")");
        //}
    };
    NodeVisitor.prototype.visitNewExpression = function (node) {
        //write("new ");
        //// Spread operator logic is supported in new expressions in ES5 using a combination
        //// of Function.prototype.bind() and Function.prototype.apply().
        ////
        ////     Example:
        ////
        ////         var args = [1, 2, 3, 4, 5];
        ////         new Array(...args);
        ////
        ////     is compiled into the following ES5:
        ////
        ////         var args = [1, 2, 3, 4, 5];
        ////         new (Array.bind.apply(Array, [void 0].concat(args)));
        ////
        //// The 'thisArg' to 'bind' is ignored when invoking the result of 'bind' with 'new',
        //// Thus, we set it to undefined ('void 0').
        //if (languageVersion === ScriptTarget.ES5 &&
        //    node.arguments &&
        //    hasSpreadElement(node.arguments)) {
        //    write("(");
        //    const target = this.visitCallTarget(node.expression);
        //    write(".bind.apply(");
        //    this.visit(target);
        //    write(", [void 0].concat(");
        //    this.visitListWithSpread(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false, /*trailingComma*/ false, /*useConcat*/ false);
        //    write(")))");
        //    write("()");
        //}
        //else {
        //    this.visit(node.expression);
        //    if (node.arguments) {
        //        write("(");
        //        this.visitCommaList(node.arguments);
        //        write(")");
        //    }
        //}
    };
    NodeVisitor.prototype.visitTaggedTemplateExpression = function (node) {
        //    if(languageVersion >= ScriptTarget.ES6) {
        //        this.visit(node.tag);
        //        write(" ");
        //        this.visit(node.template);
        //    }
        //else {
        //        this.visitDownlevelTaggedTemplate(node);
        //    }
    };
    NodeVisitor.prototype.visitParenExpression = function (node) {
        //// If the node is synthesized, it means the this.visitter put the parentheses there,
        //// not the user. If we didn't want them, the this.visitter would not have put them
        //// there.
        //if (!nodeIsSynthesized(node) && node.parent.kind !== SyntaxKind.ArrowFunction) {
        //    if (node.expression.kind === SyntaxKind.TypeAssertionExpression ||
        //        node.expression.kind === SyntaxKind.AsExpression ||
        //        node.expression.kind === SyntaxKind.NonNullExpression) {
        //        let operand = (<TypeAssertion | NonNullExpression>node.expression).expression;
        //        // Make sure we consider all nested cast expressions, e.g.:
        //        // (<any><number><any>-A).x;
        //        while (operand.kind === SyntaxKind.TypeAssertionExpression ||
        //            operand.kind === SyntaxKind.AsExpression ||
        //            operand.kind === SyntaxKind.NonNullExpression) {
        //            operand = (<TypeAssertion | NonNullExpression>operand).expression;
        //        }
        //        // We have an expression of the form: ts.(<Type>SubExpr)
        //        // this.visitting this as (SubExpr) is really not desirable. We would like to this.visit the subexpr as is.
        //        // Omitting the parentheses, however, could cause change in the semantics of the generated
        //        // code if the casted expression has a lower precedence than the rest of the expression, e.g.:
        //        //      (<any>new A).foo should be this.visitted as (new A).foo and not new A.foo
        //        //      (<any>typeof A).toString() should be this.visitted as (typeof A).toString() and not typeof A.toString()
        //        //      new (<any>A()) should be this.visitted as new (A()) and not new A()
        //        //      (<any>protected foo() { })() should be this.visitted as an IIF (protected foo(){})() and not declaration protected foo(){} ()
        //        if (operand.kind !== SyntaxKind.PrefixUnaryExpression &&
        //            operand.kind !== SyntaxKind.VoidExpression &&
        //            operand.kind !== SyntaxKind.TypeOfExpression &&
        //            operand.kind !== SyntaxKind.DeleteExpression &&
        //            operand.kind !== SyntaxKind.PostfixUnaryExpression &&
        //            operand.kind !== SyntaxKind.NewExpression &&
        //            !(operand.kind === SyntaxKind.CallExpression && node.parent.kind === SyntaxKind.NewExpression) &&
        //            !(operand.kind === SyntaxKind.FunctionExpression && node.parent.kind === SyntaxKind.CallExpression) &&
        //            !(operand.kind === SyntaxKind.NumericLiteral && node.parent.kind === SyntaxKind.PropertyAccessExpression)) {
        //            this.visit(operand);
        //            return;
        //        }
        //    }
        //}
        //write("(");
        //this.visit(node.expression);
        //write(")");
    };
    NodeVisitor.prototype.visitFunctionDeclaration = function (node) {
        //if (nodeIsMissing(node.body)) {
        //    return emitCommentsOnNotEmittedNode(node);
        //}
        //// TODO (yuisu) : we should not have special cases to condition emitting comments
        //// but have one place to fix check for these conditions.
        //const { kind, parent } = node;
        //if (kind !== SyntaxKind.MethodDeclaration &&
        //    kind !== SyntaxKind.MethodSignature &&
        //    parent &&
        //    parent.kind !== SyntaxKind.PropertyAssignment &&
        //    parent.kind !== SyntaxKind.CallExpression &&
        //    parent.kind !== SyntaxKind.ArrayLiteralExpression) {
        //    // 1. Methods will emit comments at their assignment declaration sites.
        //    //
        //    // 2. If the function is a property of object literal, emitting leading-comments
        //    //    is done by emitNodeWithoutSourceMap which then call this function.
        //    //    In particular, we would like to avoid emit comments twice in following case:
        //    //
        //    //          var obj = {
        //    //              id:
        //    //                  /*comment*/ () => void
        //    //          }
        //    //
        //    // 3. If the function is an argument in call expression, emitting of comments will be
        //    //    taken care of in emit list of arguments inside of 'emitCallExpression'.
        //    //
        //    // 4. If the function is in an array literal, 'emitLinePreservingList' will take care
        //    //    of leading comments.
        //    emitLeadingComments(node);
        //}
        //emitStart(node);
        //// For targeting below es6, emit functions-like declaration including arrow function using function keyword.
        //// When targeting ES6, emit arrow function natively in ES6 by omitting function keyword and using fat arrow instead
        //if (!shouldEmitAsArrowFunction(node)) {
        //    if (isES6ExportedDeclaration(node)) {
        //        write("export ");
        //        if (node.flags & NodeFlags.Default) {
        //            write("default ");
        //        }
        //    }
        //    write("function");
        //    if (languageVersion >= ScriptTarget.ES6 && node.asteriskToken) {
        //        write("*");
        //    }
        //    write(" ");
        //}
        //if (shouldEmitFunctionName(node)) {
        //    emitDeclarationName(node);
        //}
        //emitSignatureAndBody(node);
        //if (modulekind !== ModuleKind.ES6 && kind === SyntaxKind.FunctionDeclaration && parent === currentSourceFile && node.name) {
        //    emitExportMemberAssignments((<FunctionDeclaration>node).name);
        //}
        //emitEnd(node);
        //if (kind !== SyntaxKind.MethodDeclaration &&
        //    kind !== SyntaxKind.MethodSignature &&
        //    kind !== SyntaxKind.ArrowFunction) {
        //    emitTrailingComments(node);
        //}
    };
    NodeVisitor.prototype.visitDeleteExpression = function (node) {
        //write(tokenToString(SyntaxKind.DeleteKeyword));
        //write(" ");
        //this.visit(node.expression);
    };
    NodeVisitor.prototype.visitVoidExpression = function (node) {
        //write(tokenToString(SyntaxKind.VoidKeyword));
        //write(" ");
        //this.visit(node.expression);
    };
    NodeVisitor.prototype.visitTypeOfExpression = function (node) {
        //write(tokenToString(SyntaxKind.TypeOfKeyword));
        //write(" ");
        //this.visit(node.expression);
    };
    NodeVisitor.prototype.isNameOfExportedSourceLevelDeclarationInSystemExternalModule = function (node) {
        //if (!isCurrentFileSystemExternalModule() || node.kind !== SyntaxKind.Identifier || nodeIsSynthesized(node)) {
        return false;
        //}
        // const isVariableDeclarationOrBindingElement =
        //     node.parent && (node.parent.kind === ts.SyntaxKind.VariableDeclaration || node.parent.kind === ts.SyntaxKind.BindingElement);
        // const targetDeclaration =
        //     isVariableDeclarationOrBindingElement
        //         ? <ts.Declaration>node.parent
        //         : ts.resolver.getReferencedValueDeclaration(<Identifier>node);
        //return this.isSourceFileLevelDeclarationInSystemJsModule(targetDeclaration, /*isExported*/ true);
    };
    NodeVisitor.prototype.isNameOfExportedDeclarationInNonES6Module = function (node) {
        //if (modulekind === ModuleKind.System || node.kind !== SyntaxKind.Identifier || nodeIsSynthesized(node)) {
        return false;
        //}
        //return !exportEquals && exportSpecifiers && hasProperty(exportSpecifiers, (<Identifier>node).text);
    };
    NodeVisitor.prototype.visitPrefixUnaryExpression = function (node) {
        //const isPlusPlusOrMinusMinus = (node.operator === SyntaxKind.PlusPlusToken
        //    || node.operator === SyntaxKind.MinusMinusToken);
        //const externalExportChanged = isPlusPlusOrMinusMinus &&
        //    isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.operand);
        //if (externalExportChanged) {
        //    // this.visit
        //    // ++x
        //    // as
        //    // exports('x', ++x)
        //    write(`${exportFunctionForFile}("`);
        //    this.visitNodeWithoutSourceMap(node.operand);
        //    write(`", `);
        //}
        //const internalExportChanged = isPlusPlusOrMinusMinus &&
        //    isNameOfExportedDeclarationInNonES6Module(node.operand);
        //if (internalExportChanged) {
        //    this.visitAliasEqual(<Identifier>node.operand);
        //}
        //write(tokenToString(node.operator));
        //// In some cases, we need to this.visit a space between the operator and the operand. One obvious case
        //// is when the operator is an identifier, like delete or typeof. We also need to do this for plus
        //// and minus expressions in certain cases. Specifically, consider the following two cases (parens
        //// are just for clarity of exposition, and not part of the source code):
        ////
        ////  (+(+1))
        ////  (+(++1))
        ////
        //// We need to this.visit a space in both cases. In the first case, the absence of a space will make
        //// the resulting expression a prefix increment operation. And in the second, it will make the resulting
        //// expression a prefix increment whose operand is a plus expression - (++(+x))
        //// The same is true of minus of course.
        //if (node.operand.kind === SyntaxKind.PrefixUnaryExpression) {
        //    const operand = <PrefixUnaryExpression>node.operand;
        //    if (node.operator === SyntaxKind.PlusToken && (operand.operator === SyntaxKind.PlusToken || operand.operator === SyntaxKind.PlusPlusToken)) {
        //        write(" ");
        //    }
        //    else if (node.operator === SyntaxKind.MinusToken && (operand.operator === SyntaxKind.MinusToken || operand.operator === SyntaxKind.MinusMinusToken)) {
        //        write(" ");
        //    }
        //}
        //this.visit(node.operand);
        //if (externalExportChanged) {
        //    write(")");
        //}
    };
    NodeVisitor.prototype.visitPostfixUnaryExpression = function (node) {
        //const externalExportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.operand);
        //const internalExportChanged = isNameOfExportedDeclarationInNonES6Module(node.operand);
        //if (externalExportChanged) {
        //    // export protected returns the value that was passes as the second argument
        //    // however for postfix unary expressions result value should be the value before modification.
        //    // this.visit 'x++' as '(export('x', ++x) - 1)' and 'x--' as '(export('x', --x) + 1)'
        //    write(`(${exportFunctionForFile}("`);
        //    this.visitNodeWithoutSourceMap(node.operand);
        //    write(`", `);
        //    write(tokenToString(node.operator));
        //    this.visit(node.operand);
        //    if (node.operator === SyntaxKind.PlusPlusToken) {
        //        write(") - 1)");
        //    }
        //    else {
        //        write(") + 1)");
        //    }
        //}
        //else if (internalExportChanged) {
        //    this.visitAliasEqual(<Identifier>node.operand);
        //    this.visit(node.operand);
        //    if (node.operator === SyntaxKind.PlusPlusToken) {
        //        write(" += 1");
        //    }
        //    else {
        //        write(" -= 1");
        //    }
        //}
        //else {
        //    this.visit(node.operand);
        //    write(tokenToString(node.operator));
        //}
    };
    NodeVisitor.prototype.shouldHoistDeclarationInSystemJsModule = function (node) {
        return this.isSourceFileLevelDeclarationInSystemJsModule(node, /*isExported*/ false);
    };
    /*
     * Checks if given node is a source file level declaration (not nested in module/function).
     * If 'isExported' is true - then declaration must also be exported.
     * This protected is used in two cases:
     * - check if node is a exported source file level value to determine
     *   if we should also export the value after its it changed
     * - check if node is a source level declaration to this.visit it differently,
     *   i.e non-exported variable statement 'var x = 1' is hoisted so
     *   we we this.visit variable statement 'var' should be dropped.
     */
    NodeVisitor.prototype.isSourceFileLevelDeclarationInSystemJsModule = function (node, isExported) {
        //if (!node || !isCurrentFileSystemExternalModule()) {
        return false;
        //}
        //let current = getRootDeclaration(node).parent;
        //while (current) {
        //    if (current.kind === SyntaxKind.SourceFile) {
        //        return !isExported || ((getCombinedNodeFlags(node) & NodeFlags.Export) !== 0);
        //    }
        //    else if (isDeclaration(current)) {
        //        return false;
        //    }
        //    else {
        //        current = current.parent;
        //    }
        //}
    };
    /**
     * this.visit ES7 exponentiation operator downlevel using Math.pow
     * @param node a binary expression node containing exponentiationOperator (**, **=)
     */
    NodeVisitor.prototype.visitExponentiationOperator = function (node) {
        //const leftHandSideExpression = node.left;
        //if (node.operatorToken.kind === SyntaxKind.AsteriskAsteriskEqualsToken) {
        //    let synthesizedLHS: ts.ElementAccessExpression | PropertyAccessExpression;
        //    let shouldthis.visitParentheses = false;
        //    if (isElementAccessExpression(leftHandSideExpression)) {
        //        shouldthis.visitParentheses = true;
        //        write("(");
        //        synthesizedLHS = <ElementAccessExpression>createSynthesizedNode(SyntaxKind.ElementAccessExpression, /*startsOnNewLine*/ false);
        //        const identifier = this.visitTempVariableAssignment(leftHandSideExpression.expression, /*canDefineTempVariablesInPlace*/ false, /*shouldthis.visitCommaBeforeAssignment*/ false);
        //        synthesizedLHS.expression = identifier;
        //        if (leftHandSideExpression.argumentExpression.kind !== SyntaxKind.NumericLiteral &&
        //            leftHandSideExpression.argumentExpression.kind !== SyntaxKind.StringLiteral) {
        //            const tempArgumentExpression = createAndRecordTempVariable(TempFlags._i);
        //            (<ElementAccessExpression>synthesizedLHS).argumentExpression = tempArgumentExpression;
        //            this.visitAssignment(tempArgumentExpression, leftHandSideExpression.argumentExpression, /*shouldthis.visitCommaBeforeAssignment*/ true, leftHandSideExpression.expression);
        //        }
        //        else {
        //            (<ElementAccessExpression>synthesizedLHS).argumentExpression = leftHandSideExpression.argumentExpression;
        //        }
        //        write(", ");
        //    }
        //    else if (isPropertyAccessExpression(leftHandSideExpression)) {
        //        shouldthis.visitParentheses = true;
        //        write("(");
        //        synthesizedLHS = <PropertyAccessExpression>createSynthesizedNode(SyntaxKind.PropertyAccessExpression, /*startsOnNewLine*/ false);
        //        const identifier = this.visitTempVariableAssignment(leftHandSideExpression.expression, /*canDefineTempVariablesInPlace*/ false, /*shouldthis.visitCommaBeforeAssignment*/ false);
        //        synthesizedLHS.expression = identifier;
        //        (<PropertyAccessExpression>synthesizedLHS).dotToken = leftHandSideExpression.dotToken;
        //        (<PropertyAccessExpression>synthesizedLHS).name = leftHandSideExpression.name;
        //        write(", ");
        //    }
        //    this.visit(synthesizedLHS || leftHandSideExpression);
        //    write(" = ");
        //    write("Math.pow(");
        //    this.visit(synthesizedLHS || leftHandSideExpression);
        //    write(", ");
        //    this.visit(node.right);
        //    write(")");
        //    if (shouldthis.visitParentheses) {
        //        write(")");
        //    }
        //}
        //else {
        //    write("Math.pow(");
        //    this.visit(leftHandSideExpression);
        //    write(", ");
        //    this.visit(node.right);
        //    write(")");
        //}
    };
    NodeVisitor.prototype.visitAliasEqual = function (name) {
        //for (const specifier of exportSpecifiers[name.text]) {
        //    this.visitStart(specifier.name);
        //    this.visitContainingModuleName(specifier);
        //    if (languageVersion === ScriptTarget.ES3 && name.text === "default") {
        //        write('["default"]');
        //    }
        //    else {
        //        write(".");
        //        this.visitNodeWithCommentsAndWithoutSourcemap(specifier.name);
        //    }
        //    this.visitEnd(specifier.name);
        //    write(" = ");
        //}
        return true;
    };
    NodeVisitor.prototype.visitBinaryExpression = function (node) {
        //if (languageVersion < ScriptTarget.ES6 && node.operatorToken.kind === SyntaxKind.EqualsToken &&
        //    (node.left.kind === SyntaxKind.ObjectLiteralExpression || node.left.kind === SyntaxKind.ArrayLiteralExpression)) {
        //    this.visitDestructuring(node, node.parent.kind === SyntaxKind.ExpressionStatement);
        //}
        //else {
        //    const isAssignment = isAssignmentOperator(node.operatorToken.kind);
        //    const externalExportChanged = isAssignment &&
        //        isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.left);
        //    if (externalExportChanged) {
        //        // this.visit assignment 'x <op> y' as 'exports("x", x <op> y)'
        //        write(`${exportFunctionForFile}("`);
        //        this.visitNodeWithoutSourceMap(node.left);
        //        write(`", `);
        //    }
        //    const internalExportChanged = isAssignment &&
        //        isNameOfExportedDeclarationInNonES6Module(node.left);
        //    if (internalExportChanged) {
        //        // export { foo }
        //        // this.visit foo = 2 as exports.foo = foo = 2
        //        this.visitAliasEqual(<Identifier>node.left);
        //    }
        //    if (node.operatorToken.kind === SyntaxKind.AsteriskAsteriskToken || node.operatorToken.kind === SyntaxKind.AsteriskAsteriskEqualsToken) {
        //        // Downleveled this.visit exponentiation operator using Math.pow
        //        this.visitExponentiationOperator(node);
        //    }
        //    else {
        //        this.visit(node.left);
        //        // Add indentation before this.visit the operator if the operator is on different line
        //        // For example:
        //        //      3
        //        //      + 2;
        //        //   this.visitted as
        //        //      3
        //        //          + 2;
        //        const indentedBeforeOperator = indentIfOnDifferentLines(node, node.left, node.operatorToken, node.operatorToken.kind !== SyntaxKind.CommaToken ? " " : ts.undefined);
        //        write(tokenToString(node.operatorToken.kind));
        //        const indentedAfterOperator = indentIfOnDifferentLines(node, node.operatorToken, node.right, " ");
        //        this.visit(node.right);
        //        decreaseIndentIf(indentedBeforeOperator, indentedAfterOperator);
        //    }
        //    if (externalExportChanged) {
        //        write(")");
        //    }
        //}
    };
    NodeVisitor.prototype.synthesizedNodeStartsOnNewLine = function (node) {
        //return nodeIsSynthesized(node) && (<SynthesizedNode>node).startsOnNewLine;
    };
    NodeVisitor.prototype.visitConditionalExpression = function (node) {
        //this.visit(node.condition);
        //const indentedBeforeQuestion = indentIfOnDifferentLines(node, node.condition, node.questionToken, " ");
        //write("?");
        //const indentedAfterQuestion = indentIfOnDifferentLines(node, node.questionToken, node.whenTrue, " ");
        //this.visit(node.whenTrue);
        //decreaseIndentIf(indentedBeforeQuestion, indentedAfterQuestion);
        //const indentedBeforeColon = indentIfOnDifferentLines(node, node.whenTrue, node.colonToken, " ");
        //write(":");
        //const indentedAfterColon = indentIfOnDifferentLines(node, node.colonToken, node.whenFalse, " ");
        //this.visit(node.whenFalse);
        //decreaseIndentIf(indentedBeforeColon, indentedAfterColon);
    };
    // Helper protected to decrease the indent if we previously indented.  Allows multiple
    // previous indent values to be considered at a time.  This also allows caller to just
    // call this once, passing in all their appropriate indent values, instead of needing
    // to call this helper protected multiple times.
    NodeVisitor.prototype.decreaseIndentIf = function (value1, value2) {
        //if (value1) {
        //    decreaseIndent();
        //}
        //if (value2) {
        //    decreaseIndent();
        //}
    };
    NodeVisitor.prototype.isSingleLineEmptyBlock = function (node) {
        //if (node && node.kind === SyntaxKind.Block) {
        //    const block = <Block>node;
        //    return block.statements.length === 0 && nodeEndIsOnSameLineAsNodeStart(block, block);
        //}
    };
    NodeVisitor.prototype.visitBlock = function (node) {
        //if (isSingleLineEmptyBlock(node)) {
        //    this.visitToken(SyntaxKind.OpenBraceToken, node.pos);
        //    write(" ");
        //    this.visitToken(SyntaxKind.CloseBraceToken, node.statements.end);
        //    return;
        //}
        //this.visitToken(SyntaxKind.OpenBraceToken, node.pos);
        //increaseIndent();
        //if (node.kind === SyntaxKind.ModuleBlock) {
        //    Debug.assert(node.parent.kind === SyntaxKind.ModuleDeclaration);
        //    this.visitCaptureThisForNodeIfNecessary(node.parent);
        //}
        //this.visitLines(node.statements);
        //if (node.kind === SyntaxKind.ModuleBlock) {
        //    this.visitTempDeclarations(/*newLine*/ true);
        //}
        //decreaseIndent();
        //writeLine();
        //this.visitToken(SyntaxKind.CloseBraceToken, node.statements.end);
    };
    NodeVisitor.prototype.visitVariableStatement = function (node) {
        //let startIsEmitted = false;
        //if (node.flags & NodeFlags.Export) {
        //    if (isES6ExportedDeclaration(node)) {
        //        // Exported ES6 module member
        //        write("export ");
        //        startIsEmitted = tryEmitStartOfVariableDeclarationList(node.declarationList);
        //    }
        //}
        //else {
        //    startIsEmitted = tryEmitStartOfVariableDeclarationList(node.declarationList);
        //}
        //if (startIsEmitted) {
        //    emitCommaList(node.declarationList.declarations);
        //    write(";");
        //}
        //else {
        //    const atLeastOneItem = emitVariableDeclarationListSkippingUninitializedEntries(node.declarationList);
        //    if (atLeastOneItem) {
        //        write(";");
        //    }
        //}
        //if (modulekind !== ModuleKind.ES6 && node.parent === currentSourceFile) {
        //    forEach(node.declarationList.declarations, emitExportVariableAssignments);
        //}
    };
    NodeVisitor.prototype.visitEmbeddedStatement = function (node) {
        //if (node.kind === SyntaxKind.Block) {
        //    write(" ");
        //    this.visit(<Block>node);
        //}
        //else {
        //    increaseIndent();
        //    writeLine();
        //    this.visit(node);
        //    decreaseIndent();
        //}
    };
    NodeVisitor.prototype.visitIfStatement = function (node) {
        //let endPos = this.visitToken(SyntaxKind.IfKeyword, node.pos);
        //write(" ");
        //endPos = this.visitToken(SyntaxKind.OpenParenToken, endPos);
        //this.visit(node.expression);
        //this.visitToken(SyntaxKind.CloseParenToken, node.expression.end);
        //this.visitEmbeddedStatement(node.thenStatement);
        //if (node.elseStatement) {
        //    writeLine();
        //    this.visitToken(SyntaxKind.ElseKeyword, node.thenStatement.end);
        //    if (node.elseStatement.kind === SyntaxKind.IfStatement) {
        //        write(" ");
        //        this.visit(node.elseStatement);
        //    }
        //    else {
        //        this.visitEmbeddedStatement(node.elseStatement);
        //    }
        //}
    };
    NodeVisitor.prototype.visitDoStatement = function (node) {
        //this.visitLoop(node, this.visitDoStatementWorker);
    };
    NodeVisitor.prototype.visitDoStatementWorker = function (node, loop) {
        //write("do");
        //if (loop) {
        //    this.visitConvertedLoopCall(loop, /*this.visitAsBlock*/ true);
        //}
        //else {
        //    this.visitNormalLoopBody(node, /*this.visitAsEmbeddedStatement*/ true);
        //}
        //if (node.statement.kind === SyntaxKind.Block) {
        //    write(" ");
        //}
        //else {
        //    writeLine();
        //}
        //write("while (");
        //this.visit(node.expression);
        //write(");");
    };
    NodeVisitor.prototype.visitWhileStatement = function (node) {
        //this.visitLoop(node, this.visitWhileStatementWorker);
    };
    NodeVisitor.prototype.visitWhileStatementWorker = function (node, loop) {
        //write("while (");
        //this.visit(node.expression);
        //write(")");
        //if (loop) {
        //    this.visitConvertedLoopCall(loop, /*this.visitAsBlock*/ true);
        //}
        //else {
        //    this.visitNormalLoopBody(node, /*this.visitAsEmbeddedStatement*/ true);
        //}
    };
    /**
     * Returns true if start of variable declaration list was this.visitted.
     * Returns false if nothing was written - this can happen for source file level variable declarations
     *     in system modules where such variable declarations are hoisted.
     */
    NodeVisitor.prototype.tryVisitStartOfVariableDeclarationList = function (decl) {
        //if (shouldHoistVariable(decl, /*checkIfSourceFileLevelDecl*/ true)) {
        //    // variables in variable declaration list were already hoisted
        //    return false;
        //}
        //if (convertedLoopState && (getCombinedNodeFlags(decl) & NodeFlags.BlockScoped) === 0) {
        //    // we are inside a converted loop - this can only happen in downlevel scenarios
        //    // record names for all variable declarations
        //    for (const varDecl of decl.declarations) {
        //        hoistVariableDeclarationFromLoop(convertedLoopState, varDecl);
        //    }
        //    return false;
        //}
        //this.visitStart(decl);
        //if (decl && languageVersion >= ScriptTarget.ES6) {
        //    if (isLet(decl)) {
        //        write("let ");
        //    }
        //    else if (isConst(decl)) {
        //        write("const ");
        //    }
        //    else {
        //        write("var ");
        //    }
        //}
        //else {
        //    write("var ");
        //}
        //// Note here we specifically dont this.visit end so that if we are going to this.visit binding pattern
        //// we can alter the source map correctly
        return true;
    };
    NodeVisitor.prototype.visitVariableDeclarationListSkippingUninitializedEntries = function (list) {
        var started = false;
        //for (const decl of list.declarations) {
        //    if (!decl.initializer) {
        //        continue;
        //    }
        //    if (!started) {
        //        started = true;
        //    }
        //    else {
        //        write(", ");
        //    }
        //    this.visit(decl);
        //}
        return started;
    };
    /**
     * Return the statement at a given index if it is a super-call statement
     * @param ctor a constructor declaration
     * @param index an index to constructor's body to check
     */
    NodeVisitor.prototype.getSuperCallAtGivenIndex = function (ctor, index) {
        // if (!ctor.body) {
        //     return undefined;
        // }
        // const statements = ctor.body.statements;
        // if (!statements || index >= statements.length) {
        //     return undefined;
        // }
        // const statement = statements[index];
        // if (statement.kind === SyntaxKind.ExpressionStatement) {
        //     return isSuperCallExpression((<ExpressionStatement>statement).expression) ? <ExpressionStatement>statement : undefined;
        // }
        return;
    };
    NodeVisitor.prototype.visitParameterPropertyAssignments = function (node) {
        // forEach(node.parameters, param => {
        //     if (param.flags & NodeFlags.ParameterPropertyModifier) {
        //         writeLine();
        //         emitStart(param);
        //         emitStart(param.name);
        //         write("this.");
        //         emitNodeWithoutSourceMap(param.name);
        //         emitEnd(param.name);
        //         write(" = ");
        //         emit(param.name);
        //         write(";");
        //         emitEnd(param);
        //     }
        // });
    };
    NodeVisitor.prototype.visitMemberAccessForPropertyName = function (memberName) {
        // // This does not emit source map because it is emitted by caller as caller
        // // is aware how the property name changes to the property access
        // // eg. public x = 10; becomes this.x and static x = 10 becomes className.x
        // if (memberName.kind === SyntaxKind.StringLiteral || memberName.kind === SyntaxKind.NumericLiteral) {
        //     write("[");
        //     emitNodeWithCommentsAndWithoutSourcemap(memberName);
        //     write("]");
        // }
        // else if (memberName.kind === SyntaxKind.ComputedPropertyName) {
        //     emitComputedPropertyName(<ComputedPropertyName>memberName);
        // }
        // else {
        //     write(".");
        //     emitNodeWithCommentsAndWithoutSourcemap(memberName);
        // }
    };
    NodeVisitor.prototype.getInitializedProperties = function (node, isStatic) {
        // const properties: PropertyDeclaration[] = [];
        // for (const member of node.members) {
        //     if (member.kind === SyntaxKind.PropertyDeclaration && isStatic === ((member.flags & NodeFlags.Static) !== 0) && (<PropertyDeclaration>member).initializer) {
        //         properties.push(<PropertyDeclaration>member);
        //     }
        // }
        // return properties;
    };
    NodeVisitor.prototype.visitConvertedLoopCall = function (loop, emitAsBlock) {
        // if (emitAsBlock) {
        //     write(" {");
        //     writeLine();
        //     increaseIndent();
        // }
        // // loop is considered simple if it does not have any return statements or break\continue that transfer control outside of the loop
        // // simple loops are emitted as just 'loop()';
        // // NOTE: if loop uses only 'continue' it still will be emitted as simple loop
        // const isSimpleLoop =
        //     !(loop.state.nonLocalJumps & ~Jump.Continue) &&
        //     !loop.state.labeledNonLocalBreaks &&
        //     !loop.state.labeledNonLocalContinues;
        // const loopResult = makeUniqueName("state");
        // if (!isSimpleLoop) {
        //     write(`var ${loopResult} = `);
        // }
        // write(`${loop.functionName}(${loop.paramList});`);
        // writeLine();
        // copyLoopOutParameters(loop.state, CopyDirection.ToOriginal, /*emitAsStatements*/ true);
        // if (!isSimpleLoop) {
        //     // for non simple loops we need to store result returned from converted loop function and use it to do dispatching
        //     // converted loop function can return:
        //     // - object - used when body of the converted loop contains return statement. Property "value" of this object stores retuned value
        //     // - string - used to dispatch jumps. "break" and "continue" are used to non-labeled jumps, other values are used to transfer control to
        //     //   different labels
        //     writeLine();
        //     if (loop.state.nonLocalJumps & Jump.Return) {
        //         write(`if (typeof ${loopResult} === "object") `);
        //         if (convertedLoopState) {
        //             // we are currently nested in another converted loop - return unwrapped result
        //             write(`return ${loopResult};`);
        //             // propagate 'hasReturn' flag to outer loop
        //             convertedLoopState.nonLocalJumps |= Jump.Return;
        //         }
        //         else {
        //             // top level converted loop - return unwrapped value
        //             write(`return ${loopResult}.value;`);
        //         }
        //         writeLine();
        //     }
        //     if (loop.state.nonLocalJumps & Jump.Break) {
        //         write(`if (${loopResult} === "break") break;`);
        //         writeLine();
        //     }
        //     // in case of labeled breaks emit code that either breaks to some known label inside outer loop or delegates jump decision to outer loop
        //     emitDispatchTableForLabeledJumps(loopResult, loop.state, convertedLoopState);
        //     // in case of 'continue' we'll just fallthough here
        // }
        // if (emitAsBlock) {
        //     writeLine();
        //     decreaseIndent();
        //     write("}");
        // }
        // protected visitDispatchTableForLabeledJumps(loopResultVariable: string, currentLoop: ConvertedLoopState, outerLoop: ConvertedLoopState) {
        //     if (!currentLoop.labeledNonLocalBreaks && !currentLoop.labeledNonLocalContinues) {
        //         return;
        //     }
        //     write(`switch(${loopResultVariable}) {`);
        //     increaseIndent();
        //     emitDispatchEntriesForLabeledJumps(currentLoop.labeledNonLocalBreaks, /*isBreak*/ true, loopResultVariable, outerLoop);
        //     emitDispatchEntriesForLabeledJumps(currentLoop.labeledNonLocalContinues, /*isBreak*/ false, loopResultVariable, outerLoop);
        //     decreaseIndent();
        //     writeLine();
        //     write("}");
        // }
        // protected visitDispatchEntriesForLabeledJumps(table: Map<string>, isBreak: boolean, loopResultVariable: string, outerLoop: ConvertedLoopState): void {
        //     if (!table) {
        //         return;
        //     }
        //     for (const labelText in table) {
        //         const labelMarker = table[labelText];
        //         writeLine();
        //         write(`case "${labelMarker}": `);
        //         // if there are no outer converted loop or outer label in question is located inside outer converted loop
        //         // then emit labeled break\continue
        //         // otherwise propagate pair 'label -> marker' to outer converted loop and emit 'return labelMarker' so outer loop can later decide what to do
        //         if (!outerLoop || (outerLoop.labels && outerLoop.labels[labelText])) {
        //             if (isBreak) {
        //                 // write("break ");
        //             }
        //             else {
        //                 // write("continue ");
        //             }
        //             write(`${labelText};`);
        //         }
        //         else {
        //             setLabeledJump(outerLoop, isBreak, labelText, labelMarker);
        //             write(`return ${loopResultVariable};`);
        //         }
        //     }
        // }
    };
    NodeVisitor.prototype.visitForStatement = function (node) {
        // emitLoop(node, emitForStatementWorker);
    };
    NodeVisitor.prototype.visitForStatementWorker = function (node, loop) {
        // let endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
        // write(" ");
        // endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
        // if (node.initializer && node.initializer.kind === SyntaxKind.VariableDeclarationList) {
        //     const variableDeclarationList = <VariableDeclarationList>node.initializer;
        //     const startIsEmitted = tryEmitStartOfVariableDeclarationList(variableDeclarationList);
        //     if (startIsEmitted) {
        //         emitCommaList(variableDeclarationList.declarations);
        //     }
        //     else {
        //         emitVariableDeclarationListSkippingUninitializedEntries(variableDeclarationList);
        //     }
        // }
        // else if (node.initializer) {
        //     emit(node.initializer);
        // }
        // write(";");
        // emitOptional(" ", node.condition);
        // write(";");
        // emitOptional(" ", node.incrementor);
        // write(")");
        // if (loop) {
        //     emitConvertedLoopCall(loop, /*emitAsBlock*/ true);
        // }
        // else {
        //     emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ true);
        // }
    };
    NodeVisitor.prototype.visitForInOrForOfStatement = function (node) {
        // if (languageVersion < ScriptTarget.ES6 && node.kind === SyntaxKind.ForOfStatement) {
        //     emitLoop(node, emitDownLevelForOfStatementWorker);
        // }
        // else {
        //     emitLoop(node, emitForInOrForOfStatementWorker);
        // }
    };
    NodeVisitor.prototype.visitForInOrForOfStatementWorker = function (node, loop) {
        // let endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
        // write(" ");
        // endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
        // if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
        //     const variableDeclarationList = <VariableDeclarationList>node.initializer;
        //     if (variableDeclarationList.declarations.length >= 1) {
        //         tryEmitStartOfVariableDeclarationList(variableDeclarationList);
        //         emit(variableDeclarationList.declarations[0]);
        //     }
        // }
        // else {
        //     emit(node.initializer);
        // }
        // if (node.kind === SyntaxKind.ForInStatement) {
        //     write(" in ");
        // }
        // else {
        //     write(" of ");
        // }
        // emit(node.expression);
        // emitToken(SyntaxKind.CloseParenToken, node.expression.end);
        // if (loop) {
        //     emitConvertedLoopCall(loop, /*emitAsBlock*/ true);
        // }
        // else {
        //     emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ true);
        // }
    };
    NodeVisitor.prototype.visitDownLevelForOfStatementWorker = function (node, loop) {
        // // The following ES6 code:
        // //
        // //    for (let v of expr) { }
        // //
        // // should be emitted as
        // //
        // //    for (let _i = 0, _a = expr; _i < _a.length; _i++) {
        // //        let v = _a[_i];
        // //    }
        // //
        // // where _a and _i are temps emitted to capture the RHS and the counter,
        // // respectively.
        // // When the left hand side is an expression instead of a let declaration,
        // // the "let v" is not emitted.
        // // When the left hand side is a let/const, the v is renamed if there is
        // // another v in scope.
        // // Note that all assignments to the LHS are emitted in the body, including
        // // all destructuring.
        // // Note also that because an extra statement is needed to assign to the LHS,
        // // for-of bodies are always emitted as blocks.
        // let endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
        // write(" ");
        // endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
        // // Do not emit the LHS let declaration yet, because it might contain destructuring.
        // // Do not call recordTempDeclaration because we are declaring the temps
        // // right here. Recording means they will be declared later.
        // // In the case where the user wrote an identifier as the RHS, like this:
        // //
        // //     for (let v of arr) { }
        // //
        // // we can't reuse 'arr' because it might be modified within the body of the loop.
        // const counter = createTempVariable(TempFlags._i);
        // const rhsReference = createSynthesizedNode(SyntaxKind.Identifier) as Identifier;
        // rhsReference.text = node.expression.kind === SyntaxKind.Identifier ?
        //     makeUniqueName((<Identifier>node.expression).text) :
        //     makeTempVariableName(TempFlags.Auto);
        // // This is the let keyword for the counter and rhsReference. The let keyword for
        // // the LHS will be emitted inside the body.
        // emitStart(node.expression);
        // write("var ");
        // // _i = 0
        // emitNodeWithoutSourceMap(counter);
        // write(" = 0");
        // emitEnd(node.expression);
        // // , _a = expr
        // write(", ");
        // emitStart(node.expression);
        // emitNodeWithoutSourceMap(rhsReference);
        // write(" = ");
        // emitNodeWithoutSourceMap(node.expression);
        // emitEnd(node.expression);
        // write("; ");
        // // _i < _a.length;
        // emitStart(node.expression);
        // emitNodeWithoutSourceMap(counter);
        // write(" < ");
        // emitNodeWithCommentsAndWithoutSourcemap(rhsReference);
        // write(".length");
        // emitEnd(node.expression);
        // write("; ");
        // // _i++)
        // emitStart(node.expression);
        // emitNodeWithoutSourceMap(counter);
        // write("++");
        // emitEnd(node.expression);
        // emitToken(SyntaxKind.CloseParenToken, node.expression.end);
        // // Body
        // write(" {");
        // writeLine();
        // increaseIndent();
        // // Initialize LHS
        // // let v = _a[_i];
        // const rhsIterationValue = createElementAccessExpression(rhsReference, counter);
        // emitStart(node.initializer);
        // if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
        //     write("var ");
        //     const variableDeclarationList = <VariableDeclarationList>node.initializer;
        //     if (variableDeclarationList.declarations.length > 0) {
        //         const declaration = variableDeclarationList.declarations[0];
        //         if (isBindingPattern(declaration.name)) {
        //             // This works whether the declaration is a var, let, or const.
        //             // It will use rhsIterationValue _a[_i] as the initializer.
        //             emitDestructuring(declaration, /*isAssignmentExpressionStatement*/ false, rhsIterationValue);
        //         }
        //         else {
        //             // The following call does not include the initializer, so we have
        //             // to emit it separately.
        //             emitNodeWithCommentsAndWithoutSourcemap(declaration);
        //             write(" = ");
        //             emitNodeWithoutSourceMap(rhsIterationValue);
        //         }
        //     }
        //     else {
        //         // It's an empty declaration list. This can only happen in an error case, if the user wrote
        //         //     for (let of []) {}
        //         emitNodeWithoutSourceMap(createTempVariable(TempFlags.Auto));
        //         write(" = ");
        //         emitNodeWithoutSourceMap(rhsIterationValue);
        //     }
        // }
        // else {
        //     // Initializer is an expression. Emit the expression in the body, so that it's
        //     // evaluated on every iteration.
        //     const assignmentExpression = createBinaryExpression(<Expression>node.initializer, SyntaxKind.EqualsToken, rhsIterationValue, /*startsOnNewLine*/ false);
        //     if (node.initializer.kind === SyntaxKind.ArrayLiteralExpression || node.initializer.kind === SyntaxKind.ObjectLiteralExpression) {
        //         // This is a destructuring pattern, so call emitDestructuring instead of emit. Calling emit will not work, because it will cause
        //         // the BinaryExpression to be passed in instead of the expression statement, which will cause emitDestructuring to crash.
        //         emitDestructuring(assignmentExpression, /*isAssignmentExpressionStatement*/ true, /*value*/ undefined);
        //     }
        //     else {
        //         emitNodeWithCommentsAndWithoutSourcemap(assignmentExpression);
        //     }
        // }
        // emitEnd(node.initializer);
        // write(";");
        // if (loop) {
        //     writeLine();
        //     emitConvertedLoopCall(loop, /*emitAsBlock*/ false);
        // }
        // else {
        //     emitNormalLoopBody(node, /*emitAsEmbeddedStatement*/ false);
        // }
        // writeLine();
        // decreaseIndent();
        // write("}");
    };
    NodeVisitor.prototype.visitBreakOrContinueStatement = function (node) {
        // if (convertedLoopState) {
        //     // check if we can emit break\continue as is
        //     // it is possible if either
        //     //   - break\continue is statement labeled and label is located inside the converted loop
        //     //   - break\continue is non-labeled and located in non-converted loop\switch statement
        //     const jump = node.kind === SyntaxKind.BreakStatement ? Jump.Break : Jump.Continue;
        //     const canUseBreakOrContinue =
        //         (node.label && convertedLoopState.labels && convertedLoopState.labels[node.label.text]) ||
        //         (!node.label && (convertedLoopState.allowedNonLabeledJumps & jump));
        //     if (!canUseBreakOrContinue) {
        //         write ("return ");
        //         // explicit exit from loop -> copy out parameters
        //         copyLoopOutParameters(convertedLoopState, CopyDirection.ToOutParameter, /*emitAsStatements*/ false);
        //         if (!node.label) {
        //             if (node.kind === SyntaxKind.BreakStatement) {
        //                 // convertedLoopState.nonLocalJumps |= Jump.Break;
        //                 // write(`"break";`);
        //             }
        //             else {
        //                 // convertedLoopState.nonLocalJumps |= Jump.Continue;
        //                 // // note: return value is emitted only to simplify debugging, call to converted loop body does not do any dispatching on it.
        //                 // write(`"continue";`);
        //             }
        //         }
        //         else {
        //             let labelMarker: string;
        //             if (node.kind === SyntaxKind.BreakStatement) {
        //                 // labelMarker = `break-${node.label.text}`;
        //                 // setLabeledJump(convertedLoopState, /*isBreak*/ true, node.label.text, labelMarker);
        //             }
        //             else {
        //                 // labelMarker = `continue-${node.label.text}`;
        //                 // setLabeledJump(convertedLoopState, /*isBreak*/ false, node.label.text, labelMarker);
        //             }
        //             write(`"${labelMarker}";`);
        //         }
        //         return;
        //     }
        // }
        // emitToken(node.kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword, node.pos);
        // emitOptional(" ", node.label);
        // write(";");
    };
    NodeVisitor.prototype.visitReturnStatement = function (node) {
        // if (convertedLoopState) {
        //     convertedLoopState.nonLocalJumps |= Jump.Return;
        //     write("return { value: ");
        //     if (node.expression) {
        //         emit(node.expression);
        //     }
        //     else {
        //         write("void 0");
        //     }
        //     write(" };");
        //     return;
        // }
        // emitToken(SyntaxKind.ReturnKeyword, node.pos);
        // emitOptional(" ", node.expression);
        // write(";");
    };
    NodeVisitor.prototype.visitWithStatement = function (node) {
        // write("with (");
        // emit(node.expression);
        // write(")");
        // emitEmbeddedStatement(node.statement);
    };
    NodeVisitor.prototype.visitSwitchStatement = function (node) {
        // let endPos = emitToken(SyntaxKind.SwitchKeyword, node.pos);
        // write(" ");
        // emitToken(SyntaxKind.OpenParenToken, endPos);
        // emit(node.expression);
        // endPos = emitToken(SyntaxKind.CloseParenToken, node.expression.end);
        // write(" ");
        // let saveAllowedNonLabeledJumps: Jump;
        // if (convertedLoopState) {
        //     saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
        //     // for switch statement allow only non-labeled break
        //     convertedLoopState.allowedNonLabeledJumps |= Jump.Break;
        // }
        // emitCaseBlock(node.caseBlock, endPos);
        // if (convertedLoopState) {
        //     convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
        // }
    };
    NodeVisitor.prototype.visitCaseBlock = function (node, startPos) {
        // emitToken(SyntaxKind.OpenBraceToken, startPos);
        // increaseIndent();
        // emitLines(node.clauses);
        // decreaseIndent();
        // writeLine();
        // emitToken(SyntaxKind.CloseBraceToken, node.clauses.end);
    };
    NodeVisitor.prototype.nodeStartPositionsAreOnSameLine = function (node1, node2) {
        // return getLineOfLocalPositionFromLineMap(currentLineMap, skipTrivia(currentText, node1.pos)) ===
        //     getLineOfLocalPositionFromLineMap(currentLineMap, skipTrivia(currentText, node2.pos));
    };
    NodeVisitor.prototype.nodeEndPositionsAreOnSameLine = function (node1, node2) {
        // return getLineOfLocalPositionFromLineMap(currentLineMap, node1.end) ===
        //     getLineOfLocalPositionFromLineMap(currentLineMap, node2.end);
    };
    NodeVisitor.prototype.nodeEndIsOnSameLineAsNodeStart = function (node1, node2) {
        // return getLineOfLocalPositionFromLineMap(currentLineMap, node1.end) ===
        //     getLineOfLocalPositionFromLineMap(currentLineMap, skipTrivia(currentText, node2.pos));
    };
    NodeVisitor.prototype.visitCaseOrDefaultClause = function (node) {
        // if (node.kind === SyntaxKind.CaseClause) {
        //     write("case ");
        //     emit((<CaseClause>node).expression);
        //     write(":");
        // }
        // else {
        //     write("default:");
        // }
        // if (node.statements.length === 1 && nodeStartPositionsAreOnSameLine(node, node.statements[0])) {
        //     write(" ");
        //     emit(node.statements[0]);
        // }
        // else {
        //     increaseIndent();
        //     emitLines(node.statements);
        //     decreaseIndent();
        // }
    };
    NodeVisitor.prototype.visitThrowStatement = function (node) {
        // write("throw ");
        // emit(node.expression);
        // write(";");
    };
    NodeVisitor.prototype.visitTryStatement = function (node) {
        // write("try ");
        // emit(node.tryBlock);
        // emit(node.catchClause);
        // if (node.finallyBlock) {
        //     writeLine();
        //     write("finally ");
        //     emit(node.finallyBlock);
        // }
    };
    NodeVisitor.prototype.visitCatchClause = function (node) {
        // writeLine();
        // const endPos = emitToken(SyntaxKind.CatchKeyword, node.pos);
        // write(" ");
        // emitToken(SyntaxKind.OpenParenToken, endPos);
        // emit(node.variableDeclaration);
        // emitToken(SyntaxKind.CloseParenToken, node.variableDeclaration ? node.variableDeclaration.end : endPos);
        // write(" ");
        // emitBlock(node.block);
    };
    NodeVisitor.prototype.visitDebuggerStatement = function (node) {
        // emitToken(SyntaxKind.DebuggerKeyword, node.pos);
        // write(";");
    };
    NodeVisitor.prototype.visitLabelAndColon = function (node) {
        // emit(node.label);
        // write(": ");
    };
    NodeVisitor.prototype.visitLabeledStatement = function (node) {
        // if (!isIterationStatement(node.statement, /* lookInLabeledStatements */ false) || !shouldConvertLoopBody(<IterationStatement>node.statement)) {
        //     emitLabelAndColon(node);
        // }
        // if (convertedLoopState) {
        //     if (!convertedLoopState.labels) {
        //         convertedLoopState.labels = {};
        //     }
        //     convertedLoopState.labels[node.label.text] = node.label.text;
        // }
        // emit(node.statement);
        // if (convertedLoopState) {
        //     convertedLoopState.labels[node.label.text] = undefined;
        // }
    };
    NodeVisitor.prototype.getContainingModule = function (node) {
        // do {
        //     node = node.parent;
        // } while (node && node.kind !== SyntaxKind.ModuleDeclaration);
        return node;
    };
    NodeVisitor.prototype.visitContainingModuleName = function (node) {
        // const container = getContainingModule(node);
        // write(container ? getGeneratedNameForNode(container) : "exports");
    };
    NodeVisitor.prototype.visitModuleMemberName = function (node) {
        // emitStart(node.name);
        // if (getCombinedNodeFlags(node) & NodeFlags.Export) {
        //     const container = getContainingModule(node);
        //     if (container) {
        //         write(getGeneratedNameForNode(container));
        //         write(".");
        //     }
        //     else if (modulekind !== ModuleKind.ES6 && modulekind !== ModuleKind.System) {
        //         write("exports.");
        //     }
        // }
        // emitNodeWithCommentsAndWithoutSourcemap(node.name);
        // emitEnd(node.name);
    };
    NodeVisitor.prototype.createVoidZero = function () {
        //const zero = <LiteralExpression>this.createSynthesizedNode(SyntaxKind.NumericLiteral);
        //zero.text = "0";
        //const result = <VoidExpression>createSynthesizedNode(SyntaxKind.VoidExpression);
        //result.expression = zero;
        //return result;
        return;
    };
    NodeVisitor.prototype.visitEs6ExportDefaultCompat = function (node) {
        // if (node.parent.kind === SyntaxKind.SourceFile) {
        //     Debug.assert(!!(node.flags & NodeFlags.Default) || node.kind === SyntaxKind.ExportAssignment);
        //     // only allow export default at a source file level
        //     if (modulekind === ModuleKind.CommonJS || modulekind === ModuleKind.AMD || modulekind === ModuleKind.UMD) {
        //         if (!isEs6Module) {
        //             if (languageVersion !== ScriptTarget.ES3) {
        //                 // // default value of configurable, enumerable, writable are `false`.
        //                 // write('Object.defineProperty(exports, "__esModule", { value: true });');
        //                 // writeLine();
        //             }
        //             else {
        //                 // write("exports.__esModule = true;");
        //                 // writeLine();
        //             }
        //         }
        //     }
        // }
    };
    NodeVisitor.prototype.visitExportMemberAssignment = function (node) {
        // if (node.flags & NodeFlags.Export) {
        //     writeLine();
        //     emitStart(node);
        //     // emit call to exporter only for top level nodes
        //     if (modulekind === ModuleKind.System && node.parent === currentSourceFile) {
        //         // emit export default <smth> as
        //         // export("default", <smth>)
        //         write(`${exportFunctionForFile}("`);
        //         if (node.flags & NodeFlags.Default) {
        //             write("default");
        //         }
        //         else {
        //             emitNodeWithCommentsAndWithoutSourcemap(node.name);
        //         }
        //         write(`", `);
        //         emitDeclarationName(node);
        //         write(")");
        //     }
        //     else {
        //         if (node.flags & NodeFlags.Default) {
        //             emitEs6ExportDefaultCompat(node);
        //             if (languageVersion === ScriptTarget.ES3) {
        //                 // write('exports["default"]');
        //             }
        //             else {
        //                 // write("exports.default");
        //             }
        //         }
        //         else {
        //             emitModuleMemberName(node);
        //         }
        //         write(" = ");
        //         emitDeclarationName(node);
        //     }
        //     emitEnd(node);
        //     write(";");
        // }
    };
    NodeVisitor.prototype.visitExportMemberAssignments = function (name) {
        // if (modulekind === ModuleKind.System) {
        //     return;
        // }
        // if (!exportEquals && exportSpecifiers && hasProperty(exportSpecifiers, name.text)) {
        //     for (const specifier of exportSpecifiers[name.text]) {
        //         writeLine();
        //         emitStart(specifier.name);
        //         emitContainingModuleName(specifier);
        //         write(".");
        //         emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
        //         emitEnd(specifier.name);
        //         write(" = ");
        //         emitExpressionIdentifier(name);
        //         write(";");
        //     }
        // }
    };
    NodeVisitor.prototype.visitExportSpecifierInSystemModule = function (specifier) {
        // Debug.assert(modulekind === ModuleKind.System);
        // if (!resolver.getReferencedValueDeclaration(specifier.propertyName || specifier.name) && !resolver.isValueAliasDeclaration(specifier) ) {
        //     return;
        // }
        // writeLine();
        // emitStart(specifier.name);
        // write(`${exportFunctionForFile}("`);
        // emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
        // write(`", `);
        // emitExpressionIdentifier(specifier.propertyName || specifier.name);
        // write(")");
        // emitEnd(specifier.name);
        // write(";");
    };
    /**
     * Emit an assignment to a given identifier, 'name', with a given expression, 'value'.
     * @param name an identifier as a left-hand-side operand of the assignment
     * @param value an expression as a right-hand-side operand of the assignment
     * @param shouldEmitCommaBeforeAssignment a boolean indicating whether to prefix an assignment with comma
     */
    NodeVisitor.prototype.visitAssignment = function (name, value, shouldEmitCommaBeforeAssignment, nodeForSourceMap) {
        // if (shouldEmitCommaBeforeAssignment) {
        //     write(", ");
        // }
        // const exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(name);
        // if (exportChanged) {
        //     write(`${exportFunctionForFile}("`);
        //     emitNodeWithCommentsAndWithoutSourcemap(name);
        //     write(`", `);
        // }
        // const isVariableDeclarationOrBindingElement =
        //     name.parent && (name.parent.kind === SyntaxKind.VariableDeclaration || name.parent.kind === SyntaxKind.BindingElement);
        // // If this is first var declaration, we need to start at var/let/const keyword instead
        // // otherwise use nodeForSourceMap as the start position
        // emitStart(isFirstVariableDeclaration(nodeForSourceMap) ? nodeForSourceMap.parent : nodeForSourceMap);
        // withTemporaryNoSourceMap(() => {
        //     if (isVariableDeclarationOrBindingElement) {
        //         emitModuleMemberName(<Declaration>name.parent);
        //     }
        //     else {
        //         emit(name);
        //     }
        //     write(" = ");
        //     emit(value);
        // });
        // emitEnd(nodeForSourceMap, /*stopOverridingSpan*/true);
        // if (exportChanged) {
        //     write(")");
        // }
    };
    /**
     * Create temporary variable, emit an assignment of the variable the given expression
     * @param expression an expression to assign to the newly created temporary variable
     * @param canDefineTempVariablesInPlace a boolean indicating whether you can define the temporary variable at an assignment location
     * @param shouldEmitCommaBeforeAssignment a boolean indicating whether an assignment should prefix with comma
     */
    NodeVisitor.prototype.visitTempVariableAssignment = function (expression, canDefineTempVariablesInPlace, shouldEmitCommaBeforeAssignment, sourceMapNode) {
        // const identifier = createTempVariable(TempFlags.Auto);
        // if (!canDefineTempVariablesInPlace) {
        //     recordTempDeclaration(identifier);
        // }
        // emitAssignment(identifier, expression, shouldEmitCommaBeforeAssignment, sourceMapNode || expression.parent);
        // return identifier;
        return;
    };
    NodeVisitor.prototype.isFirstVariableDeclaration = function (root) {
        // return root.kind === SyntaxKind.VariableDeclaration &&
        //     root.parent.kind === SyntaxKind.VariableDeclarationList &&
        //     (<VariableDeclarationList>root.parent).declarations[0] === root;
    };
    NodeVisitor.prototype.visitDestructuring = function (root, isAssignmentExpressionStatement, value) {
        // let emitCount = 0;
        // // An exported declaration is actually emitted as an assignment (to a property on the module object), so
        // // temporary variables in an exported declaration need to have real declarations elsewhere
        // // Also temporary variables should be explicitly allocated for source level declarations when module target is system
        // // because actual variable declarations are hoisted
        // let canDefineTempVariablesInPlace = false;
        // if (root.kind === SyntaxKind.VariableDeclaration) {
        //     const isExported = getCombinedNodeFlags(root) & NodeFlags.Export;
        //     const isSourceLevelForSystemModuleKind = shouldHoistDeclarationInSystemJsModule(root);
        //     canDefineTempVariablesInPlace = !isExported && !isSourceLevelForSystemModuleKind;
        // }
        // else if (root.kind === SyntaxKind.Parameter) {
        //     canDefineTempVariablesInPlace = true;
        // }
        // if (root.kind === SyntaxKind.BinaryExpression) {
        //     emitAssignmentExpression(<BinaryExpression>root);
        // }
        // else {
        //     Debug.assert(!isAssignmentExpressionStatement);
        //     // If first variable declaration of variable statement correct the start location
        //     if (isFirstVariableDeclaration(root)) {
        //         // Use emit location of "var " as next emit start entry
        //         sourceMap.changeEmitSourcePos();
        //     }
        //     emitBindingElement(<BindingElement>root, value);
        // }
        // /**
        //  * Ensures that there exists a declared identifier whose value holds the given expression.
        //  * This function is useful to ensure that the expression's value can be read from in subsequent expressions.
        //  * Unless 'reuseIdentifierExpressions' is false, 'expr' will be returned if it is just an identifier.
        //  *
        //  * @param expr the expression whose value needs to be bound.
        //  * @param reuseIdentifierExpressions true if identifier expressions can simply be returned;
        //  *                //                 //    false if it is necessary to always emit an identifier.
        //  */
        // function ensureIdentifier(expr: Expression, reuseIdentifierExpressions: boolean, sourceMapNode: ts.Node): Expression {
        //     if (expr.kind === SyntaxKind.Identifier && reuseIdentifierExpressions) {
        //         return expr;
        //     }
        //     const identifier = emitTempVariableAssignment(expr, canDefineTempVariablesInPlace, emitCount > 0, sourceMapNode);
        //     emitCount++;
        //     return identifier;
        // }
        // function createDefaultValueCheck(value: Expression, defaultValue: Expression, sourceMapNode: ts.Node): Expression {
        //     // The value expression will be evaluated twice, so for anything but a simple identifier
        //     // we need to generate a temporary variable
        //     // If the temporary variable needs to be emitted use the source Map node for assignment of that statement
        //     value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, sourceMapNode);
        //     // Return the expression 'value === void 0 ? defaultValue : value'
        //     const equals = <BinaryExpression>createSynthesizedNode(SyntaxKind.BinaryExpression);
        //     equals.left = value;
        //     equals.operatorToken = createSynthesizedNode(SyntaxKind.EqualsEqualsEqualsToken);
        //     equals.right = createVoidZero();
        //     return createConditionalExpression(equals, defaultValue, value);
        // }
        // function createConditionalExpression(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
        //     const cond = <ConditionalExpression>createSynthesizedNode(SyntaxKind.ConditionalExpression);
        //     cond.condition = condition;
        //     cond.questionToken = createSynthesizedNode(SyntaxKind.QuestionToken);
        //     cond.whenTrue = whenTrue;
        //     cond.colonToken = createSynthesizedNode(SyntaxKind.ColonToken);
        //     cond.whenFalse = whenFalse;
        //     return cond;
        // }
        // function createNumericLiteral(value: number) {
        //     const node = <LiteralExpression>createSynthesizedNode(SyntaxKind.NumericLiteral);
        //     node.text = "" + value;
        //     return node;
        // }
        // function createPropertyAccessForDestructuringProperty(object: Expression, propName: PropertyName): Expression {
        //     let index: Expression;
        //     const nameIsComputed = propName.kind === SyntaxKind.ComputedPropertyName;
        //     if (nameIsComputed) {
        //         // TODO to handle when we look into sourcemaps for computed properties, for now use propName
        //         index = ensureIdentifier((<ComputedPropertyName>propName).expression, /*reuseIdentifierExpressions*/ false, propName);
        //     }
        //     else {
        //         // We create a synthetic copy of the identifier in order to avoid the rewriting that might
        //         // otherwise occur when the identifier is emitted.
        //         index = <Identifier | LiteralExpression>createSynthesizedNode(propName.kind);
        //         // We need to unescape identifier here because when parsing an identifier prefixing with "__"
        //         // the parser need to append "_" in order to escape colliding with magic identifiers such as "__proto__"
        //         // Therefore, in order to correctly emit identifiers that are written in original TypeScript file,
        //         // we will unescapeIdentifier to remove additional underscore (if no underscore is added, the function will return original input string)
        //         (<Identifier | LiteralExpression>index).text = unescapeIdentifier((<Identifier | LiteralExpression>propName).text);
        //     }
        //     return !nameIsComputed && index.kind === SyntaxKind.Identifier
        //         ? createPropertyAccessExpression(object, <Identifier>index)
        //         : createElementAccessExpression(object, index);
        // }
        // function createSliceCall(value: Expression, sliceIndex: number): CallExpression {
        //     const call = <CallExpression>createSynthesizedNode(SyntaxKind.CallExpression);
        //     const sliceIdentifier = <Identifier>createSynthesizedNode(SyntaxKind.Identifier);
        //     sliceIdentifier.text = "slice";
        //     call.expression = createPropertyAccessExpression(value, sliceIdentifier);
        //     call.arguments = <NodeArray<LiteralExpression>>createSynthesizedNodeArray();
        //     call.arguments[0] = createNumericLiteral(sliceIndex);
        //     return call;
        // }
        // protected visitObjectLiteralAssignment(target: ObjectLiteralExpression, value: Expression, sourceMapNode: ts.Node) {
        //     const properties = target.properties;
        //     if (properties.length !== 1) {
        //         // For anything but a single element destructuring we need to generate a temporary
        //         // to ensure value is evaluated exactly once.
        //         // When doing so we want to highlight the passed in source map node since thats the one needing this temp assignment
        //         value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, sourceMapNode);
        //     }
        //     for (const p of properties) {
        //         if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
        //             const propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
        //             const target = p.kind === SyntaxKind.ShorthandPropertyAssignment ? <ShorthandPropertyAssignment>p : (<PropertyAssignment>p).initializer || propName;
        //             // Assignment for target = value.propName should highlight whole property, hence use p as source map node
        //             emitDestructuringAssignment(target, createPropertyAccessForDestructuringProperty(value, propName), p);
        //         }
        //     }
        // }
        // protected visitArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, sourceMapNode: ts.Node) {
        //     const elements = target.elements;
        //     if (elements.length !== 1) {
        //         // For anything but a single element destructuring we need to generate a temporary
        //         // to ensure value is evaluated exactly once.
        //         // When doing so we want to highlight the passed in source map node since thats the one needing this temp assignment
        //         value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, sourceMapNode);
        //     }
        //     for (let i = 0; i < elements.length; i++) {
        //         const e = elements[i];
        //         if (e.kind !== SyntaxKind.OmittedExpression) {
        //             // Assignment for target = value.propName should highlight whole property, hence use e as source map node
        //             if (e.kind !== SyntaxKind.SpreadElementExpression) {
        //                 // emitDestructuringAssignment(e, createElementAccessExpression(value, createNumericLiteral(i)), e);
        //             }
        //             else if (i === elements.length - 1) {
        //                 // emitDestructuringAssignment((<SpreadElementExpression>e).expression, createSliceCall(value, i), e);
        //             }
        //         }
        //     }
        // }
        // protected visitDestructuringAssignment(target: Expression | ShorthandPropertyAssignment, value: Expression, sourceMapNode: ts.Node) {
        //     // When emitting target = value use source map node to highlight, including any temporary assignments needed for this
        //     if (target.kind === SyntaxKind.ShorthandPropertyAssignment) {
        //         if ((<ShorthandPropertyAssignment>target).objectAssignmentInitializer) {
        //             value = createDefaultValueCheck(value, (<ShorthandPropertyAssignment>target).objectAssignmentInitializer, sourceMapNode);
        //         }
        //         target = (<ShorthandPropertyAssignment>target).name;
        //     }
        //     else if (target.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>target).operatorToken.kind === SyntaxKind.EqualsToken) {
        //         value = createDefaultValueCheck(value, (<BinaryExpression>target).right, sourceMapNode);
        //         target = (<BinaryExpression>target).left;
        //     }
        //     if (target.kind === SyntaxKind.ObjectLiteralExpression) {
        //         emitObjectLiteralAssignment(<ObjectLiteralExpression>target, value, sourceMapNode);
        //     }
        //     else if (target.kind === SyntaxKind.ArrayLiteralExpression) {
        //         emitArrayLiteralAssignment(<ArrayLiteralExpression>target, value, sourceMapNode);
        //     }
        //     else {
        //         emitAssignment(<Identifier>target, value, /*shouldEmitCommaBeforeAssignment*/ emitCount > 0, sourceMapNode);
        //         emitCount++;
        //     }
        // }
        // protected visitAssignmentExpression(root: BinaryExpression) {
        //     const target = root.left;
        //     let value = root.right;
        //     if (isEmptyObjectLiteralOrArrayLiteral(target)) {
        //         emit(value);
        //     }
        //     else if (isAssignmentExpressionStatement) {
        //         // Source map node for root.left = root.right is root
        //         // but if root is synthetic, which could be in below case, use the target which is { a }
        //         // for ({a} of {a: string}) {
        //         // }
        //         emitDestructuringAssignment(target, value, nodeIsSynthesized(root) ? target : root);
        //     }
        //     else {
        //         if (root.parent.kind !== SyntaxKind.ParenthesizedExpression) {
        //             write("(");
        //         }
        //         // Temporary assignment needed to emit root should highlight whole binary expression
        //         value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, root);
        //         // Source map node for root.left = root.right is root
        //         emitDestructuringAssignment(target, value, root);
        //         write(", ");
        //         emit(value);
        //         if (root.parent.kind !== SyntaxKind.ParenthesizedExpression) {
        //             write(")");
        //         }
        //     }
        // }
        // protected visitBindingElement(target: BindingElement | VariableDeclaration, value: Expression) {
        //     // Any temporary assignments needed to emit target = value should point to target
        //     if (target.initializer) {
        //         // Combine value and initializer
        //         value = value ? createDefaultValueCheck(value, target.initializer, target) : target.initializer;
        //     }
        //     else if (!value) {
        //         // Use 'void 0' in absence of value and initializer
        //         value = createVoidZero();
        //     }
        //     if (isBindingPattern(target.name)) {
        //         const pattern = <BindingPattern>target.name;
        //         const elements = pattern.elements;
        //         const numElements = elements.length;
        //         if (numElements !== 1) {
        //             // For anything other than a single-element destructuring we need to generate a temporary
        //             // to ensure value is evaluated exactly once. Additionally, if we have zero elements
        //             // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
        //             // so in that case, we'll intentionally create that temporary.
        //             value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ numElements !== 0, target);
        //         }
        //         for (let i = 0; i < numElements; i++) {
        //             const element = elements[i];
        //             if (pattern.kind === SyntaxKind.ObjectBindingPattern) {
        //                 // // Rewrite element to a declaration with an initializer that fetches property
        //                 // const propName = element.propertyName || <Identifier>element.name;
        //                 // emitBindingElement(element, createPropertyAccessForDestructuringProperty(value, propName));
        //             }
        //             else if (element.kind !== SyntaxKind.OmittedExpression) {
        //                 // if (!element.dotDotDotToken) {
        //                 //     // Rewrite element to a declaration that accesses array element at index i
        //                 //     emitBindingElement(element, createElementAccessExpression(value, createNumericLiteral(i)));
        //                 // }
        //                 // else if (i === numElements - 1) {
        //                 //     emitBindingElement(element, createSliceCall(value, i));
        //                 // }
        //             }
        //         }
        //     }
        //     else {
        //         emitAssignment(<Identifier>target.name, value, /*shouldEmitCommaBeforeAssignment*/ emitCount > 0, target);
        //         emitCount++;
        //     }
        // }
    };
    NodeVisitor.prototype.visitVariableDeclaration = function (node) {
        // if (isBindingPattern(node.name)) {
        //     const isExported = getCombinedNodeFlags(node) & NodeFlags.Export;
        //     if (languageVersion >= ScriptTarget.ES6 && (!isExported || modulekind === ModuleKind.ES6)) {
        //         // emit ES6 destructuring only if target module is ES6 or variable is not exported
        //         // exported variables in CJS/AMD are prefixed with 'exports.' so result javascript { exports.toString } = 1; is illegal
        //         const isTopLevelDeclarationInSystemModule =
        //             modulekind === ModuleKind.System &&
        //             shouldHoistVariable(node, /*checkIfSourceFileLevelDecl*/true);
        //         if (isTopLevelDeclarationInSystemModule) {
        //             // In System modules top level variables are hoisted
        //             // so variable declarations with destructuring are turned into destructuring assignments.
        //             // As a result, they will need parentheses to disambiguate object binding assignments from blocks.
        //             write("(");
        //         }
        //         emit(node.name);
        //         emitOptional(" = ", node.initializer);
        //         if (isTopLevelDeclarationInSystemModule) {
        //             write(")");
        //         }
        //     }
        //     else {
        //         emitDestructuring(node, /*isAssignmentExpressionStatement*/ false);
        //     }
        // }
        // else {
        //     let initializer = node.initializer;
        //     if (!initializer &&
        //         languageVersion < ScriptTarget.ES6 &&
        //         // for names - binding patterns that lack initializer there is no point to emit explicit initializer
        //         // since downlevel codegen for destructuring will fail in the absence of initializer so all binding elements will say uninitialized
        //         node.name.kind === SyntaxKind.Identifier) {
        //         const container = getEnclosingBlockScopeContainer(node);
        //         const flags = resolver.getNodeCheckFlags(node);
        //         // nested let bindings might need to be initialized explicitly to preserve ES6 semantic
        //         // { let x = 1; }
        //         // { let x; } // x here should be undefined. not 1
        //         // NOTES:
        //         // Top level bindings never collide with anything and thus don't require explicit initialization.
        //         // As for nested let bindings there are two cases:
        //         // - nested let bindings that were not renamed definitely should be initialized explicitly
        //         //   { let x = 1; }
        //         //   { let x; if (some-condition) { x = 1}; if (x) { /*1*/ } }
        //         //   Without explicit initialization code in /*1*/ can be executed even if some-condition is evaluated to false
        //         // - renaming introduces fresh name that should not collide with any existing names, however renamed bindings sometimes also should be
        //         //   explicitly initialized. One particular case: non-captured binding declared inside loop body (but not in loop initializer)
        //         //   let x;
        //         //   for (;;) {
        //         //       let x;
        //         //   }
        //         //   in downlevel codegen inner 'x' will be renamed so it won't collide with outer 'x' however it will should be reset on every iteration
        //         //   as if it was declared anew.
        //         //   * Why non-captured binding - because if loop contains block scoped binding captured in some function then loop body will be rewritten
        //         //   to have a fresh scope on every iteration so everything will just work.
        //         //   * Why loop initializer is excluded - since we've introduced a fresh name it already will be undefined.
        //         const isCapturedInFunction = flags & NodeCheckFlags.CapturedBlockScopedBinding;
        //         const isDeclaredInLoop = flags & NodeCheckFlags.BlockScopedBindingInLoop;
        //         const emittedAsTopLevel =
        //             isBlockScopedContainerTopLevel(container) ||
        //             (isCapturedInFunction && isDeclaredInLoop && container.kind === SyntaxKind.Block && isIterationStatement(container.parent, /*lookInLabeledStatements*/ false));
        //         const emittedAsNestedLetDeclaration =
        //             getCombinedNodeFlags(node) & NodeFlags.Let &&
        //             !emittedAsTopLevel;
        //         const emitExplicitInitializer =
        //             emittedAsNestedLetDeclaration &&
        //             container.kind !== SyntaxKind.ForInStatement &&
        //             container.kind !== SyntaxKind.ForOfStatement &&
        //             (
        //                 // !resolver.isDeclarationWithCollidingName(node) ||
        //                 // (isDeclaredInLoop && !isCapturedInFunction && !isIterationStatement(container, /*lookInLabeledStatements*/ false))
        //             );
        //         if (emitExplicitInitializer) {
        //             initializer = createVoidZero();
        //         }
        //     }
        //     const exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.name);
        //     if (exportChanged) {
        //         write(`${exportFunctionForFile}("`);
        //         emitNodeWithCommentsAndWithoutSourcemap(node.name);
        //         write(`", `);
        //     }
        //     emitModuleMemberName(node);
        //     emitOptional(" = ", initializer);
        //     if (exportChanged) {
        //         write(")");
        //     }
        // }
    };
    NodeVisitor.prototype.visitExportVariableAssignments = function (node) {
        // if (node.kind === SyntaxKind.OmittedExpression) {
        //     return;
        // }
        // const name = node.name;
        // if (name.kind === SyntaxKind.Identifier) {
        //     emitExportMemberAssignments(<Identifier>name);
        // }
        // else if (isBindingPattern(name)) {
        //     forEach((<BindingPattern>name).elements, emitExportVariableAssignments);
        // }
    };
    NodeVisitor.prototype.visitPropertyDeclarations = function (node, properties) {
        // for (const property of properties) {
        //     emitPropertyDeclaration(node, property);
        // }
    };
    NodeVisitor.prototype.visitPropertyDeclaration = function (node, property, receiver, isExpression) {
        // writeLine();
        // emitLeadingComments(property);
        // emitStart(property);
        // emitStart(property.name);
        // if (receiver) {
        //     emit(receiver);
        // }
        // else {
        //     if (property.flags & NodeFlags.Static) {
        //         emitDeclarationName(node);
        //     }
        //     else {
        //         write("this");
        //     }
        // }
        // emitMemberAccessForPropertyName(property.name);
        // emitEnd(property.name);
        // write(" = ");
        // emit(property.initializer);
        // if (!isExpression) {
        //     write(";");
        // }
        // emitEnd(property);
        // emitTrailingComments(property);
    };
    NodeVisitor.prototype.visitMemberFunctionsForES5AndLower = function (node) {
        // forEach(node.members, member => {
        //     if (member.kind === SyntaxKind.SemicolonClassElement) {
        //         writeLine();
        //         write(";");
        //     }
        //     else if (member.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature) {
        //         if (!(<MethodDeclaration>member).body) {
        //             return emitCommentsOnNotEmittedNode(member);
        //         }
        //         writeLine();
        //         emitLeadingComments(member);
        //         emitStart(member);
        //         emitStart((<MethodDeclaration>member).name);
        //         emitClassMemberPrefix(node, member);
        //         emitMemberAccessForPropertyName((<MethodDeclaration>member).name);
        //         emitEnd((<MethodDeclaration>member).name);
        //         write(" = ");
        //         emitFunctionDeclaration(<MethodDeclaration>member);
        //         emitEnd(member);
        //         write(";");
        //         emitTrailingComments(member);
        //     }
        //     else if (member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor) {
        //         const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
        //         if (member === accessors.firstAccessor) {
        //             writeLine();
        //             emitStart(member);
        //             write("Object.defineProperty(");
        //             emitStart((<AccessorDeclaration>member).name);
        //             emitClassMemberPrefix(node, member);
        //             write(", ");
        //             emitExpressionForPropertyName((<AccessorDeclaration>member).name);
        //             emitEnd((<AccessorDeclaration>member).name);
        //             write(", {");
        //             increaseIndent();
        //             if (accessors.getAccessor) {
        //                 // writeLine();
        //                 // emitLeadingComments(accessors.getAccessor);
        //                 // write("get: ");
        //                 // emitStart(accessors.getAccessor);
        //                 // write("function ");
        //                 // emitSignatureAndBody(accessors.getAccessor);
        //                 // emitEnd(accessors.getAccessor);
        //                 // emitTrailingComments(accessors.getAccessor);
        //                 // write(",");
        //             }
        //             if (accessors.setAccessor) {
        //                 // writeLine();
        //                 // emitLeadingComments(accessors.setAccessor);
        //                 // write("set: ");
        //                 // emitStart(accessors.setAccessor);
        //                 // write("function ");
        //                 // emitSignatureAndBody(accessors.setAccessor);
        //                 // emitEnd(accessors.setAccessor);
        //                 // emitTrailingComments(accessors.setAccessor);
        //                 // write(",");
        //             }
        //             writeLine();
        //             write("enumerable: true,");
        //             writeLine();
        //             write("configurable: true");
        //             decreaseIndent();
        //             writeLine();
        //             write("});");
        //             emitEnd(member);
        //         }
        //     }
        // });
    };
    NodeVisitor.prototype.visitMemberFunctionsForES6AndHigher = function (node) {
        // for (const member of node.members) {
        //     if ((member.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature) && !(<MethodDeclaration>member).body) {
        //         emitCommentsOnNotEmittedNode(member);
        //     }
        //     else if (member.kind === SyntaxKind.MethodDeclaration ||
        //         member.kind === SyntaxKind.GetAccessor ||
        //         member.kind === SyntaxKind.SetAccessor) {
        //         writeLine();
        //         emitLeadingComments(member);
        //         emitStart(member);
        //         if (member.flags & NodeFlags.Static) {
        //             write("static ");
        //         }
        //         if (member.kind === SyntaxKind.GetAccessor) {
        //             write("get ");
        //         }
        //         else if (member.kind === SyntaxKind.SetAccessor) {
        //             write("set ");
        //         }
        //         if ((<MethodDeclaration>member).asteriskToken) {
        //             write("*");
        //         }
        //         emit((<MethodDeclaration>member).name);
        //         emitSignatureAndBody(<MethodDeclaration>member);
        //         emitEnd(member);
        //         emitTrailingComments(member);
        //     }
        //     else if (member.kind === SyntaxKind.SemicolonClassElement) {
        //         writeLine();
        //         write(";");
        //     }
        // }
    };
    NodeVisitor.prototype.visitConstructor = function (node, baseTypeElement) {
        // const saveConvertedLoopState = convertedLoopState;
        // const saveTempFlags = tempFlags;
        // const saveTempVariables = tempVariables;
        // const saveTempParameters = tempParameters;
        // convertedLoopState = undefined;
        // tempFlags = 0;
        // tempVariables = undefined;
        // tempParameters = undefined;
        // emitConstructorWorker(node, baseTypeElement);
        // Debug.assert(convertedLoopState === undefined);
        // convertedLoopState = saveConvertedLoopState;
        // tempFlags = saveTempFlags;
        // tempVariables = saveTempVariables;
        // tempParameters = saveTempParameters;
    };
    NodeVisitor.prototype.visitConstructorWorker = function (node, baseTypeElement) {
        // // Check if we have property assignment inside class declaration.
        // // If there is property assignment, we need to emit constructor whether users define it or not
        // // If there is no property assignment, we can omit constructor if users do not define it
        // let hasInstancePropertyWithInitializer = false;
        // // Emit the constructor overload pinned comments
        // forEach(node.members, member => {
        //     if (member.kind === SyntaxKind.Constructor && !(<ConstructorDeclaration>member).body) {
        //         emitCommentsOnNotEmittedNode(member);
        //     }
        //     // Check if there is any non-static property assignment
        //     if (member.kind === SyntaxKind.PropertyDeclaration && (<PropertyDeclaration>member).initializer && (member.flags & NodeFlags.Static) === 0) {
        //         hasInstancePropertyWithInitializer = true;
        //     }
        // });
        // const ctor = getFirstConstructorWithBody(node);
        // // For target ES6 and above, if there is no user-defined constructor and there is no property assignment
        // // do not emit constructor in class declaration.
        // if (languageVersion >= ScriptTarget.ES6 && !ctor && !hasInstancePropertyWithInitializer) {
        //     return;
        // }
        // if (ctor) {
        //     emitLeadingComments(ctor);
        // }
        // emitStart(ctor || node);
        // if (languageVersion < ScriptTarget.ES6) {
        //     write("function ");
        //     emitDeclarationName(node);
        //     emitSignatureParameters(ctor);
        // }
        // else {
        //     write("constructor");
        //     if (ctor) {
        //         emitSignatureParameters(ctor);
        //     }
        //     else {
        //         // Based on EcmaScript6 section 14.5.14: Runtime Semantics: ClassDefinitionEvaluation.
        //         // If constructor is empty, then,
        //         //      If ClassHeritageopt is present, then
        //         //          Let constructor be the result of parsing the String "constructor(... args){ super (...args);}" using the syntactic grammar with the goal symbol MethodDefinition.
        //         //      Else,
        //         //          Let constructor be the result of parsing the String "constructor( ){ }" using the syntactic grammar with the goal symbol MethodDefinition
        //         if (baseTypeElement) {
        //             write("(...args)");
        //         }
        //         else {
        //             write("()");
        //         }
        //     }
        // }
        // let startIndex = 0;
        // write(" {");
        // increaseIndent();
        // if (ctor) {
        //     // Emit all the directive prologues (like "use strict").  These have to come before
        //     // any other preamble code we write (like parameter initializers).
        //     startIndex = emitDirectivePrologues(ctor.body.statements, /*startWithNewLine*/ true);
        //     emitDetachedCommentsAndUpdateCommentsInfo(ctor.body.statements);
        // }
        // emitCaptureThisForNodeIfNecessary(node);
        // let superCall: ExpressionStatement;
        // if (ctor) {
        //     emitDefaultValueAssignments(ctor);
        //     emitRestParameter(ctor);
        //     if (baseTypeElement) {
        //         superCall = getSuperCallAtGivenIndex(ctor, startIndex);
        //         if (superCall) {
        //             writeLine();
        //             emit(superCall);
        //         }
        //     }
        //     emitParameterPropertyAssignments(ctor);
        // }
        // else {
        //     if (baseTypeElement) {
        //         writeLine();
        //         emitStart(baseTypeElement);
        //         if (languageVersion < ScriptTarget.ES6) {
        //             write("_super.apply(this, arguments);");
        //         }
        //         else {
        //             write("super(...args);");
        //         }
        //         emitEnd(baseTypeElement);
        //     }
        // }
        // emitPropertyDeclarations(node, getInitializedProperties(node, /*isStatic*/ false));
        // if (ctor) {
        //     let statements: Node[] = (<Block>ctor.body).statements;
        //     if (superCall) {
        //         statements = statements.slice(1);
        //     }
        //     emitLinesStartingAt(statements, startIndex);
        // }
        // emitTempDeclarations(/*newLine*/ true);
        // writeLine();
        // if (ctor) {
        //     emitLeadingCommentsOfPosition((<Block>ctor.body).statements.end);
        // }
        // decreaseIndent();
        // emitToken(SyntaxKind.CloseBraceToken, ctor ? (<Block>ctor.body).statements.end : node.members.end);
        // emitEnd(<Node>ctor || node);
        // if (ctor) {
        //     emitTrailingComments(ctor);
        // }
    };
    NodeVisitor.prototype.visitClassExpression = function (node) {
        // return emitClassLikeDeclaration(node);
    };
    NodeVisitor.prototype.visitClassDeclaration = function (node) {
        // return emitClassLikeDeclaration(node);
    };
    NodeVisitor.prototype.visitClassLikeDeclaration = function (node) {
        // if (languageVersion < ScriptTarget.ES6) {
        //     emitClassLikeDeclarationBelowES6(node);
        // }
        // else {
        //     emitClassLikeDeclarationForES6AndHigher(node);
        // }
        // if (modulekind !== ModuleKind.ES6 && node.parent === currentSourceFile && node.name) {
        //     emitExportMemberAssignments(node.name);
        // }
    };
    NodeVisitor.prototype.visitClassLikeDeclarationForES6AndHigher = function (node) {
        // let decoratedClassAlias: string;
        // const isHoistedDeclarationInSystemModule = shouldHoistDeclarationInSystemJsModule(node);
        // const isDecorated = nodeIsDecorated(node);
        // const rewriteAsClassExpression = isDecorated || isHoistedDeclarationInSystemModule;
        // if (node.kind === SyntaxKind.ClassDeclaration) {
        //     if (rewriteAsClassExpression) {
        //         // When we emit an ES6 class that has a class decorator, we must tailor the
        //         // emit to certain specific cases.
        //         //
        //         // In the simplest case, we emit the class declaration as a let declaration, and
        //         // evaluate decorators after the close of the class body:
        //         //
        //         //  TypeScript                //       | Javascript
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | let C = class C {
        //         //  class C {                //        | }
        //         //  }                //                | C = __decorate([dec], C);
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | export let C = class C {
        //         //  export class C {                // | }
        //         //  }                //                | C = __decorate([dec], C);
        //         //  ---------------------------------------------------------------------
        //         //  [Example 1]
        //         //
        //         // If a class declaration contains a reference to itself *inside* of the class body,
        //         // this introduces two bindings to the class: One outside of the class body, and one
        //         // inside of the class body. If we apply decorators as in [Example 1] above, there
        //         // is the possibility that the decorator `dec` will return a new value for the
        //         // constructor, which would result in the binding inside of the class no longer
        //         // pointing to the same reference as the binding outside of the class.
        //         //
        //         // As a result, we must instead rewrite all references to the class *inside* of the
        //         // class body to instead point to a local temporary alias for the class:
        //         //
        //         //  TypeScript                //       | Javascript
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | let C_1 = class C {
        //         //  class C {                //        |   static x() { return C_1.y; }
        //         //    static x() { return C.y; }    | }
        //         //    static y = 1;                //  | let C = C_1;
        //         //  }                //                | C.y = 1;
        //         //                //                 //   | C = C_1 = __decorate([dec], C);
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | let C_1 = class C {
        //         //  export class C {                // |   static x() { return C_1.y; }
        //         //    static x() { return C.y; }    | }
        //         //    static y = 1;                //  | export let C = C_1;
        //         //  }                //                | C.y = 1;
        //         //                //                 //   | C = C_1 = __decorate([dec], C);
        //         //  ---------------------------------------------------------------------
        //         //  [Example 2]
        //         //
        //         // If a class declaration is the default export of a module, we instead emit
        //         // the export after the decorated declaration:
        //         //
        //         //  TypeScript                //       | Javascript
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | let default_1 = class {
        //         //  export default class {          | }
        //         //  }                //                | default_1 = __decorate([dec], default_1);
        //         //                //                 //   | export default default_1;
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | let C = class C {
        //         //  export default class {          | }
        //         //  }                //                | C = __decorate([dec], C);
        //         //                //                 //   | export default C;
        //         //  ---------------------------------------------------------------------
        //         //  [Example 3]
        //         //
        //         // If the class declaration is the default export and a reference to itself
        //         // inside of the class body, we must emit both an alias for the class *and*
        //         // move the export after the declaration:
        //         //
        //         //  TypeScript                //       | Javascript
        //         //  --------------------------------|------------------------------------
        //         //  @dec                //             | let C_1 = class C {
        //         //  export default class C {        |   static x() { return C_1.y; }
        //         //    static x() { return C.y; }    | };
        //         //    static y = 1;                //  | let C = C_1;
        //         //  }                //                | C.y = 1;
        //         //                //                 //   | C = C_1 = __decorate([dec], C);
        //         //                //                 //   | export default C;
        //         //  ---------------------------------------------------------------------
        //         //  [Example 4]
        //         //
        //         // NOTE: we reuse the same rewriting logic for cases when targeting ES6 and module kind is System.
        //         // Because of hoisting top level class declaration need to be emitted as class expressions.
        //         // Double bind case is only required if node is decorated.
        //         if (isDecorated && resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithBodyScopedClassBinding) {
        //             decoratedClassAlias = unescapeIdentifier(makeUniqueName(node.name ? node.name.text : "default"));
        //             decoratedClassAliases[getNodeId(node)] = decoratedClassAlias;
        //         }
        //         if (isES6ExportedDeclaration(node) && !(node.flags & NodeFlags.Default) && decoratedClassAlias === undefined) {
        //             write("export ");
        //         }
        //         if (!isHoistedDeclarationInSystemModule) {
        //             write("let ");
        //         }
        //         if (decoratedClassAlias !== undefined) {
        //             write(`${decoratedClassAlias}`);
        //         }
        //         else {
        //             emitDeclarationName(node);
        //         }
        //         write(" = ");
        //     }
        //     else if (isES6ExportedDeclaration(node)) {
        //         write("export ");
        //         if (node.flags & NodeFlags.Default) {
        //             write("default ");
        //         }
        //     }
        // }
        // // If the class has static properties, and it's a class expression, then we'll need
        // // to specialize the emit a bit.  for a class expression of the form:
        // //
        // //      class C { static a = 1; static b = 2; ... }
        // //
        // // We'll emit:
        // //
        // //      (_temp = class C { ... }, _temp.a = 1, _temp.b = 2, _temp)
        // //
        // // This keeps the expression as an expression, while ensuring that the static parts
        // // of it have been initialized by the time it is used.
        // const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
        // const isClassExpressionWithStaticProperties = staticProperties.length > 0 && node.kind === SyntaxKind.ClassExpression;
        // let tempVariable: Identifier;
        // if (isClassExpressionWithStaticProperties) {
        //     tempVariable = createAndRecordTempVariable(TempFlags.Auto);
        //     write("(");
        //     increaseIndent();
        //     emit(tempVariable);
        //     write(" = ");
        // }
        // write("class");
        // // emit name if
        // // - node has a name
        // // - this is default export with static initializers
        // if (node.name || (node.flags & NodeFlags.Default && (staticProperties.length > 0 || modulekind !== ModuleKind.ES6) && !rewriteAsClassExpression)) {
        //     write(" ");
        //     emitDeclarationName(node);
        // }
        // const baseTypeNode = getClassExtendsHeritageClauseElement(node);
        // if (baseTypeNode) {
        //     write(" extends ");
        //     emit(baseTypeNode.expression);
        // }
        // write(" {");
        // increaseIndent();
        // writeLine();
        // emitConstructor(node, baseTypeNode);
        // emitMemberFunctionsForES6AndHigher(node);
        // decreaseIndent();
        // writeLine();
        // emitToken(SyntaxKind.CloseBraceToken, node.members.end);
        // if (rewriteAsClassExpression) {
        //     if (decoratedClassAlias !== undefined) {
        //         write(";");
        //         writeLine();
        //         if (isES6ExportedDeclaration(node) && !(node.flags & NodeFlags.Default)) {
        //             write("export ");
        //         }
        //         write("let ");
        //         emitDeclarationName(node);
        //         write(` = ${decoratedClassAlias}`);
        //     }
        //     decoratedClassAliases[getNodeId(node)] = undefined;
        //     write(";");
        // }
        // // Emit static property assignment. Because classDeclaration is lexically evaluated,
        // // it is safe to emit static property assignment after classDeclaration
        // // From ES6 specification:
        // //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
        // //                //                 //   a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
        // if (isClassExpressionWithStaticProperties) {
        //     for (const property of staticProperties) {
        //         write(",");
        //         writeLine();
        //         emitPropertyDeclaration(node, property, /*receiver*/ tempVariable, /*isExpression*/ true);
        //     }
        //     write(",");
        //     writeLine();
        //     emit(tempVariable);
        //     decreaseIndent();
        //     write(")");
        // }
        // else {
        //     writeLine();
        //     emitPropertyDeclarations(node, staticProperties);
        //     emitDecoratorsOfClass(node, decoratedClassAlias);
        // }
        // if (!(node.flags & NodeFlags.Export)) {
        //     return;
        // }
        // if (modulekind !== ModuleKind.ES6) {
        //     emitExportMemberAssignment(node as ClassDeclaration);
        // }
        // else {
        //     // If this is an exported class, but not on the top level (i.e. on an internal
        //     // module), export it
        //     if (node.flags & NodeFlags.Default) {
        //         // if this is a top level default export of decorated class, write the export after the declaration.
        //         if (isDecorated) {
        //             writeLine();
        //             write("export default ");
        //             emitDeclarationName(node);
        //             write(";");
        //         }
        //     }
        //     else if (node.parent.kind !== SyntaxKind.SourceFile) {
        //         writeLine();
        //         emitStart(node);
        //         emitModuleMemberName(node);
        //         write(" = ");
        //         emitDeclarationName(node);
        //         emitEnd(node);
        //         write(";");
        //     }
        // }
    };
    NodeVisitor.prototype.visitClassLikeDeclarationBelowES6 = function (node) {
        // if (node.kind === SyntaxKind.ClassDeclaration) {
        //     // source file level classes in system modules are hoisted so 'var's for them are already defined
        //     if (!shouldHoistDeclarationInSystemJsModule(node)) {
        //         write("var ");
        //     }
        //     emitDeclarationName(node);
        //     write(" = ");
        // }
        // write("(function (");
        // const baseTypeNode = getClassExtendsHeritageClauseElement(node);
        // if (baseTypeNode) {
        //     write("_super");
        // }
        // write(") {");
        // const saveTempFlags = tempFlags;
        // const saveTempVariables = tempVariables;
        // const saveTempParameters = tempParameters;
        // const saveComputedPropertyNamesToGeneratedNames = computedPropertyNamesToGeneratedNames;
        // const saveConvertedLoopState = convertedLoopState;
        // convertedLoopState = undefined;
        // tempFlags = 0;
        // tempVariables = undefined;
        // tempParameters = undefined;
        // computedPropertyNamesToGeneratedNames = undefined;
        // increaseIndent();
        // if (baseTypeNode) {
        //     writeLine();
        //     emitStart(baseTypeNode);
        //     write("__extends(");
        //     emitDeclarationName(node);
        //     write(", _super);");
        //     emitEnd(baseTypeNode);
        // }
        // writeLine();
        // emitConstructor(node, baseTypeNode);
        // emitMemberFunctionsForES5AndLower(node);
        // emitPropertyDeclarations(node, getInitializedProperties(node, /*isStatic*/ true));
        // writeLine();
        // emitDecoratorsOfClass(node, /*decoratedClassAlias*/ undefined);
        // writeLine();
        // emitToken(SyntaxKind.CloseBraceToken, node.members.end, () => {
        //     write("return ");
        //     emitDeclarationName(node);
        // });
        // write(";");
        // emitTempDeclarations(/*newLine*/ true);
        // Debug.assert(convertedLoopState === undefined);
        // convertedLoopState = saveConvertedLoopState;
        // tempFlags = saveTempFlags;
        // tempVariables = saveTempVariables;
        // tempParameters = saveTempParameters;
        // computedPropertyNamesToGeneratedNames = saveComputedPropertyNamesToGeneratedNames;
        // decreaseIndent();
        // writeLine();
        // emitToken(SyntaxKind.CloseBraceToken, node.members.end);
        // emitStart(node);
        // write("(");
        // if (baseTypeNode) {
        //     emit(baseTypeNode.expression);
        // }
        // write("))");
        // if (node.kind === SyntaxKind.ClassDeclaration) {
        //     write(";");
        // }
        // emitEnd(node);
        // if (node.kind === SyntaxKind.ClassDeclaration) {
        //     emitExportMemberAssignment(<ClassDeclaration>node);
        // }
    };
    NodeVisitor.prototype.visitClassMemberPrefix = function (node, member) {
        // emitDeclarationName(node);
        // if (!(member.flags & NodeFlags.Static)) {
        //     write(".prototype");
        // }
    };
    NodeVisitor.prototype.visitDecoratorsOfClass = function (node, decoratedClassAlias) {
        // emitDecoratorsOfMembers(node, /*staticFlag*/ 0);
        // emitDecoratorsOfMembers(node, NodeFlags.Static);
        // emitDecoratorsOfConstructor(node, decoratedClassAlias);
    };
    NodeVisitor.prototype.visitDecoratorsOfConstructor = function (node, decoratedClassAlias) {
        // const decorators = node.decorators;
        // const constructor = getFirstConstructorWithBody(node);
        // const firstParameterDecorator = constructor && forEach(constructor.parameters, parameter => parameter.decorators);
        // // skip decoration of the constructor if neither it nor its parameters are decorated
        // if (!decorators && !firstParameterDecorator) {
        //     return;
        // }
        // // Emit the call to __decorate. Given the class:
        // //
        // //   @dec
        // //   class C {
        // //   }
        // //
        // // The emit for the class is:
        // //
        // //   C = __decorate([dec], C);
        // //
        // writeLine();
        // emitStart(node.decorators || firstParameterDecorator);
        // emitDeclarationName(node);
        // if (decoratedClassAlias !== undefined) {
        //     write(` = ${decoratedClassAlias}`);
        // }
        // write(" = __decorate([");
        // increaseIndent();
        // writeLine();
        // const decoratorCount = decorators ? decorators.length : 0;
        // let argumentsWritten = emitList(decorators, 0, decoratorCount, /*multiLine*/ true, /*trailingComma*/ false, /*leadingComma*/ false, /*noTrailingNewLine*/ true,
        //     decorator => emit(decorator.expression));
        // if (firstParameterDecorator) {
        //     argumentsWritten += emitDecoratorsOfParameters(constructor, /*leadingComma*/ argumentsWritten > 0);
        // }
        // emitSerializedTypeMetadata(node, /*leadingComma*/ argumentsWritten >= 0);
        // decreaseIndent();
        // writeLine();
        // write("], ");
        // emitDeclarationName(node);
        // write(")");
        // emitEnd(node.decorators || firstParameterDecorator);
        // write(";");
        // writeLine();
    };
    NodeVisitor.prototype.visitDecoratorsOfMembers = function (node, staticFlag) {
        // for (const member of node.members) {
        //     // only emit members in the correct group
        //     if ((member.flags & NodeFlags.Static) !== staticFlag) {
        //         continue;
        //     }
        //     // skip members that cannot be decorated (such as the constructor)
        //     if (!nodeCanBeDecorated(member)) {
        //         continue;
        //     }
        //     // skip an accessor declaration if it is not the first accessor
        //     let decorators: NodeArray<Decorator>;
        //     let functionLikeMember: FunctionLikeDeclaration;
        //     if (isAccessor(member)) {
        //         const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
        //         if (member !== accessors.firstAccessor) {
        //             continue;
        //         }
        //         // get the decorators from the first accessor with decorators
        //         decorators = accessors.firstAccessor.decorators;
        //         if (!decorators && accessors.secondAccessor) {
        //             decorators = accessors.secondAccessor.decorators;
        //         }
        //         // we only decorate parameters of the set accessor
        //         functionLikeMember = accessors.setAccessor;
        //     }
        //     else {
        //         decorators = member.decorators;
        //         // we only decorate the parameters here if this is a method
        //         if (member.kind === SyntaxKind.MethodDeclaration) {
        //             functionLikeMember = <MethodDeclaration>member;
        //         }
        //     }
        //     const firstParameterDecorator = functionLikeMember && forEach(functionLikeMember.parameters, parameter => parameter.decorators);
        //     // skip a member if it or any of its parameters are not decorated
        //     if (!decorators && !firstParameterDecorator) {
        //         continue;
        //     }
        //     // Emit the call to __decorate. Given the following:
        //     //
        //     //   class C {
        //     //     @dec method(@dec2 x) {}
        //     //     @dec get accessor() {}
        //     //     @dec prop;
        //     //   }
        //     //
        //     // The emit for a method is:
        //     //
        //     //   __decorate([
        //     //       dec,
        //     //       __param(0, dec2),
        //     //       __metadata("design:type", Function),
        //     //       __metadata("design:paramtypes", [Object]),
        //     //       __metadata("design:returntype", void 0)
        //     //   ], C.prototype, "method", undefined);
        //     //
        //     // The emit for an accessor is:
        //     //
        //     //   __decorate([
        //     //       dec
        //     //   ], C.prototype, "accessor", undefined);
        //     //
        //     // The emit for a property is:
        //     //
        //     //   __decorate([
        //     //       dec
        //     //   ], C.prototype, "prop");
        //     //
        //     writeLine();
        //     emitStart(decorators || firstParameterDecorator);
        //     write("__decorate([");
        //     increaseIndent();
        //     writeLine();
        //     const decoratorCount = decorators ? decorators.length : 0;
        //     let argumentsWritten = emitList(decorators, 0, decoratorCount, /*multiLine*/ true, /*trailingComma*/ false, /*leadingComma*/ false, /*noTrailingNewLine*/ true,
        //         decorator => emit(decorator.expression));
        //     if (firstParameterDecorator) {
        //         argumentsWritten += emitDecoratorsOfParameters(functionLikeMember, argumentsWritten > 0);
        //     }
        //     emitSerializedTypeMetadata(member, argumentsWritten > 0);
        //     decreaseIndent();
        //     writeLine();
        //     write("], ");
        //     emitClassMemberPrefix(node, member);
        //     write(", ");
        //     emitExpressionForPropertyName(member.name);
        //     if (languageVersion > ScriptTarget.ES3) {
        //         if (member.kind !== SyntaxKind.PropertyDeclaration) {
        //             // We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
        //             // We have this extra argument here so that we can inject an explicit property descriptor at a later date.
        //             write(", null");
        //         }
        //         else {
        //             // We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
        //             // should not invoke `Object.getOwnPropertyDescriptor`.
        //             write(", void 0");
        //         }
        //     }
        //     write(")");
        //     emitEnd(decorators || firstParameterDecorator);
        //     write(";");
        //     writeLine();
        // }
    };
    NodeVisitor.prototype.visitDecoratorsOfParameters = function (node, leadingComma) {
        // let argumentsWritten = 0;
        // if (node) {
        //     let parameterIndex = 0;
        //     for (const parameter of node.parameters) {
        //         if (nodeIsDecorated(parameter)) {
        //             const decorators = parameter.decorators;
        //             argumentsWritten += emitList(decorators, 0, decorators.length, /*multiLine*/ true, /*trailingComma*/ false, /*leadingComma*/ leadingComma, /*noTrailingNewLine*/ true, decorator => {
        //                 // write(`__param(${parameterIndex}, `);
        //                 // emit(decorator.expression);
        //                 // write(")");
        //             });
        //             leadingComma = true;
        //         }
        //         parameterIndex++;
        //     }
        // }
        // return argumentsWritten;
        return;
    };
    NodeVisitor.prototype.shouldEmitTypeMetadata = function (node) {
        // // This method determines whether to emit the "design:type" metadata based on the node's kind.
        // // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
        // // compiler option is set.
        // switch (node.kind) {
        //     case SyntaxKind.MethodDeclaration:
        //     case SyntaxKind.GetAccessor:
        //     case SyntaxKind.SetAccessor:
        //     case SyntaxKind.PropertyDeclaration:
        //         return true;
        // }
        return false;
    };
    NodeVisitor.prototype.shouldEmitReturnTypeMetadata = function (node) {
        // // This method determines whether to emit the "design:returntype" metadata based on the node's kind.
        // // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
        // // compiler option is set.
        // switch (node.kind) {
        //     case SyntaxKind.MethodDeclaration:
        //         return true;
        // }
        return false;
    };
    NodeVisitor.prototype.shouldEmitParamTypesMetadata = function (node) {
        // // This method determines whether to emit the "design:paramtypes" metadata based on the node's kind.
        // // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
        // // compiler option is set.
        // switch (node.kind) {
        //     case SyntaxKind.ClassDeclaration:
        //     case SyntaxKind.MethodDeclaration:
        //     case SyntaxKind.SetAccessor:
        //         return true;
        // }
        return false;
    };
    /** Serializes the type of a declaration to an appropriate JS constructor value. Used by the __metadata decorator for a class member. */
    NodeVisitor.prototype.visitSerializedTypeOfNode = function (node) {
        // // serialization of the type of a declaration uses the following rules:
        // //
        // // * The serialized type of a ClassDeclaration is "Function"
        // // * The serialized type of a ParameterDeclaration is the serialized type of its type annotation.
        // // * The serialized type of a PropertyDeclaration is the serialized type of its type annotation.
        // // * The serialized type of an AccessorDeclaration is the serialized type of the return type annotation of its getter or parameter type annotation of its setter.
        // // * The serialized type of any other FunctionLikeDeclaration is "Function".
        // // * The serialized type of any other node is "void 0".
        // //
        // // For rules on serializing type annotations, see `serializeTypeNode`.
        // switch (node.kind) {
        //     case SyntaxKind.ClassDeclaration:
        //         write("Function");
        //         return;
        //     case SyntaxKind.PropertyDeclaration:
        //         emitSerializedTypeNode((<PropertyDeclaration>node).type);
        //         return;
        //     case SyntaxKind.Parameter:
        //         emitSerializedTypeNode((<ParameterDeclaration>node).type);
        //         return;
        //     case SyntaxKind.GetAccessor:
        //         emitSerializedTypeNode((<AccessorDeclaration>node).type);
        //         return;
        //     case SyntaxKind.SetAccessor:
        //         emitSerializedTypeNode(getSetAccessorTypeAnnotationNode(<AccessorDeclaration>node));
        //         return;
        // }
        // if (isFunctionLike(node)) {
        //     write("Function");
        //     return;
        // }
        // write("void 0");
    };
    NodeVisitor.prototype.visitSerializedTypeNode = function (node) {
        // if (node) {
        //     switch (node.kind) {
        //         case SyntaxKind.VoidKeyword:
        //             write("void 0");
        //             return;
        //         case SyntaxKind.ParenthesizedType:
        //             emitSerializedTypeNode((<ParenthesizedTypeNode>node).type);
        //             return;
        //         case SyntaxKind.FunctionType:
        //         case SyntaxKind.ConstructorType:
        //             write("Function");
        //             return;
        //         case SyntaxKind.ArrayType:
        //         case SyntaxKind.TupleType:
        //             write("Array");
        //             return;
        //         case SyntaxKind.TypePredicate:
        //         case SyntaxKind.BooleanKeyword:
        //             write("Boolean");
        //             return;
        //         case SyntaxKind.StringKeyword:
        //         case SyntaxKind.StringLiteralType:
        //             write("String");
        //             return;
        //         case SyntaxKind.NumberKeyword:
        //             write("Number");
        //             return;
        //         case SyntaxKind.SymbolKeyword:
        //             write("Symbol");
        //             return;
        //         case SyntaxKind.TypeReference:
        //             emitSerializedTypeReferenceNode(<TypeReferenceNode>node);
        //             return;
        //         case SyntaxKind.TypeQuery:
        //         case SyntaxKind.TypeLiteral:
        //         case SyntaxKind.UnionType:
        //         case SyntaxKind.IntersectionType:
        //         case SyntaxKind.AnyKeyword:
        //         case SyntaxKind.ThisType:
        //             break;
        //         default:
        //             Debug.fail("Cannot serialize unexpected type node.");
        //             break;
        //     }
        // }
        // write("Object");
    };
    /** Serializes a TypeReferenceNode to an appropriate JS constructor value. Used by the __metadata decorator. */
    NodeVisitor.prototype.visitSerializedTypeReferenceNode = function (node) {
        // let location: Node = node.parent;
        // while (isDeclaration(location) || isTypeNode(location)) {
        //     location = location.parent;
        // }
        // // Clone the type name and parent it to a location outside of the current declaration.
        // const typeName = cloneEntityName(node.typeName, location);
        // const result = resolver.getTypeReferenceSerializationKind(typeName);
        // switch (result) {
        //     case TypeReferenceSerializationKind.Unknown:
        //         let temp = createAndRecordTempVariable(TempFlags.Auto);
        //         write("(typeof (");
        //         emitNodeWithoutSourceMap(temp);
        //         write(" = ");
        //         emitEntityNameAsExpression(typeName, /*useFallback*/ true);
        //         write(") === 'function' && ");
        //         emitNodeWithoutSourceMap(temp);
        //         write(") || Object");
        //         break;
        //     case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
        //         emitEntityNameAsExpression(typeName, /*useFallback*/ false);
        //         break;
        //     case TypeReferenceSerializationKind.VoidType:
        //         write("void 0");
        //         break;
        //     case TypeReferenceSerializationKind.BooleanType:
        //         write("Boolean");
        //         break;
        //     case TypeReferenceSerializationKind.NumberLikeType:
        //         write("Number");
        //         break;
        //     case TypeReferenceSerializationKind.StringLikeType:
        //         write("String");
        //         break;
        //     case TypeReferenceSerializationKind.ArrayLikeType:
        //         write("Array");
        //         break;
        //     case TypeReferenceSerializationKind.ESSymbolType:
        //         if (languageVersion < ScriptTarget.ES6) {
        //             write("typeof Symbol === 'function' ? Symbol : Object");
        //         }
        //         else {
        //             write("Symbol");
        //         }
        //         break;
        //     case TypeReferenceSerializationKind.TypeWithCallSignature:
        //         write("Function");
        //         break;
        //     case TypeReferenceSerializationKind.ObjectType:
        //         write("Object");
        //         break;
        // }
    };
    /** Serializes the parameter types of a function or the constructor of a class. Used by the __metadata decorator for a method or set accessor. */
    NodeVisitor.prototype.visitSerializedParameterTypesOfNode = function (node) {
        // // serialization of parameter types uses the following rules:
        // //
        // // * If the declaration is a class, the parameters of the first constructor with a body are used.
        // // * If the declaration is function-like and has a body, the parameters of the function are used.
        // //
        // // For the rules on serializing the type of each parameter declaration, see `serializeTypeOfDeclaration`.
        // if (node) {
        //     let valueDeclaration: FunctionLikeDeclaration;
        //     if (node.kind === SyntaxKind.ClassDeclaration) {
        //         valueDeclaration = getFirstConstructorWithBody(<ClassDeclaration>node);
        //     }
        //     else if (isFunctionLike(node) && nodeIsPresent((<FunctionLikeDeclaration>node).body)) {
        //         valueDeclaration = <FunctionLikeDeclaration>node;
        //     }
        //     if (valueDeclaration) {
        //         const parameters = valueDeclaration.parameters;
        //         const parameterCount = parameters.length;
        //         if (parameterCount > 0) {
        //             for (let i = 0; i < parameterCount; i++) {
        //                 // if (i > 0) {
        //                 //     write(", ");
        //                 // }
        //                 // if (parameters[i].dotDotDotToken) {
        //                 //     let parameterType = parameters[i].type;
        //                 //     if (parameterType.kind === SyntaxKind.ArrayType) {
        //                 //         parameterType = (<ArrayTypeNode>parameterType).elementType;
        //                 //     }
        //                 //     else if (parameterType.kind === SyntaxKind.TypeReference && (<TypeReferenceNode>parameterType).typeArguments && (<TypeReferenceNode>parameterType).typeArguments.length === 1) {
        //                 //         parameterType = (<TypeReferenceNode>parameterType).typeArguments[0];
        //                 //     }
        //                 //     else {
        //                 //         parameterType = undefined;
        //                 //     }
        //                 //     emitSerializedTypeNode(parameterType);
        //                 // }
        //                 // else {
        //                 //     emitSerializedTypeOfNode(parameters[i]);
        //                 // }
        //             }
        //         }
        //     }
        // }
    };
    /** Serializes the return type of function. Used by the __metadata decorator for a method. */
    NodeVisitor.prototype.visitSerializedReturnTypeOfNode = function (node) {
        // if (node && isFunctionLike(node) && (<FunctionLikeDeclaration>node).type) {
        //     emitSerializedTypeNode((<FunctionLikeDeclaration>node).type);
        //     return;
        // }
        // write("void 0");
    };
    NodeVisitor.prototype.visitSerializedTypeMetadata = function (node, writeComma) {
        // // This method emits the serialized type metadata for a decorator target.
        // // The caller should have already tested whether the node has decorators.
        var argumentsWritten = 0;
        // if (compilerOptions.emitDecoratorMetadata) {
        //     if (shouldEmitTypeMetadata(node)) {
        //         if (writeComma) {
        //             write(", ");
        //         }
        //         writeLine();
        //         write("__metadata('design:type', ");
        //         emitSerializedTypeOfNode(node);
        //         write(")");
        //         argumentsWritten++;
        //     }
        //     if (shouldEmitParamTypesMetadata(node)) {
        //         if (writeComma || argumentsWritten) {
        //             write(", ");
        //         }
        //         writeLine();
        //         write("__metadata('design:paramtypes', [");
        //         emitSerializedParameterTypesOfNode(node);
        //         write("])");
        //         argumentsWritten++;
        //     }
        //     if (shouldEmitReturnTypeMetadata(node)) {
        //         if (writeComma || argumentsWritten) {
        //             write(", ");
        //         }
        //         writeLine();
        //         write("__metadata('design:returntype', ");
        //         emitSerializedReturnTypeOfNode(node);
        //         write(")");
        //         argumentsWritten++;
        //     }
        // }
        return argumentsWritten;
    };
    NodeVisitor.prototype.visitInterfaceDeclaration = function (node) {
        // emitCommentsOnNotEmittedNode(node);
    };
    NodeVisitor.prototype.shouldEmitEnumDeclaration = function (node) {
        // const isConstEnum = isConst(node);
        // return !isConstEnum || compilerOptions.preserveConstEnums || compilerOptions.isolatedModules;
    };
    NodeVisitor.prototype.visitEnumDeclaration = function (node) {
        // // const enums are completely erased during compilation.
        // if (!shouldEmitEnumDeclaration(node)) {
        //     return;
        // }
        // if (!shouldHoistDeclarationInSystemJsModule(node)) {
        //     // do not emit var if variable was already hoisted
        //     const isES6ExportedEnum = isES6ExportedDeclaration(node);
        //     if (!(node.flags & NodeFlags.Export) || (isES6ExportedEnum && isFirstDeclarationOfKind(node, node.symbol && node.symbol.declarations, SyntaxKind.EnumDeclaration))) {
        //         emitStart(node);
        //         if (isES6ExportedEnum) {
        //             write("export ");
        //         }
        //         write("var ");
        //         emit(node.name);
        //         emitEnd(node);
        //         write(";");
        //     }
        // }
        // writeLine();
        // emitStart(node);
        // write("(function (");
        // emitStart(node.name);
        // write(getGeneratedNameForNode(node));
        // emitEnd(node.name);
        // write(") {");
        // increaseIndent();
        // emitLines(node.members);
        // decreaseIndent();
        // writeLine();
        // emitToken(SyntaxKind.CloseBraceToken, node.members.end);
        // write(")(");
        // emitModuleMemberName(node);
        // write(" || (");
        // emitModuleMemberName(node);
        // write(" = {}));");
        // emitEnd(node);
        // if (!isES6ExportedDeclaration(node) && node.flags & NodeFlags.Export && !shouldHoistDeclarationInSystemJsModule(node)) {
        //     // do not emit var if variable was already hoisted
        //     writeLine();
        //     emitStart(node);
        //     write("var ");
        //     emit(node.name);
        //     write(" = ");
        //     emitModuleMemberName(node);
        //     emitEnd(node);
        //     write(";");
        // }
        // if (modulekind !== ModuleKind.ES6 && node.parent === currentSourceFile) {
        //     if (modulekind === ModuleKind.System && (node.flags & NodeFlags.Export)) {
        //         // write the call to exporter for enum
        //         writeLine();
        //         write(`${exportFunctionForFile}("`);
        //         emitDeclarationName(node);
        //         write(`", `);
        //         emitDeclarationName(node);
        //         write(");");
        //     }
        //     emitExportMemberAssignments(node.name);
        // }
    };
    NodeVisitor.prototype.visitEnumMember = function (node) {
        // const enumParent = <EnumDeclaration>node.parent;
        // emitStart(node);
        // write(getGeneratedNameForNode(enumParent));
        // write("[");
        // write(getGeneratedNameForNode(enumParent));
        // write("[");
        // emitExpressionForPropertyName(node.name);
        // write("] = ");
        // writeEnumMemberDeclarationValue(node);
        // write("] = ");
        // emitExpressionForPropertyName(node.name);
        // emitEnd(node);
        // write(";");
    };
    NodeVisitor.prototype.writeEnumMemberDeclarationValue = function (member) {
        // const value = resolver.getConstantValue(member);
        // if (value !== undefined) {
        //     write(value.toString());
        //     return;
        // }
        // else if (member.initializer) {
        //     emit(member.initializer);
        // }
        // else {
        //     write("undefined");
        // }
    };
    NodeVisitor.prototype.getInnerMostModuleDeclarationFromDottedModule = function (moduleDeclaration) {
        // if (moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
        //     const recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(<ModuleDeclaration>moduleDeclaration.body);
        //     return recursiveInnerModule || <ModuleDeclaration>moduleDeclaration.body;
        // }
        return;
    };
    NodeVisitor.prototype.shouldEmitModuleDeclaration = function (node) {
        // return isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
    };
    NodeVisitor.prototype.isModuleMergedWithES6Class = function (node) {
        // return languageVersion === ScriptTarget.ES6 && !!(resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalModuleMergesWithClass);
    };
    NodeVisitor.prototype.isFirstDeclarationOfKind = function (node, declarations, kind) {
        // return !forEach(declarations, declaration => declaration.kind === kind && declaration.pos < node.pos);
    };
    NodeVisitor.prototype.visitModuleDeclaration = function (node) {
        // // Emit only if this module is non-ambient.
        // const shouldEmit = shouldEmitModuleDeclaration(node);
        // if (!shouldEmit) {
        //     return emitCommentsOnNotEmittedNode(node);
        // }
        // const hoistedInDeclarationScope = shouldHoistDeclarationInSystemJsModule(node);
        // const emitVarForModule = !hoistedInDeclarationScope && !isModuleMergedWithES6Class(node);
        // if (emitVarForModule) {
        //     const isES6ExportedNamespace = isES6ExportedDeclaration(node);
        //     if (!isES6ExportedNamespace || isFirstDeclarationOfKind(node, node.symbol && node.symbol.declarations, SyntaxKind.ModuleDeclaration)) {
        //         emitStart(node);
        //         if (isES6ExportedNamespace) {
        //             write("export ");
        //         }
        //         write("var ");
        //         emit(node.name);
        //         write(";");
        //         emitEnd(node);
        //         writeLine();
        //     }
        // }
        // emitStart(node);
        // write("(function (");
        // emitStart(node.name);
        // write(getGeneratedNameForNode(node));
        // emitEnd(node.name);
        // write(") ");
        // if (node.body.kind === SyntaxKind.ModuleBlock) {
        //     const saveConvertedLoopState = convertedLoopState;
        //     const saveTempFlags = tempFlags;
        //     const saveTempVariables = tempVariables;
        //     convertedLoopState = undefined;
        //     tempFlags = 0;
        //     tempVariables = undefined;
        //     emit(node.body);
        //     Debug.assert(convertedLoopState === undefined);
        //     convertedLoopState = saveConvertedLoopState;
        //     tempFlags = saveTempFlags;
        //     tempVariables = saveTempVariables;
        // }
        // else {
        //     write("{");
        //     increaseIndent();
        //     emitCaptureThisForNodeIfNecessary(node);
        //     writeLine();
        //     emit(node.body);
        //     decreaseIndent();
        //     writeLine();
        //     const moduleBlock = <ModuleBlock>getInnerMostModuleDeclarationFromDottedModule(node).body;
        //     emitToken(SyntaxKind.CloseBraceToken, moduleBlock.statements.end);
        // }
        // write(")(");
        // // write moduleDecl = containingModule.m only if it is not exported es6 module member
        // if ((node.flags & NodeFlags.Export) && !isES6ExportedDeclaration(node)) {
        //     emit(node.name);
        //     write(" = ");
        // }
        // emitModuleMemberName(node);
        // write(" || (");
        // emitModuleMemberName(node);
        // write(" = {}));");
        // emitEnd(node);
        // if (!isES6ExportedDeclaration(node) && node.name.kind === SyntaxKind.Identifier && node.parent === currentSourceFile) {
        //     if (modulekind === ModuleKind.System && (node.flags & NodeFlags.Export)) {
        //         writeLine();
        //         write(`${exportFunctionForFile}("`);
        //         emitDeclarationName(node);
        //         write(`", `);
        //         emitDeclarationName(node);
        //         write(");");
        //     }
        //     emitExportMemberAssignments(<Identifier>node.name);
        // }
    };
    /*
     * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
     * Here we check if alternative name was provided for a given moduleName and return it if possible.
     */
    NodeVisitor.prototype.tryRenameExternalModule = function (moduleName) {
        // if (renamedDependencies && hasProperty(renamedDependencies, moduleName.text)) {
        //     return `"${renamedDependencies[moduleName.text]}"`;
        // }
        return undefined;
    };
    NodeVisitor.prototype.visitRequire = function (moduleName) {
        // if (moduleName.kind === SyntaxKind.StringLiteral) {
        //     write("require(");
        //     const text = tryRenameExternalModule(<LiteralExpression>moduleName);
        //     if (text) {
        //         write(text);
        //     }
        //     else {
        //         emitStart(moduleName);
        //         emitLiteral(<LiteralExpression>moduleName);
        //         emitEnd(moduleName);
        //     }
        //     emitToken(SyntaxKind.CloseParenToken, moduleName.end);
        // }
        // else {
        //     write("require()");
        // }
    };
    NodeVisitor.prototype.getNamespaceDeclarationNode = function (node) {
        // if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
        //     return <ImportEqualsDeclaration>node;
        // }
        // const importClause = (<ImportDeclaration>node).importClause;
        // if (importClause && importClause.namedBindings && importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
        //     return <NamespaceImport>importClause.namedBindings;
        // }
    };
    NodeVisitor.prototype.isDefaultImport = function (node) {
        // return node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).importClause && !!(<ImportDeclaration>node).importClause.name;
    };
    NodeVisitor.prototype.visitExportImportAssignments = function (node) {
        // if (isAliasSymbolDeclaration(node) && resolver.isValueAliasDeclaration(node)) {
        //     emitExportMemberAssignments(<Identifier>(<Declaration>node).name);
        // }
        // forEachChild(node, emitExportImportAssignments);
    };
    NodeVisitor.prototype.visitImportDeclaration = function (node) {
        // if (modulekind !== ModuleKind.ES6) {
        //     return emitExternalImportDeclaration(node);
        // }
        // // ES6 import
        // if (node.importClause) {
        //     const shouldEmitDefaultBindings = resolver.isReferencedAliasDeclaration(node.importClause);
        //     const shouldEmitNamedBindings = node.importClause.namedBindings && resolver.isReferencedAliasDeclaration(node.importClause.namedBindings, /* checkChildren */ true);
        //     if (shouldEmitDefaultBindings || shouldEmitNamedBindings) {
        //         write("import ");
        //         emitStart(node.importClause);
        //         if (shouldEmitDefaultBindings) {
        //             emit(node.importClause.name);
        //             if (shouldEmitNamedBindings) {
        //                 // write(", ");
        //             }
        //         }
        //         if (shouldEmitNamedBindings) {
        //             emitLeadingComments(node.importClause.namedBindings);
        //             emitStart(node.importClause.namedBindings);
        //             if (node.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
        //                 // write("* as ");
        //                 // emit((<NamespaceImport>node.importClause.namedBindings).name);
        //             }
        //             else {
        //                 // write("{ ");
        //                 // emitExportOrImportSpecifierList((<NamedImports>node.importClause.namedBindings).elements, resolver.isReferencedAliasDeclaration);
        //                 // write(" }");
        //             }
        //             emitEnd(node.importClause.namedBindings);
        //             emitTrailingComments(node.importClause.namedBindings);
        //         }
        //         emitEnd(node.importClause);
        //         write(" from ");
        //         emit(node.moduleSpecifier);
        //         write(";");
        //     }
        // }
        // else {
        //     write("import ");
        //     emit(node.moduleSpecifier);
        //     write(";");
        // }
    };
    NodeVisitor.prototype.visitExternalImportDeclaration = function (node) {
        // if (contains(externalImports, node)) {
        //     const isExportedImport = node.kind === SyntaxKind.ImportEqualsDeclaration && (node.flags & NodeFlags.Export) !== 0;
        //     const namespaceDeclaration = getNamespaceDeclarationNode(node);
        //     const varOrConst = (languageVersion <= ScriptTarget.ES5) ? "var " : "const ";
        //     if (modulekind !== ModuleKind.AMD) {
        //         emitLeadingComments(node);
        //         emitStart(node);
        //         if (namespaceDeclaration && !isDefaultImport(node)) {
        //             // import x = require("foo")
        //             // import * as x from "foo"
        //             if (!isExportedImport) {
        //                 // write(varOrConst);
        //             };
        //             emitModuleMemberName(namespaceDeclaration);
        //             write(" = ");
        //         }
        //         else {
        //             // import "foo"
        //             // import x from "foo"
        //             // import { x, y } from "foo"
        //             // import d, * as x from "foo"
        //             // import d, { x, y } from "foo"
        //             const isNakedImport = SyntaxKind.ImportDeclaration && !(<ImportDeclaration>node).importClause;
        //             if (!isNakedImport) {
        //                 // write(varOrConst);
        //                 // write(getGeneratedNameForNode(<ImportDeclaration>node));
        //                 // write(" = ");
        //             }
        //         }
        //         emitRequire(getExternalModuleName(node));
        //         if (namespaceDeclaration && isDefaultImport(node)) {
        //             // import d, * as x from "foo"
        //             write(", ");
        //             emitModuleMemberName(namespaceDeclaration);
        //             write(" = ");
        //             write(getGeneratedNameForNode(<ImportDeclaration>node));
        //         }
        //         write(";");
        //         emitEnd(node);
        //         emitExportImportAssignments(node);
        //         emitTrailingComments(node);
        //     }
        //     else {
        //         if (isExportedImport) {
        //             emitModuleMemberName(namespaceDeclaration);
        //             write(" = ");
        //             emit(namespaceDeclaration.name);
        //             write(";");
        //         }
        //         else if (namespaceDeclaration && isDefaultImport(node)) {
        //             // import d, * as x from "foo"
        //             write(varOrConst);
        //             emitModuleMemberName(namespaceDeclaration);
        //             write(" = ");
        //             write(getGeneratedNameForNode(<ImportDeclaration>node));
        //             write(";");
        //         }
        //         emitExportImportAssignments(node);
        //     }
        // }
    };
    NodeVisitor.prototype.visitImportEqualsDeclaration = function (node) {
        // if (isExternalModuleImportEqualsDeclaration(node)) {
        //     emitExternalImportDeclaration(node);
        //     return;
        // }
        // // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
        // // - current file is not external module
        // // - import declaration is top level and target is value imported by entity name
        // if (resolver.isReferencedAliasDeclaration(node) ||
        //     (!isCurrentFileExternalModule && resolver.isTopLevelValueImportEqualsWithEntityName(node))) {
        //     emitLeadingComments(node);
        //     emitStart(node);
        //     // variable declaration for import-equals declaration can be hoisted in system modules
        //     // in this case 'var' should be omitted and emit should contain only initialization
        //     const variableDeclarationIsHoisted = shouldHoistVariable(node, /*checkIfSourceFileLevelDecl*/ true);
        //     // is it top level export import v = a.b.c in system module?
        //     // if yes - it needs to be rewritten as exporter('v', v = a.b.c)
        //     const isExported = isSourceFileLevelDeclarationInSystemJsModule(node, /*isExported*/ true);
        //     if (!variableDeclarationIsHoisted) {
        //         Debug.assert(!isExported);
        //         if (isES6ExportedDeclaration(node)) {
        //             write("export ");
        //             write("var ");
        //         }
        //         else if (!(node.flags & NodeFlags.Export)) {
        //             write("var ");
        //         }
        //     }
        //     if (isExported) {
        //         write(`${exportFunctionForFile}("`);
        //         emitNodeWithoutSourceMap(node.name);
        //         write(`", `);
        //     }
        //     emitModuleMemberName(node);
        //     write(" = ");
        //     emit(node.moduleReference);
        //     if (isExported) {
        //         write(")");
        //     }
        //     write(";");
        //     emitEnd(node);
        //     emitExportImportAssignments(node);
        //     emitTrailingComments(node);
        // }
    };
    NodeVisitor.prototype.visitExportDeclaration = function (node) {
        // Debug.assert(modulekind !== ModuleKind.System);
        // if (modulekind !== ModuleKind.ES6) {
        //     if (node.moduleSpecifier && (!node.exportClause || resolver.isValueAliasDeclaration(node))) {
        //         emitStart(node);
        //         const generatedName = getGeneratedNameForNode(node);
        //         if (node.exportClause) {
        //             // export { x, y, ... } from "foo"
        //             if (modulekind !== ModuleKind.AMD) {
        //                 // write("var ");
        //                 // write(generatedName);
        //                 // write(" = ");
        //                 // emitRequire(getExternalModuleName(node));
        //                 // write(";");
        //             }
        //             for (const specifier of node.exportClause.elements) {
        //                 // if (resolver.isValueAliasDeclaration(specifier)) {
        //                 //     writeLine();
        //                 //     emitStart(specifier);
        //                 //     emitContainingModuleName(specifier);
        //                 //     write(".");
        //                 //     emitNodeWithCommentsAndWithoutSourcemap(specifier.name);
        //                 //     write(" = ");
        //                 //     write(generatedName);
        //                 //     write(".");
        //                 //     emitNodeWithCommentsAndWithoutSourcemap(specifier.propertyName || specifier.name);
        //                 //     write(";");
        //                 //     emitEnd(specifier);
        //                 // }
        //             }
        //         }
        //         else {
        //             // export * from "foo"
        //             if (hasExportStarsToExportValues && resolver.moduleExportsSomeValue(node.moduleSpecifier)) {
        //                 // writeLine();
        //                 // write("__export(");
        //                 // if (modulekind !== ModuleKind.AMD) {
        //                 //     emitRequire(getExternalModuleName(node));
        //                 // }
        //                 // else {
        //                 //     write(generatedName);
        //                 // }
        //                 // write(");");
        //             }
        //         }
        //         emitEnd(node);
        //     }
        // }
        // else {
        //     if (!node.exportClause || resolver.isValueAliasDeclaration(node)) {
        //         write("export ");
        //         if (node.exportClause) {
        //             // export { x, y, ... }
        //             write("{ ");
        //             emitExportOrImportSpecifierList(node.exportClause.elements, resolver.isValueAliasDeclaration);
        //             write(" }");
        //         }
        //         else {
        //             write("*");
        //         }
        //         if (node.moduleSpecifier) {
        //             write(" from ");
        //             emit(node.moduleSpecifier);
        //         }
        //         write(";");
        //     }
        // }
    };
    NodeVisitor.prototype.visitExportOrImportSpecifierList = function (specifiers, shouldEmit) {
        // Debug.assert(modulekind === ModuleKind.ES6);
        // let needsComma = false;
        // for (const specifier of specifiers) {
        //     if (shouldEmit(specifier)) {
        //         if (needsComma) {
        //             write(", ");
        //         }
        //         if (specifier.propertyName) {
        //             emit(specifier.propertyName);
        //             write(" as ");
        //         }
        //         emit(specifier.name);
        //         needsComma = true;
        //     }
        // }
    };
    NodeVisitor.prototype.visitExportAssignment = function (node) {
        // if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
        //     if (modulekind === ModuleKind.ES6) {
        //         writeLine();
        //         emitStart(node);
        //         write("export default ");
        //         const expression = node.expression;
        //         emit(expression);
        //         if (expression.kind !== SyntaxKind.FunctionDeclaration &&
        //             expression.kind !== SyntaxKind.ClassDeclaration) {
        //             write(";");
        //         }
        //         emitEnd(node);
        //     }
        //     else {
        //         writeLine();
        //         emitStart(node);
        //         if (modulekind === ModuleKind.System) {
        //             write(`${exportFunctionForFile}("default",`);
        //             emit(node.expression);
        //             write(")");
        //         }
        //         else {
        //             emitEs6ExportDefaultCompat(node);
        //             emitContainingModuleName(node);
        //             if (languageVersion === ScriptTarget.ES3) {
        //                 // write('["default"] = ');
        //             }
        //             else {
        //                 // write(".default = ");
        //             }
        //             emit(node.expression);
        //         }
        //         write(";");
        //         emitEnd(node);
        //     }
        // }
    };
    NodeVisitor.prototype.collectExternalModuleInfo = function (sourceFile) {
        // externalImports = [];
        // exportSpecifiers = {};
        // exportEquals = undefined;
        // hasExportStarsToExportValues = false;
        // for (const node of sourceFile.statements) {
        //     switch (node.kind) {
        //         case SyntaxKind.ImportDeclaration:
        //             if (!(<ImportDeclaration>node).importClause ||
        //                 // resolver.isReferencedAliasDeclaration((<ImportDeclaration>node).importClause, /*checkChildren*/ true)) {
        //                 // // import "mod"
        //                 // // import x from "mod" where x is referenced
        //                 // // import * as x from "mod" where x is referenced
        //                 // // import { x, y } from "mod" where at least one import is referenced
        //                 // externalImports.push(<ImportDeclaration>node);
        //             }
        //             break;
        //         case SyntaxKind.ImportEqualsDeclaration:
        //             if ((<ImportEqualsDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference && resolver.isReferencedAliasDeclaration(node)) {
        //                 // // import x = require("mod") where x is referenced
        //                 // externalImports.push(<ImportEqualsDeclaration>node);
        //             }
        //             break;
        //         case SyntaxKind.ExportDeclaration:
        //             if ((<ExportDeclaration>node).moduleSpecifier) {
        //                 // if (!(<ExportDeclaration>node).exportClause) {
        //                 //     // export * from "mod"
        //                 //     if (resolver.moduleExportsSomeValue((<ExportDeclaration>node).moduleSpecifier)) {
        //                 //         externalImports.push(<ExportDeclaration>node);
        //                 //         hasExportStarsToExportValues = true;
        //                 //     }
        //                 // }
        //                 // else if (resolver.isValueAliasDeclaration(node)) {
        //                 //     // export { x, y } from "mod" where at least one export is a value symbol
        //                 //     externalImports.push(<ExportDeclaration>node);
        //                 // }
        //             }
        //             else {
        //                 // // export { x, y }
        //                 // for (const specifier of (<ExportDeclaration>node).exportClause.elements) {
        //                 //     const name = (specifier.propertyName || specifier.name).text;
        //                 //     (exportSpecifiers[name] || (exportSpecifiers[name] = [])).push(specifier);
        //                 // }
        //             }
        //             break;
        //         case SyntaxKind.ExportAssignment:
        //             if ((<ExportAssignment>node).isExportEquals && !exportEquals) {
        //                 // // export = x
        //                 // exportEquals = <ExportAssignment>node;
        //             }
        //             break;
        //     }
        // }
    };
    NodeVisitor.prototype.visitExportStarHelper = function () {
        // if (hasExportStarsToExportValues) {
        //     writeLine();
        //     write("function __export(m) {");
        //     increaseIndent();
        //     writeLine();
        //     write("for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];");
        //     decreaseIndent();
        //     writeLine();
        //     write("}");
        // }
    };
    NodeVisitor.prototype.getLocalNameForExternalImport = function (node) {
        // const namespaceDeclaration = getNamespaceDeclarationNode(node);
        // if (namespaceDeclaration && !isDefaultImport(node)) {
        //     return getTextOfNodeFromSourceText(currentText, namespaceDeclaration.name);
        // }
        // if (node.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>node).importClause) {
        //     return getGeneratedNameForNode(node);
        // }
        // if (node.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>node).moduleSpecifier) {
        //     return getGeneratedNameForNode(node);
        // }
        return;
    };
    NodeVisitor.prototype.getExternalModuleNameText = function (importNode, emitRelativePathAsModuleName) {
        // if (emitRelativePathAsModuleName) {
        //     const name = getExternalModuleNameFromDeclaration(host, resolver, importNode);
        //     if (name) {
        //         return `"${name}"`;
        //     }
        // }
        // const moduleName = getExternalModuleName(importNode);
        // if (moduleName.kind === SyntaxKind.StringLiteral) {
        //     return tryRenameExternalModule(<LiteralExpression>moduleName) || getLiteralText(<LiteralExpression>moduleName);
        // }
        return undefined;
    };
    NodeVisitor.prototype.visitVariableDeclarationsForImports = function () {
        // if (externalImports.length === 0) {
        //     return;
        // }
        // writeLine();
        // let started = false;
        // for (const importNode of externalImports) {
        //     // do not create variable declaration for exports and imports that lack import clause
        //     const skipNode =
        //         importNode.kind === SyntaxKind.ExportDeclaration ||
        //         (importNode.kind === SyntaxKind.ImportDeclaration && !(<ImportDeclaration>importNode).importClause);
        //     if (skipNode) {
        //         continue;
        //     }
        //     if (!started) {
        //         write("var ");
        //         started = true;
        //     }
        //     else {
        //         write(", ");
        //     }
        //     write(getLocalNameForExternalImport(importNode));
        // }
        // if (started) {
        //     write(";");
        // }
    };
    NodeVisitor.prototype.visitLocalStorageForExportedNamesIfNecessary = function (exportedDeclarations) {
        // // when resolving exports local exported entries/indirect exported entries in the module
        // // should always win over entries with similar names that were added via star exports
        // // to support this we store names of local/indirect exported entries in a set.
        // // this set is used to filter names brought by star exports.
        // if (!hasExportStarsToExportValues) {
        //     // local names set is needed only in presence of star exports
        //     return undefined;
        // }
        // // local names set should only be added if we have anything exported
        // if (!exportedDeclarations && isEmpty(exportSpecifiers)) {
        //     // no exported declarations (export var ...) or export specifiers (export {x})
        //     // check if we have any non star export declarations.
        //     let hasExportDeclarationWithExportClause = false;
        //     for (const externalImport of externalImports) {
        //         if (externalImport.kind === SyntaxKind.ExportDeclaration && (<ExportDeclaration>externalImport).exportClause) {
        //             hasExportDeclarationWithExportClause = true;
        //             break;
        //         }
        //     }
        //     if (!hasExportDeclarationWithExportClause) {
        //         // we still need to emit exportStar helper
        //         return emitExportStarFunction(/*localNames*/ undefined);
        //     }
        // }
        // const exportedNamesStorageRef = makeUniqueName("exportedNames");
        // writeLine();
        // write(`var ${exportedNamesStorageRef} = {`);
        // increaseIndent();
        // let started = false;
        // if (exportedDeclarations) {
        //     for (let i = 0; i < exportedDeclarations.length; i++) {
        //         // write name of exported declaration, i.e 'export var x...'
        //         writeExportedName(exportedDeclarations[i]);
        //     }
        // }
        // if (exportSpecifiers) {
        //     for (const n in exportSpecifiers) {
        //         for (const specifier of exportSpecifiers[n]) {
        //             // write name of export specified, i.e. 'export {x}'
        //             writeExportedName(specifier.name);
        //         }
        //     }
        // }
        // for (const externalImport of externalImports) {
        //     if (externalImport.kind !== SyntaxKind.ExportDeclaration) {
        //         continue;
        //     }
        //     const exportDecl = <ExportDeclaration>externalImport;
        //     if (!exportDecl.exportClause) {
        //         // export * from ...
        //         continue;
        //     }
        //     for (const element of exportDecl.exportClause.elements) {
        //         // write name of indirectly exported entry, i.e. 'export {x} from ...'
        //         writeExportedName(element.name || element.propertyName);
        //     }
        // }
        // decreaseIndent();
        // writeLine();
        // write("};");
        // return emitExportStarFunction(exportedNamesStorageRef);
        // protected visitExportStarFunction(localNames: string): string {
        //     const exportStarFunction = makeUniqueName("exportStar");
        //     writeLine();
        //     // define an export star helper function
        //     write(`function ${exportStarFunction}(m) {`);
        //     increaseIndent();
        //     writeLine();
        //     write(`var exports = {};`);
        //     writeLine();
        //     write(`for(var n in m) {`);
        //     increaseIndent();
        //     writeLine();
        //     write(`if (n !== "default"`);
        //     if (localNames) {
        //         write(`&& !${localNames}.hasOwnProperty(n)`);
        //     }
        //     write(`) exports[n] = m[n];`);
        //     decreaseIndent();
        //     writeLine();
        //     write("}");
        //     writeLine();
        //     write(`${exportFunctionForFile}(exports);`);
        //     decreaseIndent();
        //     writeLine();
        //     write("}");
        //     return exportStarFunction;
        // }
        // function writeExportedName(node: ts.Identifier | Declaration): void {
        //     // do not record default exports
        //     // they are local to module and never overwritten (explicitly skipped) by star export
        //     if (node.kind !== SyntaxKind.Identifier && node.flags & NodeFlags.Default) {
        //         return;
        //     }
        //     if (started) {
        //         write(",");
        //     }
        //     else {
        //         started = true;
        //     }
        //     writeLine();
        //     write("'");
        //     if (node.kind === SyntaxKind.Identifier) {
        //         emitNodeWithCommentsAndWithoutSourcemap(node);
        //     }
        //     else {
        //         emitDeclarationName(<Declaration>node);
        //     }
        //     write("': true");
        // }
        return;
    };
    NodeVisitor.prototype.processTopLevelVariableAndFunctionDeclarations = function (node) {
        // // per ES6 spec:
        // // 15.2.1.16.4 ModuleDeclarationInstantiation() Concrete Method
        // // - var declarations are initialized to undefined - 14.a.ii
        // // - function/generator declarations are instantiated - 16.a.iv
        // // this means that after module is instantiated but before its evaluation
        // // exported functions are already accessible at import sites
        // // in theory we should hoist only exported functions and its dependencies
        // // in practice to simplify things we'll hoist all source level functions and variable declaration
        // // including variables declarations for module and class declarations
        // let hoistedVars: (Identifier | ClassDeclaration | ModuleDeclaration | EnumDeclaration)[];
        // let hoistedFunctionDeclarations: FunctionDeclaration[];
        // let exportedDeclarations: (Identifier | Declaration)[];
        // visit(node);
        // if (hoistedVars) {
        //     writeLine();
        //     write("var ");
        //     const seen: Map<string> = {};
        //     for (let i = 0; i < hoistedVars.length; i++) {
        //         const local = hoistedVars[i];
        //         const name = local.kind === SyntaxKind.Identifier
        //             ? <Identifier>local
        //             : <Identifier>(<ClassDeclaration | ModuleDeclaration | EnumDeclaration>local).name;
        //         if (name) {
        //             // do not emit duplicate entries (in case of declaration merging) in the list of hoisted variables
        //             const text = unescapeIdentifier(name.text);
        //             if (hasProperty(seen, text)) {
        //                 // continue;
        //             }
        //             else {
        //                 // seen[text] = text;
        //             }
        //         }
        //         if (i !== 0) {
        //             write(", ");
        //         }
        //         if (local.kind === SyntaxKind.ClassDeclaration || local.kind === SyntaxKind.ModuleDeclaration || local.kind === SyntaxKind.EnumDeclaration) {
        //             emitDeclarationName(<ClassDeclaration | ModuleDeclaration | EnumDeclaration>local);
        //         }
        //         else {
        //             emit(local);
        //         }
        //         const flags = getCombinedNodeFlags(local.kind === SyntaxKind.Identifier ? local.parent : local);
        //         if (flags & NodeFlags.Export) {
        //             if (!exportedDeclarations) {
        //                 // exportedDeclarations = [];
        //             }
        //             exportedDeclarations.push(local);
        //         }
        //     }
        //     write(";");
        // }
        // if (hoistedFunctionDeclarations) {
        //     for (const f of hoistedFunctionDeclarations) {
        //         writeLine();
        //         emit(f);
        //         if (f.flags & NodeFlags.Export) {
        //             if (!exportedDeclarations) {
        //                 // exportedDeclarations = [];
        //             }
        //             exportedDeclarations.push(f);
        //         }
        //     }
        // }
        // return exportedDeclarations;
        // function visit(node: ts.Node): void {
        //     if (node.flags & NodeFlags.Ambient) {
        //         return;
        //     }
        //     if (node.kind === SyntaxKind.FunctionDeclaration) {
        //         if (!hoistedFunctionDeclarations) {
        //             hoistedFunctionDeclarations = [];
        //         }
        //         hoistedFunctionDeclarations.push(<FunctionDeclaration>node);
        //         return;
        //     }
        //     if (node.kind === SyntaxKind.ClassDeclaration) {
        //         if (!hoistedVars) {
        //             hoistedVars = [];
        //         }
        //         hoistedVars.push(<ClassDeclaration>node);
        //         return;
        //     }
        //     if (node.kind === SyntaxKind.EnumDeclaration) {
        //         if (shouldEmitEnumDeclaration(<EnumDeclaration>node)) {
        //             if (!hoistedVars) {
        //                 // hoistedVars = [];
        //             }
        //             hoistedVars.push(<ModuleDeclaration>node);
        //         }
        //         return;
        //     }
        //     if (node.kind === SyntaxKind.ModuleDeclaration) {
        //         if (shouldEmitModuleDeclaration(<ModuleDeclaration>node)) {
        //             if (!hoistedVars) {
        //                 // hoistedVars = [];
        //             }
        //             hoistedVars.push(<ModuleDeclaration>node);
        //         }
        //         return;
        //     }
        //     if (node.kind === SyntaxKind.VariableDeclaration || node.kind === SyntaxKind.BindingElement) {
        //         if (shouldHoistVariable(<VariableDeclaration | BindingElement>node, /*checkIfSourceFileLevelDecl*/ false)) {
        //             const name = (<VariableDeclaration | BindingElement>node).name;
        //             if (name.kind === SyntaxKind.Identifier) {
        //                 // if (!hoistedVars) {
        //                 //     hoistedVars = [];
        //                 // }
        //                 // hoistedVars.push(<Identifier>name);
        //             }
        //             else {
        //                 // forEachChild(name, visit);
        //             }
        //         }
        //         return;
        //     }
        //     if (isInternalModuleImportEqualsDeclaration(node) && resolver.isValueAliasDeclaration(node)) {
        //         if (!hoistedVars) {
        //             hoistedVars = [];
        //         }
        //         hoistedVars.push(node.name);
        //         return;
        //     }
        //     if (isBindingPattern(node)) {
        //         forEach((<BindingPattern>node).elements, visit);
        //         return;
        //     }
        //     if (!isDeclaration(node)) {
        //         forEachChild(node, visit);
        //     }
        // }
        return;
    };
    NodeVisitor.prototype.shouldHoistVariable = function (node, checkIfSourceFileLevelDecl) {
        // if (checkIfSourceFileLevelDecl && !shouldHoistDeclarationInSystemJsModule(node)) {
        //     return false;
        // }
        // // hoist variable if
        // // - it is not block scoped
        // // - it is top level block scoped
        // // if block scoped variables are nested in some another block then
        // // no other functions can use them except ones that are defined at least in the same block
        // return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === 0 ||
        //     getEnclosingBlockScopeContainer(node).kind === SyntaxKind.SourceFile;
        return;
    };
    NodeVisitor.prototype.isCurrentFileSystemExternalModule = function () {
        // return modulekind === ModuleKind.System && isCurrentFileExternalModule;
    };
    NodeVisitor.prototype.visitSystemModuleBody = function (node, dependencyGroups, startIndex) {
        // // shape of the body in system modules:
        // // function (exports) {
        // //     <list of local aliases for imports>
        // //     <hoisted function declarations>
        // //     <hoisted variable declarations>
        // //     return {
        // //         setters: [
        // //             <list of setter function for imports>
        // //         ],
        // //         execute: function() {
        // //             <module statements>
        // //         }
        // //     }
        // //     <temp declarations>
        // // }
        // // I.e:
        // // import {x} from 'file1'
        // // var y = 1;
        // // export function foo() { return y + x(); }
        // // console.log(y);
        // // will be transformed to
        // // function(exports) {
        // //     var file1; // local alias
        // //     var y;
        // //     function foo() { return y + file1.x(); }
        // //     exports("foo", foo);
        // //     return {
        // //         setters: [
        // //             function(v) { file1 = v }
        // //         ],
        // //         execute(): function() {
        // //             y = 1;
        // //             console.log(y);
        // //         }
        // //     };
        // // }
        // emitVariableDeclarationsForImports();
        // writeLine();
        // const exportedDeclarations = processTopLevelVariableAndFunctionDeclarations(node);
        // const exportStarFunction = emitLocalStorageForExportedNamesIfNecessary(exportedDeclarations);
        // writeLine();
        // write("return {");
        // increaseIndent();
        // writeLine();
        // emitSetters(exportStarFunction, dependencyGroups);
        // writeLine();
        // emitExecute(node, startIndex);
        // decreaseIndent();
        // writeLine();
        // write("}"); // return
        // emitTempDeclarations(/*newLine*/ true);
    };
    NodeVisitor.prototype.visitSetters = function (exportStarFunction, dependencyGroups) {
        // write("setters:[");
        // for (let i = 0; i < dependencyGroups.length; i++) {
        //     if (i !== 0) {
        //         write(",");
        //     }
        //     writeLine();
        //     increaseIndent();
        //     const group = dependencyGroups[i];
        //     // derive a unique name for parameter from the first named entry in the group
        //     const parameterName = makeUniqueName(forEach(group, getLocalNameForExternalImport) || "");
        //     write(`function (${parameterName}) {`);
        //     increaseIndent();
        //     for (const entry of group) {
        //         const importVariableName = getLocalNameForExternalImport(entry) || "";
        //         switch (entry.kind) {
        //             case SyntaxKind.ImportDeclaration:
        //                 // if (!(<ImportDeclaration>entry).importClause) {
        //                 //     // 'import "..."' case
        //                 //     // module is imported only for side-effects, no emit required
        //                 //     break;
        //                 // }
        //             // fall-through
        //             case SyntaxKind.ImportEqualsDeclaration:
        //                 // Debug.assert(importVariableName !== "");
        //                 // writeLine();
        //                 // // save import into the local
        //                 // write(`${importVariableName} = ${parameterName};`);
        //                 // writeLine();
        //                 // break;
        //             case SyntaxKind.ExportDeclaration:
        //                 // Debug.assert(importVariableName !== "");
        //                 // if ((<ExportDeclaration>entry).exportClause) {
        //                 //     // export {a, b as c} from 'foo'
        //                 //     // emit as:
        //                 //     // exports_({
        //                 //     //    "a": _["a"],
        //                 //     //    "c": _["b"]
        //                 //     // });
        //                 //     writeLine();
        //                 //     write(`${exportFunctionForFile}({`);
        //                 //     writeLine();
        //                 //     increaseIndent();
        //                 //     for (let i = 0, len = (<ExportDeclaration>entry).exportClause.elements.length; i < len; i++) {
        //                 //         if (i !== 0) {
        //                 //             write(",");
        //                 //             writeLine();
        //                 //         }
        //                 //         const e = (<ExportDeclaration>entry).exportClause.elements[i];
        //                 //         write(`"`);
        //                 //         emitNodeWithCommentsAndWithoutSourcemap(e.name);
        //                 //         write(`": ${parameterName}["`);
        //                 //         emitNodeWithCommentsAndWithoutSourcemap(e.propertyName || e.name);
        //                 //         write(`"]`);
        //                 //     }
        //                 //     decreaseIndent();
        //                 //     writeLine();
        //                 //     write("});");
        //                 // }
        //                 // else {
        //                 //     // collectExternalModuleInfo prefilters star exports to keep only ones that export values
        //                 //     // this means that check 'resolver.moduleExportsSomeValue' is redundant and can be omitted here
        //                 //     writeLine();
        //                 //     // export * from 'foo'
        //                 //     // emit as:
        //                 //     // exportStar(_foo);
        //                 //     write(`${exportStarFunction}(${parameterName});`);
        //                 // }
        //                 // writeLine();
        //                 // break;
        //         }
        //     }
        //     decreaseIndent();
        //     write("}");
        //     decreaseIndent();
        // }
        // write("],");
    };
    NodeVisitor.prototype.visitExecute = function (node, startIndex) {
        // write("execute: function() {");
        // increaseIndent();
        // writeLine();
        // for (let i = startIndex; i < node.statements.length; i++) {
        //     const statement = node.statements[i];
        //     switch (statement.kind) {
        //         // - function declarations are not emitted because they were already hoisted
        //         // - import declarations are not emitted since they are already handled in setters
        //         // - export declarations with module specifiers are not emitted since they were already written in setters
        //         // - export declarations without module specifiers are emitted preserving the order
        //         case SyntaxKind.FunctionDeclaration:
        //         case SyntaxKind.ImportDeclaration:
        //             continue;
        //         case SyntaxKind.ExportDeclaration:
        //             if (!(<ExportDeclaration>statement).moduleSpecifier) {
        //                 // for (const element of (<ExportDeclaration>statement).exportClause.elements) {
        //                 //     // write call to exporter function for every export specifier in exports list
        //                 //     emitExportSpecifierInSystemModule(element);
        //                 // }
        //             }
        //             continue;
        //         case SyntaxKind.ImportEqualsDeclaration:
        //             if (!isInternalModuleImportEqualsDeclaration(statement)) {
        //                 // // - import equals declarations that import external modules are not emitted
        //                 // continue;
        //             }
        //             // fall-though for import declarations that import internal modules
        //         default:
        //             writeLine();
        //             emit(statement);
        //     }
        // }
        // decreaseIndent();
        // writeLine();
        // write("}"); // execute
    };
    NodeVisitor.prototype.writeModuleName = function (node, emitRelativePathAsModuleName) {
        // let moduleName = node.moduleName;
        // if (moduleName || (emitRelativePathAsModuleName && (moduleName = getResolvedExternalModuleName(host, node)))) {
        //     write(`"${moduleName}", `);
        // }
    };
    NodeVisitor.prototype.visitSystemModule = function (node, emitRelativePathAsModuleName) {
        // collectExternalModuleInfo(node);
        // // System modules has the following shape
        // // System.register(['dep-1', ... 'dep-n'], function(exports) {/* module body function */})
        // // 'exports' here is a function 'exports<T>(name: string, value: T): T' that is used to publish exported values.
        // // 'exports' returns its 'value' argument so in most cases expressions
        // // that mutate exported values can be rewritten as:
        // // expr -> exports('name', expr).
        // // The only exception in this rule is postfix unary operators,
        // // see comment to 'emitPostfixUnaryExpression' for more details
        // Debug.assert(!exportFunctionForFile);
        // // make sure that  name of 'exports' function does not conflict with existing identifiers
        // exportFunctionForFile = makeUniqueName("exports");
        // contextObjectForFile = makeUniqueName("context");
        // writeLine();
        // write("System.register(");
        // writeModuleName(node, emitRelativePathAsModuleName);
        // write("[");
        // const groupIndices: Map<number> = {};
        // const dependencyGroups: DependencyGroup[] = [];
        // for (let i = 0; i < externalImports.length; i++) {
        //     const text = getExternalModuleNameText(externalImports[i], emitRelativePathAsModuleName);
        //     if (text === undefined) {
        //         continue;
        //     }
        //     // text should be quoted string
        //     // for deduplication purposes in key remove leading and trailing quotes so 'a' and "a" will be considered the same
        //     const key = text.substr(1, text.length - 2);
        //     if (hasProperty(groupIndices, key)) {
        //         // deduplicate/group entries in dependency list by the dependency name
        //         const groupIndex = groupIndices[key];
        //         dependencyGroups[groupIndex].push(externalImports[i]);
        //         continue;
        //     }
        //     else {
        //         groupIndices[key] = dependencyGroups.length;
        //         dependencyGroups.push([externalImports[i]]);
        //     }
        //     if (i !== 0) {
        //         write(", ");
        //     }
        //     write(text);
        // }
        // write(`], function(${exportFunctionForFile}, ${contextObjectForFile}) {`);
        // writeLine();
        // increaseIndent();
        // const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ true, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
        // writeLine();
        // write(`var __moduleName = ${contextObjectForFile} && ${contextObjectForFile}.id;`);
        // writeLine();
        // emitEmitHelpers(node);
        // emitCaptureThisForNodeIfNecessary(node);
        // emitSystemModuleBody(node, dependencyGroups, startIndex);
        // decreaseIndent();
        // writeLine();
        // write("});");
    };
    NodeVisitor.prototype.getAMDDependencyNames = function (node, includeNonAmdDependencies, emitRelativePathAsModuleName) {
        // // names of modules with corresponding parameter in the factory function
        // const aliasedModuleNames: string[] = [];
        // // names of modules with no corresponding parameters in factory function
        // const unaliasedModuleNames: string[] = [];
        // const importAliasNames: string[] = [];     // names of the parameters in the factory function; these
        // // parameters need to match the indexes of the corresponding
        // // module names in aliasedModuleNames.
        // // Fill in amd-dependency tags
        // for (const amdDependency of node.amdDependencies) {
        //     if (amdDependency.name) {
        //         aliasedModuleNames.push('"' + amdDependency.path + '"');
        //         importAliasNames.push(amdDependency.name);
        //     }
        //     else {
        //         unaliasedModuleNames.push('"' + amdDependency.path + '"');
        //     }
        // }
        // for (const importNode of externalImports) {
        //     // Find the name of the external module
        //     const externalModuleName = getExternalModuleNameText(importNode, emitRelativePathAsModuleName);
        //     // Find the name of the module alias, if there is one
        //     const importAliasName = getLocalNameForExternalImport(importNode);
        //     if (includeNonAmdDependencies && importAliasName) {
        //         aliasedModuleNames.push(externalModuleName);
        //         importAliasNames.push(importAliasName);
        //     }
        //     else {
        //         unaliasedModuleNames.push(externalModuleName);
        //     }
        // }
        // return { aliasedModuleNames, unaliasedModuleNames, importAliasNames };
    };
    NodeVisitor.prototype.visitAMDDependencies = function (node, includeNonAmdDependencies, emitRelativePathAsModuleName) {
        // // An AMD define function has the following shape:
        // //     define(id?, dependencies?, factory);
        // //
        // // This has the shape of
        // //     define(name, ["module1", "module2"], function (module1Alias) {
        // // The location of the alias in the parameter list in the factory function needs to
        // // match the position of the module name in the dependency list.
        // //
        // // To ensure this is true in cases of modules with no aliases, e.g.:
        // // `import "module"` or `<amd-dependency path= "a.css" />`
        // // we need to add modules without alias names to the end of the dependencies list
        // const dependencyNames = getAMDDependencyNames(node, includeNonAmdDependencies, emitRelativePathAsModuleName);
        // emitAMDDependencyList(dependencyNames);
        // write(", ");
        // emitAMDFactoryHeader(dependencyNames);
    };
    NodeVisitor.prototype.visitAMDDependencyList = function (_a) {
        var aliasedModuleNames = _a.aliasedModuleNames, unaliasedModuleNames = _a.unaliasedModuleNames;
        // write('["require", "exports"');
        // if (aliasedModuleNames.length) {
        //     write(", ");
        //     write(aliasedModuleNames.join(", "));
        // }
        // if (unaliasedModuleNames.length) {
        //     write(", ");
        //     write(unaliasedModuleNames.join(", "));
        // }
        // write("]");
    };
    NodeVisitor.prototype.visitAMDFactoryHeader = function (_a) {
        var importAliasNames = _a.importAliasNames;
        // write("function (require, exports");
        // if (importAliasNames.length) {
        //     write(", ");
        //     write(importAliasNames.join(", "));
        // }
        // write(") {");
    };
    NodeVisitor.prototype.visitAMDModule = function (node, emitRelativePathAsModuleName) {
        // emitEmitHelpers(node);
        // collectExternalModuleInfo(node);
        // writeLine();
        // write("define(");
        // writeModuleName(node, emitRelativePathAsModuleName);
        // emitAMDDependencies(node, /*includeNonAmdDependencies*/ true, emitRelativePathAsModuleName);
        // increaseIndent();
        // const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ true, /*ensureUseStrict*/!compilerOptions.noImplicitUseStrict);
        // emitExportStarHelper();
        // emitCaptureThisForNodeIfNecessary(node);
        // emitLinesStartingAt(node.statements, startIndex);
        // emitExportEquals(/*emitAsReturn*/ true);
        // emitTempDeclarations(/*newLine*/ true);
        // decreaseIndent();
        // writeLine();
        // write("});");
    };
    NodeVisitor.prototype.visitCommonJSModule = function (node) {
        // const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ false, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
        // emitEmitHelpers(node);
        // collectExternalModuleInfo(node);
        // emitExportStarHelper();
        // emitCaptureThisForNodeIfNecessary(node);
        // emitLinesStartingAt(node.statements, startIndex);
        // emitExportEquals(/*emitAsReturn*/ false);
        // emitTempDeclarations(/*newLine*/ true);
    };
    NodeVisitor.prototype.visitUMDModule = function (node) {
        //// emitEmitHelpers(node);
        //// collectExternalModuleInfo(node);
        //// const dependencyNames = getAMDDependencyNames(node, /*includeNonAmdDependencies*/ false);
        //// // Module is detected first to support Browserify users that load into a browser with an AMD loader
        //// writeLines(`(function (factory) {
        //if (typeof module === 'object' && typeof module.exports === 'object') {
        //    var v = factory(require, exports); if (v !== undefined) module.exports = v;
        //}
        //else if (typeof define === 'function' && define.amd) {
        //    //define(`);
        //    //    // emitAMDDependencyList(dependencyNames);
        //    //    // write(", factory);");
        //    //    // writeLines(`    }
        //    //})(`);
        //    // emitAMDFactoryHeader(dependencyNames);
        //    // increaseIndent();
        //    // const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ true, /*ensureUseStrict*/ !compilerOptions.noImplicitUseStrict);
        //    // emitExportStarHelper();
        //    // emitCaptureThisForNodeIfNecessary(node);
        //    // emitLinesStartingAt(node.statements, startIndex);
        //    // emitExportEquals(/*emitAsReturn*/ true);
        //    // emitTempDeclarations(/*newLine*/ true);
        //    // decreaseIndent();
        //    // writeLine();
        //    // write("});");
    };
    NodeVisitor.prototype.visitES6Module = function (node) {
        // externalImports = undefined;
        // exportSpecifiers = undefined;
        // exportEquals = undefined;
        // hasExportStarsToExportValues = false;
        // const startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ false);
        // emitEmitHelpers(node);
        // emitCaptureThisForNodeIfNecessary(node);
        // emitLinesStartingAt(node.statements, startIndex);
        // emitTempDeclarations(/*newLine*/ true);
        // // Emit exportDefault if it exists will happen as part
        // // or normal statement emit.
    };
    NodeVisitor.prototype.visitExportEquals = function (emitAsReturn) {
        // if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
        //     writeLine();
        //     emitStart(exportEquals);
        //     write(emitAsReturn ? "return " : "module.exports = ");
        //     emit((<ExportAssignment>exportEquals).expression);
        //     write(";");
        //     emitEnd(exportEquals);
        // }
    };
    NodeVisitor.prototype.getTextToEmit = function (node) {
        // switch (compilerOptions.jsx) {
        //     case JsxEmit.React:
        //         let text = trimReactWhitespaceAndApplyEntities(node);
        //         if (text === undefined || text.length === 0) {
        //             return undefined;
        //         }
        //         else {
        //             return text;
        //         }
        //     case JsxEmit.Preserve:
        //     default:
        //         return getTextOfNode(node, /*includeTrivia*/ true);
        // }
        return;
    };
    NodeVisitor.prototype.isUseStrictPrologue = function (node) {
        return node.expression.text === "use strict";
    };
    NodeVisitor.prototype.ensureUseStrictPrologue = function (startWithNewLine, writeUseStrict) {
        // if (writeUseStrict) {
        //     if (startWithNewLine) {
        //         writeLine();
        //     }
        //     write("\"use strict\";");
        // }
    };
    NodeVisitor.prototype.visitDirectivePrologues = function (statements, startWithNewLine, ensureUseStrict) {
        // let foundUseStrict = false;
        // for (let i = 0; i < statements.length; i++) {
        //     if (isPrologueDirective(statements[i])) {
        //         if (isUseStrictPrologue(statements[i] as ExpressionStatement)) {
        //             foundUseStrict = true;
        //         }
        //         if (startWithNewLine || i > 0) {
        //             writeLine();
        //         }
        //         emit(statements[i]);
        //     }
        //     else {
        //         ensureUseStrictPrologue(startWithNewLine || i > 0, !foundUseStrict && ensureUseStrict);
        //         // return index of the first non prologue directive
        //         return i;
        //     }
        // }
        // ensureUseStrictPrologue(startWithNewLine, !foundUseStrict && ensureUseStrict);
        return statements.length;
    };
    NodeVisitor.prototype.writeLines = function (text) {
        // const lines = text.split(/\r\n|\r|\n/g);
        // for (let i = 0; i < lines.length; i++) {
        //     const line = lines[i];
        //     if (line.length) {
        //         writeLine();
        //         write(line);
        //     }
        // }
    };
    NodeVisitor.prototype.visitEmitHelpers = function (node) {
        // // Only emit helpers if the user did not say otherwise.
        // if (!compilerOptions.noEmitHelpers) {
        //     // Only Emit __extends function when target ES5.
        //     // For target ES6 and above, we can emit classDeclaration as is.
        //     if (languageVersion < ScriptTarget.ES6 && !extendsEmitted && node.flags & NodeFlags.HasClassExtends) {
        //         writeLines(extendsHelper);
        //         extendsEmitted = true;
        //     }
        //     if (compilerOptions.jsx !== JsxEmit.Preserve && !assignEmitted && (node.flags & NodeFlags.HasJsxSpreadAttribute)) {
        //         writeLines(assignHelper);
        //         assignEmitted = true;
        //     }
        //     if (!decorateEmitted && node.flags & NodeFlags.HasDecorators) {
        //         writeLines(decorateHelper);
        //         if (compilerOptions.emitDecoratorMetadata) {
        //             writeLines(metadataHelper);
        //         }
        //         decorateEmitted = true;
        //     }
        //     if (!paramEmitted && node.flags & NodeFlags.HasParamDecorators) {
        //         writeLines(paramHelper);
        //         paramEmitted = true;
        //     }
        //     if (!awaiterEmitted && node.flags & NodeFlags.HasAsyncFunctions) {
        //         writeLines(awaiterHelper);
        //         awaiterEmitted = true;
        //     }
        // }
    };
    NodeVisitor.prototype.visitNodeWithCommentsAndWithoutSourcemap = function (node) {
        // emitNodeConsideringCommentsOption(node, emitNodeWithoutSourceMap);
    };
    NodeVisitor.prototype.visitNodeConsideringCommentsOption = function (node, emitNodeConsideringSourcemap) {
        // if (node) {
        //     if (node.flags & NodeFlags.Ambient) {
        //         return emitCommentsOnNotEmittedNode(node);
        //     }
        //     if (isSpecializedCommentHandling(node)) {
        //         // This is the node that will handle its own comments and sourcemap
        //         return emitNodeWithoutSourceMap(node);
        //     }
        //     const emitComments = shouldEmitLeadingAndTrailingComments(node);
        //     if (emitComments) {
        //         emitLeadingComments(node);
        //     }
        //     emitNodeConsideringSourcemap(node);
        //     if (emitComments) {
        //         emitTrailingComments(node);
        //     }
        // }
    };
    NodeVisitor.prototype.visitNodeWithSourceMap = function (node) {
        // if (node) {
        //     emitStart(node);
        //     emitNodeWithoutSourceMap(node);
        //     emitEnd(node);
        // }
    };
    NodeVisitor.prototype.visitNodeWithoutSourceMap = function (node) {
        // if (node) {
        //     emitJavaScriptWorker(node);
        // }
    };
    //protected changeSourceMapEmit(writer: ts.SourceMapWriter) {
    //    // sourceMap = writer;
    //    // emitStart = writer.emitStart;
    //    // emitEnd = writer.emitEnd;
    //    // emitPos = writer.emitPos;
    //    // setSourceFile = writer.setSourceFile;
    //}
    NodeVisitor.prototype.withTemporaryNoSourceMap = function (callback) {
        // const prevSourceMap = sourceMap;
        // setSourceMapWriterEmit(getNullSourceMapWriter());
        // callback();
        // setSourceMapWriterEmit(prevSourceMap);
    };
    NodeVisitor.prototype.isSpecializedCommentHandling = function (node) {
        switch (node.kind) {
            // All of these entities are emitted in a specialized fashion.  As such, we allow
            // the specialized methods for each to handle the comments on the nodes.
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.ExportAssignment:
                return true;
        }
    };
    NodeVisitor.prototype.shouldEmitLeadingAndTrailingComments = function (node) {
        // switch (node.kind) {
        //     case SyntaxKind.VariableStatement:
        //         return shouldEmitLeadingAndTrailingCommentsForVariableStatement(<VariableStatement>node);
        //     case SyntaxKind.ModuleDeclaration:
        //         // Only emit the leading/trailing comments for a module if we're actually
        //         // emitting the module as well.
        //         return shouldEmitModuleDeclaration(<ModuleDeclaration>node);
        //     case SyntaxKind.EnumDeclaration:
        //         // Only emit the leading/trailing comments for an enum if we're actually
        //         // emitting the module as well.
        //         return shouldEmitEnumDeclaration(<EnumDeclaration>node);
        // }
        // // If the node is emitted in specialized fashion, dont emit comments as this node will handle
        // // emitting comments when emitting itself
        // Debug.assert(!isSpecializedCommentHandling(node));
        // // If this is the expression body of an arrow function that we're down-leveling,
        // // then we don't want to emit comments when we emit the body.  It will have already
        // // been taken care of when we emitted the 'return' statement for the function
        // // expression body.
        // if (node.kind !== SyntaxKind.Block &&
        //     node.parent &&
        //     node.parent.kind === SyntaxKind.ArrowFunction &&
        //     (<ArrowFunction>node.parent).body === node &&
        //     languageVersion <= ScriptTarget.ES5) {
        //     return false;
        // }
        // // Emit comments for everything else.
        // return true;
    };
    /**
     * Emit comments associated with node that will not be emitted into JS file
     */
    NodeVisitor.prototype.visitCommentsOnNotEmittedNode = function (node) {
        // emitLeadingCommentsWorker(node, /*isEmittedNode*/ false);
    };
    NodeVisitor.prototype.visitLeadingComments = function (node) {
        // return emitLeadingCommentsWorker(node, /*isEmittedNode*/ true);
    };
    NodeVisitor.prototype.visitLeadingCommentsWorker = function (node, isEmittedNode) {
        // if (compilerOptions.removeComments) {
        //     return;
        // }
        // let leadingComments: CommentRange[];
        // if (isEmittedNode) {
        //     leadingComments = getLeadingCommentsToEmit(node);
        // }
        // else {
        //     // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
        //     // unless it is a triple slash comment at the top of the file.
        //     // For Example:
        //     //      /// <reference-path ...>
        //     //      declare var x;
        //     //      /// <reference-path ...>
        //     //      interface F {}
        //     //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
        //     if (node.pos === 0) {
        //         leadingComments = filter(getLeadingCommentsToEmit(node), isTripleSlashComment);
        //     }
        // }
        // emitNewLineBeforeLeadingComments(currentLineMap, writer, node, leadingComments);
        // // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
        // emitComments(currentText, currentLineMap, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);
    };
    NodeVisitor.prototype.visitTrailingComments = function (node) {
        // if (compilerOptions.removeComments) {
        //     return;
        // }
        // // Emit the trailing comments only if the parent's end doesn't match
        // const trailingComments = getTrailingCommentsToEmit(node);
        // // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
        // emitComments(currentText, currentLineMap, writer, trailingComments, /*trailingSeparator*/ false, newLine, writeComment);
    };
    /**
     * Emit trailing comments at the position. The term trailing comment is used here to describe following comment:
     *      x, /comment1/ y
     *        ^ => pos; the function will emit "comment1" in the emitJS
     */
    NodeVisitor.prototype.visitTrailingCommentsOfPosition = function (pos) {
        // if (compilerOptions.removeComments) {
        //     return;
        // }
        // const trailingComments = getTrailingCommentRanges(currentText, pos);
        // // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
        // emitComments(currentText, currentLineMap, writer, trailingComments, /*trailingSeparator*/ true, newLine, writeComment);
    };
    NodeVisitor.prototype.visitLeadingCommentsOfPositionWorker = function (pos) {
        // if (compilerOptions.removeComments) {
        //     return;
        // }
        // let leadingComments: CommentRange[];
        // if (hasDetachedComments(pos)) {
        //     // get comments without detached comments
        //     leadingComments = getLeadingCommentsWithoutDetachedComments();
        // }
        // else {
        //     // get the leading comments from the node
        //     leadingComments = getLeadingCommentRanges(currentText, pos);
        // }
        // emitNewLineBeforeLeadingComments(currentLineMap, writer, { pos: pos, end: pos }, leadingComments);
        // // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
        // emitComments(currentText, currentLineMap, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);
    };
    NodeVisitor.prototype.visitDetachedCommentsAndUpdateCommentsInfo = function (node) {
        // const currentDetachedCommentInfo = emitDetachedComments(currentText, currentLineMap, writer, writeComment, node, newLine, compilerOptions.removeComments);
        // if (currentDetachedCommentInfo) {
        //     if (detachedCommentsInfo) {
        //         detachedCommentsInfo.push(currentDetachedCommentInfo);
        //     }
        //     else {
        //         detachedCommentsInfo = [currentDetachedCommentInfo];
        //     }
        // }
    };
    //protected writeComment(text: string, lineMap: number[], writer: EmitTextWriter, comment: CommentRange, newLine: string) {
    //    // emitPos(comment.pos);
    //    // writeCommentRange(text, lineMap, writer, comment, newLine);
    //    // emitPos(comment.end);
    //}
    NodeVisitor.prototype.visitShebang = function () {
        // const shebang = getShebang(currentText);
        // if (shebang) {
        //     write(shebang);
        //     writeLine();
        // }
    };
    return NodeVisitor;
}());
exports.NodeVisitor = NodeVisitor;
//# sourceMappingURL=visitor.js.map