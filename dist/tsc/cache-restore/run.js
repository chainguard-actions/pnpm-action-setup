"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRestoreCache = runRestoreCache;
const cache_1 = require("@actions/cache");
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const glob_1 = require("@actions/glob");
const os_1 = __importDefault(require("os"));
async function runRestoreCache(inputs) {
    const cachePath = await getCacheDirectory();
    (0, core_1.saveState)('cache_path', cachePath);
    const fileHash = await (0, glob_1.hashFiles)(inputs.cacheDependencyPath);
    if (!fileHash) {
        throw new Error('Some specified paths were not resolved, unable to cache dependencies.');
    }
    const primaryKey = `pnpm-cache-${process.env.RUNNER_OS}-${os_1.default.arch()}-${fileHash}`;
    (0, core_1.debug)(`Primary key is ${primaryKey}`);
    (0, core_1.saveState)('cache_primary_key', primaryKey);
    let cacheKey = await (0, cache_1.restoreCache)([cachePath], primaryKey);
    (0, core_1.setOutput)('cache-hit', Boolean(cacheKey));
    if (!cacheKey) {
        (0, core_1.info)(`Cache is not found`);
        return;
    }
    (0, core_1.saveState)('cache_restored_key', cacheKey);
    (0, core_1.info)(`Cache restored from key: ${cacheKey}`);
}
async function getCacheDirectory() {
    const { stdout } = await (0, exec_1.getExecOutput)('pnpm store path --silent');
    const cacheFolderPath = stdout.trim();
    (0, core_1.debug)(`Cache folder is set to "${cacheFolderPath}"`);
    return cacheFolderPath;
}
//# sourceMappingURL=run.js.map