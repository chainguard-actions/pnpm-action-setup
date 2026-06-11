"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSaveCache = runSaveCache;
const cache_1 = require("@actions/cache");
const core_1 = require("@actions/core");
async function runSaveCache() {
    const state = (0, core_1.getState)('cache_restored_key');
    const primaryKey = (0, core_1.getState)('cache_primary_key');
    const cachePath = (0, core_1.getState)('cache_path');
    if (primaryKey === state) {
        (0, core_1.info)(`Cache hit occurred on the primary key ${primaryKey}, not saving cache.`);
        return;
    }
    const cacheId = await (0, cache_1.saveCache)([cachePath], primaryKey);
    if (cacheId == -1)
        return;
    (0, core_1.info)(`Cache saved with the key: ${primaryKey}`);
}
//# sourceMappingURL=run.js.map