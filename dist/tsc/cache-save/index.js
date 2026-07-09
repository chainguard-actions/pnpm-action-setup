"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCache = saveCache;
const core_1 = require("@actions/core");
const run_1 = require("./run");
async function saveCache(inputs) {
    if (!inputs.cache)
        return;
    try {
        await (0, run_1.runSaveCache)();
    }
    catch (error) {
        (0, core_1.setFailed)(error.message);
    }
}
exports.default = saveCache;
//# sourceMappingURL=index.js.map