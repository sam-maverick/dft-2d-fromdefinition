"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConvention = isConvention;
function isConvention(obj) {
    const typedObj = obj;
    return ((typedObj === "unnormalized_forward" ||
        typedObj === "normalized_forward" ||
        typedObj === "symmetric"));
}
