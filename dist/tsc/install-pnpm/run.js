"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSelfInstaller = runSelfInstaller;
const core_1 = require("@actions/core");
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const util_1 = __importDefault(require("util"));
const yaml_1 = require("yaml");
async function runSelfInstaller(inputs) {
    const { version, dest, packageJsonFile, standalone } = inputs;
    const { GITHUB_WORKSPACE } = process.env;
    // prepare self install
    await (0, promises_1.rm)(dest, { recursive: true, force: true });
    // create dest directory after removal
    await (0, promises_1.mkdir)(dest, { recursive: true });
    const pkgJson = path_1.default.join(dest, 'package.json');
    // we have ensured the dest directory exists, we can write the file directly
    await (0, promises_1.writeFile)(pkgJson, JSON.stringify({ private: true }));
    // copy .npmrc if it exists to install from custom registry
    if (GITHUB_WORKSPACE) {
        try {
            await (0, promises_1.copyFile)(path_1.default.join(GITHUB_WORKSPACE, '.npmrc'), path_1.default.join(dest, '.npmrc'));
        }
        catch (error) {
            // Swallow error if .npmrc doesn't exist
            if (!util_1.default.types.isNativeError(error) || !('code' in error) || error.code !== 'ENOENT')
                throw error;
        }
    }
    // prepare target pnpm
    const target = await readTarget({ version, packageJsonFile, standalone });
    const cp = (0, child_process_1.spawn)(process_1.execPath, [path_1.default.join(__dirname, 'pnpm.cjs'), 'install', target, '--no-lockfile'], {
        cwd: dest,
        stdio: ['pipe', 'inherit', 'inherit'],
    });
    const exitCode = await new Promise((resolve, reject) => {
        cp.on('error', reject);
        cp.on('close', resolve);
    });
    if (exitCode === 0) {
        const pnpmHome = path_1.default.join(dest, 'node_modules/.bin');
        (0, core_1.addPath)(pnpmHome);
        (0, core_1.exportVariable)('PNPM_HOME', pnpmHome);
    }
    return exitCode;
}
async function readTarget(opts) {
    const { version, packageJsonFile, standalone } = opts;
    const { GITHUB_WORKSPACE } = process.env;
    let packageManager;
    if (GITHUB_WORKSPACE) {
        try {
            const content = (0, fs_1.readFileSync)(path_1.default.join(GITHUB_WORKSPACE, packageJsonFile), 'utf8');
            ({ packageManager } = packageJsonFile.endsWith(".yaml")
                ? (0, yaml_1.parse)(content, { merge: true })
                : JSON.parse(content));
        }
        catch (error) {
            // Swallow error if package.json doesn't exist in root
            if (!util_1.default.types.isNativeError(error) || !('code' in error) || error.code !== 'ENOENT')
                throw error;
        }
    }
    if (version) {
        if (typeof packageManager === 'string' &&
            packageManager.startsWith('pnpm@') &&
            packageManager.replace('pnpm@', '') !== version) {
            throw new Error(`Multiple versions of pnpm specified:
  - version ${version} in the GitHub Action config with the key "version"
  - version ${packageManager} in the package.json with the key "packageManager"
Remove one of these versions to avoid version mismatch errors like ERR_PNPM_BAD_PM_VERSION`);
        }
        return `${standalone ? '@pnpm/exe' : 'pnpm'}@${version}`;
    }
    if (!GITHUB_WORKSPACE) {
        throw new Error(`No workspace is found.
If you've intended to let pnpm/action-setup read preferred pnpm version from the "packageManager" field in the package.json file,
please run the actions/checkout before pnpm/action-setup.
Otherwise, please specify the pnpm version in the action configuration.`);
    }
    if (typeof packageManager !== 'string') {
        throw new Error(`No pnpm version is specified.
Please specify it by one of the following ways:
  - in the GitHub Action config with the key "version"
  - in the package.json with the key "packageManager"`);
    }
    if (!packageManager.startsWith('pnpm@')) {
        throw new Error('Invalid packageManager field in package.json');
    }
    if (standalone) {
        return packageManager.replace('pnpm@', '@pnpm/exe@');
    }
    return packageManager;
}
exports.default = runSelfInstaller;
//# sourceMappingURL=run.js.map