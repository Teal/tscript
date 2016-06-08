
import {SourceFile} from "typescript";

// 不知道为什么，官方 typescript 的库文件未导出部分函数。
declare module "typescript" {
    export function isExternalModule(sourceFile: SourceFile): boolean;
}
