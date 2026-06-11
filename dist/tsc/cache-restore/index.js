"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCache = restoreCache;
const cache_1 = require("@actions/cache");
const core_1 = require("@actions/core");
const run_1 = require("./run");
async function restoreCache(inputs) {
    if (!inputs.cache)
        return;
    if (!(0, cache_1.isFeatureAvailable)()) {
        (0, core_1.warning)('Cache is not available, skipping cache restoration');
        return;
    }
    (0, core_1.startGroup)('Restoring cache...');
    await (0, run_1.runRestoreCache)(inputs);
    (0, core_1.endGroup)();
}
exports.default = restoreCache;
//# sourceMappingURL=index.js.map