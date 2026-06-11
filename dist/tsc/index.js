"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const cache_restore_1 = __importDefault(require("./cache-restore"));
const cache_save_1 = __importDefault(require("./cache-save"));
const inputs_1 = __importDefault(require("./inputs"));
const install_pnpm_1 = __importDefault(require("./install-pnpm"));
const outputs_1 = __importDefault(require("./outputs"));
const pnpm_install_1 = __importDefault(require("./pnpm-install"));
const pnpm_store_prune_1 = __importDefault(require("./pnpm-store-prune"));
async function main() {
    const inputs = (0, inputs_1.default)();
    if ((0, core_1.getState)('is_post') === 'true') {
        await runPost(inputs);
    }
    else {
        await runMain(inputs);
    }
}
async function runMain(inputs) {
    (0, core_1.saveState)('is_post', 'true');
    await (0, install_pnpm_1.default)(inputs);
    console.log('Installation Completed!');
    (0, outputs_1.default)(inputs);
    await (0, cache_restore_1.default)(inputs);
    (0, pnpm_install_1.default)(inputs);
}
async function runPost(inputs) {
    (0, pnpm_store_prune_1.default)(inputs);
    await (0, cache_save_1.default)(inputs);
}
main().catch(error => {
    console.error(error);
    (0, core_1.setFailed)(error);
});
//# sourceMappingURL=index.js.map