"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchPnpmEnv = exports.getBinDest = void 0;
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const getBinDest = (inputs) => path_1.default.join(inputs.dest, 'node_modules', '.bin');
exports.getBinDest = getBinDest;
const patchPnpmEnv = (inputs) => ({
    ...process_1.default.env,
    PATH: (0, exports.getBinDest)(inputs) + path_1.default.delimiter + process_1.default.env.PATH,
});
exports.patchPnpmEnv = patchPnpmEnv;
//# sourceMappingURL=index.js.map