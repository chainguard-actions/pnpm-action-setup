"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRunInstall = parseRunInstall;
const core_1 = require("@actions/core");
const yaml = __importStar(require("yaml"));
const zod_1 = require("zod");
const RunInstallSchema = zod_1.z.object({
    recursive: zod_1.z.boolean().optional(),
    cwd: zod_1.z.string().optional(),
    args: zod_1.z.array(zod_1.z.string()).optional(),
});
const RunInstallInputSchema = zod_1.z.union([
    zod_1.z.null(),
    zod_1.z.boolean(),
    RunInstallSchema,
    zod_1.z.array(RunInstallSchema),
]);
function parseRunInstall(inputName) {
    const input = (0, core_1.getInput)(inputName, { required: true });
    const parsedInput = yaml.parse(input);
    try {
        const result = RunInstallInputSchema.parse(parsedInput);
        if (!result)
            return [];
        if (result === true)
            return [{ recursive: true }];
        if (Array.isArray(result))
            return result;
        return [result];
    }
    catch (exception) {
        (0, core_1.error)(`Error for input "${inputName}" = ${input}`);
        if (exception instanceof zod_1.ZodError) {
            (0, core_1.error)(`Errors: ${exception.errors}`);
        }
        else {
            (0, core_1.error)(`Exception: ${exception}`);
        }
        process.exit(1);
    }
}
//# sourceMappingURL=run-install.js.map