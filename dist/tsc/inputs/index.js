"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputs = void 0;
const core_1 = require("@actions/core");
const expand_tilde_1 = __importDefault(require("expand-tilde"));
const run_install_1 = require("./run-install");
const options = {
    required: true,
};
const parseInputPath = (name) => (0, expand_tilde_1.default)((0, core_1.getInput)(name, options));
const getInputs = () => ({
    version: (0, core_1.getInput)('version'),
    dest: parseInputPath('dest'),
    cache: (0, core_1.getBooleanInput)('cache'),
    cacheDependencyPath: parseInputPath('cache_dependency_path'),
    runInstall: (0, run_install_1.parseRunInstall)('run_install'),
    packageJsonFile: parseInputPath('package_json_file'),
    standalone: (0, core_1.getBooleanInput)('standalone'),
});
exports.getInputs = getInputs;
exports.default = exports.getInputs;
//# sourceMappingURL=index.js.map