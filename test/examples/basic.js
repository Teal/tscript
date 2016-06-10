"use strict";
function a() {
}
exports.a = a;
exports.c = 1;
function b() {
    a();
    exports.c;
}
exports.b = b;
