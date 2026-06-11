"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruneStore = pruneStore;
const core_1 = require("@actions/core");
const child_process_1 = require("child_process");
const utils_1 = require("../utils");
function pruneStore(inputs) {
    if (inputs.runInstall.length === 0) {
        console.log('Pruning is unnecessary.');
        return;
    }
    (0, core_1.startGroup)('Running pnpm store prune...');
    const { error, status } = (0, child_process_1.spawnSync)('pnpm', ['store', 'prune'], {
        stdio: 'inherit',
        shell: true,
        env: (0, utils_1.patchPnpmEnv)(inputs),
    });
    (0, core_1.endGroup)();
    if (error) {
        (0, core_1.warning)(error);
        return;
    }
    if (status) {
        (0, core_1.warning)(`command pnpm store prune exits with code ${status}`);
        return;
    }
}
exports.default = pruneStore;
//# sourceMappingURL=index.js.map