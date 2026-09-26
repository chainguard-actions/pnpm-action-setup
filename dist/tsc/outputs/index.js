"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOutputs = setOutputs;
const core_1 = require("@actions/core");
const utils_1 = require("../utils");
function setOutputs(inputs) {
    const binDest = (0, utils_1.getBinDest)(inputs);
    (0, core_1.addPath)(binDest);
    (0, core_1.setOutput)('dest', inputs.dest);
    (0, core_1.setOutput)('bin_dest', binDest);
}
exports.default = setOutputs;
//# sourceMappingURL=index.js.map