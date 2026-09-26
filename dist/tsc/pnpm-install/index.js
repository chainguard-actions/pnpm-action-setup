"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPnpmInstall = runPnpmInstall;
const core_1 = require("@actions/core");
const child_process_1 = require("child_process");
const utils_1 = require("../utils");
function runPnpmInstall(inputs) {
    const env = (0, utils_1.patchPnpmEnv)(inputs);
    for (const options of inputs.runInstall) {
        const args = ['install'];
        if (options.recursive)
            args.unshift('recursive');
        if (options.args)
            args.push(...options.args);
        const cmdStr = ['pnpm', ...args].join(' ');
        (0, core_1.startGroup)(`Running ${cmdStr}...`);
        const { error, status } = (0, child_process_1.spawnSync)('pnpm', args, {
            stdio: 'inherit',
            cwd: options.cwd,
            shell: true,
            env,
        });
        (0, core_1.endGroup)();
        if (error) {
            (0, core_1.setFailed)(error);
            continue;
        }
        if (status) {
            (0, core_1.setFailed)(`Command ${cmdStr} (cwd: ${options.cwd}) exits with status ${status}`);
            continue;
        }
    }
}
exports.default = runPnpmInstall;
//# sourceMappingURL=index.js.map