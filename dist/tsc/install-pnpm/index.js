"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSelfInstaller = void 0;
exports.install = install;
const core_1 = require("@actions/core");
const run_1 = __importDefault(require("./run"));
exports.runSelfInstaller = run_1.default;
async function install(inputs) {
    (0, core_1.startGroup)('Running self-installer...');
    const status = await (0, run_1.default)(inputs);
    (0, core_1.endGroup)();
    if (status) {
        return (0, core_1.setFailed)(`Something went wrong, self-installer exits with code ${status}`);
    }
}
exports.default = install;
//# sourceMappingURL=index.js.map